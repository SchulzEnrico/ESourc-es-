import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, InputGroup, Button } from "react-bootstrap";
import {BookmarkDTO, GetMoreProps} from "../types/types.ts";
import { IoClose } from "react-icons/io5";


function GetMore({ show, onClose, destination, setDestination }: Readonly<GetMoreProps>) {
    const [url, setUrl] = useState("");
    const [dropdownCategory, setDropdownCategory] = useState("");
    const [tags, setTags] = useState("");
    const [title, setTitle] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [availableCategories, setAvailableCategories] = useState<{ key: string; category: string; }[]>([]);

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
                        category: bookmark.dropdownCategory
                    }));
                    const uniqueCategories = Array.from(new Set(categories.map(category => category.key)))
                        .map(key => categories.find(category => category.key === key))
                        .filter(category => category); // Filtern von undefinierten Werten
                    setAvailableCategories(uniqueCategories);
                    console.log("Available categories fetched successfully"); // Erfolgsmeldung hinzufügen
                } else {
                    console.error("Invalid data received from the API:", response.data);
                    setAvailableCategories([]);
                }
            } catch (error) {
                console.error("Error fetching available categories:", error);
                setAvailableCategories([]);
            }
        };

        fetchAvailableCategories();
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const showErrorNotification = (message: string) => {
            alert(message);
        };

        const newBookmarkDTO = {
            url: url,
            destination: destination,
            dropdownCategory: dropdownCategory || newCategory,
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

    return (
        <div className={`get-more ${show ? 'show' : 'hide'} dropdown-container`}>
            <Button
                data-tooltip="Close window"
                className={"close-btn-GetMore tooltip-btn tt_n"}
                onClick={onClose}
                aria-label="Close window"
                name="Close"
            >
                <IoClose title={"close"} className={"close-icon"}/>
            </Button>
            <p className={"instructions engrave"}>A NEW BOOKMARK? ...fill in these fields!</p>
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
                        <option value="external">EXTERNAL WINDOW</option>
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
                        onChange={(event) => setDropdownCategory(event.target.value)}
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
                        onChange={(event) => setNewCategory(event.target.value)}  // Füge diese Zeile hinzu
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
                <Button data-tooltip={"Save your bookmark"}
                        type="submit"
                        className="submit save-bookmark-btn tooltip-btn tt_n">
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
