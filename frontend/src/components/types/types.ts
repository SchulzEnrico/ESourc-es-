export type BookmarkDTO = {
    id: string;
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
