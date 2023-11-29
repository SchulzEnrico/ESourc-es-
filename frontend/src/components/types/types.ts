export type BookmarkDTO = {
    id: string;
    url: string;
    dropdownCategory: string;
    name: string;
    title: string;
    links: Link[];
};

export type Link = {
    id: string;
    name: string;
    url: string;
    title: string;
};
