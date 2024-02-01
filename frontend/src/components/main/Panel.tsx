import React, { useRef, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Navigation from '../nav/Navigation';
import { PanelProps, BookmarkDTO } from '../types/types';
import { TiThMenu } from 'react-icons/ti';

const Panel: React.FC<PanelProps> = ({ className, width }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [showNavigationModal, setShowNavigationModal] = useState(false);
    const [hoverText, setHoverText] = useState('');
    const [bookmarks, setBookmarks] = useState<BookmarkDTO[]>([]);
    const [currentBookmarkIndex, setCurrentBookmarkIndex] = useState<number>(-1);
    const [inputLink, setInputLink] = useState('');

    useEffect(() => {
        const handleIframeLoad = () => {
            const iframeDocument = iframeRef.current?.contentDocument;
            const bookmarkTitle = iframeDocument?.querySelector('title')?.textContent;
            if (bookmarkTitle) {
                setHoverText(bookmarkTitle);
            }
        };

        if (iframeRef.current) {
            iframeRef.current.addEventListener('load', handleIframeLoad);
        }

        return () => {
            if (iframeRef.current) {
                iframeRef.current.removeEventListener('load', handleIframeLoad);
            }
        };
    }, []);

    const openInIframe = (url: string, title: string) => {
        if (iframeRef.current) {
            iframeRef.current.src = url;
            setHoverText(title);
            setInputLink(url); // Update inputLink with the current URL
        }
    };

    const handlePanelHover = () => {
        const hoverTextMap: { [key: string]: string } = {
            'ins_pro': 'INSPIRATION  ~  PROJECTS',
            'snip_gen': 'SNIPPETS  ~  GENERATORS',
            'development': 'DEVELOPMENT  ~  EDITING  ~  CREATION',
            'know_guide': 'KNOWLEDGE  ~  GUIDELINES',
            'lip_doc': 'LIBRARIES  ~  DOCUMENTATIONS',
            'project': 'PROJECT MANAGEMENT  ~  TOOLS',
            'personal': 'PERSONALLY  ~  INDIVIDUAL',
        };
        setHoverText(hoverTextMap[className] || '');
    };

    const handleNavigationButtonHover = () => {
        setHoverText('Linked Panel Topics');
    };

    const handleInputLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputLink(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newBookmark: BookmarkDTO = { _id: 'some-id', url: inputLink, destination: '', target: '', dropdownCategory: '', title: '', links: [] };
        setBookmarks([...bookmarks, newBookmark]);
        setCurrentBookmarkIndex(bookmarks.length);
        openInIframe(inputLink, '');
    };

    const handleCopyToClipboard = () => {
        if (inputLink) {
            navigator.clipboard.writeText(inputLink);
        }
    };

    const clearIframe = () => {
        if (iframeRef.current) {
            iframeRef.current.src = '';
            setHoverText('');
            setInputLink(''); // Clear inputLink when clearing the iframe
        }
    };

    const navigateBookmarks = (direction: 'prev' | 'next') => {
        const newIndex = direction === 'prev' ? currentBookmarkIndex - 1 : currentBookmarkIndex + 1;
        if (newIndex >= 0 && newIndex < bookmarks.length) {
            setCurrentBookmarkIndex(newIndex);
            const { url, title } = bookmarks[newIndex];
            openInIframe(url, title || '');
        }
    };

    return (
        <Container
            className={`panel-items-container ${className}`}
            title={hoverText}
            onMouseEnter={handlePanelHover}
            onMouseLeave={() => setHoverText('')}
        >
            <p id={"currently-displayed-bookmark"} >{bookmarks[currentBookmarkIndex]?.title}</p>
            <div
                className="panel-controls"
                onMouseEnter={handlePanelHover}
                onMouseLeave={() => setHoverText('')}
            >
                <button
                    className={'panel-menu-btn'}
                    onClick={() => setShowNavigationModal(true)}
                    onMouseEnter={handleNavigationButtonHover}
                >
                    <TiThMenu />
                </button>
                <Navigation
                    onLinkClick={(url, title) => {
                        openInIframe(url, title);
                        const newBookmark: BookmarkDTO = { _id: 'some-id', url, destination: '', target: '', dropdownCategory: '', title, links: [] };
                        setBookmarks([...bookmarks, newBookmark]);
                        setCurrentBookmarkIndex(bookmarks.length);
                    }}
                    panelName={className}
                    showModal={showNavigationModal}
                    closeModal={() => setShowNavigationModal(false)}
                    isExternal={false}
                />
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={inputLink}
                        onChange={handleInputLinkChange}
                        placeholder="Paste link here"
                    />
                    <button type="submit" style={{ display: 'none' }}>Submit</button>
                </form>
                <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
                <button onClick={clearIframe}>Clear iFrame</button>
                <button onClick={() => navigateBookmarks('prev')}>Previous Bookmark</button>
                <button onClick={() => navigateBookmarks('next')}>Next Bookmark</button>
            </div>
            <div className="iframe-bounding shadow--ridge">
                <iframe
                    ref={iframeRef}
                    title={className}
                    width={width}
                ></iframe>
            </div>
        </Container>
    );
};

export default Panel;
