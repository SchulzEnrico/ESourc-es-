import 'react-resizable/css/styles.css';
import '../../css/DeskGrid.css';
import '../../css/DeskStyles.css';
import Panel from './Panel.tsx';
import '../../css/Resizeable.css';
import { useState } from 'react';
import CustomResizableBox from './CustomResizableBox.tsx';
import {TbArrowAutofitHeight} from "react-icons/tb";
import {TiArrowSync} from "react-icons/ti";

const viewportToPixels = (value: string) => {
    const regex = new RegExp(/^([0-9.]+)(vh|vw)$/);

    const parts = regex.exec(value);

    if (!parts) return 0;

    const q = Number(parts[1]);
    const side = parts[2] === 'vw' ? window.innerWidth : window.innerHeight;
    return side * (q / 100);
}

const proportionToPixels = (proportion: number) => {
    return (proportion / 100) * viewportToPixels("100vw");
}

function Desk() {
    const garageProportion = 20;
    const workstationProportion = 35;
    const libraryProportion = 20;
    const managementsProportion = 11;

    const [garageWidthPixels, setGarageWidthPixels] = useState<number>(proportionToPixels(garageProportion));
    const [workstationWidthPixels, setWorkstationWidthPixels] = useState<number>(proportionToPixels(workstationProportion));
    const [libraryWidthPixels, setLibraryWidthPixels] = useState<number>(proportionToPixels(libraryProportion));
    const [managementsWidthPixels, setManagementsWidthPixels] = useState<number>(proportionToPixels(managementsProportion));

    const [insProHeight, setInsProHeight] = useState<number>(viewportToPixels("36.3vh"));
    const [snipGenHeight, setSnipGenHeight] = useState<number>(viewportToPixels("36.3vh"));
    const [knowGuideHeight, setKnowGuideHeight] = useState<number>(viewportToPixels("36.3vh"));
    const [lipDocHeight, setLipDocHeight] = useState<number>(viewportToPixels("36.3vh"));
    const [projectHeight, setProjectHeight] = useState<number>(viewportToPixels("36.3vh"));
    const [personalHeight, setPersonalHeight] = useState<number>(viewportToPixels("36.3vh"));

    const [expandedPanel, setExpandedPanel] = useState<string>('ins_pro');

    const fullHeight = viewportToPixels("78vh");
    const PANEL_MIN_HEIGHT = 10;

    const handleResizeEnd = (panelName: string, panelHeightState: number, newHeight: number) => {
        const maxPanelHeight = fullHeight - PANEL_MIN_HEIGHT;
        let newPanelHeight = PANEL_MIN_HEIGHT;
        let newOtherPanelHeight = PANEL_MIN_HEIGHT;

        if (panelHeightState === PANEL_MIN_HEIGHT) {
            newPanelHeight = Math.min(maxPanelHeight, newHeight - PANEL_MIN_HEIGHT);
            newOtherPanelHeight = maxPanelHeight - newPanelHeight;
        } else {
            newOtherPanelHeight = Math.min(maxPanelHeight, fullHeight - newHeight - PANEL_MIN_HEIGHT);
            newPanelHeight = maxPanelHeight - newOtherPanelHeight;
        }

        const totalHeight = newPanelHeight + newOtherPanelHeight + PANEL_MIN_HEIGHT;
        if (totalHeight > fullHeight) {
            // Wenn die Gesamthöhe die maximale Höhe überschreitet, die Höhen entsprechend anpassen
            const heightDiff = totalHeight - fullHeight;
            newPanelHeight -= heightDiff / 2;
            newOtherPanelHeight -= heightDiff / 2;
        }

        updatePanelHeights(panelName, newPanelHeight, newOtherPanelHeight);
    };

    const updatePanelHeights = (panelName: string, newPanelHeight: number, newOtherPanelHeight: number) => {
        if (panelName === 'ins_pro') {
            setInsProHeight(newPanelHeight);
            setSnipGenHeight(newOtherPanelHeight);
        } else if (panelName === 'snip_gen') {
            setSnipGenHeight(newPanelHeight);
            setInsProHeight(newOtherPanelHeight);
        } else if (panelName === 'know_guide') {
            setKnowGuideHeight(newPanelHeight);
            setLipDocHeight(newOtherPanelHeight);
        } else if (panelName === 'lip_doc') {
            setLipDocHeight(newPanelHeight);
            setKnowGuideHeight(newOtherPanelHeight);
        } else if (panelName === 'project') {
            setProjectHeight(newPanelHeight);
            setPersonalHeight(newOtherPanelHeight);
        } else if (panelName === 'personal') {
            setPersonalHeight(newPanelHeight);
            setProjectHeight(newOtherPanelHeight);
        }
    };

    const handleWorkstationResizeEnd = (size: { width: number }) => {
        setWorkstationWidthPixels(size.width);
    };

    const handleGarageResizeWidth = (size: { width: number }) => {
        setGarageWidthPixels(size.width);
    };

    const handleGarageResizeHeight = (size: { height: number }) => {
        // Die Breite des Garage-Panels nicht ändern, daher kein Aufruf von setGarageWidthPixels

        // Hier aktualisieren Sie die Höhen der inneren Panels basierend auf der neuen Höhe des Garage-Panels
        const updatedInsProHeight = size.height; // Passen Sie dies entsprechend an, wenn Sie die Höhe anpassen möchten
        const updatedSnipGenHeight = fullHeight - updatedInsProHeight - PANEL_MIN_HEIGHT;
        setInsProHeight(updatedInsProHeight);
        setSnipGenHeight(updatedSnipGenHeight);
    };

    const handleLibraryResizeWidth = (size: { width: number }) => {
        setLibraryWidthPixels(size.width);
    };

    const handleLibraryResizeHeight = (size: { height: number }) => {
        // Die Breite des Library-Panels nicht ändern, daher kein Aufruf von setLibraryWidthPixels

        // Hier aktualisieren Sie die Höhen der inneren Panels basierend auf der neuen Höhe des Library-Panels
        const updatedKnowGuideHeight = size.height; // Passen Sie dies entsprechend an, wenn Sie die Höhe anpassen möchten
        const updatedLipDocHeight = fullHeight - updatedKnowGuideHeight - PANEL_MIN_HEIGHT;
        setKnowGuideHeight(updatedKnowGuideHeight);
        setLipDocHeight(updatedLipDocHeight);
    };

    const handleManagementsResizeWidth = (size: { width: number }) => {
        setManagementsWidthPixels(size.width);
    };
    const handleManagementsResizeHeight = (size: { height: number }) => {
        // Die Breite des Managements-Panels nicht ändern, daher kein Aufruf von setManagementsWidthPixels

        // Hier aktualisieren Sie die Höhen der inneren Panels basierend auf der neuen Höhe des Managements-Panels
        const updatedProjectHeight = size.height; // Passen Sie dies entsprechend an, wenn Sie die Höhe anpassen möchten
        const updatedPersonalHeight = fullHeight - updatedProjectHeight - PANEL_MIN_HEIGHT;
        setProjectHeight(updatedProjectHeight);
        setPersonalHeight(updatedPersonalHeight);
    };

    const handlePanelToggle = (panelName: string, panelHeightState: number, otherPanelHeightState: number) => {
        const maxPanelHeight = fullHeight - PANEL_MIN_HEIGHT;
        let newPanelHeight = PANEL_MIN_HEIGHT;
        let newOtherPanelHeight = PANEL_MIN_HEIGHT;

        if (expandedPanel === panelName) {
            if (panelHeightState === PANEL_MIN_HEIGHT) {
                newPanelHeight = Math.min(maxPanelHeight, panelHeightState + otherPanelHeightState - PANEL_MIN_HEIGHT);
            } else {
                newOtherPanelHeight = Math.min(maxPanelHeight, panelHeightState + otherPanelHeightState - PANEL_MIN_HEIGHT);
            }
        } else {
            newPanelHeight = Math.min(maxPanelHeight, panelHeightState + otherPanelHeightState - PANEL_MIN_HEIGHT);
            newOtherPanelHeight = PANEL_MIN_HEIGHT;
            setExpandedPanel(panelName);
        }

        updatePanelHeights(panelName, newPanelHeight, newOtherPanelHeight);
    };

    const handleEqualizeHeight = () => {
        setInsProHeight(viewportToPixels("36.3vh"));
        setSnipGenHeight(viewportToPixels("36.3vh"));
        setKnowGuideHeight(viewportToPixels("36.3vh"));
        setLipDocHeight(viewportToPixels("36.3vh"));
        setProjectHeight(viewportToPixels("36.3vh"));
        setPersonalHeight(viewportToPixels("36.3vh"));
    };

    return (
        <div className="esources-desk">
            <CustomResizableBox
                className="garage row"
                width={garageWidthPixels}
                height={fullHeight}
                resizeHandles={["e"]}
                onResizeEnd={handleGarageResizeWidth}
                id="garage"
            >
                <div className="inner-panels-wrapper">
                    <div className="ins_pro panel shadow--raised col">
                        <CustomResizableBox
                            className="ins_pro"
                            width={garageWidthPixels}
                            height={insProHeight}
                            resizeHandles={["s"]}
                            onResizeEnd={handleGarageResizeHeight}
                            id="ins_pro"
                        >
                            <Panel className="ins_pro"/>

                        </CustomResizableBox>
                    </div>
                    <div className={"placeholder-gap-row"}></div>
                    <div className="snip_gen panel shadow--raised col">
                        <CustomResizableBox
                            className="snip_gen"
                            width={garageWidthPixels}
                            height={snipGenHeight}
                            onResizeEnd={handleGarageResizeHeight}
                            id="snip_gen"
                        >
                            <Panel className="snip_gen"/>
                        </CustomResizableBox>
                    </div>
                </div>

                <div className={"panel-proportions-control"}>
                    <button onClick={() => handlePanelToggle('ins_pro', insProHeight, snipGenHeight)}>
                        <TbArrowAutofitHeight/>
                    </button>
                    <button onClick={handleEqualizeHeight}>
                        <TiArrowSync />
                    </button>
                </div>

            </CustomResizableBox>

            <CustomResizableBox
                className="workstation row"
                width={workstationWidthPixels}
                height={fullHeight}
                resizeHandles={["e"]}
                onResizeEnd={handleWorkstationResizeEnd}
                id="workstation"
            >
                <div className="inner-panels-wrapper">
                    <div className="development panel shadow--raised col">
                        <Panel className="development"/>
                    </div>
                </div>
            </CustomResizableBox>
            <CustomResizableBox
                className="library row"
                width={libraryWidthPixels}
                height={fullHeight}
                resizeHandles={["e"]}
                onResizeEnd={handleLibraryResizeWidth}
                id="library"
            >
                <div className="inner-panels-wrapper">
                    <div className="know_guide panel shadow--raised col">
                        <CustomResizableBox
                            className="know_guide"
                            width={libraryWidthPixels}
                            height={knowGuideHeight}
                            resizeHandles={["s"]}
                            onResizeEnd={handleLibraryResizeHeight}
                            id="know_guide"
                        >
                            <Panel className="know_guide"/>

                        </CustomResizableBox>
                    </div>
                    <div className={"placeholder-gap-row"}></div>
                    <div className="lip_doc panel shadow--raised col">
                        <CustomResizableBox
                            className="lip_doc"
                            width={libraryWidthPixels}
                            height={lipDocHeight}
                            onResizeEnd={handleLibraryResizeHeight}
                            id="lip_doc"
                        >
                            <Panel className="lip_doc"/>
                        </CustomResizableBox>
                    </div>
                </div>

                <div className={"panel-proportions-control"}>
                    <button onClick={() => handlePanelToggle('know_guide', knowGuideHeight, lipDocHeight)}>
                        <TbArrowAutofitHeight/>
                    </button>
                    <button onClick={handleEqualizeHeight}>
                        <TiArrowSync />
                    </button>
                </div>

            </CustomResizableBox>
            <CustomResizableBox
                className="managements row"
                width={managementsWidthPixels}
                height={fullHeight}
                resizeHandles={["e"]}
                onResizeEnd={handleManagementsResizeWidth}
                id="managements"
            >
                <div className="inner-panels-wrapper">
                    <div className="project panel shadow--raised col">
                        <CustomResizableBox
                            className="project"
                            width={managementsWidthPixels}
                            height={projectHeight}
                            resizeHandles={["s"]}
                            onResizeEnd={handleManagementsResizeHeight}
                            id="project"
                        >
                            <Panel className="project"/>
                        </CustomResizableBox>
                    </div>
                    <div className={"placeholder-gap-row"}></div>
                    <div className="personal panel shadow--raised col">
                        <CustomResizableBox
                            className="personal"
                            width={managementsWidthPixels}
                            height={personalHeight}
                            onResizeEnd={handleManagementsResizeHeight}
                            id="personal"
                        >
                            <Panel className="personal"/>
                        </CustomResizableBox>
                    </div>
                </div>

                <div className={"panel-proportions-control"}>
                    <button onClick={() => handlePanelToggle('project', projectHeight, personalHeight)}>
                        <TbArrowAutofitHeight/>
                    </button>
                    <button onClick={handleEqualizeHeight}>
                        <TiArrowSync />
                    </button>
                </div>

            </CustomResizableBox>
        </div>
    );
}

export default Desk;