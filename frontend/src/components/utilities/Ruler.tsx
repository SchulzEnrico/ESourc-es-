import React, { useState, useRef, useEffect } from 'react';
import '../../css/Ruler.css'; // Importieren Sie Ihre CSS-Datei
import ColorSlider from './ColorSlider';

const Ruler: React.FC = () => {
    const initialColors = ['darkgray', 'black', 'brown', 'blue', 'green', 'red', 'orange', 'yellow', 'white'];
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [showLabels, setShowLabels] = useState(true); // Zustand für Beschriftungen hinzugefügt

    const rulerRef = useRef<HTMLDivElement>(null);

    const handleColorChange = (newIndex: number) => {
        setCurrentColorIndex(newIndex);
    };

    const toggleLabels = () => {
        setShowLabels(!showLabels);
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

    const stepSize = 100; // Schrittgröße von 100

    const rulerLabelsHorizontal: JSX.Element[] = [];
    const rulerLabelsVertical: JSX.Element[] = [];

    for (let i = 0; i <= 2000; i += stepSize) {
        if (i !== 0) { // Überspringen der Beschriftung "0"
            rulerLabelsHorizontal.push(
                <div
                    key={`label-horizontal-${i}`}
                    className="ruler-label"
                    style={{
                        position: 'absolute',
                        top: '5px',
                        left: `${i * (1 * stepSize / 100)}px`, // Positionierung basierend auf der Anzahl der Schritte
                        fontSize: '10px',
                        visibility: showLabels ? 'visible' : 'hidden',
                    }}
                >
                    {i}
                </div>
            );
        }

        if (i > 0) { // Nur Beschriftung für Werte größer als 0
            rulerLabelsVertical.push(
                <div
                    key={`label-vertical-${i}`}
                    className="ruler-label"
                    style={{
                        position: 'absolute',
                        top: `${i * (1 * stepSize / 100)}px`, // Positionierung basierend auf der Anzahl der Schritte
                        left: '5px', // Anpassung für vertikale Beschriftungen
                        fontSize: '10px',
                        visibility: showLabels ? 'visible' : 'hidden',
                    }}
                >
                    {i}
                </div>
            );
        }
    }


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
                    position: 'absolute',
                    opacity: 0.5,
                    backgroundColor: initialColors[currentColorIndex],
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
                    position: 'absolute',
                    opacity: 0.5,
                    backgroundColor: initialColors[currentColorIndex],
                    width: `${lineHeight}px`,
                    height: '1px',
                    top: `${i * 10}px`,
                    left: '0',
                }}
            />
        );
    }

    return (
        <div className={"ruler"}
             style={rulerStyle}
             ref={rulerRef}>
            <ColorSlider
                colors={initialColors}
                currentColorIndex={currentColorIndex}
                setCurrentColorIndex={handleColorChange}
            />
            <button onClick={toggleLabels}>Toggle Labels</button>
            {/* Button zum Ein- und Ausschalten der Beschriftungen */}
            {rulerLines}
            {rulerLabelsHorizontal}
            {rulerLabelsVertical} {/* Fügen Sie die vertikalen Beschriftungen hier ein */}
        </div>
    );
}
export default Ruler;
