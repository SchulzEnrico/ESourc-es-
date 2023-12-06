export type Link = {
    id: string;
    name: string;
    url: string;
    title: string;
    target: string;
};

export type BookmarkDTO = {
    _id: { $oid: string };
    url: string;
    dropdownCategory: string;
    name: string;
    title: string;
    target: string;
    links: Link[];
};

export type ManageBookmarksProps = {
    onClose: () => void;
}

export type GetMoreProps = {
    onClose: () => void;
    onBookmarkAdded: () => void;
}