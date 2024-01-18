import fs from 'fs';
import { createSVGWindow } from 'svgdom';
import { SVG, registerWindow } from '@svgdotjs/svg.js';

const window = createSVGWindow();
const document = window.document;
registerWindow(window, document);

// Function to get user input
import readlineSync from 'readline-sync';

function getUserInput(prompt) {
    return readlineSync.question(prompt);
}
// Function to create SVG file
function createSVG(text, textColor, shape, shapeColor) {
    const draw = SVG().size(400, 300); // Increased size of the SVG canvas

    // Add shape to SVG
    if (shape === 'circle') {
        draw.circle(150).move(125, 75).fill(shapeColor); // Increased radius to 150
    } else if (shape === 'triangle') {
        draw.polygon([[200, 75], [125, 225], [275, 225]]).fill(shapeColor);
    } else if (shape === 'square') {
        draw.rect(150, 150).move(125, 75).fill(shapeColor); // Increased size to 150x150
    }

    // Add text to SVG
    const textElement = draw.text(text).fill(textColor);
    
    // Set font size and center text
    textElement.font({
        family: 'Arial',
        size: 30,
        anchor: 'middle', 
        leading: '1.5em', 
    });

    // Center horizontally
    const textWidth = textElement.bbox().width;
    const svgWidth = draw.width();
    const offsetX = (svgWidth - textWidth) / 2;
    textElement.dx(offsetX + 31);

    // Center vertically
    const textHeight = textElement.bbox().height;
    const svgHeight = draw.height();
    const offsetY = (svgHeight - textHeight) / 2;
    textElement.dy(offsetY + 40);

    fs.writeFileSync('logo.svg', draw.svg());
}

// Main function
function main() {
    // Get user input
    const text = getUserInput('Enter up to three characters: ');
    const textColor = getUserInput('Enter text color (keyword or hexadecimal): ');

    // Prompt for shape selection
    console.log('Choose a shape:');
    console.log('1. Circle');
    console.log('2. Triangle');
    console.log('3. Square');

    const shapeChoice = getUserInput('Enter the number corresponding to the shape: ');

    // Map user input to shape
    const shapeMapping = { '1': 'circle', '2': 'triangle', '3': 'square' };
    const shape = shapeMapping[shapeChoice] || 'circle';

    const shapeColor = getUserInput('Enter shape color (keyword or hexadecimal): ');

    // Create SVG file
    createSVG(text, textColor, shape, shapeColor);

    // Print output message
    console.log('Generated logo.svg');
}

// Run the application
main();