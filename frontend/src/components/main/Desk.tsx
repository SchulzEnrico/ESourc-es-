import 'react-resizable/css/styles.css';
import '../../css/DeskGrid.css';
import '../../css/DeskStyles.css';
import Panel from './Panel.tsx';
import '../../css/Resizeable.css';
import { useState } from 'react';
import CustomResizableBox from './CustomResizableBox.tsx';

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


    const fullHeight = viewportToPixels("78vh");

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
                height={fullHeight}
                resizeHandles={["e"]}
                onResizeEnd={handleGarageResizeEnd}
                id="garage"
            >
                <div className="inner-panels-wrapper">
                    <div className="ins_pro panel shadow--raised col">
                        <CustomResizableBox
                            className="ins_pro"
                            width={garageWidthPixels}
                            height={viewportToPixels("36.3vh")}
                            resizeHandles={["s"]}
                            onResizeEnd={handleGarageResizeEnd}
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
                            height={viewportToPixels("36.3vh")}
                            resizeHandles={["s"]}
                            onResizeEnd={handleGarageResizeEnd}
                            id="snip_gen"
                        >
                            <Panel className="snip_gen"/>
                        </CustomResizableBox>
                    </div>
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
                resizeHandles={["e", "w"]}
                onResizeEnd={handleLibraryResizeEnd}
                id="library"
            >
                <div className="inner-panels-wrapper">
                    <div className="know_guide panel shadow--raised col">
                        <CustomResizableBox
                            className="know_guide"
                            width={libraryWidthPixels}
                            height={viewportToPixels("36.3vh")}
                            resizeHandles={["s"]}
                            onResizeEnd={handleLibraryResizeEnd}
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
                            height={viewportToPixels("36.3vh")}
                            resizeHandles={["s"]}
                            onResizeEnd={handleLibraryResizeEnd}
                            id="lip_doc"
                        >
                            <Panel className="lip_doc"/>
                        </CustomResizableBox>
                    </div>
                </div>
            </CustomResizableBox>
            <CustomResizableBox
                className="managements row"
                width={managementsWidthPixels}
                height={fullHeight}
                resizeHandles={["w"]}
                onResizeEnd={handleManagementsResizeEnd}
                id="managements"
            >
                <div className="inner-panels-wrapper">
                    <div className="project panel shadow--raised col">
                        <CustomResizableBox
                            className="project"
                            width={managementsWidthPixels}
                            height={viewportToPixels("36.3vh")}
                            resizeHandles={["s"]}
                            onResizeEnd={handleManagementsResizeEnd}
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
                            height={viewportToPixels("36.3vh")}
                            resizeHandles={["s"]}
                            onResizeEnd={handleManagementsResizeEnd}
                            id="personal"
                        >
                            <Panel className="personal"/>
                        </CustomResizableBox>
                    </div>
                </div>
            </CustomResizableBox>
        </div>
    );
}

export default Desk;