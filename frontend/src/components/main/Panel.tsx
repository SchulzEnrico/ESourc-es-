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
    const [secondLastBookmarkIndex, setSecondLastBookmarkIndex] = useState<number>(-1);
    const [lastBookmarkIndex, setLastBookmarkIndex] = useState<number>(-1);
    const [nextBookmarkIndex, setNextBookmarkIndex] = useState<number>(-1);
    const [secondNextBookmarkIndex, setSecondNextBookmarkIndex] = useState<number>(-1);
    const [inputLink, setInputLink] = useState('');


    useEffect(() => {
        const handleIframeLoad = () => {
            const iframeDocument = iframeRef.current?.contentDocument;
            const bookmarkTitle = iframeDocument?.querySelector('title')?.textContent;
            if (bookmarkTitle) {
                setHoverText(bookmarkTitle);
            }
            if (iframeRef.current) {
                iframeRef.current.removeEventListener('load', handleIframeLoad);

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

    useEffect(() => {
        if (currentBookmarkIndex >= 0) {
            setSecondLastBookmarkIndex(currentBookmarkIndex - 2);
            setLastBookmarkIndex(currentBookmarkIndex - 1);
            setNextBookmarkIndex(currentBookmarkIndex + 1);
            setSecondNextBookmarkIndex(currentBookmarkIndex + 2);
        }
    }, [currentBookmarkIndex]);

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
            <button title={"Clear display"}
                    id={"clear-iframe-btn"}
                    className={"iframe-handler-btn"}
                    onClick={clearIframe}>
                <GrClear/>
            </button>
            <div className={"loaded-bookmark-history"}>
                <div className={"loaded-bookmark-element"}>
                    <p id={"second-last-displayed-bookmark"}>{bookmarks[secondLastBookmarkIndex]?.title}</p></div>
                <div className={"loaded-bookmark-element"}>
                    <p id={"last-displayed-bookmark"}>{bookmarks[lastBookmarkIndex]?.title}</p></div>
                <div className={"loaded-bookmark-element"}>
                    <p id={"currently-displayed-bookmark"}>{bookmarks[currentBookmarkIndex]?.title}</p></div>
                <div className={"loaded-bookmark-element"}>
                    <p id={"next-displayed-bookmark"}>{bookmarks[nextBookmarkIndex]?.title}</p></div>
                <div className={"loaded-bookmark-element"}>
                    <p id={"second-next-displayed-bookmark"}>{bookmarks[secondNextBookmarkIndex]?.title}</p></div>
            </div>
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
                    <button title={"Copy to clipboard"}
                            id={"copy-to-clipboard-btn"}
                            className={"iframe-handler-btn"}
                            onClick={handleCopyToClipboard}>
                        <HiOutlineClipboardCopy/>
                    </button>
                </div>
            </div>
            <div className="iframe-bounding shadow--ridge">
                <div className="ruler">
                    <div className="horizontal-line"></div>
                    <div className="vertical-line"></div>
                </div>
                <iframe
                    ref={iframeRef}
                    title={className}
                    width={width}
                ></iframe>
                <div title={"Size indicator"} id={"size-indicator"}>
                    <p>X: {iframeRef.current?.offsetWidth}px</p>
                    <p>Y: {iframeRef.current?.offsetHeight}px</p>
                </div>
            </div>
        </Container>
    );
};

export default Panel;
