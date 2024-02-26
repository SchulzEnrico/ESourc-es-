import React from "react";
import { Button, Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { BookmarkDTO, DestinationOrder, SitemapProps } from "../types/types.ts";
import '../../css/Sitemap.css';

const Sitemap: React.FC<SitemapProps> = ({ show, onHide, bookmarks }) => {
    const destinationOrder: DestinationOrder = {
        "external": '< EXTERNAL >',
        'ins_pro': '< INSPIRATIONS  /  PROJECTS >',
        'snip_gen': '< SNIPPETS  /  GENERATORS >',
        'development': '< DEVELOPMENT  ~  EDITING  ~  CREATION >',
        'know_guide': '< KNOWLEDGE  /  GUIDELINES >',
        'lip_doc': '< LIBRARIES  /  DOCUMENTATIONS >',
        'project': '< PROJECT MANAGEMENT  /  TOOLS >',
        'personal': '< PERSONALLY  /  INDIVIDUAL >',
    };

    const sortedBookmarks = (bookmarks as BookmarkDTO[]).sort((a, b) => {
        const orderA = Object.keys(destinationOrder).indexOf(a.destination);
        const orderB = Object.keys(destinationOrder).indexOf(b.destination);
        return orderA - orderB;
    });

    function selectText(element: HTMLElement | null) {
        if (!element) return;

        const range = document.createRange();
        range.selectNodeContents(element);

        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

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
            <div className="table-content shadow--ridge">
                <table className={"style-table"}>
                    <tbody>
                {Object.entries(groupedBookmarks).map(([destination, categories]) => (
                    <React.Fragment key={destination}>
                        <tr className="destination-marker emboss">
                            <th colSpan={4}>{destination}</th>
                        </tr>
                        {Object.entries(categories).map(([category, bookmarks]) => (
                            <React.Fragment key={`${destination}-${category}`}>
                                <tr>
                                    <th colSpan={4} className="sitemap-dropdownCategory-marker emboss">{category}</th>
                                </tr>
                                {bookmarks.map((bookmark) => (
                                    <tr key={bookmark._id} className="category-group">
                                        <td>
                                            <table className="bookmark-group">
                                                <tbody>
                                                <tr>
                                                    <td>{bookmark.title}</td>
                                                    <td>{bookmark.tags?.join(", ")}</td>
                                                    <td onClick={(e) => selectText(e.currentTarget as HTMLElement)}>{bookmark.url}</td>
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
                </table>
            </div>
        );
    };

    return (
        <Modal
            className="sitemap-modal dropdown-container"
            show={show}
            onHide={onHide}
            dialogClassName="modal-90w"
            centered
        >
            <Modal.Header className="sitemap-header-background emboss">
                <div className="sitemap-header-headline engrave">
                    Sitemap
                </div>
                <Button className="sitemap-close-btn" variant="secondary" onClick={onHide}>
                    <IoClose title="close" className="close-icon" />
                </Button>
            </Modal.Header>
            <div className="table-border modal-scroll-body">
                <Modal.Body>
                        {renderSitemapItems()}
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default Sitemap;
