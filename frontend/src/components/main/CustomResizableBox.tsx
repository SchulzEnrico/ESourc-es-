import React, { SyntheticEvent } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

type CustomResizableBoxProps = ResizableBoxProps & {
    onResizeEnd: (size: { width: number; height: number }) => void;
};

const CustomResizableBox: React.FC<CustomResizableBoxProps> = ({ onResizeEnd, ...restProps }) => {
    const handleResize = (_: SyntheticEvent, data: { size: { width: number; height: number } }) => {
        onResizeEnd(data.size);
    };

    return <ResizableBox {...restProps} onResize={handleResize} />;
};

export default CustomResizableBox;
