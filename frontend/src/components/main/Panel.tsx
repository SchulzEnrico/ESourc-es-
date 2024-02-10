import React, { useRef, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Navigation from '../nav/Navigation';
import { PanelProps, BookmarkDTO } from '../types/types';
import { TiThMenu } from 'react-icons/ti';
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { GrClear } from "react-icons/gr";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Ruler from "../utilities/Ruler.tsx";
import {LuRuler} from "react-icons/lu";


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
    const [showRuler, setShowRuler] = useState(false); // Zustand für Ruler ein-/ausschalten


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

        const currentIframeRef = iframeRef.current; // Kopiere den aktuellen Wert in eine lokale Variable

        if (currentIframeRef) {
            currentIframeRef.addEventListener('load', handleIframeLoad);
        }

        return () => {
            if (currentIframeRef) { // Verwende die lokale Variable in der Aufräumfunktion
                currentIframeRef.removeEventListener('load', handleIframeLoad);
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
            'ins_pro': 'INSPIRATIONS  ~  PROJECTS',
            'snip_gen': 'SNIPPETS  ~  GENERATORS',
            'development': 'DEVELOPMENT  ~  EDITING  ~  CREATION',
            'know_guide': 'KNOWLEDGE  ~  GUIDELINES',
            'lip_doc': 'LIBRARIES  ~  DOCUMENTATIONS',
            'project': 'PROJECT MANAGEMENT  ~  TOOLS',
            'personal': 'PERSONALLY  ~  INDIVIDUAL',
        };
        const hoverText = `Linked:\n${hoverTextMap[className] || ''}`;
        setHoverText(hoverText);
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
        <Container className={`panel-items-container `}>
            <button data-tooltip={"Clear display"}
                    id={"clear-iframe-btn"}
                    className={"iframe-handler-btn tooltip-btn tt_e"}
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

            <div
                className="panel-controls"
                onMouseEnter={handlePanelHover}
                onMouseLeave={() => setHoverText('')}
            >
                <button
                    className={'panel-menu-btn ${className} tooltip-btn tt_ne'}
                    onClick={() => setShowNavigationModal(true)}
                    onMouseEnter={handlePanelHover}
                    data-tooltip={hoverText}
                    onMouseLeave={() => setHoverText('')}
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
                <div
                    className={"temporary-input-area"}>
                    <form id={"panel-temporary-link-input"}
                          onSubmit={handleSubmit}>
                        <div data-tooltip={"Insert temporary link"}
                             className={"tooltip-cont tt_n"}>
                            <input
                                className={"form-input shadow--sunken tooltip-cont tt_n"}
                                type="text"
                                value={inputLink}
                                onChange={handleInputLinkChange}
                                placeholder="Paste URL & press &#x23CE;"
                            />
                        </div>
                        <button
                            type="submit"
                            style={{display: 'none'}}>Submit
                        </button>
                    </form>
                    <button data-tooltip={"Copy to clipboard"}
                            className={"iframe-handler-btn copy-to-clipboard-btn tooltip-cont tt_n"}
                            onClick={handleCopyToClipboard}>
                        <HiOutlineClipboardCopy/>
                    </button>
                </div>
            </div>
            <div className="iframe-bounding shadow--ridge">
                {showRuler && <Ruler/>}
                <iframe
                    ref={iframeRef}
                    title={className}
                    width={width}
                ></iframe>
                <div title={"Size indicator"}
                     id={"size-indicator"}>
                    <p>X-{iframeRef.current?.offsetWidth}px</p>
                    <p>Y-{iframeRef.current?.offsetHeight}px</p>
                </div>
            </div>
            <div className={"prev-prior-handler "}>
                <button
                    data-tooltip={"Previous bookmark"}
                    className={"iframe-handler-btn tooltip-btn tt_w"}
                    onClick={() => navigateBookmarks('prior')}>
                    <FaArrowLeft/>
                </button>
                <button data-tooltip={"Next bookmark"}
                        className={"iframe-handler-btn next-bookmark-btn tooltip-btn tt_w"}
                        onClick={() => navigateBookmarks('next')}>
                    <FaArrowRight/>
                </button>
            </div>
            <button
                data-tooltip={"Toggle ruler"}
                className={"ruler-btn iframe-handler-btn tooltip-btn tt_n"}
                onClick={() => setShowRuler(!showRuler)}>
                <LuRuler id={"ruler-icon"}/>
            </button>
        </Container>
    );
};

export default Panel;
