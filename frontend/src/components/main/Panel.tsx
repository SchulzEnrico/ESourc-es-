import { useRef } from 'react';
import {Container} from 'react-bootstrap';
import Navigation from "../nav/Navigation";
import { PanelProps } from '../types/types';

function Panel({ className }: PanelProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const openInIframe = (url: string) => {
        if (iframeRef.current) {
            iframeRef.current.src = url;
        }
    }

    return (
        <Container className={`panel-items-container ${className}`}>
            <div className="iframe-bounding shadow--sunken">
                <iframe ref={iframeRef}></iframe>
            </div>
            <div className="panel-controls">
                <Navigation onLinkClick={openInIframe} panelName={className} isExternal={false} />
            </div>
        </Container>
    );
}

export default Panel;