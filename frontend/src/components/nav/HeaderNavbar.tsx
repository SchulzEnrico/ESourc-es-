import { useEffect, useState } from 'react';
import axios from 'axios';
import { DropdownButton, Dropdown, ButtonGroup, Modal, Button } from 'react-bootstrap';
import { BookmarkDTO } from '../types/types.ts';
import '../../index.css';
import GetMore from '../header/GetMore.tsx';

function HeaderNavbar() {
    const [bookmarks, setBookmarks] = useState<BookmarkDTO[]>([]);
    const [showGetMore, setShowGetMore] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleGetMoreClick = () => {
        setShowGetMore(true);
    };

    const handleCloseModal = () => {
        setShowGetMore(false);
    };

    const handleBookmarkAdded = () => {
        axios.get<BookmarkDTO[]>('/api/bookmarks/getAll')
            .then((response) => {
                setBookmarks(response.data);
            })
            .catch(error =>
                console.error("Error retrieving bookmarks:", error)
            );
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

    const renderDropdowns = () => {
        const uniqueCategories = Array.from(new Set(bookmarks.map(bookmark => bookmark.dropdownCategory)));

        return (
            <ButtonGroup className={isMobile ? "nav-group-mobile" : "nav-group"}>
                {isMobile && (
                    <Button title={"Add a new Bookmark to your collection"} variant="primary" className={"get-more-button"} onClick={handleGetMoreClick}>
                        <img alt="Add Icon" id="add-png" src="../src/assets/add.png" />
                    </Button>
                )}
                {!isMobile && uniqueCategories.map(category => (
                    <DropdownButton
                        className={"nav-button"}
                        as={ButtonGroup}
                        key={category}
                        id={`dropdown-variants-${category}`}
                        variant='secondary'
                        title={`${category}`}
                        drop={"down"}
                    >
                        <div className={"dropdown-container"}>
                            {bookmarks
                                .filter(bookmark => bookmark.dropdownCategory === category)
                                .map(bookmark => (
                                    <Dropdown.Item
                                        className={"dropdown-item"}
                                        key={bookmark.url}
                                        title={bookmark.title}
                                        href={bookmark.url}
                                        target={bookmark.target}
                                    >
                                        {bookmark.name}
                                    </Dropdown.Item>
                                ))}
                        </div>
                    </DropdownButton>
                ))}
                {!isMobile && (
                    <Button title={"Add a new Bookmark to your collection"} variant="primary" className={"get-more-button"} onClick={handleGetMoreClick}>
                        <img alt="Add Icon" id="add-png" src="../src/assets/add.png" />
                    </Button>
                )}
                <Modal show={showGetMore} onHide={handleCloseModal} dialogClassName="modal-90w">
                    <Modal.Body>
                        <GetMore onClose={handleCloseModal} onBookmarkAdded={handleBookmarkAdded} />
                    </Modal.Body>
                </Modal>
            </ButtonGroup>
        );
    };
    return (
        <nav>
            {renderDropdowns()}
        </nav>
    );
}

export default HeaderNavbar;