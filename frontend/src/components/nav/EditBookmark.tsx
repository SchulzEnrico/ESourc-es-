import { Modal, Form, Button } from 'react-bootstrap';
import { EditBookmarkProps } from '../types/types.ts';

import {RiSave3Fill} from "react-icons/ri";
import {BsFillTrash3Fill} from "react-icons/bs";
import {IoClose} from "react-icons/io5";

function EditBookmark({
                          showEditModal,
                          handleCloseModalEdit,
                          handleInputChange,
                          handleSaveChanges,
                          handleDeleteBookmark,
                          selectedBookmark,
                          showSuccessPopup,
                      }: Readonly<EditBookmarkProps>) {

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
                    <h2>Edit Bookmark</h2>
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
                        onChange={(e) => handleInputChange('url', e.target.value)}
                    />
                    <Form.Label className={"input-label"}>PICK DESTINATION</Form.Label>
                    <Form.Select
                        className={"form-control-custom select-field shadow--inset"}
                        aria-label={"change the destination"}
                        value={selectedBookmark?.destination ?? ''}
                        onChange={(e) => handleInputChange('destination', e.target.value)}
                    >
                        <option value="external">EXTERNAL WINDOW</option>
                        <option value="ins_pro">INSPIRATIONS  ~  PROJECTS</option>
                        <option value="snip_gen">SNIPPETS  ~  GENERATORS</option>
                        <option value="development">DEVELOPMENT  ~  EDITING  ~  CREATION</option>
                        <option value="know_guide">KNOWLEDGE  ~  GUIDELINES</option>
                        <option value="lip_doc">LIBRARIES  ~  DOCUMENTATIONS</option>
                        <option value="project">PROJECT MANAGEMENT  ~  TOOLS</option>
                        <option value="personal">PERSONALLY  ~  INDIVIDUAL</option>
                    </Form.Select>
                    <Form.Label className={"input-label"}>DROPDOWN CATEGORY</Form.Label>
                    <Form.Control
                        className={"form-control-custom shadow--inset"}
                        type="text"
                        aria-label={"change the dropdown category"}
                        value={selectedBookmark?.dropdownCategory ?? ''}
                        onChange={(e) => handleInputChange('dropdownCategory', e.target.value)}
                    />
                    <Form.Label className={"input-label"}>NEW CATEGORY</Form.Label>
                    <Form.Control
                        className="form-control-custom shadow--inset"
                        placeholder="create a new dropdown category"
                        aria-label="create a new dropdown category"
                        value={selectedBookmark?.dropdownCategory ?? ''}
                        onChange={(e) => handleInputChange('dropdownCategory', e.target.value)}  // Füge diese Zeile hinzu
                    />
                    <Form.Label className={"input-label"}>IDENTIFIER</Form.Label>
                    <Form.Control
                        className={"form-control-custom shadow--inset"}
                        type="text"
                        aria-label={"change the menu item identifier"}
                        value={selectedBookmark?.title ?? ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                    <Form.Label className={"input-label"}>CONTENT TAGS</Form.Label>
                    <Form.Control
                        className={"form-control-custom shadow--inset"}
                        type="text"
                        aria-label={"change content tags, topics and use cases"}
                        value={selectedBookmark?.tags ?? ''}
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