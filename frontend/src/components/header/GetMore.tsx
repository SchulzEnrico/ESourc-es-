import { useEffect, useState } from "react";
import axios from "axios";
import { Form, InputGroup, Button, CloseButton } from "react-bootstrap";
import "./GetMore.css";
import {GetMoreProps} from "../types/types.ts";

function GetMore({ show, onClose }:Readonly<GetMoreProps>) {
    const [url, setUrl] = useState("");
    const [dropdownCategory, setDropdownCategory] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [destination, setDestination] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();

        const showErrorNotification = (message: string) => {
            alert(message);
        };

        const newBookmarkDTO = {
            url: url,
            destination: destination,
            dropdownCategory: dropdownCategory,
            name: name,
            title: title,
        };

        axios
            .post("api/bookmarks/add", newBookmarkDTO)
            .then(() => {
                setUrl("");
                setDropdownCategory("");
                setName("");
                setTitle("");
                setDestination("");
                setShowSuccessPopup(true);
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    showErrorNotification(error.response.data);
                } else {
                    showErrorNotification("Something went wrong");
                }
            });
    }

    useEffect(() => {
        if (showSuccessPopup) {
            const timeout = setTimeout(() => {
                setShowSuccessPopup(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
    }, [showSuccessPopup, setShowSuccessPopup]);

    return (
        <div className={"get-more"} style={{ display: show ? "block" : "none" }}>
            <CloseButton
                className="close-button"
                onClick={onClose}
                aria-label="Close"
            />
            <p className={"introductions"}>
                Add a new bookmark by filling in these fields
            </p>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="container-fluid md-3 d-flex justify-content-between">
                    <Form.Control
                            className="form-input-get-more"
                            placeholder="URL"
                            aria-label="URL"
                            value={url}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                    <Form.Control
                            className="form-input-get-more"
                            placeholder="Destination"
                            aria-label="Destination"
                            value={destination}
                        onChange={(event) => setDestination(event.target.value)}
                    />
                    <Form.Control
                            className="form-input-get-more"
                            placeholder="Dropdown Category"
                            aria-label="Dropdown Category"
                            value={dropdownCategory}
                        onChange={(event) => setDropdownCategory(event.target.value)}
                    />
                    <Form.Control
                            className="form-input-get-more"
                            placeholder="Name"
                            aria-label="Name"
                            value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Form.Control
                            className="form-input-get-more"
                            placeholder="Title"
                            aria-label="Title"
                            value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <Button type="submit" className="submit">
                        <img
                            title={"Add the new Bookmark."}
                            alt="Add Icon"
                            id="add-png"
                            src="../src/assets/add.png"
                        />
                    </Button>
                </InputGroup>
            </Form>
            {showSuccessPopup && (
                <div className="success-popup">Bookmark successfully added!</div>
            )}
        </div>
    );
}

export default GetMore;