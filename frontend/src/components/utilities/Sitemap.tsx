import React from "react";
import { Button, Modal } from "react-bootstrap";
import { BookmarkDTO, DestinationOrder, SitemapProps } from "../types/types.ts";
import '../../css/Sitemap.css';

const Sitemap: React.FC<SitemapProps> = ({ show, onHide, bookmarks }) => {
    const destinationOrder: DestinationOrder = {
        "external": "EXTERNAL: opens in a new browser tab",
        'ins_pro': 'INSPIRATIONS  ~  PROJECTS',
        'snip_gen': 'SNIPPETS  ~  GENERATORS',
        'development': 'DEVELOPMENT  ~  EDITING  ~  CREATION',
        'know_guide': 'KNOWLEDGE  ~  GUIDELINES',
        'lip_doc': 'LIBRARIES  ~  DOCUMENTATIONS',
        'project': 'PROJECT MANAGEMENT  ~  TOOLS',
        'personal': 'PERSONALLY  ~  INDIVIDUAL',
    };

    const sortedBookmarks = bookmarks.sort((a, b) => {
        const orderA = Object.keys(destinationOrder).indexOf(a.destination);
        const orderB = Object.keys(destinationOrder).indexOf(b.destination);
        return orderA - orderB;
    });

    const renderSitemapItems = () => {
        const groupedBookmarks: { [destination: string]: { [category: string]: BookmarkDTO[] } } = {};
        sortedBookmarks.forEach((bookmark) => {
            const destination = destinationOrder[bookmark.destination];
            const category = bookmark.dropdownCategory;
            if (!groupedBookmarks[destination]) {
                groupedBookmarks[destination] = {};
            }
            if (!groupedBookmarks[destination][category]) {
                groupedBookmarks[destination][category] = [];
            }
            groupedBookmarks[destination][category].push(bookmark);
        });

        return Object.entries(groupedBookmarks).map(([destination, categories]) => (
            <React.Fragment key={destination}>
                <tr className="destination-header">
                    <th colSpan={4}>{destination}</th>
                </tr>
                {Object.entries(categories).map(([category, bookmarks]) => (
                    <React.Fragment key={`${destination}-${category}`}>
                        <tr className={"sitemap-dropdownCategory-marker"}>
                            <th colSpan={4}>{category}</th>
                        </tr>
                        {bookmarks.map((bookmark) => (
                            <tr key={bookmark._id}>
                                <td>{bookmark.target}</td>
                                <td>{bookmark.tags?.join(", ")}</td>
                                <td>{bookmark.url}</td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </React.Fragment>
        ));
    };

    return (
        <Modal className={"sitemap-modal dropdown-container"} show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Header>
            <Modal.Body>
                <table>
                    <tbody>
                    {renderSitemapItems()}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default Sitemap;
