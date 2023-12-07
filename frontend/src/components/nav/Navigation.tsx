import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    DropdownButton,
    Dropdown,
    ButtonGroup,
    Modal,
    Button,
    SplitButton,
} from 'react-bootstrap';
import { BookmarkDTO } from '../types/types.ts';
import '../../index.css';
import GetMore from '../header/GetMore.tsx';
import './EditBookmark.tsx'
import EditBookmark from "./EditBookmark";


function Navigation() {
    const [bookmarks, setBookmarks] = useState<BookmarkDTO[]>([]);
    const [showGetMore, setShowGetMore] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [selectedBookmark, setSelectedBookmark] = useState<BookmarkDTO | null>(null);

    const handleGetMoreClick = () => {
        setShowGetMore(true);
    };

    const handleCloseModal = () => {
        setShowGetMore(false);
    };

    const handleSaveChanges = (bookmark: BookmarkDTO) => {
        axios.put(`/api/bookmarks/edit/${bookmark.id}`, bookmark)
            .then(response => {
                // Hier kannst du entsprechende Logik für den Erfolgsfall implementieren
                console.log('Bookmark updated successfully:', response.data);
            })
            .catch(error => {
                // Hier kannst du Logik für den Fehlerfall implementieren
                console.error('Error updating bookmark:', error);
            });
    };

    const handleInputChange = (field: string, value: string, bookmark: BookmarkDTO | null, setSelectedBookmark: React.Dispatch<React.SetStateAction<BookmarkDTO | null>>) => {
        if (!bookmark) {
            console.warn('Trying to update a null or undefined bookmark.');
            return;
        }
        const updatedBookmark: BookmarkDTO = {
            ...bookmark,
            [field]: value,
        };
        setSelectedBookmark(updatedBookmark);
    };

    const handleDeleteBookmark = (bookmark: BookmarkDTO | null) => {

        if (bookmark && bookmark.id) {
            axios.delete(`/api/bookmarks/delete/${bookmark.id}`)
                .then(response => {

                    console.log('Bookmark deleted successfully:', response.data);

                })
                .catch(error => {

                    console.error('Error deleting bookmark:', error);
                });
        } else {
            console.warn('Trying to delete a null or undefined bookmark.');
        }
    };

    useEffect(() => {
        axios.get<BookmarkDTO[]>('/api/bookmarks/getAll')
            .then((response) => {
                setBookmarks(response.data);
            })
            .catch(error =>
                console.error("Error retrieving bookmarks:", error)
            );
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderDropdownItems = (category: string) => {
        return bookmarks
            .filter((bookmark) => bookmark.dropdownCategory === category)
            .map((bookmark) => (
                <SplitButton
                    className={"dropdown-item"}
                    id={"split-button-basic-secondary"}
                    key={bookmark.url}
                    title={bookmark.title}
                    href={bookmark.url}
                    target={bookmark.destination}
                    onSelect={() => setSelectedBookmark(bookmark)} // Setzt den ausgewählten Bookmark
                >
                    <Dropdown.Item eventKey={`${bookmark.url}-edit`} >
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={`${bookmark.url}-delete`} >
                        Delete
                    </Dropdown.Item>
                </SplitButton>
            ));
    };



    const renderDropdowns = () => {
        const uniqueCategories = Array.from(new Set(bookmarks.map((bookmark) => bookmark.dropdownCategory)));

        return (
            <ButtonGroup className={isMobile ? "nav-group-mobile" : "nav-group"}>
                {isMobile && (
                    <Button title={"Add a new Bookmark to your collection"} variant="primary" className={"get-more-button"} onClick={handleGetMoreClick}>
                        <img alt="Add Icon" id="add-png" src="../src/assets/add.png" />
                    </Button>
                )}
                {!isMobile &&
                    uniqueCategories.map((category) => (
                        <DropdownButton
                            as={ButtonGroup}
                            key={category}
                            id={`dropdown-variants-${category}`}
                            variant="secondary"
                            title={category}
                            drop={"down"}
                        >
                            <div className={"dropdown-container"}>
                                {renderDropdownItems(category)}
                            </div>
                        </DropdownButton>
                    ))}
                {!isMobile && (
                    <Button title={"Add a new Bookmark to your collection"} variant="primary" className={"get-more-button"} onClick={handleGetMoreClick}>
                        <img alt="Add Icon" id="add-png" src="../src/assets/add.png" />
                    </Button>
                )}
                <EditBookmark
                    showEditModal={true}
                    handleCloseModalEdit={() => setSelectedBookmark(null)}
                    handleInputChange={(field, value) => handleInputChange(field, value, selectedBookmark, setSelectedBookmark)}
                    handleSaveChanges={() => handleSaveChanges(selectedBookmark as BookmarkDTO)}
                    handleDeleteBookmark={(bookmark) => {
                        handleDeleteBookmark(bookmark);
                        setSelectedBookmark(null);
                    }}
                    selectedBookmark={selectedBookmark}
                />
            </ButtonGroup>
        );
    };
    return (
        <>
            {renderDropdowns()}
            <Modal show={showGetMore} onHide={handleCloseModal}>
                <GetMore onClose={handleCloseModal}  show/>
            </Modal>
        </>
    );
}

export default Navigation;

