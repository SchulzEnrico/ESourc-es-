import React, { useState } from "react";
import axios from "axios";
import { Form, InputGroup, Button } from "react-bootstrap";
import "./GetMore.css";
import { GetMoreProps } from "../types/types.ts";

const GetMore: React.FC<GetMoreProps> = function GetMore({ onClose, onBookmarkAdded, }: GetMoreProps) {
    const [url, setUrl] = useState("");
    const [dropdownCategory, setDropdownCategory] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [target, setTarget] = useState("");

    const logger = (message: string) => { console.log(message); };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newBookmarkDTO = {
            url: url,
            dropdownCategory: dropdownCategory,
            name: name,
            title: title,
            target: target,
        };

        axios
            .post("api/bookmarks/add", newBookmarkDTO)
            .then(() => {
                setUrl("");
                setDropdownCategory("");
                setName("");
                setTitle("");
                setTarget("");
                onBookmarkAdded();
                onClose();
            })
            .catch((error) => {
                logger("Error when adding bookmark:" + error.message);
            });
    }

    return (
        <div className={"get-more"}>
            <Button className="close-button" onClick={onClose}>
                <img title={"Close Get More"} alt="Close Icon" id="close-png" src="../src/assets/close.png" />
            </Button>
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
                        placeholder="Target"
                        aria-label="Target"
                        value={target}
                        onChange={(event) => setTarget(event.target.value)}
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
                        add
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default GetMore;