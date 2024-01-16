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
import {TiPlus} from "react-icons/ti";
import {MdOutlineSettings} from "react-icons/md";

const Navigation: React.FC<NavigationProps> = ({ onLinkClick, panelName, isExternal, showModal, closeModal }) => {
    const tempBookmark = useRef<BookmarkDTO | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [bookmarks, setBookmarks] = useState<BookmarkDTO[]>([]);
    const [showGetMore, setShowGetMore] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [selectedBookmark, setSelectedBookmark] = useState<BookmarkDTO | null>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [currentNavigation, setCurrentNavigation] = useState("default");
    const [destination, setDestination] = useState("default");

    const getAvailableCategories = (): string[] => {
        return Array.from(
            new Set(
                bookmarks
                    .filter((bookmark) => isExternal ? bookmark.destination === "external" : bookmark.destination === panelName)
                    .map((bookmark) => bookmark.dropdownCategory)
            )
        );
    };

    const loadBookmarks = () => {
        axios.get<BookmarkDTO[]>('/api/bookmarks/getAll')
            .then((response) => {
                setBookmarks(response.data);
            })
            .catch(error =>
                console.error("Error retrieving bookmarks:", error)
            );
    };

    const openLink = (url: string, destination: string) => {
        destination === "external" ? window.open(url, '_blank') : onLinkClick?.(url);
        closeModal();
    };

    const openEditModal = (bookmark: BookmarkDTO) => {
        setSelectedBookmark(bookmark);
        setShowEditModal(true);
        document.body.style.overflow = 'hidden';
    };

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        variant: 'success'
    });

    const handleGetMoreClick = () => {
        setShowGetMore(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setShowGetMore(false);
        document.body.style.overflow = 'auto';
        loadBookmarks();
    };

    const handleCloseModalEdit = () => {
        setShowEditModal(false);
        setShowSuccessPopup(false);
        document.body.style.overflow = 'auto';
    };

    const handleSaveChanges = () => {
        if (selectedBookmark?._id) {
            console.log('Starting to update the bookmark...');
            axios.put(`/api/bookmarks/edit/${selectedBookmark._id}`, selectedBookmark)
                .then(response => {
                    console.log('Bookmark updated successfully:', response.data);
                    setShowSuccessPopup(true);
                    setShowEditModal(false);
                    document.body.style.overflow = 'auto';
                    loadBookmarks();
                    setTimeout(() => setShowSuccessPopup(false), 1500);
                })
                .catch(error => {
                    console.error('Error updating bookmark:', error);
                    // Hier können Sie auch einen Fehler-Popup anzeigen
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
                setShowSuccessPopup(true);
                setShowEditModal(false);
                loadBookmarks();
                document.body.style.overflow = 'auto';
                setTimeout(() => setShowSuccessPopup(false), 1500);
            })
            .catch(error => {
                console.error('Error deleting bookmark:', error);
                // Hier können Sie auch einen Fehler-Popup anzeigen
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

    useEffect(() => {
        console.log("Current Navigation in Navigation:", currentNavigation);
        // Weitere Logs oder Code hier, um sicherzustellen, dass currentNavigation korrekt aktualisiert wird
    }, [currentNavigation]);

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
                    <MdOutlineSettings title={"Edit bookmark"} className={"settings-icon"} />
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
                        <TiPlus title={"Add a new Bookmark"} className={"add-icon"}/>
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
                    showSuccessPopup={showSuccessPopup}
                />
            </ButtonGroup>
        );
    };

    return (
        <Modal className={"navigation-modal"} show={showModal} onHide={closeModal}>
            <>
                {renderDropdowns()}
                {alert.open && (
                    <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, open: false })} dismissible>
                        {alert.message}
                    </Alert>
                )}
                <Modal show={showGetMore} onHide={handleCloseModal}>
                    <GetMore
                        onClose={handleCloseModal}
                        show={showSuccessPopup}
                        getAvailableCategories={getAvailableCategories}
                        destination={destination}
                        setDestination={setDestination}
                        setCurrentNavigation={setCurrentNavigation}
                    />
                </Modal>
            </>
        </Modal>
    );
}

export default Navigation;