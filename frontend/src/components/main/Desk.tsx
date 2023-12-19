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
const fullHeight = 772;

function Desk() {
    const [garageWidthInner, setGarageWidthInner] = useState(garageWidth);
    const [workstationWidthInner, setWorkstationWidthInner] = useState(workstationWidth);
    const [libraryWidthInner, setLibraryWidthInner] = useState(libraryWidth);
    const [managementsWidthInner, setManagementsWidthInner] = useState(managementsWidth);

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
                width={garageWidth}
                height={halfHeight}
                resizeHandles={["e"]}
                onResizeEnd={handleGarageResizeEnd}
            >
                <div className="ins_pro panel shadow--raised col">
                    <CustomResizableBox
                        className="ins_pro"
                        width={garageWidthInner}
                        height={halfHeight}
                        resizeHandles={["s"]}
                        onResizeEnd={handleGarageResizeEnd}
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
                    >
                        <Panel className="snip_gen" />
                    </CustomResizableBox>
                </div>
            </CustomResizableBox>
            <CustomResizableBox
                className="workstation row"
                width={workstationWidth}
                height={fullHeight}
                resizeHandles={["w", "e"]}
                onResizeEnd={handleWorkstationResizeEnd}
            >
                <div className="development panel shadow--raised col">
                    {/* Hier wurden die Workstation-spezifischen Anpassungen hinzugefügt */}
                    <CustomResizableBox
                        className="devolpment"
                        width={workstationWidthInner}
                        height={fullHeight}
                        resizeHandles={["n", "s"]}
                        onResizeEnd={handleWorkstationResizeEnd}
                    >
                        <Panel className="development" />
                    </CustomResizableBox>
                </div>
            </CustomResizableBox>
            <CustomResizableBox
                className="library row"
                width={libraryWidth}
                height={halfHeight}
                resizeHandles={["e", "w"]}
                onResizeEnd={handleLibraryResizeEnd}
            >
                <div className="know_guide panel shadow--raised col">
                    <CustomResizableBox
                        className="know_guide"
                        width={libraryWidthInner}
                        height={halfHeight}
                        resizeHandles={["s"]}
                        onResizeEnd={handleLibraryResizeEnd}
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
                    >
                        <Panel className="lip_doc" />
                    </CustomResizableBox>
                </div>
            </CustomResizableBox>
            <CustomResizableBox
                className="managements row"
                width={managementsWidth}
                height={halfHeight}
                resizeHandles={["w"]}
                onResizeEnd={handleManagementsResizeEnd}
            >
                <div className="project panel shadow--raised col">
                    <CustomResizableBox
                        className="project"
                        width={managementsWidthInner}
                        height={halfHeight}
                        resizeHandles={["s"]}
                        onResizeEnd={handleManagementsResizeEnd}
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
                    >
                        <Panel className="personal" />
                    </CustomResizableBox>
                </div>
            </CustomResizableBox>
        </div>
    );
}

export default Desk;
