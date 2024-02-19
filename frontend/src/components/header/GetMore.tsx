import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, InputGroup, Button } from "react-bootstrap";
import { GetMoreProps } from "../types/types.ts";
import { IoClose } from "react-icons/io5";


function GetMore({ show, onClose, destination, setDestination, getAvailableCategories }: Readonly<GetMoreProps>) {
    const [url, setUrl] = useState("");
    const [dropdownCategory, setDropdownCategory] = useState("");  // Benenne es um, wenn nötig
    const [tags, setTags] = useState("");
    const [title, setTitle] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const availableCategories = getAvailableCategories();

    useEffect(() => {
        setDropdownCategory(destination);
    }, [destination]);

    useEffect(() => {
        console.log("Before useEffect - Current Navigation:", destination);

        const switchDestination = () => {
            console.log("Switching destination based on:", destination);
            let updatedDestination = "";

            switch (destination) {
                case "ins_pro":
                case "snip_gen":
                case "development":
                case "know_guide":
                case "lip_doc":
                case "project":
                case "personal":
                    console.log("Setting destination:", destination);
                    updatedDestination = destination;
                    break;
                default:
                    console.log("Setting default destination");
                    updatedDestination = "";
                    break;
            }

            // Setze die Dropdown-Kategorie basierend auf der neuen destination
            setDropdownCategory(updatedDestination);
            setNewCategory(""); // Setze die Dropdown-Kategorie zurück
        };

        switchDestination(); // Rufe die Funktion direkt auf, um das Problem mit der Verzögerung zu umgehen

    }, [destination]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const showErrorNotification = (message: string) => {
            alert(message);
        };

        const newBookmarkDTO = {
            url: url,
            destination: destination,
            dropdownCategory: dropdownCategory || newCategory,  // Verwende die ausgewählte destination, wenn newCategory leer ist
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
            <h2 className={"introductions"}>A NEW BOOKMARK? ...fill in these fields!</h2>
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
                            <option key={category} value={category}>
                                {category}
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