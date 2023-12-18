import React, { useRef } from 'react';
import './Panel.css';
import './Flexbox.css';
import Navigation from "../nav/Navigation";
import { PanelProps } from '../types/types';

const Panel: React.FC<PanelProps> = ({ className }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const openInIframe = (url: string) => {
        if (iframeRef.current) {
            iframeRef.current.src = url;
        }
    }

    return (
        <div className={`panel-items-container ${className}`}>
            <span className={"panel-name"}>{className}</span>
            <div className={`iframe-bounding shadow--sunken ${className === 'full-height' ? 'full-height' : ''}`}>
                <iframe ref={iframeRef}></iframe>
            </div>
            <div className="panel-controls">
                <Navigation onLinkClick={openInIframe} panelName={className} isExternal={false}/>
            </div>
        </div>
    );
}


export default Panel;
