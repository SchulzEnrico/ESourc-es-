import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/App.css'
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
import Desk from "./components/main/Desk.tsx";
import { BookmarkDTO } from "./components/types/types.ts";

function App() {
    const [bookmarks, setBookmarks] = useState<BookmarkDTO[]>([]);

    const loadBookmarks = () => {
        axios.get<BookmarkDTO[]>('/api/bookmarks/getAll')
            .then((response) => {
                setBookmarks(response.data);
                console.log('Bookmarks loaded:', response.data);
            })
            .catch(error =>
                console.error("Error retrieving bookmarks:", error)
            );
    };

    useEffect(() => {
        loadBookmarks();
    }, []);

    return (
        <div className="app">
            <Header bookmarks={bookmarks} loadBookmarks={loadBookmarks} />
            <Desk />
            <Footer />
        </div>
    );
}

export default App;