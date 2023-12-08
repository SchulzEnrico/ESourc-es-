import { Modal, Form, Button } from 'react-bootstrap';
import { EditBookmarkProps } from '../types/types.ts';

function EditBookmark({
                          showEditModal,
/*                          isDeleting,*/
                          handleCloseModalEdit,
                          handleInputChange,
                          handleSaveChanges,
                          handleDeleteBookmark,
                          selectedBookmark,
                      }: Readonly<EditBookmarkProps>) {

    const onDeleteBookmarkClick = () => {
        console.log("onDeleteBookmarkClick has been called"); // Log message to ensure function call
      //  if (!isDeleting) {
            console.log("Deleting bookmark with ID ", selectedBookmark); // Log the bookmark being deleted
            handleDeleteBookmark(selectedBookmark);
      //  }
    };
    return (
            <Modal className={"edit-modal"} show={showEditModal} onHide={handleCloseModalEdit}>
                <Modal.Header>
                    <Modal.Title>Edit Bookmark</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        className={"form-input-edit-bookmark"}
                        type="text"
                        aria-label={"Destination"}
                        value={selectedBookmark?.destination || ''}
                        onChange={(e) => handleInputChange('destination', e.target.value)}
                    />
                    <Form.Control
                        className={"form-input-edit-bookmark"}
                        type="text"
                        aria-label={"Dropdown Category"}
                        value={selectedBookmark?.dropdownCategory || ''}
                        onChange={(e) => handleInputChange('dropdownCategory', e.target.value)}
                    />
                    <Form.Control
                        className={"form-input-edit-bookmark"}
                        type="text"
                        aria-label={"Name"}
                        value={selectedBookmark?.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <Form.Control
                        className={"form-input-edit-bookmark"}
                        type="text"
                        aria-label={"Title"}
                        value={selectedBookmark?.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                    <Form.Control
                        className={"form-input-edit-bookmark"}
                        type="text"
                        aria-label={"URL"}
                        value={selectedBookmark?.url || ''}
                        onChange={(e) => handleInputChange('url', e.target.value)}
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
            </Modal>
    );
}
export default EditBookmark;
