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
                className={"close-button"}
                onClick={onClose}
                aria-label="Close"
                title="Close"
                name="Close"
            >
                <IoClose title={"close"} className={"close-icon"}/>
            </Button>
            <h2 className={"introductions"}>A new bookmark?<br/>Filling in these fields!</h2>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="container-fluid md-3 d-flex justify-content-between">
                    <Form.Control
                        className="form-input-get-more shadow--ridge"
                        placeholder="URL"
                        aria-label="URL"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                    <Form.Select
                        className="form-input-get-more form-select-get-more  shadow--ridge"
                        aria-label="Destination"
                        value={destination}
                        onChange={(event) => setDestination(event.target.value)}
                    >
                        <option>select Destination</option>
                        <option value="external">external</option>
                        <option value="ins_pro">ins_pro</option>
                        <option value="snip_gen">snip_gen</option>
                        <option value="development">development</option>
                        <option value="know_guide">know_guide</option>
                        <option value="lip_doc">lip_doc</option>
                        <option value="project">project</option>
                        <option value="personal">personal</option>
                    </Form.Select>
                    <Form.Control
                        as="select"
                        className="form-input-get-more select-dropdown-category shadow--ridge"
                        aria-label="Dropdown Category"
                        value={dropdownCategory}
                        onChange={(event) => setDropdownCategory(event.target.value)}
                    >
                        <option>pick Dropdown Category</option>
                        {availableCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control
                        className="form-input-get-more shadow--ridge"
                        placeholder="create a new Category"
                        aria-label="create a new Category"
                        value={newCategory}
                        onChange={(event) => setNewCategory(event.target.value)}  // Füge diese Zeile hinzu
                    />
                    <Form.Control
                        className="form-input-get-more shadow--ridge"
                        placeholder="Title of the link"
                        aria-label="Title of the link"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <Form.Control
                        className="form-input-get-more shadow--ridge"
                        placeholder="Content tags"
                        aria-label="Content tags"
                        value={tags}
                        onChange={(event) => setTags(event.target.value)}
                    />
                    </InputGroup>
                    <Button type="submit" className="submit">
                        save bookmark
                    </Button>
            </Form>
            {showSuccessPopup && (
                <div className="success-popup">Bookmark successfully added!</div>
            )}
        </div>
);
}

export default GetMore;