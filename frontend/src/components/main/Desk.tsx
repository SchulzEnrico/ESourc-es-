import 'react-resizable/css/styles.css';
import './DeskGrid.css';
import './DeskStyles.css';
import Panel from './Panel.tsx';
import './Resizeable.css';
import { useState } from 'react';
import CustomResizableBox from './CustomResizableBox';

const garageWidth = 700;
const workstationWidth = 1200;
const libraryWidth = 900;
const managementsWidth = 600;

const halfHeight = 330;
const fullHeight = 755;

function Desk() {
    const [garageWidthInner, setGarageWidthInner] = useState(garageWidth);
    const [workstationWidthInner, setWorkstationWidthInner] = useState(workstationWidth);
    const [libraryWidthInner, setLibraryWidthInner] = useState(libraryWidth);
    const [managementsWidthInner, setManagementsWidthInner] = useState(managementsWidth);
    const paddingValue = 5;

    const handleGarageResizeEnd = (size: { width: number; height: number }) => {
        setGarageWidthInner(size.width);
    };

    const handleWorkstationResizeEnd = (size: { width: number; height: number }) => {
        setWorkstationWidthInner(size.width);
    };

    const handleLibraryResizeEnd = (size: { width: number; height: number }) => {
        setLibraryWidthInner(size.width);
    };

    const handleManagementsResizeEnd = (size: { width: number; height: number }) => {
        setManagementsWidthInner(size.width);
    };

    return (
        <div className="esources-desk">
            <CustomResizableBox
                className="garage row"
                width={garageWidth + 2 * paddingValue}
                height={halfHeight}
                resizeHandles={["e"]}
                onResizeEnd={handleGarageResizeEnd}
                id="garage"
            >
                <div className="ins_pro panel shadow--raised col">
                    <CustomResizableBox
                        className="ins_pro"
                        width={garageWidthInner}
                        height={halfHeight}
                        resizeHandles={["s"]}
                        onResizeEnd={handleGarageResizeEnd}
                        id="ins_pro"
                    >
                        <Panel className="ins_pro" />
                    </CustomResizableBox>
                </div>
                <div className="snip_gen panel shadow--raised col">
                    <CustomResizableBox
                        className="snip_gen"
                        width={garageWidthInner}
                        height={halfHeight}
                        resizeHandles={["n"]}
                        onResizeEnd={handleGarageResizeEnd}
                        id="snip_gen"
                    >
                        <Panel className="snip_gen" />
                    </CustomResizableBox>
                </div>
            </CustomResizableBox>
            <CustomResizableBox
                className="workstation row"
                width={workstationWidth + 2 * paddingValue}
                height={fullHeight}
                resizeHandles={["w", "e"]}
                onResizeEnd={handleWorkstationResizeEnd}
                id="workstation"
            >
                <div className="development panel shadow--raised col">
                    <CustomResizableBox
                        className="devolpment"
                        width={workstationWidthInner}
                        height={fullHeight}
                        resizeHandles={["n", "s"]}
                        onResizeEnd={handleWorkstationResizeEnd}
                        id="devolpment"
                    >
                        <Panel className="development" />
                    </CustomResizableBox>
                </div>
            </CustomResizableBox>
            <CustomResizableBox
                className="library row"
                width={libraryWidth + 2 * paddingValue}
                height={halfHeight}
                resizeHandles={["e", "w"]}
                onResizeEnd={handleLibraryResizeEnd}
                id="library"
            >
                <div className="know_guide panel shadow--raised col">
                    <CustomResizableBox
                        className="know_guide"
                        width={libraryWidthInner}
                        height={halfHeight}
                        resizeHandles={["s"]}
                        onResizeEnd={handleLibraryResizeEnd}
                        id="know_guide"
                    >
                        <Panel className="know_guide" />
                    </CustomResizableBox>
                </div>
                <div className="lip_doc panel shadow--raised col">
                    <CustomResizableBox
                        className="lip_doc"
                        width={libraryWidthInner}
                        height={halfHeight}
                        resizeHandles={["n"]}
                        onResizeEnd={handleLibraryResizeEnd}
                        id="lip_doc"
                    >
                        <Panel className="lip_doc" />
                    </CustomResizableBox>
                </div>
            </CustomResizableBox>
            <CustomResizableBox
                className="managements row"
                width={managementsWidth + 2 * paddingValue}
                height={halfHeight}
                resizeHandles={["w"]}
                onResizeEnd={handleManagementsResizeEnd}
                id="managements"
            >
                <div className="project panel shadow--raised col">
                    <CustomResizableBox
                        className="project"
                        width={managementsWidthInner}
                        height={halfHeight}
                        resizeHandles={["s"]}
                        onResizeEnd={handleManagementsResizeEnd}
                        id="project"
                    >
                        <Panel className="project" />
                    </CustomResizableBox>
                </div>
                <div className="personal panel shadow--raised col">
                    <CustomResizableBox
                        className="personal"
                        width={managementsWidthInner}
                        height={halfHeight}
                        resizeHandles={["n"]}
                        onResizeEnd={handleManagementsResizeEnd}
                        id="personal"
                    >
                        <Panel className="personal" />
                    </CustomResizableBox>
                </div>
            </CustomResizableBox>
        </div>
    );
}

export default Desk;
