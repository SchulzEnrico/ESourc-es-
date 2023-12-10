import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {
    DropdownButton,
    Dropdown,
    ButtonGroup,
    Modal,
    Button,
    SplitButton, Alert,
} from 'react-bootstrap';
import '../../index.css';
import GetMore from '../header/GetMore.tsx';
import './EditBookmark.tsx'
import EditBookmark from "./EditBookmark";
import {NavigationProps, BookmarkDTO} from "../types/types.ts";

const Navigation: React.FC<NavigationProps> = ({ onLinkClick, panelName, isExternal }) => {
    const tempBookmark = useRef<BookmarkDTO | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [bookmarks, setBookmarks] = useState<BookmarkDTO[]>([]);
    const [showGetMore, setShowGetMore] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [selectedBookmark, setSelectedBookmark] = useState<BookmarkDTO | null>(null);

    const handleLinkClick = (url: string) => {
        onLinkClick?.(url);
    };

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        variant: 'success'
    });

    const showAlert = (message: string, variant: string = 'success') => {
        setAlert({ open: true, message, variant });
        setTimeout(() => setAlert({ ...alert, open: false }), 1500); // Auto close the alert after 3 seconds
    }


    const handleGetMoreClick = () => {
        setShowGetMore(true);
    };

    const handleCloseModal = () => {
        setShowGetMore(false);
    };

    const handleSaveChanges = () => {
        if (selectedBookmark && selectedBookmark._id) {
            axios.put(`/api/bookmarks/edit/${selectedBookmark._id}`, selectedBookmark)
                .then(response => {
                    console.log('Bookmark updated successfully:', response.data);
                    showAlert('Bookmark updated successfully'); // Show success alert
                    setShowEditModal(false);
                })
                .catch(error => {
                    console.error('Error updating bookmark:', error);
                });
        } else {
            console.error('Selected bookmark is null or does not have an _id:', selectedBookmark);
        }
    };

    const handleInputChange = (field: string, value: string, bookmark: BookmarkDTO | null) => {
        if (!bookmark) {
            console.warn('Trying to update a null or undefined bookmark.');
            return;
        }
        const updatedBookmark: BookmarkDTO = {
            ...bookmark,
            [field]: value,
        };
        setSelectedBookmark(updatedBookmark);
        tempBookmark.current = updatedBookmark;
    };

    const handleDeleteBookmark = (id: string) => {
        console.log(`Deleting bookmark with ID ${id}`);
        return axios
            .delete(`/api/bookmarks/delete/${id}`)
            .then(response => {
                console.log('Bookmark deleted successfully:', response.data);
                showAlert('Bookmark deleted successfully'); // Show success alert
                setShowEditModal(false);
            });
    };

    useEffect(() => {
        axios.get<BookmarkDTO[]>('/api/bookmarks/getAll')
            .then((response) => {
                setBookmarks(response.data);
            })
            .catch(error =>
                console.error("Error retrieving bookmarks:", error)
            );
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderDropdownItems = (category: string) => {
        return bookmarks
            .filter((bookmark) => bookmark.dropdownCategory === category && (isExternal ? bookmark.destination === "external" : bookmark.destination === panelName))
            .map((bookmark) => (
                <SplitButton
                    className="dropdown-item"
                    id={"split-button-basic-secondary"}
                    key={bookmark.url}
                    title={bookmark.title}
                    target={bookmark.destination === "external" ? "_blank" : "_self"}
                    onSelect={() => {
                        setSelectedBookmark(bookmark);
                        setShowEditModal(true);
                    }}
                    onClick={() => handleLinkClick(bookmark.url)}
                >
                    {bookmark.tags}
                    <Dropdown.Item eventKey={`${bookmark.url}/edit`} title={bookmark.tags ? bookmark.tags.join(", ") : ""}>
                        Edit
                    </Dropdown.Item>
                </SplitButton>
            ));
    };

    const renderDropdowns = () => {
        const uniqueCategories = Array.from(
            new Set(
                bookmarks
                    .filter((bookmark) => isExternal ? bookmark.destination === "external" : bookmark.destination === panelName)
                    .map((bookmark) => bookmark.dropdownCategory)
            )
        );

        return (
            <ButtonGroup className={isMobile ? "nav-group-mobile" : "nav-group shadow--ridge"}>
                {isMobile && (
                    <Button title={"Add a new Bookmark to your collection"} variant="primary" className={"get-more-button"} onClick={handleGetMoreClick}>
                        <img alt="Add Icon" id="add-png" src="../src/assets/add.png" />
                    </Button>
                )}
                {!isMobile &&
                    uniqueCategories.map((category) => (
                        <DropdownButton
                            as={ButtonGroup}
                            key={category}
                            id={`dropdown-variants-${category}`}
                            variant="secondary"
                            title={category}
                            drop={"down"}
                        >
                            <div className="dropdown-container">
                                {renderDropdownItems(category)}
                            </div>
                        </DropdownButton>
                    ))}
                {!isMobile && (
                    <Button title={"Add a new Bookmark to your collection"} variant="primary" className={"get-more-button"} onClick={handleGetMoreClick}>
                        <img alt="Add Icon" id="add-png" src="../src/assets/add.png" />
                    </Button>
                )}
                <EditBookmark
                    showEditModal={showEditModal}
                    handleCloseModalEdit={() => setShowEditModal(false)}
                    handleInputChange={(field, value) => { handleInputChange(field, value, selectedBookmark) }}
                    handleSaveChanges={handleSaveChanges}
                    handleDeleteBookmark={() => {
                        if (selectedBookmark?._id) {
                            handleDeleteBookmark(selectedBookmark._id)
                                .then(() => {
                                    setSelectedBookmark(null);
                                })
                                .catch((error) => {
                                    console.error('Error deleting bookmark:', error);
                                });
                        } else {
                            console.warn('Trying to delete a null or undefined bookmark.');
                        }
                    }}
                    selectedBookmark={selectedBookmark}
                />
            </ButtonGroup>
        );
    };
    return (
        <>
            {renderDropdowns()}
            {alert.open && (
                <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, open: false })} dismissible>
                    {alert.message}
                </Alert>
            )}
            <Modal show={showGetMore} onHide={handleCloseModal}>
                <GetMore onClose={handleCloseModal}  show/>
            </Modal>
        </>
    );
}

export default Navigation;