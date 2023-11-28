export type BookmarkDTO = {
    id: string;
    bookmarkUrl: string;
    bookmarkDropdownCategory: string;
    bookmarkName: string;
    bookmarkTitleAndTags: string;
    links: Link[];
};

export type Link = {
    id: string;
    bookmarkName: string;
    bookmarkUrl: string;
    bookmarkTitleAndTags: string;
};
