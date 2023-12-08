import {useEffect, useRef, useState} from 'react';
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
    const tempBookmark = useRef<BookmarkDTO | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
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


    const handleSaveChanges = () => {
        // Überprüfen Sie, ob das ausgewählte Lesezeichen nicht null ist und "_id" hat
        if (selectedBookmark && selectedBookmark._id) {
            axios.put(`/api/bookmarks/edit/${selectedBookmark._id}`, selectedBookmark)
                .then(response => {
                    // Hier können Sie entsprechende Logik für den Erfolgsfall implementieren
                    console.log('Bookmark updated successfully:', response.data);
                    setShowEditModal(false); // Schließen Sie das Edit-Modal nach dem Speichern
                })
                .catch(error => {
                    // Hier können Sie die Logik für den Fehlerfall implementieren
                    console.error('Error updating bookmark:', error);
                });
        } else {
            console.error('Selected bookmark is null or does not have an _id:', selectedBookmark);
        }
    };


    const handleInputChange = (field: string, value: string, bookmark: BookmarkDTO | null) => {
        if (!bookmark) {
            console.warn('Trying to update a null or undefined bookmark.');
            return;
        }
        const updatedBookmark: BookmarkDTO = {
            ...bookmark,
            [field]: value,
        };
        setSelectedBookmark(updatedBookmark);
        tempBookmark.current = updatedBookmark;
    };

    const handleDeleteBookmark = (bookmark: BookmarkDTO | null) => {
        // Verwende optional chain expression
        if (bookmark?.id) {
            axios
                .delete(`/api/bookmarks/delete/${bookmark.id}`)
                .then(response => {
                    console.log('Bookmark deleted successfully:', response.data);
                    setShowEditModal(false); // Schließe das Edit-Modal nach dem Löschen
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
                    onSelect={() => {
                        setSelectedBookmark(bookmark); // Setzt den ausgewählten Bookmark
                        setShowEditModal(true); // Öffnet das Edit-Modal
                    }}
                >
                    <Dropdown.Item eventKey={`${bookmark.url}/edit`} >
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={`${bookmark.url}/delete`} >
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
                    showEditModal={showEditModal}
                    handleCloseModalEdit={() => setShowEditModal(false)}
                    handleInputChange={(field, value) => { handleInputChange(field, value, selectedBookmark) }}
                    handleSaveChanges={() => { tempBookmark.current && handleSaveChanges(tempBookmark.current) }}
                    handleDeleteBookmark={(bookmark) => {
                        handleDeleteBookmark(bookmark);
                        setSelectedBookmark(null);
                    }}
                    selectedBookmark={selectedBookmark}
                 isDeleting/>
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

