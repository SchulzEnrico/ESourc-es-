// Desk.tsx
import React from 'react';
import Panel from './Panel.tsx';
import { DeskProps } from '../types/types';

const Desk: React.FC<DeskProps> = ({ className }) => {
    return (
        <div className="desk-container esources-desk">
            <div className="garage desk-section">
                <div className={`ins_pro panel-container shadow--raised ${className === 'ins_pro' ? 'full-height' : 'half-height'}`}>
                    <Panel className="ins_pro" />
                </div>
                <div className={`snip_gen panel-container shadow--raised ${className === 'snip_gen' ? 'full-height' : 'half-height'}`}>
                    <Panel className="snip_gen" />
                </div>
            </div>
            <div className="workstation desk-section">
                <div className={`development panel-container shadow--raised ${className === 'development' ? 'full-height' : 'half-height'}`}>
                    <Panel className="development" />
                </div>
            </div>
            <div className="library desk-section">
                <div className={`know_guide panel-container shadow--raised ${className === 'know_guide' ? 'full-height' : 'half-height'}`}>
                    <Panel className="know_guide" />
                </div>
                <div className={`lip_doc panel-container shadow--raised ${className === 'lip_doc' ? 'full-height' : 'half-height'}`}>
                    <Panel className="lip_doc" />
                </div>
            </div>
            <div className="managements desk-section">
                <div className={`project panel-container shadow--raised ${className === 'project' ? 'full-height' : 'half-height'}`}>
                    <Panel className="project" />
                </div>
                <div className={`personal panel-container shadow--raised ${className === 'personal' ? 'full-height' : 'half-height'}`}>
                    <Panel className="personal" />
                </div>
            </div>
        </div>
    );
}

export default Desk;
