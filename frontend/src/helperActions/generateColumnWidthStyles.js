function generateColumnWidthStyles() {
    let styles = '';
    for (let i = 0; i <= 100; i++) {
        styles += `.col-w_${i} { width: ${i}%; }\n`;
    }
    return styles;
}

const columnWidthStyles = generateColumnWidthStyles();
const columnStyleElement = document.createElement('style');
columnStyleElement.textContent = columnWidthStyles;
document.head.appendChild(columnStyleElement);

function generateRowHeightStyles() {
    let styles = '';
    for (let i = 0; i <= 100; i++) {
        styles += `.row-h_${i} { height: ${i}%; }\n`;
    }
    return styles;
}

const rowHeightStyles = generateRowHeightStyles();
const rowStyleElement = document.createElement('style');
rowStyleElement.textContent = rowHeightStyles;
document.head.appendChild(rowStyleElement);