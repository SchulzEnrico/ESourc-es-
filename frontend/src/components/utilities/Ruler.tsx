import React from 'react';

const Ruler: React.FC = () => {
    const rulerStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
    };

    const rulerLine: React.CSSProperties = {
        position: 'absolute',
        backgroundColor: 'lightgray',
        opacity: 0.5,
    };

    const rulerLineDark: React.CSSProperties = {
        ...rulerLine,
        backgroundColor: 'darkgray',
    };

    const rulerLineRed: React.CSSProperties = {
        ...rulerLine,
        backgroundColor: 'red',
    };

    const rulerLines: JSX.Element[] = [];
    for (let i = 0; i < 2000; i++) { // Adjust this loop limit as per your requirement
        const isMultipleOfFive = i % 5 === 0;
        const isMultipleOfTen = i % 10 === 0;
        const isMultipleOfFifty = i % 50 === 0;
        const isMultipleOfHundred = i % 100 === 0;

        const lineHeight = isMultipleOfTen ? 20 : isMultipleOfFive ? 10 : 5;
        const lineStyle = isMultipleOfFifty ? rulerLineDark : isMultipleOfHundred ? rulerLineRed : rulerLine;

        rulerLines.push(
            <div
                key={i}
                style={{
                    ...lineStyle,
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
                style={{
                    ...lineStyle,
                    width: `${lineHeight}px`,
                    height: '1px',
                    top: `${i * 10}px`,
                    left: '0',
                }}
            />
        );

        if (isMultipleOfFifty || isMultipleOfHundred) {
            rulerLines.push(
                <div
                    key={`label-${i}`}
                    style={{
                        position: 'relative',
                        color: isMultipleOfHundred ? 'red' : 'black',
                        top: isMultipleOfHundred ? `${i * 10}px` : '0',
                        left: isMultipleOfHundred ? '0' : `${i * 10}px`,
                        fontSize: '12px',
                        fontWeight: 'bold',
                    }}
                >
                    {i * 10}
                </div>
            );
        }
    }

    return <div className={"ruler"} style={rulerStyle}>{rulerLines}</div>;
};

export default Ruler;
