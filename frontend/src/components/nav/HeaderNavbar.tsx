import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { useEffect, useState } from "react";
import axios from "axios";
import {Bookmark} from "../types/types.ts";
import {useParams} from "react-router-dom";

function Navbar() {
        const {bookmarkDropdownCategory} = useParams();
        const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

        useEffect(() => {
                axios.get(`/api/bookmarks/category/${bookmarkDropdownCategory}`)
                    .then((response):void => {
                            setBookmarks(response.data);
                    })
                    .catch(error =>
                        console.error("Error fetching bookmarks:", error)
                    );
        }, [bookmarkDropdownCategory]);

        return (
                <>
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/">externe Bookmarks</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    {bookmarks.map(bookmark => (
                                    <li key={bookmark.id} className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id={`navbarDropdown${bookmark.bookmarkDropdownCategory}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {bookmark.bookmarkDropdownCategory}
                                        </a>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </>
        );
}

export default Navbar;
