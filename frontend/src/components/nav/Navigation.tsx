import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {Button, DropdownButton, Alert, Modal} from 'react-bootstrap';
import '../../index.css';
import GetMore from '../header/GetMore.tsx';
import EditBookmark from "./EditBookmark";
import { NavigationProps, BookmarkDTO } from "../types/types.ts";
import { MdOutlineSettings } from "react-icons/md";
import {TiPlus, TiThMenu} from "react-icons/ti";
import {BsBookmarksFill} from "react-icons/bs";


const Navigation: React.FC<NavigationProps> = ({onLinkClick,
                                                   panelName,
                                                   isExternal,
                                                   hoverText
                                               }) => {
    const tempBookmark = useRef<BookmarkDTO | null>(null);
    const [bookmarks, setBookmarks] = useState<BookmarkDTO[]>([]);
    const [selectedBookmark, setSelectedBookmark] = useState<BookmarkDTO | null>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showGetMore, setShowGetMore] = useState(false); // State für das GetMore-Modal
    const [currentNavigation, setCurrentNavigation] = useState("default");
    const [destination, setDestination] = useState("default");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);


    const getAvailableCategories = (): string[] => {
        return Array.from(
            new Set(
                bookmarks
                    .filter((bookmark) => isExternal ? bookmark.destination === "external" : bookmark.destination === panelName)
                    .map((bookmark) => bookmark.dropdownCategory)
            )
        );
    };

    useEffect(() => {
        getAvailableCategories(); // Verwenden Sie die Funktion direkt, um die Kategorien abzurufen
    }, [bookmarks]);

    const loadBookmarks = () => {
        axios.get<BookmarkDTO[]>('/api/bookmarks/getAll')
            .then((response) => {
                setBookmarks(response.data);
            })
            .catch(error =>
                console.error("Error retrieving bookmarks:", error)
            );
    };

    const openLink = (url: string, title: string, destination: string = "internal") => {
        destination === "external" ? window.open(url, '_blank') : onLinkClick?.(url, title, destination);
    };

    const openEditModal = (bookmark: BookmarkDTO) => {
        setSelectedBookmark(bookmark);
    };

    const handleSaveChanges = () => {
        if (selectedBookmark?._id) {
            console.log('Starting to update the bookmark...');
            axios.put(`/api/bookmarks/edit/${selectedBookmark._id}`, selectedBookmark)
                .then(response => {
                    console.log('Bookmark updated successfully:', response.data);
                    setShowSuccessPopup(true);
                    loadBookmarks();
                    setTimeout(() => setShowSuccessPopup(false), 1500);
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
                setShowSuccessPopup(true);
                loadBookmarks();
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
        console.log("Current Navigation in Navigation:", currentNavigation);
        // Weitere Logs oder Code hier, um sicherzustellen, dass currentNavigation korrekt aktualisiert wird
    }, [currentNavigation]);

    // Funktion zum Anzeigen des Dropdown-Containers und Löschen des Timeout
    const handleMouseEnter = () => {
        setDropdownOpen(true);
        if (hideTimeout !== null) {
            clearTimeout(hideTimeout); // Timeout löschen, um das Ausblenden zu verhindern
        }
    };

// Funktion zum Ausblenden des Dropdown-Containers mit einer kurzen Verzögerung
    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setDropdownOpen(false);
        }, 200); // Verzögerung von 200 Millisekunden

        setHideTimeout(timeout); // Timeout-Referenz aktualisieren
    };

    const renderDropdownItems = (category: string) => {
        const relatedBookmarks = bookmarks.filter(bookmark => bookmark.dropdownCategory === category && (isExternal ? bookmark.destination === "external" : bookmark.destination === panelName));

        return relatedBookmarks.map((bookmark) => (

            <div className="dropdown-button-container" key={bookmark.url}>
                <Button
                    className="dropdown-item"
                    target={bookmark.target}
                    onClick={() => openLink(bookmark.url, bookmark.title, bookmark.destination)}
                >
                    {bookmark.title}
                </Button>
                <Button
                    className={"dropdown-item edit-bookmark-btn"}
                    onClick={() => openEditModal(bookmark)}
                >
                    <MdOutlineSettings title={"Edit bookmark"} className={"edit-bookmark-icon"} />
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

        const dropDirection = dropdownOpen && !isExternal ? "up" : "start";

        return (
            <DropdownButton
                id="dropdown-basic-button"
                className={isExternal ? "external-links-btn tooltip-btn tt_w" : "panel-menu-btn tooltip-btn tt_n"}
                data-tooltip={isExternal ? "External Links" : hoverText}
                title={<>{isExternal ? <BsBookmarksFill/> : <TiThMenu/>}</>}
                drop={dropDirection}
                show={dropdownOpen}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={"nav-group dropdown-container shadow--inset"}>
                    {uniqueCategories.map((category) => (
                        <div key={category}
                             className={"navigation-category-column shadow--sunken"}>
                            <p className={"navigation-category engrave"}>{category}</p>
                            <ul className="dropdown-list">
                                {renderDropdownItems(category)}
                            </ul>
                        </div>
                    ))}
                </div>
                <div>
                    <Button
                        data-tooltip={"Add a new Bookmark to your collection"}
                        className={"get-more-button tooltip-btn tt_s"}
                        variant="primary"
                        onClick={() => setShowGetMore(true)}
                    >
                        <TiPlus className={"add-icon"} />
                    </Button>
                </div>
            </DropdownButton>
        );
    };

    return (
        <>

            {renderDropdowns()}

            {showSuccessPopup && (
                <Alert variant="success"
                       onClose={() => setShowSuccessPopup(false)}
                       dismissible>
                    Bookmark updated successfully!
                </Alert>
            )}
            <EditBookmark
                showEditModal={selectedBookmark !== null}
                handleCloseModalEdit={() => setSelectedBookmark(null)}
                handleInputChange={(field, value) => {
                    handleInputChange(field, value, selectedBookmark)
                }}
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
            <Modal show={showGetMore}
                   onHide={() => setShowGetMore(false)}>
                <GetMore
                    onClose={() => setShowGetMore(false)}
                    show={showSuccessPopup}
                    getAvailableCategories={getAvailableCategories}
                    destination={destination}
                    setDestination={setDestination}
                    setCurrentNavigation={setCurrentNavigation}
                />
            </Modal>
        </>
    );
}

export default Navigation;