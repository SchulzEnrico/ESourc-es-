import { Modal, Form, Button } from 'react-bootstrap';
import { EditBookmarkProps } from '../types/types.ts';

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
        <Modal className={"edit-modal shadow--raised"} show={showEditModal} onHide={handleCloseModalEdit}>
            <Modal.Header>
                <Modal.Title className={"introductions edit-modal-title"}>Edit Bookmark</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    className={"form-input-edit-bookmark shadow--ridge"}
                    type="text"
                    aria-label={"URL"}
                    value={selectedBookmark?.url ?? ''}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                />
                <Form.Select
                    className={"form-select-edit-bookmark form-input-edit-bookmark shadow--ridge"}
                    aria-label={"Destination"}
                    value={selectedBookmark?.destination ?? ''}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                >
                    <option value="external">external</option>
                    <option value="ins_pro">ins_pro</option>
                    <option value="snip_gen">snip_gen</option>
                    <option value="development">development</option>
                    <option value="know_guide">know_guide</option>
                    <option value="lip_doc">lip_doc</option>
                    <option value="project">project</option>
                    <option value="personal">personal</option>
                </Form.Select>
                <Form.Control
                    className={"form-input-edit-bookmark shadow--ridge"}
                    type="text"
                    aria-label={"Dropdown Category"}
                    value={selectedBookmark?.dropdownCategory ?? ''}
                    onChange={(e) => handleInputChange('dropdownCategory', e.target.value)}
                />
                <Form.Control
                    className={"form-input-edit-bookmark shadow--ridge"}
                    type="text"
                    aria-label={"Title"}
                    value={selectedBookmark?.title ?? ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                />
                <Form.Control
                    className={"form-input-edit-bookmark shadow--ridge"}
                    type="text"
                    aria-label={"Tags"}
                    value={selectedBookmark?.tags ?? ''}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className={"save-close-btn"}
                    variant="primary"
                    onClick={() => {
                        handleSaveChanges();
                        handleCloseModalEdit();
                    }}
                >
                    close/save
                </Button>
                <Button
                    title={"Delete bookmark forever"}
                    variant="danger"
                    className={"delete-forever-btn"}
                    onClick={() => {
                        onDeleteBookmarkClick();
                        handleCloseModalEdit();
                    }}
                >
                    <img alt="Delete Forever Icon" id="deleteForever-png" src="../src/assets/deleteForever.png" />
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