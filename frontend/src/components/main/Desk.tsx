import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './DeskGrid.css';
import './DeskStyles.css'
import Panel from "./Panel.tsx";
import './Resizeable.css'

const insProWidth = 700;
const devWidth = 1200;
const libraryWidth = 900;
const managementsWidth = 600;

const halfHeight = 330;
const fullHeight = 772;


function Desk() {
    return (
        <div className="esources-desk">
            <div className="garage row">
                <ResizableBox className="ins_pro panel shadow--raised col"
                              width={insProWidth}
                              height={halfHeight}
                              resizeHandles={["se", "s", "e"]}>
                    <Panel className="ins_pro" />
                </ResizableBox>
                <ResizableBox className="snip_gen panel shadow--raised col"
                              width={insProWidth}
                              height={halfHeight}
                              resizeHandles={["ne", "e", "n"]}>
                    <Panel className="snip_gen" />
                </ResizableBox>
            </div>
            <div className="workstation row">
                <ResizableBox className="development panel shadow--raised col"
                              width={devWidth}
                              height={fullHeight}
                              resizeHandles={["w", "e", "n", "s"]}>
                    <Panel className="development" />
                </ResizableBox>
            </div>
            <div className="library row">
                <ResizableBox className="know_guide panel shadow--raised col"
                              width={libraryWidth}
                              height={halfHeight}
                              resizeHandles={["sw", "se", "w", "e", "s"]}>
                    <Panel className="know_guide" />
                </ResizableBox>
                <ResizableBox className="lip_doc panel shadow--raised col"
                              width={libraryWidth}
                              height={halfHeight}
                              resizeHandles={["sw", "se", "nw", "ne", "w", "e", "n", "s"]}>
                    <Panel className="lip_doc" />
                </ResizableBox>
            </div>
            <div className="managements row">
                <ResizableBox className="project panel shadow--raised col"
                              width={managementsWidth}
                              height={halfHeight}
                              resizeHandles={["sw", "w", "s"]}>
                    <Panel className="project" />
                </ResizableBox>
                <ResizableBox className="personal panel shadow--raised col"
                              width={managementsWidth}
                              height={halfHeight}
                              resizeHandles={["sw", "w", "s"]}>
                    <Panel className="personal" />
                </ResizableBox>
            </div>
        </div>
    );
}

export default Desk;