import React, { useRef, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Navigation from '../nav/Navigation';
import { PanelProps, BookmarkDTO } from '../types/types';
import { TiThMenu } from 'react-icons/ti';
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { GrClear } from "react-icons/gr";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

    const navigateBookmarks = (direction: 'prior' | 'next') => {
        const newIndex = direction === 'prior' ? currentBookmarkIndex - 1 : currentBookmarkIndex + 1;
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
            <button title={"Clear display"} id={"clear-iframe-btn"} className={"iframe-handler-btn"}
                    onClick={clearIframe}>
                <GrClear/>
            </button>
            <p id={"currently-displayed-bookmark"}>{bookmarks[currentBookmarkIndex]?.title}</p>
            <div className={"prev-prior-handler"}>
                <button title={"Previous bookmark"}
                        className={"iframe-handler-btn"}
                        onClick={() => navigateBookmarks('prior')}>
                    <FaArrowLeft/>
                </button>
                <button title={"Prior bookmark"}
                        className={"iframe-handler-btn next-bookmark-btn"}
                        onClick={() => navigateBookmarks('next')}>
                    <FaArrowRight/>
                </button>
            </div>
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
                    <TiThMenu/>
                </button>
                <Navigation
                    onLinkClick={(url, title) => {
                        openInIframe(url, title);
                        const newBookmark: BookmarkDTO = {
                            _id: 'some-id',
                            url,
                            destination: '',
                            target: '',
                            dropdownCategory: '',
                            title,
                            links: []
                        };
                        setBookmarks([...bookmarks, newBookmark]);
                        setCurrentBookmarkIndex(bookmarks.length);
                    }}
                    panelName={className}
                    showModal={showNavigationModal}
                    closeModal={() => setShowNavigationModal(false)}
                    isExternal={false}
                />
                <div className={"temporary-input-area"}>
                <form id={"panel-temporary-link-input"}
                      onSubmit={handleSubmit}>
                    <input
                        title={"Insert the link to temporarily display your desired website here and press Enter"}
                        className={"form-input shadow--sunken"}
                        type="text"
                        value={inputLink}
                        onChange={handleInputLinkChange}
                        placeholder="Paste link & press return"
                    />
                    <button type="submit"
                            style={{display: 'none'}}>Submit
                    </button>
                </form>
                <button title={"Copy to clipboard"} id={"copy-to-clipboard-btn"} className={"iframe-handler-btn"}
                        onClick={handleCopyToClipboard}>
                    <HiOutlineClipboardCopy/>
                </button>
                </div>
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
