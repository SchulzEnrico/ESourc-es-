export type BookmarkDTO = {
    id: string;
    bookmarkUrl: string;
    bookmarkDropdownCategory: string;
    bookmarkName: string;
    bookmarkTitle: string;
    links: Link[];
};

export type Link = {
    id: string;
    bookmarkName: string;
    bookmarkUrl: string;
    bookmarkTitle: string;
};
