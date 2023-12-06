import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BookmarkDTO, ManageBookmarksProps} from '../types/types.ts';
import {Button, Form, Row, Col, Modal, Container} from 'react-bootstrap';
import '../../index.css';
import './ManageBookmarks.css';

const ManageBookmarks: React.FC<ManageBookmarksProps> = function ManageBookmarks({ onClose }: { onClose: () => void }) {
    const [bookmarks, setBookmarks] = useState<BookmarkDTO[]>([]);
    const [selectedBookmark, setSelectedBookmark] = useState<BookmarkDTO | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [bookmarkData, setBookmarkData] = useState<BookmarkDTO | null>(null);
    const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
    const [uniqueTargets, setUniqueTargets] = useState<string[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [targetFilter, setTargetFilter] = useState<string>('');
    const logger = (message: string) => {console.log(message);};

    useEffect(() => {
        axios.get<BookmarkDTO[]>('/api/bookmarks/getAllBookmarksForEdit')
            .then((response) => {
                const bookmarksWithIds = response.data.map((bookmark) => {
                    return { ...bookmark, _id: bookmark._id };
                });
                setBookmarks(bookmarksWithIds);

                const categories = Array.from(new Set(bookmarksWithIds.flatMap(bookmark => bookmark.dropdownCategory)));
                const target = Array.from(new Set(bookmarksWithIds.flatMap(bookmark => bookmark.target)));
                setUniqueCategories(categories);
                setUniqueTargets(target);
            })
            .catch(error =>
                logger('Error retrieving bookmarks:' + error)
            );
    }, []);

    const handleEditBookmark = (bookmark: BookmarkDTO) => {
        if (bookmark._id) {
            setSelectedBookmark(bookmark);
            setBookmarkData(bookmark);
            setShowEditModal(true);
        } else {
            logger('Invalid _id for bookmark when opening the edit modal:' + bookmark._id);
        }
    };

    const handleCloseModalEdit = () => {
        setShowEditModal(false);
        setSelectedBookmark(null);
    };

    const handleCloseModalBookmarkManager = () => {
        onClose();
    };

    const handleCategoryFilterChange = (filterValue: string) => {
        setCategoryFilter(filterValue);
        const filteredBookmarks = applyFilters(filterValue, targetFilter);
        setBookmarks(filteredBookmarks);
    };

    const handleTargetFilterChange = (filterValue: string) => {
        setTargetFilter(filterValue);
        const filteredBookmarks = applyFilters(categoryFilter, filterValue);
        setBookmarks(filteredBookmarks);
    };

    const applyFilters = (category: string, target: string) => {
        return bookmarks.filter(bookmark => {
            const categoryMatch = category === '' || bookmark.dropdownCategory.toLowerCase().includes(category.toLowerCase());
            const targetMatch = target === '' || bookmark.target.toLowerCase().includes(target.toLowerCase());
            return categoryMatch && targetMatch;
        });
    };

    const loadAllBookmarks = async () => {
        try {
            const response = await axios.get<BookmarkDTO[]>('/api/bookmarks/getAllBookmarksForEdit');
            const bookmarksWithIds = response.data.map((bookmark) => {
                return { ...bookmark, _id: bookmark._id };
            });
            setBookmarks(bookmarksWithIds);
        } catch (error) {
            logger('Error retrieving bookmarks.');
        }
    };

    const handleResetFilter = () => {
            setCategoryFilter('');
            setTargetFilter('');
            loadAllBookmarks().then();
    };

    const handleInputChange = (fieldName: string, value: string | number) => {
        setSelectedBookmark((prevSelectedBookmark) => {
            if (!prevSelectedBookmark) return prevSelectedBookmark;
            return {
                ...prevSelectedBookmark,
                [fieldName]: value.toString(),
            };
        });

        setBookmarkData((prevBookmarkData) => {
            if (!prevBookmarkData) return prevBookmarkData;
            return {
                ...prevBookmarkData,
                [fieldName]: value.toString(),
            };
        });
    };

    const handleSaveChanges = async () => {
        try {
            logger('Data before PUT request: ' + JSON.stringify(bookmarkData));
            const response = await axios.put(`/api/bookmarks/edit/${bookmarkData?._id}`, bookmarkData);
            logger('Antwort vom Server: ' + JSON.stringify(response.data));
            handleCloseModalEdit();
        } catch (error) {
            logger('Error when saving changes: ' + error);
        }
    };

    const handleDeleteBookmark = async (bookmark: BookmarkDTO) => {
        try {
            await axios.delete(`/api/bookmarks/delete/${bookmark._id}`);
            const updatedBookmarks = bookmarks.filter((b) => b._id !== bookmark._id);
            setBookmarks(updatedBookmarks);
            handleCloseModalEdit();
        } catch (error) {
            logger('Error deleting the bookmark:');
        }
    };


    return (
        <div className={"manage-bookmarks"}>
            <Container>
                <Button title={"Close Bookmark Manager"} variant="secondary" className={"close-button"} onClick={handleCloseModalBookmarkManager}>
                    <img alt="Close Icon" id="close-png" src="../src/assets/close.png" />
                </Button>
                <h2>Bookmark Manager</h2>
                <Button
                    id={"reset-filter-btn"}
                    title={"reset Filter"}
                    variant="secondary"
                    onClick={handleResetFilter}
                >
                    <img alt="Recycle Icon" id="recycle-png" src="../src/assets/recycle.png" />
                </Button>
                <Form.Select className={"filter-bookmark-manager"} value={categoryFilter} onChange={(e) => handleCategoryFilterChange(e.target.value)}>
                    <option value="">select category</option>
                    {uniqueCategories.map((category,_id) => (
                        <option key={_id} value={category}>
                            {category}
                        </option>
                    ))}
                </Form.Select>
                <Form.Select className={"filter-bookmark-manager"} value={targetFilter} onChange={(e) => handleTargetFilterChange(e.target.value)}>
                    <option value="">select target</option>
                    {uniqueTargets.map((target ,_id) => (
                        <option key={_id} value={target}>
                            {target}
                        </option>
                    ))}
                </Form.Select>
            </Container>
            {bookmarks.map((bookmark,_id) => (
                <Row key={_id} className="mb-2">
                    <Col>
                        <Form className={"manage-form"}>
                            <Button title={"Edit your bookmark"} variant="primary" className={"edit-bookmark-btn"} onClick={() => handleEditBookmark(bookmark)}>
                                <img alt="Edit Icon" id="pencil-png" src="../src/assets/pencil.png" />
                            </Button>
                            {Object.entries(bookmark).map(([key, value]) => (
                                key === '_id' ? null : (
                                    <Form.Group key={key} as={Row}>
                                        <Col sm="8">
                                            <Form.Control
                                                className="form-input-bookmark-manager"
                                                type="text"
                                                defaultValue={
                                                    typeof value === 'object' && value !== null && '$oid' in value
                                                        ? (value as { $oid: string }).$oid
                                                        : value?.toString() ?? ''
                                                }
                                                readOnly={key === '_id'}
                                            />
                                        </Col>
                                    </Form.Group>
                                )
                            ))}
                        </Form>
                    </Col>
                </Row>
            ))}
            {selectedBookmark && (
                <Modal className={"edit-modal"} show={showEditModal} onHide={handleCloseModalEdit}>
                    <Modal.Header >
                        <Modal.Title>Edit Bookmark</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            className={"form-input-edit-bookmark"}
                            type="text"
                            aria-label={"Target"}
                            value={selectedBookmark?.target}
                            onChange={(e) => handleInputChange('target', e.target.value)}
                        />
                        <Form.Control
                            className={"form-input-edit-bookmark"}
                            type="text"
                            aria-label={"Dropdown Category"}
                            value={selectedBookmark?.dropdownCategory}
                            onChange={(e) => handleInputChange('dropdownCategory', e.target.value)}
                        />
                        <Form.Control
                            className={"form-input-edit-bookmark"}
                            type="text"
                            aria-label={"Name"}
                            value={selectedBookmark?.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        <Form.Control
                            className={"form-input-edit-bookmark"}
                            type="text"
                            aria-label={"Title"}
                            value={selectedBookmark?.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                        <Form.Control
                            className={"form-input-edit-bookmark"}
                            type="text"
                            aria-label={"URL"}
                            value={selectedBookmark?.url}
                            onChange={(e) => handleInputChange('url', e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className={"save-close-btn"}
                            variant="primary"
                            onClick={handleSaveChanges}>
                            close/save
                        </Button>
                        <Button
                            title={"Delete bookmark forever"}
                            variant="danger"
                            className={"delete-forever-btn"}
                            onClick={() => handleDeleteBookmark(selectedBookmark)}
                        >
                            <img alt="Delete Forever Icon" id="deleteForever-png" src="../src/assets/deleteForever.png" />
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default ManageBookmarks;