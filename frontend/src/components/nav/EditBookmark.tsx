import { Modal, Form, Button } from 'react-bootstrap';
import {BookmarkDTO } from "../types/types.ts";

export type EditBookmarkProps = {
    showEditModal: boolean;
    handleCloseModalEdit: () => void;
    handleInputChange: (field: string, value: string) => void;
    handleSaveChanges: () => void;
    handleDeleteBookmark: (bookmark: BookmarkDTO | null) => void;
    selectedBookmark: BookmarkDTO | null;
};
function EditBookmark({
      showEditModal,
      handleCloseModalEdit,
      handleInputChange,
      handleSaveChanges,
      handleDeleteBookmark,
      selectedBookmark,
  }: Readonly<EditBookmarkProps>) {

    const onDeleteBookmarkClick = () => {
        handleDeleteBookmark(selectedBookmark);
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
                        value={selectedBookmark?.destination}
                        onChange={(e) => handleInputChange('destination', e.target.value)}
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
                        onClick={handleSaveChanges}
                    >
                        close/save
                    </Button>
                    <Button
                        title={"Delete bookmark forever"}
                        variant="danger"
                        className={"delete-forever-btn"}
                        onClick={onDeleteBookmarkClick}
                    >
                        <img alt="Delete Forever Icon" id="deleteForever-png" src="../src/assets/deleteForever.png" />
                    </Button>
                </Modal.Footer>
            </Modal>
    );
}
export default EditBookmark;
