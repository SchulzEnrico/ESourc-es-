import React, {useRef, useState} from 'react';
import {Container} from 'react-bootstrap';
import Navigation from "../nav/Navigation";
import { PanelProps } from '../types/types';

const Panel: React.FC<PanelProps> = ({ className }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [showNavigationModal, setShowNavigationModal] = useState(false);
    const openInIframe = (url: string) => {
        if (iframeRef.current) {
            iframeRef.current.src = url;
        }
    }

    return (
        <Container className={`panel-items-container ${className}`}>
            <span className={"panel-name"}>{className}</span>
            <div className="iframe-bounding shadow--sunken">
                <iframe ref={iframeRef}></iframe>
            </div>
            <div className="panel-controls">
                <button onClick={() => setShowNavigationModal(true)}>
                    Open Navigation
                </button>
                <Navigation
                    onLinkClick={openInIframe}
                    panelName={className}
                    isExternal={false}
                    showModal={showNavigationModal}
                    closeModal={() => setShowNavigationModal(false)}
                />
            </div>
        </Container>
    );
}

export default Panel;