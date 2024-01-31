import React, { useRef, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Navigation from '../nav/Navigation';
import { PanelProps, BookmarkDTO } from '../types/types';
import { TiThMenu } from 'react-icons/ti';

const Panel: React.FC<PanelProps> = ({ className, width }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [showNavigationModal, setShowNavigationModal] = useState(false);
    const [hoverText, setHoverText] = useState('');
    const [bookmark, setBookmark] = useState<Partial<BookmarkDTO> | null>(null);

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

    const openInIframe = (url: string) => {
        if (iframeRef.current) {
            iframeRef.current.src = url;
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

    return (

        <Container
            className={`panel-items-container ${className}`}
            title={hoverText}
            onMouseEnter={handlePanelHover}
            onMouseLeave={() => setHoverText('')}
        >
            <p id={"currently-displayed-bookmark"}>{bookmark?.title}</p>
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
                        openInIframe(url);
                        setBookmark({title, url}); // Setzen des Bookmark-States
                    }}
                    panelName={className}
                    showModal={showNavigationModal}
                    closeModal={() => setShowNavigationModal(false)}
                    isExternal={false}
                />
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
