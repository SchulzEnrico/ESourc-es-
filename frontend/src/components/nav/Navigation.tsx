import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {
    DropdownButton,
    ButtonGroup,
    Modal,
    Button,
    Alert,
} from 'react-bootstrap';
import '../../index.css';
import GetMore from '../header/GetMore.tsx';
import './EditBookmark.tsx'
import EditBookmark from "./EditBookmark";
import {NavigationProps, BookmarkDTO} from "../types/types.ts";


const Navigation: React.FC<NavigationProps> = ({ onLinkClick, panelName, isExternal }) => {
    const tempBookmark = useRef<BookmarkDTO | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [bookmarks, setBookmarks] = useState<BookmarkDTO[]>([]);
    const [showGetMore, setShowGetMore] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [selectedBookmark, setSelectedBookmark] = useState<BookmarkDTO | null>(null);

    const loadBookmarks = () => {
        console.log('Loading bookmarks...');  // Neu hinzugefügt
        axios.get<BookmarkDTO[]>('/api/bookmarks/getAll')
            .then((response) => {
                setBookmarks(response.data);
                console.log('Bookmarks loaded:', response.data);
            })
            .catch(error =>
                console.error("Error retrieving bookmarks:", error)
            );
    };


    const openLink = (url: string, destination: string) => {
        destination === "external" ? window.open(url, '_blank') : onLinkClick?.(url);
    };

    const openEditModal = (bookmark: BookmarkDTO) => {
        setSelectedBookmark(bookmark);
        setShowEditModal(true);
        document.body.style.overflow = 'hidden';  // Neu hinzugefügt
    };

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        variant: 'success'
    });

    const showAlert = (message: string, variant: string = 'success') => {
        setAlert({ open: true, message, variant });
        setTimeout(() => setAlert({ ...alert, open: false }), 1500); // Auto close the alert after 3 seconds
    }


    const handleGetMoreClick = () => {
        setShowGetMore(true);
        document.body.style.overflow = 'hidden';  // Neu hinzugefügt
    };

    const handleCloseModal = () => {
        setShowGetMore(false);
        document.body.style.overflow = 'auto';
        loadBookmarks();
    };

    const handleCloseModalEdit = () => {
        setShowEditModal(false);
        document.body.style.overflow = 'auto';  // Neu hinzugefügt
    };

    const handleSaveChanges = () => {
        if (selectedBookmark?._id) {
            console.log('Starting to update the bookmark...');  // Neu
            axios.put(`/api/bookmarks/edit/${selectedBookmark._id}`, selectedBookmark)
                .then(response => {
                    console.log('Bookmark updated successfully:', response.data);
                    showAlert('Bookmark updated successfully');
                    setShowEditModal(false);
                    document.body.style.overflow = 'auto';
                    console.log('Going to load bookmarks...');  // Neu
                    loadBookmarks();
                    console.log('Should have loaded bookmarks.');  // Neu
                })
                .catch(error => {
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

    const handleDeleteBookmark = (id: string) => {
        console.log(`Deleting bookmark with ID ${id}`);
        return axios
            .delete(`/api/bookmarks/delete/${id}`)
            .then(response => {
                console.log('Bookmark deleted successfully:', response.data);
                showAlert('Bookmark deleted successfully'); // Show success alert
                setShowEditModal(false);
                loadBookmarks();
                document.body.style.overflow = 'auto'; // Neu hinzugefügt
            });
    };

    useEffect(() => {
        loadBookmarks();
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
        const relatedBookmarks = bookmarks.filter(bookmark => bookmark.dropdownCategory === category && (isExternal ? bookmark.destination === "external" : bookmark.destination === panelName));

        return relatedBookmarks.map((bookmark) => (
            <div className="dropdown-button-container" key={bookmark.url}>
                <Button
                    className="dropdown-item"
                    target={bookmark.target}
                    onClick={() => openLink(bookmark.url, bookmark.destination)}
                >
                    {bookmark.title}
                </Button>
                <Button
                    className={"dropdown-item dropdown-edit"}
                    onClick={() => openEditModal(bookmark)}
                >
                    <img alt="Settings icon" id="settings-png" src="../../src/assets/settings.png"/>
                </Button>
            </div>
        ));
    };

    const renderDropdowns = () => {
        const uniqueCategories = Array.from(
            new Set(
                bookmarks
                    .filter((bookmark) => isExternal ? bookmark.destination === "external" : bookmark.destination === panelName)
                    .map((bookmark) => bookmark.dropdownCategory)
            )
        );

        return (
            <ButtonGroup className={isMobile ? "nav-group-mobile" : "nav-group"}>
                {!isMobile &&
                    uniqueCategories.map((category) => (
                        <DropdownButton
                            as={ButtonGroup}
                            key={category}
                            id={`dropdown-variants-${category}`}
                            variant="secondary"
                            title={category}
                            drop={isExternal ? "down-centered" : "up-centered"}
                        >
                            <div className="dropdown-container">
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
                    handleCloseModalEdit={handleCloseModalEdit}
                    handleInputChange={(field, value) => { handleInputChange(field, value, selectedBookmark) }}
                    handleSaveChanges={handleSaveChanges}
                    handleDeleteBookmark={() => {
                        if (selectedBookmark?._id) {
                            handleDeleteBookmark(selectedBookmark._id)
                                .then(() => {
                                    setSelectedBookmark(null);
                                })
                                .catch((error) => {
                                    console.error('Error deleting bookmark:', error);
                                });
                        } else {
                            console.warn('Trying to delete a null or undefined bookmark.');
                        }
                    }}
                    selectedBookmark={selectedBookmark}
                />
            </ButtonGroup>
        );
    };
    return (
        <>
            {renderDropdowns()}
            {alert.open && (
                <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, open: false })} dismissible>
                    {alert.message}
                </Alert>
            )}
            <Modal show={showGetMore} onHide={handleCloseModal}>
                <GetMore onClose={handleCloseModal}  show/>
            </Modal>

        </>
    );
}

export default Navigation;