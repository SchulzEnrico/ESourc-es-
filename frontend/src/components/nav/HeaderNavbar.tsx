import '../../index.css';
import { useEffect, useState } from "react";

import axios from "axios";
import { BookmarkDTO } from "../types/types.ts";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

function HeaderNavbar() {
    const [bookmarks, setBookmarks] = useState<BookmarkDTO[]>([]);

    useEffect(() => {
        axios.get(`/api/bookmarks/getAll`)
            .then((response): void => {
                setBookmarks(response.data);
            })
            .catch(error =>
                console.error("Error fetching bookmarks:", error)
            );
    }, []);

    const renderDropdowns = () => {
        const categories = new Map();

        bookmarks.forEach((bookmark) => {
            const { bookmarkDropdownCategory, links } = bookmark;

            if (!categories.has(bookmarkDropdownCategory)) {
                categories.set(bookmarkDropdownCategory, []);
            }

            if (links && links.length > 0) {
                categories.get(bookmarkDropdownCategory).push(...links);
            }
        });

        return Array.from(categories).map(([category, links]) => (
            <NavDropdown title={category} id={`navbarDropdown${category}`} key={category}>
                {links.map((link: { id: string, bookmarkUrl: string, bookmarkName: string }) => (
                    <NavDropdown.Item key={link.id} href={link.bookmarkUrl} target="_blank">
                        {link.bookmarkName}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        ));
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="sm">
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="mr-auto">
                        {renderDropdowns()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default HeaderNavbar;
