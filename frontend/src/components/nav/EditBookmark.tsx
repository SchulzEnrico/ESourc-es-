import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { EditBookmarkProps, BookmarkDTO } from '../types/types.ts';
import { RiSave3Fill } from "react-icons/ri";
import { BsFillTrash3Fill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import axios from 'axios';

function EditBookmark({
                          showEditModal,
                          handleCloseModalEdit,
                          handleInputChange,
                          handleSaveChanges,
                          handleDeleteBookmark,
                          selectedBookmark,
                          showSuccessPopup,
                      }: Readonly<EditBookmarkProps>) {
    const [availableCategories, setAvailableCategories] = useState<{ key: string; category: string; }[]>([]);
    const [dropdownCategory, setDropdownCategory] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<BookmarkDTO[]>(`api/bookmarks/getAll`);
                if (response.data && Array.isArray(response.data)) {
                    const categories = response.data.map((bookmark) => ({
                        key: bookmark.url,
                        category: bookmark.dropdownCategory,
                        destination: bookmark.destination
                    }));

                    const filteredCategories = filterAndRemoveDuplicates(categories, selectedBookmark?.destination);

                    setAvailableCategories(filteredCategories);
                    console.log("Available categories fetched successfully");
                } else {
                    console.error("Invalid data received from the API:", response.data);
                }
            } catch (error) {
                console.error("Error fetching available categories:", error);
            }
        };

        if (showEditModal && selectedBookmark?.destination) {
            fetchData().catch(error => console.error("Error in fetchData:", error));
        }
    }, [selectedBookmark?.destination, showEditModal]);

    const filterAndRemoveDuplicates = (categories: { key: string; category: string; destination: string }[], selectedDestination?: string) => {
        if (!selectedDestination) return [];

        const filteredCategories = categories
            .filter(category => category.destination === selectedDestination)
            .map(category => category.category);

        return Array.from(new Set(filteredCategories))
            .map(category => ({
                key: categories.find(cat => cat.category === category)?.key ?? "",
                category: category
            }));
    };



    const onDeleteBookmarkClick = () => {
        console.log("onDeleteBookmarkClick has been called");
        console.log("Deleting bookmark with ID ", selectedBookmark);
        handleDeleteBookmark(selectedBookmark ?? null);
    };


    return (
        <Modal className={"edit-modal dropdown-container"} show={showEditModal} onHide={handleCloseModalEdit}>
            <Modal.Header>
                <Modal.Title className={"edit-modal-title"}>
                    <Button variant="link" className="close-btn-EditBookmark" onClick={handleCloseModalEdit}>
                        <IoClose className={"close-icon"}/>
                    </Button>
                    <p className={"instructions engrave"}>Edit Bookmark</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={"form-proportions"} onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
                    <Form.Label className={"input-label"}>URL</Form.Label>
                    <Form.Control
                        className={"form-control-custom shadow--inset"}
                        type="text"
                        aria-label={"change the URL"}
                        value={selectedBookmark?.url ?? ''}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => handleInputChange('url', e.target.value)}
                    />
                    <Form.Label className={"input-label"}>PICK DESTINATION</Form.Label>
                    <Form.Select
                        className={"form-control-custom select-field shadow--inset"}
                        aria-label={"change the destination"}
                        value={selectedBookmark?.destination ?? ''}
                        onChange={(e) => handleInputChange('destination', e.target.value)}
                    >
                        <option value="external">EXTERNAL: opens in a new browser tab</option>
                        <option value="ins_pro">INSPIRATIONS  ~  PROJECTS</option>
                        <option value="snip_gen">SNIPPETS  ~  GENERATORS</option>
                        <option value="development">DEVELOPMENT  ~  EDITING  ~  CREATION</option>
                        <option value="know_guide">KNOWLEDGE  ~  GUIDELINES</option>
                        <option value="lip_doc">LIBRARIES  ~  DOCUMENTATIONS</option>
                        <option value="project">PROJECT MANAGEMENT  ~  TOOLS</option>
                        <option value="personal">PERSONALLY  ~  INDIVIDUAL</option>
                    </Form.Select>
                    <Form.Label className={"input-label"}>DROPDOWN CATEGORY</Form.Label>
                    <Form.Select
                        className={"form-control-custom select-field shadow--inset"}
                        aria-label={"change the dropdown category"}
                        value={dropdownCategory}
                        onChange={(e) => setDropdownCategory(e.target.value)}
                    >
                        <option value="">pick an existing dropdown category</option>
                        {availableCategories.map((category) => (
                            <option key={category.key} value={category.category}>
                                {category.category}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Label className={"input-label"}>NEW CATEGORY</Form.Label>
                    <Form.Control
                        className="form-control-custom shadow--inset"
                        placeholder="create a new dropdown category"
                        aria-label="create a new dropdown category"
                        value={selectedBookmark?.dropdownCategory ?? ''}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => handleInputChange('dropdownCategory', e.target.value)}  // Füge diese Zeile hinzu
                    />
                    <Form.Label className={"input-label"}>POSITION</Form.Label>
                    <Form.Control
                        className="form-control-custom shadow--inset"
                        type="text"
                        aria-label="define the position"
                        value={selectedBookmark?.dropdownIndex ?? ''}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => handleInputChange( 'dropdownIndex', e.target.value)}
                    />
                    <Form.Label className={"input-label"}>IDENTIFIER</Form.Label>
                    <Form.Control
                        className={"form-control-custom shadow--inset"}
                        type="text"
                        aria-label={"change the menu item identifier"}
                        value={selectedBookmark?.title ?? ''}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                    <Form.Label className={"input-label"}>CONTENT TAGS</Form.Label>
                    <Form.Control
                        className={"form-control-custom shadow--inset"}
                        type="text"
                        aria-label={"change content tags, topics and use cases"}
                        value={selectedBookmark?.tags ?? ''}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className={"save-close-btn tooltip-btn tt_n"}
                    variant="primary"
                    data-tooltip={"SAVE/CLOSE"}
                    onClick={() => {
                        handleSaveChanges();
                        handleCloseModalEdit();
                    }}
                >
                    <RiSave3Fill className={"save-close-icon"}/>
                </Button>
                <Button
                    data-tooltip={"Delete bookmark forever?"}
                    variant="danger"
                    className={"delete-forever-btn tooltip-btn tt_n"}
                    onClick={() => {
                        onDeleteBookmarkClick();
                        handleCloseModalEdit();
                    }}
                >
                    <BsFillTrash3Fill className={"delete-forever-icon"}/>
                </Button>
            </Modal.Footer>
            {/* Erfolgs-Popup anzeigen, wenn showSuccessPopup true ist */}
            {showSuccessPopup && (
                <div className="success-popup">Bookmark updated/deleted successfully!</div>
            )}
        </Modal>
    );
}
export default EditBookmark;
