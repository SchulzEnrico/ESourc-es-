import React, { useCallback, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface CustomResizableBoxProps extends ResizableBoxProps {
    onResizeEnd?: (size: { width: number; height: number }) => void;
}

const CustomResizableBox: React.FC<CustomResizableBoxProps> = ({ onResizeEnd, ...props }) => {
    const [isResizing, setIsResizing] = useState(false);

    const handleResize = useCallback(
        (e: React.SyntheticEvent, data: { size: { width: number; height: number } }) => {
            if (onResizeEnd && !isResizing) {
                onResizeEnd(data.size);
            }
        },
        [onResizeEnd, isResizing]
    );

    const handleResizeStart = useCallback(() => {
        setIsResizing(true);
    }, []);

    const handleResizeStop = useCallback(() => {
        setIsResizing(false);
    }, []);

    return (
        <ResizableBox
            {...props}
            onResize={handleResize}
            onResizeStart={handleResizeStart}
            onResizeStop={handleResizeStop}
        />
    );
};

export default CustomResizableBox;
