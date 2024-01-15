import 'react-resizable/css/styles.css';
import '../../css/DeskGrid.css';
import '../../css/DeskStyles.css';
import Panel from './Panel.tsx';
import '../../css/Resizeable.css';
import { useState } from 'react';
import CustomResizableBox from './CustomResizableBox.tsx';

const viewportToPixels = (value: string) => {
    const parts = value.match(/([0-9.]+)(vh|vw)/)

    if (!parts) return 0;

    const q = Number(parts[1])
    const side = parts[2] === "vw" ? window.innerWidth : window.innerHeight
    return side * (q / 100)
}

const garageInitialWidth = viewportToPixels("20vw");
const workstationInitialWidth = viewportToPixels("30vw");
const libraryInitialWidth = viewportToPixels("20vw");
const managementsInitialWidth = viewportToPixels("15vw");

const halfHeight = viewportToPixels("35vh");
const fullHeight = viewportToPixels("79vh");

function Desk() {
    const [garageWidthPixels, setGarageWidthPixels] = useState<number>(garageInitialWidth);
    const [workstationWidthPixels, setWorkstationWidthPixels] = useState<number>(workstationInitialWidth);
    const [libraryWidthPixels, setLibraryWidthPixels] = useState<number>(libraryInitialWidth);
    const [managementsWidthPixels, setManagementsWidthPixels] = useState<number>(managementsInitialWidth);

    const handleGarageResizeEnd = (size: { width: number; height: number }) => {
        setGarageWidthPixels(size.width);
    };

    const handleWorkstationResizeEnd = (size: { width: number; height: number }) => {
        setWorkstationWidthPixels(size.width);
    };

    const handleLibraryResizeEnd = (size: { width: number; height: number }) => {
        setLibraryWidthPixels(size.width);
    };

    const handleManagementsResizeEnd = (size: { width: number; height: number }) => {
        setManagementsWidthPixels(size.width);
    };

    return (
        <div className="esources-desk">
            <CustomResizableBox
                className="garage row"
                width={garageWidthPixels}
                height={halfHeight}
                resizeHandles={["e"]}
                onResizeEnd={handleGarageResizeEnd}
                id="garage"
            >
                <div className="ins_pro panel shadow--raised col">
                    <CustomResizableBox
                        className="ins_pro"
                        width={garageWidthPixels}
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
                        width={garageWidthPixels}
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
                width={workstationWidthPixels}
                height={fullHeight}
                resizeHandles={["w", "e"]}
                onResizeEnd={handleWorkstationResizeEnd}
                id="workstation"
            >
                <div className="development panel shadow--raised col">
                    <CustomResizableBox
                        className="development"
                        width={workstationWidthPixels}
                        height={fullHeight}
                        resizeHandles={["n", "s"]}
                        onResizeEnd={handleWorkstationResizeEnd}
                        id="development"
                    >
                        <Panel className="development" />
                    </CustomResizableBox>
                </div>
            </CustomResizableBox>
            <CustomResizableBox
                className="library row"
                width={libraryWidthPixels}
                height={halfHeight}
                resizeHandles={["e", "w"]}
                onResizeEnd={handleLibraryResizeEnd}
                id="library"
            >
                <div className="know_guide panel shadow--raised col">
                    <CustomResizableBox
                        className="know_guide"
                        width={libraryWidthPixels}
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
                        width={libraryWidthPixels}
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
                width={managementsWidthPixels}
                height={halfHeight}
                resizeHandles={["w"]}
                onResizeEnd={handleManagementsResizeEnd}
                id="managements"
            >
                <div className="project panel shadow--raised col">
                    <CustomResizableBox
                        className="project"
                        width={managementsWidthPixels}
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
                        width={managementsWidthPixels}
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