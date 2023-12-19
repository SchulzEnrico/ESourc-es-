import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './DeskGrid.css';
import './DeskStyles.css';
import Panel from "./Panel.tsx";
import './Resizeable.css';
import React from "react";

const garageWidth = 700;
const workstationWidth = 1200;
const libraryWidth = 900;
const managementsWidth = 600;

const halfHeight = 330;
const fullHeight = 772;

function Desk() {
    const [garageWidthInner, setGarageWidthInner] = React.useState(garageWidth);
    const [libraryWidthInner, setLibraryWidthInner] = React.useState(libraryWidth);
    const [managementsWidthInner, setManagementsWidthInner] = React.useState(managementsWidth);

    const handleGarageResize = (
        /* event: React.SyntheticEvent */ _,
        { size }: { size: { width: number; height: number } }
    ) => {
        setGarageWidthInner(size.width);
    };

    const handleLibraryResize = (
        /* event: React.SyntheticEvent */ _,
        { size }: { size: { width: number; height: number } }
    ) => {
        setLibraryWidthInner(size.width);
    };

    const handleManagementsResize = (
        /* event: React.SyntheticEvent */ _,
        { size }: { size: { width: number; height: number } }
    ) => {
        setManagementsWidthInner(size.width);
    };

    return (
        <div className="esources-desk">
            <ResizableBox
                className="garage row"
                width={garageWidth}
                height={halfHeight}
                resizeHandles={["e"]}
                onResize={handleGarageResize}
            >
                <div className="ins_pro panel shadow--raised col">
                    <ResizableBox
                        className="ins_pro"
                        width={garageWidthInner}
                        height={halfHeight}
                        resizeHandles={["s"]}
                    >
                        <Panel className="ins_pro" />
                    </ResizableBox>
                </div>
                <div className="snip_gen panel shadow--raised col">
                    <ResizableBox
                        className="snip_gen"
                        width={garageWidthInner}
                        height={halfHeight}
                        resizeHandles={["n"]}
                    >
                        <Panel className="snip_gen" />
                    </ResizableBox>
                </div>
            </ResizableBox>
            <ResizableBox
                className="workstation row"
                width={workstationWidth}
                height={fullHeight}
                resizeHandles={["w", "e", "n", "s"]}
            >
                <div className="development panel shadow--raised col">
                    <Panel className="development" />
                </div>
            </ResizableBox>
            <ResizableBox
                className="library row"
                width={libraryWidth}
                height={halfHeight}
                resizeHandles={["e", "w"]}
                onResize={handleLibraryResize}
            >
                <div className="know_guide panel shadow--raised col">
                    <ResizableBox
                        className="know_guide"
                        width={libraryWidthInner}
                        height={halfHeight}
                        resizeHandles={["s"]}
                    >
                        <Panel className="know_guide" />
                    </ResizableBox>
                </div>
                <div className="lip_doc panel shadow--raised col">
                    <ResizableBox
                        className="lip_doc"
                        width={libraryWidthInner}
                        height={halfHeight}
                        resizeHandles={["n"]}
                    >
                        <Panel className="lip_doc" />
                    </ResizableBox>
                </div>
            </ResizableBox>
            <ResizableBox
                className="managements row"
                width={managementsWidth}
                height={halfHeight}
                resizeHandles={["w"]}
                onResize={handleManagementsResize}
            >
                <div className="project panel shadow--raised col">
                    <ResizableBox
                        className="project"
                        width={managementsWidthInner}
                        height={halfHeight}
                        resizeHandles={["s"]}
                    >
                        <Panel className="project" />
                    </ResizableBox>
                </div>
                <div className="personal panel shadow--raised col">
                    <ResizableBox
                        className="personal"
                        width={managementsWidthInner}
                        height={halfHeight}
                        resizeHandles={["n"]}
                    >
                        <Panel className="personal" />
                    </ResizableBox>
                </div>
            </ResizableBox>
        </div>
    );
}

export default Desk;
