import { useEffect, useState } from "react";
import axios from "axios";
import { Form, InputGroup, Button } from "react-bootstrap";
import {GetMoreProps} from "../types/types.ts";

function GetMore({ show, onClose }:Readonly<GetMoreProps>) {
    const [url, setUrl] = useState("");
    const [dropdownCategory, setDropdownCategory] = useState("");
    const [tags, setTags] = useState("");
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
            tags: tags.split(/[, .#/]+/),
            title: title,
        };

        axios
            .post("api/bookmarks/add", newBookmarkDTO)
            .then(() => {
                setUrl("");
                setDropdownCategory("");
                setTags("");
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
        <div className={`get-more ${show ? 'show' : 'hide'}`}>
            <Button
                id={"close-button"}
                className={"close-button"}
                onClick={onClose}
                aria-label="Close"
                title="Close"
                name="Close"
            >
                Close
            </Button>
            <p className={"introductions"}>
                Add a new bookmark by filling in these fields
            </p>
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
                        <option>select destination</option>
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
                        className="form-input-get-more shadow--ridge"
                        placeholder="Dropdown Category"
                        aria-label="Dropdown Category"
                        value={dropdownCategory}
                        onChange={(event) => setDropdownCategory(event.target.value)}
                    />
                    <Form.Control
                        className="form-input-get-more shadow--ridge"
                        placeholder="Title"
                        aria-label="Title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <Form.Control
                        className="form-input-get-more shadow--ridge"
                        placeholder="Tags"
                        aria-label="Tags"
                        value={tags}
                        onChange={(event) => setTags(event.target.value)}
                    />
                    <Button type="submit" className="submit">
                        save bookmark
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