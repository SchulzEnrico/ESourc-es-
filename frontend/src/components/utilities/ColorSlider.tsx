import React from 'react';

interface ColorSliderProps {
    colors: string[];
    currentColorIndex: number;
    setCurrentColorIndex: (newIndex: number) => void;
}

const ColorSlider: React.FC<ColorSliderProps> = ({ colors, currentColorIndex, setCurrentColorIndex }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newIndex = parseInt(event.target.value);
        setCurrentColorIndex(newIndex);
    };

    const sliderStyle: React.CSSProperties = {
        background: `linear-gradient(to right, ${colors.join(', ')})`,
    };

    return (
        <div className="color-slider" style={sliderStyle}>
            <input
                type="range"
                min="0"
                max={colors.length - 1}
                value={currentColorIndex}
                onChange={handleChange}
                className="slider"
            />
            {/*<div className="color-indicator" style={{ backgroundColor: colors[currentColorIndex] }}></div>*/}
        </div>
    );
};

export default ColorSlider;
