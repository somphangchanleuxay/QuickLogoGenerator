const fs = require('fs');
const SVG = require('svg.js');

// Function to get user input
function getUserInput(prompt) {
    const readlineSync = require('readline-sync');
    return readlineSync.question(prompt);
}

// Function to create SVG file
function createSVG(text, textColor, shape, shapeColor) {
    const draw = SVG().size(300, 200);

    // Add shape to SVG
    if (shape === 'circle') {
        draw.circle(100).move(100, 50).fill(shapeColor);
    } else if (shape === 'triangle') {
        draw.polygon([[150, 50], [100, 150], [200, 150]]).fill(shapeColor);
    } else if (shape === 'square') {
        draw.rect(100, 100).move(100, 50).fill(shapeColor);
    }

    // Add text to SVG
    draw.text(text).move(150, 100).fill(textColor);

    // Save SVG file
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