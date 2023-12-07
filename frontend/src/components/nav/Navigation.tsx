import '../../index.css';
import { useEffect, useState } from "react";

import axios from "axios";
import { BookmarkDTO } from "../types/types.ts";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

function Navigation() {
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
            const { dropdownCategory, links } = bookmark;

            if (!categories.has(dropdownCategory)) {
                categories.set(dropdownCategory, []);
            }

            if (links && links.length > 0) {
                categories.get(dropdownCategory).push(...links);
            }
        });

        return Array.from(categories).map(([category, links]) => (
            <NavDropdown title={category} id={`navbarDropdown${category}`} key={category}>
                {links.map((link: { id: string, title: string, url: string, name: string }) => (
                    <NavDropdown.Item key={link.id} href={link.url} target="_blank">
                        {link.name}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        ));
    };

    return (
            <Navbar bg="dark" variant="dark" expand="sm">
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="mr-auto">
                        {renderDropdowns()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    );
}

export default Navigation;
