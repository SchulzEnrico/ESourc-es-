import React, { SyntheticEvent } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

type CustomResizableBoxProps = Omit<ResizableBoxProps, "width" | "height"> & {
    onResizeEnd: (size: { width: number; height: number }) => void;
    id: string;
    width: number;
    height: number;
};

const CustomResizableBox: React.FC<CustomResizableBoxProps> = ({ onResizeEnd, width, height, ...restProps }) => {

    const handleResize = (_: SyntheticEvent, { size }: { size: { width: number; height: number } }) => {
        onResizeEnd(size);
    };

    return <ResizableBox {...restProps} width={width} height={height} onResize={handleResize} />;
};

export default CustomResizableBox;