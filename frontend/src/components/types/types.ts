export type BookmarkDTO = {
    _id: string;
    url: string;
    destination: string;
    dropdownCategory: string;
    name: string;
    title: string;
    links: LinkParameters[];
};

export type LinkParameters = {
    id: string;
    url: string;
    destination: string; // hier muss für target="" eine variable hin, die aus einem Auswahldropdown für destinations kommt
    name: string;
    title: string;
};

export type GetMoreProps ={
    show: boolean;
    onClose: () => void;
}
export type EditBookmarkProps = {
    showEditModal: boolean;
    isDeleting: boolean;
    handleCloseModalEdit: () => void;
    handleInputChange: (field: string, value: string) => void;
    handleSaveChanges: () => void;
    handleDeleteBookmark: (bookmark: BookmarkDTO | null) => void;
    selectedBookmark: BookmarkDTO | null;
};