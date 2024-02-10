import React, { useState, useRef, useEffect } from 'react';
import '../../css/Ruler.css'; // Importieren Sie Ihre CSS-Datei
import ColorSlider from './ColorSlider';

const Ruler: React.FC = () => {
    const initialColors = ['black', 'brown', 'blue', 'green', 'red', 'orange', 'yellow', 'white'];
    const [currentColorIndex, setCurrentColorIndex] = useState(0);

    const rulerRef = useRef<HTMLDivElement>(null);

    const handleColorChange = (newIndex: number) => {
        setCurrentColorIndex(newIndex);
    };

    useEffect(() => {
        const handleWheelEvent = (event: WheelEvent) => {
            event.preventDefault();
            const delta = event.deltaY > 0 ? 1 : -1;
            setCurrentColorIndex((prevIndex) => {
                let newIndex = prevIndex + delta;
                if (newIndex < 0) {
                    newIndex = initialColors.length - 1;
                } else if (newIndex >= initialColors.length) {
                    newIndex = 0;
                }
                return newIndex;
            });
        };

        const rulerElement = rulerRef.current;
        if (rulerElement) {
            rulerElement.addEventListener('wheel', handleWheelEvent);
            return () => {
                rulerElement.removeEventListener('wheel', handleWheelEvent);
            };
        }
    }, []);

    const rulerStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '98%',
        height: '98%',
        zIndex: 9999,
    };

    const rulerLine: React.CSSProperties = {
        position: 'absolute',
        opacity: 0.5,
        backgroundColor: initialColors[currentColorIndex],
    };

    const rulerLines: JSX.Element[] = [];
    for (let i = 0; i < 2000; i++) {
        const isMultipleOfFive = i % 5 === 0;
        const isMultipleOfTen = i % 10 === 0;

        const lineHeight = isMultipleOfTen ? 20 : isMultipleOfFive ? 10 : 5;

        rulerLines.push(
            <div
                key={i}
                className="ruler-line"
                style={{
                    ...rulerLine,
                    width: '1px',
                    height: `${lineHeight}px`,
                    top: '0',
                    left: `${i * 10}px`,
                }}
            />
        );

        rulerLines.push(
            <div
                key={`vertical-${i}`}
                className="ruler-line"
                style={{
                    ...rulerLine,
                    width: `${lineHeight}px`,
                    height: '1px',
                    top: `${i * 10}px`,
                    left: '0',
                }}
            />
        );
    }

    return (
        <div className={"ruler"} style={rulerStyle} ref={rulerRef}>
            <ColorSlider
                colors={initialColors}
                currentColorIndex={currentColorIndex}
                setCurrentColorIndex={handleColorChange}
            />
            {rulerLines}
        </div>
    );
};

export default Ruler;
