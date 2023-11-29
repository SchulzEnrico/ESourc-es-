import {useState} from "react";
import axios from "axios";
import {Form, InputGroup} from "react-bootstrap";

 function GetMore() {
        const [url, setUrl] = useState("");
        const [dropdownCategory, setDropdownCategory] = useState("");
        const [name, setName] = useState("");
        const [title, setTitle] = useState("");

     function handleSubmit() {
            const newBookmarkDTO = {
                url: url,
                dropdownCategory: dropdownCategory,
                name: name,
                title: title
            }

            axios.post('api/bookmarks/add', newBookmarkDTO)
                .then(() => {
                    setUrl('');
                    setDropdownCategory('');
                    setName('');
                    setTitle('');
                })
                .catch((error) => {
                    console.error('Error adding the bookmark:', error.message);
                });
     }

     return (
        <>
            <p>To add a new bookmark, enter the required information in the following fields. </p>
            <Form onSubmit={handleSubmit}>
                <InputGroup className={"container-fluid md-3 d-flex justify-content-between"}>
                    <label className={"mx-5 my-2 text-danger"}>Bookmarks
                        <Form.Control
                            className={"w-100 mx-1 bg-transparent text-bg-dark"}
                            placeholder="URL"
                            aria-label="URL"
                            value={url}
                            onChange={(event) => setUrl(event.target.value)}
                        />
                        <Form.Control
                            className={"w-100 mx-1 bg-transparent text-bg-dark"}
                            placeholder="Dropdown Category"
                            aria-label="Dropdown Category"
                            value={dropdownCategory}
                            onChange={(event) => setDropdownCategory(event.target.value)}
                        />
                        <Form.Control
                            className={"w-100 mx-1 bg-transparent text-bg-dark"}
                            placeholder="Name" aria-label="Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <Form.Control
                            className={"w-100 mx-1 bg-transparent text-bg-dark"}
                            placeholder="Title & Tags"
                            aria-label="Title & Tags"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <button type={"submit"} className={"mx-1 my-2 btn btn-outline-danger text-light"}>
                            add
                        </button>
                    </label>
                </InputGroup>
            </Form>
        </>
    );
}

export default GetMore;
