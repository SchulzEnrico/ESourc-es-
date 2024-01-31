import React, { useRef, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Navigation from '../nav/Navigation';
import { PanelProps } from '../types/types';
import { TiThMenu } from 'react-icons/ti';

const Panel: React.FC<PanelProps> = ({ className, width }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [showNavigationModal, setShowNavigationModal] = useState(false);
    const [originalWidth, setOriginalWidth] = useState(0);
    const [originalHeight, setOriginalHeight] = useState(0);



    useEffect(() => {
        const handleResize = () => {
            if (iframeRef.current) {
                // Berechne die Unterschiede zwischen der aktuellen und ursprünglichen Breite/Höhe des IFrames
                const widthDifference = iframeRef.current.offsetWidth - originalWidth;
                const heightDifference = iframeRef.current.offsetHeight - originalHeight;

                // Passe die Breiten- und Höhenverhältnisse des Iframes an
                const style = iframeRef.current.style;
                style.width = `${parseFloat(style.width) + widthDifference}px`;
                style.height = `${parseFloat(style.height) + heightDifference}px`;

                // Passe auch die Breiten- und Höhenverhältnisse der inneren Elemente entsprechend an
                const innerElements = iframeRef.current.contentDocument?.querySelectorAll('.resizable-inner');
                if (innerElements) {
                    innerElements.forEach((element) => {
                        const innerStyle = (element as HTMLElement).style;
                        innerStyle.width = `${parseFloat(innerStyle.width) + widthDifference}px`;
                        innerStyle.height = `${parseFloat(innerStyle.height) + heightDifference}px`;
                    });
                }
            }
        };

        if (iframeRef.current) {
            // Speichere die ursprünglichen Breiten- und Höhenwerte
            setOriginalWidth(iframeRef.current.offsetWidth);
            setOriginalHeight(iframeRef.current.offsetHeight);

            // Füge das Resize-Event hinzu
            iframeRef.current.contentWindow?.addEventListener('resize', handleResize);
        }

        // Entferne das Resize-Event beim Unmount der Komponente
        return () => {
            iframeRef.current?.contentWindow?.removeEventListener('resize', handleResize);
        };
    }, [originalWidth, originalHeight]);

    const openInIframe = (url: string) => {
        if (iframeRef.current) {
            iframeRef.current.src = url;
        }
    };

    return (
        <Container className={`panel-items-container ${className}`} title={className}>
            <div className="panel-controls">
                <button className={'panel-menu-btn'} onClick={() => setShowNavigationModal(true)}>
                    <TiThMenu />
                </button>
                <Navigation
                    onLinkClick={openInIframe}
                    panelName={className}
                    isExternal={false}
                    showModal={showNavigationModal}
                    closeModal={() => setShowNavigationModal(false)}
                />
            </div>
            <div className="iframe-bounding shadow--ridge">
                <iframe
                    ref={iframeRef}
                    title={className}
                    width={width}  // Hier hinzugefügt
                    onLoad={() => {
                        // Initiales Berechnen der Breiten- und Höhenverhältnisse beim Laden des IFrames
                        iframeRef.current?.contentWindow?.dispatchEvent(new Event('resize'));
                    }}
                ></iframe>
            </div>
        </Container>
    );
};

export default Panel;