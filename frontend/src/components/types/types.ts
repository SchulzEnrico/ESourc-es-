export type BookmarkDTO = {
    _id: string;
    url: string;
    destination: string;
    target: string;
    dropdownCategory: string;
    title: string;
    tags?: string[];
    links: LinkParameters[];
};

export type LinkParameters = {
    _id: string;
    url: string;
    destination: string;
    target: string;
    name: string;
    tags: string;
};

export type GetMoreProps ={
    show: boolean;
    onClose: () => void;
}
export type EditBookmarkProps = {
    showEditModal: boolean;
    handleCloseModalEdit: () => void;
    handleInputChange: (field: string, value: string) => void;
    handleSaveChanges: () => void;
    handleDeleteBookmark: (bookmark: BookmarkDTO | null) => void;
    selectedBookmark: BookmarkDTO | null;
};

export type PanelProps = {
    className: string;
}

export type NavigationProps = {
    onLinkClick?: (url: string) => void;
    panelName?: string;
    isExternal: boolean;
};

export type HeaderProps = {
    bookmarks: BookmarkDTO[];
    loadBookmarks: () => void;
};
