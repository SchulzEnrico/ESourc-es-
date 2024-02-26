import React from "react";
import { Button, Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { BookmarkDTO, DestinationOrder, SitemapProps } from "../types/types.ts";
import '../../css/Sitemap.css';

const Sitemap: React.FC<SitemapProps> = ({ show, onHide, bookmarks }) => {
    const destinationOrder: DestinationOrder = {
        "external": 'EXTERNAL: opens in a new browser tab',
        'ins_pro': 'INSPIRATIONS  ~  PROJECTS: opens in iframe destination',
        'snip_gen': 'SNIPPETS  ~  GENERATORS: opens in iframe destination',
        'development': 'DEVELOPMENT  ~  EDITING  ~  CREATION: opens in iframe destination',
        'know_guide': 'KNOWLEDGE  ~  GUIDELINES: opens in iframe destination',
        'lip_doc': 'LIBRARIES  ~  DOCUMENTATIONS: opens in iframe destination',
        'project': 'PROJECT MANAGEMENT  ~  TOOLS: opens in iframe destination',
        'personal': 'PERSONALLY  ~  INDIVIDUAL: opens in iframe destination',
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

        return (
            <tbody className="destination-section"> {/* Verschieben Sie die Klasse auf dieser Ebene */}
            {Object.entries(groupedBookmarks).map(([destination, categories]) => (
                <React.Fragment key={destination}>
                    <tr className={"destination-marker engrave"}>
                        <th colSpan={4}>{destination}</th>
                    </tr>
                    {Object.entries(categories).map(([category, bookmarks]) => (
                        <React.Fragment key={`${destination}-${category}`}>
                            <tr>
                                <th colSpan={4} className={"sitemap-dropdownCategory-marker emboss"}>{category}</th>
                            </tr>
                            {bookmarks.map((bookmark) => (
                                <tr key={bookmark._id} className={"category-group"}>
                                    <td colSpan={4}>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>{bookmark.target}</td>
                                                <td>{bookmark.title}</td>
                                                <td>{bookmark.tags?.join(", ")}</td>
                                                <td>{bookmark.url}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </React.Fragment>
            ))}
            </tbody>
        );
    };

    return (
        <Modal
            className={"sitemap-modal dropdown-container"}
            show={show}
            onHide={onHide}
            dialogClassName="modal-90w"
            centered
        >
            <Modal.Header className={"sitemap-header-background emboss"}>
                <div className={"sitemap-header-headline emboss"}>
                    Sitemap
                </div>
                <Button className={"sitemap-close-btn"} variant="secondary" onClick={onHide}>
                    <IoClose title={"close"} className={"close-icon"} />
                </Button>
            </Modal.Header>
            <div className={"table-border modal-scroll-body shadow--sunken"}>
                <Modal.Body>
                    <table>
                        <tbody className="table-content">{renderSitemapItems()}</tbody>
                    </table>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default Sitemap;