import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, InputGroup, Button } from "react-bootstrap";
import { BookmarkDTO, GetMoreProps } from "../types/types.ts";
import { IoClose } from "react-icons/io5";

function GetMore({
                     show,
                     onClose,
                     destination,
                     setDestination,
                 }: Readonly<GetMoreProps>) {
    const [url, setUrl] = useState("");
    const [dropdownCategory, setDropdownCategory] = useState("");
    const [dropdownIndex, setDropdownIndex] = useState("");
    const [tags, setTags] = useState("");
    const [title, setTitle] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [availableCategories, setAvailableCategories] = useState<{ key: string; category: string }[]>([]);
    const [bookmarks, setBookmarks] = useState<BookmarkDTO[]>([]);

    useEffect(() => {
        setDropdownCategory(destination);
    }, [destination]);

    useEffect(() => {
        const fetchAvailableCategories = async () => {
            try {
                const response = await axios.get<BookmarkDTO[]>(`api/bookmarks/getAll`);
                if (response.data && Array.isArray(response.data)) {
                    const categories = response.data.map((bookmark) => ({
                        key: bookmark.url,
                        category: bookmark.dropdownCategory,
                        destination: bookmark.destination,
                    }));

                    // Filtern nach der ausgewählten Destination
                    const filteredCategories = categories.filter(
                        (category) => category.destination === destination
                    );

                    // Entfernen doppelter Kategorien
                    const uniqueCategories = Array.from(
                        new Set(filteredCategories.map((category) => category.category))
                    ).map((category) => {
                        const foundCategory = filteredCategories.find(
                            (cat) => cat.category === category
                        );
                        if (foundCategory) {
                            return {
                                key: foundCategory.key,
                                category: category,
                            };
                        }
                        return null;
                    }).filter((category) => category !== null) as { key: string; category: string }[];
                    setAvailableCategories(uniqueCategories);
                    console.log("Available categories fetched successfully");
                } else {
                    console.error("Invalid data received from the API:", response.data);
                    setAvailableCategories([]);
                }
            } catch (error) {
                console.error(
                    "Error fetching available categories:",
                    error
                );
                setAvailableCategories([]);
            }
        };

        const fetchBookmarks = async () => {
            try {
                const response = await axios.get<BookmarkDTO[]>(`api/bookmarks/getAll`);
                if (response.data && Array.isArray(response.data)) {
                    setBookmarks(response.data);
                    console.log("Bookmarks fetched successfully");
                } else {
                    console.error("Invalid data received from the API:", response.data);
                    setBookmarks([]);
                }
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
                setBookmarks([]);
            }
        };

        fetchAvailableCategories().catch((error) =>
            console.error("Error in fetchAvailableCategories:", error)
        );
        fetchBookmarks().catch((error) =>
            console.error("Error in fetchBookmarks:", error)
        );
    }, [destination]);

    // Ändern Sie die handleSubmit-Funktion, um dropdownCategory basierend auf newCategory zu setzen
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Dropdown Index:", dropdownIndex); // Fügen Sie diese Zeile hinzu
        console.log("Bookmark DTO:", {
            url,
            destination,
            dropdownCategory,
            dropdownIndex,
            tags,
            title,
        });

        const showErrorNotification = (message: string) => {
            alert(message);
        };

        const adjustedDropdownIndex = adjustDropdownIndex(dropdownIndex, bookmarks);

        const newBookmarkDTO = {
            url: url,
            destination: destination,
            dropdownCategory: newCategory || dropdownCategory, // Hier ändern
            dropdownIndex: adjustedDropdownIndex,
            tags: tags.split(/[, .#/]+/),
            title: title,
        };

        axios
            .post("api/bookmarks/add", newBookmarkDTO)
            .then(() => {
                setUrl("");
                setDestination("");
                setDropdownCategory("");
                setNewCategory("");
                setDropdownIndex("");
                setTags("");
                setTitle("");
                setShowSuccessPopup(true);
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    showErrorNotification(error.response.data);
                } else {
                    showErrorNotification("Something went wrong");
                }
            });
    };

    // Setzen Sie den Dropdown-Wert basierend auf vorhandener Kategorie oder neuer Kategorie
    useEffect(() => {
        if (availableCategories.some(category => category.category === dropdownCategory)) {
            // Wenn die aktuelle Dropdown-Kategorie eine vorhandene Kategorie ist
            setDropdownCategory(dropdownCategory);
        } else {
            // Wenn die aktuelle Dropdown-Kategorie eine neue Kategorie ist
            setDropdownCategory(newCategory);
        }
    }, [availableCategories, dropdownCategory, newCategory]);

    // Function to adjust dropdownIndex to ensure uniqueness
    const adjustDropdownIndex = (index: string, bookmarks: BookmarkDTO[]): string => {
        // Überprüfen, ob der bereitgestellte Index bereits verwendet wird
        const isIndexUsed = bookmarks.some(bookmark => bookmark.dropdownIndex === index);

        // Wenn der Index bereits verwendet wird, die anderen Indexnummern entsprechend anpassen
        if (isIndexUsed) {
            const usedIndexes = bookmarks
                .filter(bookmark => bookmark.dropdownIndex !== index) // Exclude the current bookmark
                .map(bookmark => parseInt(bookmark.dropdownIndex))
                .sort((a, b) => a - b);

            let newIndex = parseInt(index);
            for (const usedIndex of usedIndexes) {
                if (newIndex <= usedIndex) newIndex++; // Increment newIndex for every usedIndex greater than or equal to newIndex
            }

            // Aktualisiere die Indexnummern aller nachfolgenden Elemente
            for (const bookmark of bookmarks) {
                if (parseInt(bookmark.dropdownIndex) >= newIndex) {
                    bookmark.dropdownIndex = (parseInt(bookmark.dropdownIndex) + 1).toString();
                }
            }

            return newIndex.toString();
        }
        // Wenn der Index nicht verwendet wird, einfach den bereitgestellten Index zurückgeben
        return index;
    };

    return (
        <div className={`get-more ${show ? "show" : "hide"} dropdown-container`}>
            <Button
                data-tooltip="Close window"
                className={"close-btn-GetMore tooltip-btn tt_n"}
                onClick={onClose}
                aria-label="Close window"
                name="Close"
            >
                <IoClose title={"close"} className={"close-icon"} />
            </Button>
            <p className={"instructions engrave"}>
                A NEW BOOKMARK? ...fill in these fields!
            </p>
            <Form className={"form-proportions"} onSubmit={handleSubmit}>
                <InputGroup className="container-fluid md-3 d-flex justify-content-between">
                    <Form.Label className={"input-label"}>URL</Form.Label>
                    <Form.Control
                        className="form-control-custom shadow--inset"
                        placeholder="paste URL"
                        aria-label="paste URL"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                    <Form.Label className={"input-label"}>DESTINATION</Form.Label>
                    <Form.Select
                        className="form-control-custom select-field shadow--inset"
                        aria-label="pick a existing destination"
                        value={destination}
                        onChange={(event) => setDestination(event.target.value)}
                    >
                        <option>pick a existing destination</option>
                        <option value="external">EXTERNAL: opens in a new browser tab</option>
                        <option value="ins_pro">INSPIRATIONS ~ PROJECTS</option>
                        <option value="snip_gen">SNIPPETS ~ GENERATORS</option>
                        <option value="development">DEVELOPMENT ~ EDITING ~ CREATION</option>
                        <option value="know_guide">KNOWLEDGE ~ GUIDELINES</option>
                        <option value="lip_doc">LIBRARIES ~ DOCUMENTATIONS</option>
                        <option value="project">PROJECT MANAGEMENT ~ TOOLS</option>
                        <option value="personal">PERSONALLY ~ INDIVIDUAL</option>
                    </Form.Select>
                    <Form.Label className={"input-label"}>DROPDOWN CATEGORY</Form.Label>
                    <Form.Control
                        as="select"
                        className="form-control-custom select-field shadow--inset"
                        aria-label="pick a existing dropdown category"
                        value={dropdownCategory}
                        onChange={(event) => {
                            const selectedCategory = event.target.value;
                            if (availableCategories.some(category => category.category === selectedCategory)) {
                                setDropdownCategory(selectedCategory);
                            } else {
                                setNewCategory(selectedCategory);
                            }
                        }}
                    >
                        <option>pick a existing dropdown category</option>
                        {availableCategories.map((category) => (
                            <option key={category.key} value={category.category}>
                                {category.category}
                            </option>
                        ))}
                    </Form.Control>

                    <Form.Label className={"input-label"}>NEW CATEGORY</Form.Label>
                    <Form.Control
                        className="form-control-custom shadow--inset"
                        placeholder="create a new dropdown category"
                        aria-label="create a new dropdown category"
                        value={newCategory}
                        onChange={(event) => setNewCategory(event.target.value)}
                    />
                    <Form.Label className={"input-label"}>POSITION</Form.Label>
                    <Form.Control
                        className="form-control-custom shadow--inset"
                        placeholder="define the position"
                        aria-label="define the position"
                        value={dropdownIndex}
                        onChange={(event) => setDropdownIndex(event.target.value)}
                    />
                    <Form.Label className={"input-label"}>IDENTIFIER</Form.Label>
                    <Form.Control
                        className="form-control-custom shadow--inset"
                        placeholder="define a menu item identifier"
                        aria-label="define a menu item identifier"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <Form.Label className={"input-label"}>CONTENT TAGS</Form.Label>
                    <Form.Control
                        className="form-control-custom shadow--inset"
                        placeholder="add here some content tags, topics and use cases"
                        aria-label="add here some content tags, topics and use cases"
                        value={tags}
                        onChange={(event) => setTags(event.target.value)}
                    />
                </InputGroup>
                <Button
                    data-tooltip={"Save your bookmark"}
                    type="submit"
                    className="submit save-bookmark-btn tooltip-btn tt_n"
                >
                    Save your bookmark
                </Button>
            </Form>
            {showSuccessPopup && (
                <div className="success-popup">Bookmark successfully added!</div>
            )}
        </div>
    );
}

export default GetMore;
