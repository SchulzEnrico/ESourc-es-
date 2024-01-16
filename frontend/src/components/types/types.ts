import {ResizableBoxProps} from "react-resizable";
import React from "react";

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
    tags: string[];
};

export type GetMoreProps = {
    onClose: () => void;
    show: boolean;
    getAvailableCategories: () => string[];
    destination: string;
    setDestination: React.Dispatch<React.SetStateAction<string>> | ((destination: string) => void);
    setCurrentNavigation: React.Dispatch<React.SetStateAction<string>>;
}

export type EditBookmarkProps = {
    showEditModal: boolean;
    handleCloseModalEdit: () => void;
    handleInputChange: (field: string, value: string) => void;
    handleSaveChanges: () => void;
    handleDeleteBookmark: (bookmark: BookmarkDTO | null) => void;
    selectedBookmark: BookmarkDTO | null;
    showSuccessPopup: boolean;
};

export type PanelProps = {
    className: string;
};

export type NavigationProps = {
    onLinkClick?: (url: string) => void;
    panelName?: string;
    isExternal: boolean;
    currentNavigation?: string;
    showModal: boolean;  // neu
    closeModal: () => void; // neu
};

export type HeaderProps = {
    bookmarks: BookmarkDTO[];
    loadBookmarks: () => void;
};

export type CustomResizableBoxProps = Omit<ResizableBoxProps, "width" | "height"> & {
    onResizeEnd: (size: { width: number; height: number }) => void;
    id: string;
    width: number | string;
    height: number | string;
};