import inquirer from 'inquirer';
import fs from 'fs/promises';

class ShapeGenerator {
  constructor(shapes) {
    this.shapes = shapes;
  }

  validateColor(input) {
    return /^[a-fA-F0-9]{6}$/.test(input) || /^[a-fA-F0-9]{3}$/.test(input) || /^[a-zA-Z]+$/.test(input);
  }

  async promptUser() {
    const userInput = await inquirer.prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the text:',
        validate: (input) => input.length <= 3,
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter text color (keyword or hex):',
        validate: this.validateColor,
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: this.shapes,
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter shape color (keyword or hex):',
        validate: this.validateColor,
      },
    ]);

    return userInput;
  }

  generateSVG(text, textColor, shape, shapeColor) {
    const shapeContent = this.getShapeContent(shape, shapeColor);
    const svgContent = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${shapeColor}" />
      ${shapeContent}
      <text x="50%" y="50%" fill="${textColor}" font-size="24" text-anchor="middle" alignment-baseline="middle">${text}</text>
    </svg>`;

    return svgContent;
  }

  getShapeContent(shape, shapeColor) {
    switch (shape) {
      case 'circle':
        return new Circle(shapeColor).render();
      case 'triangle':
        return new Triangle(shapeColor).render();
      case 'square':
        return new Square(shapeColor).render();
      default:
        throw new Error('Invalid shape type');
    }
  }

  async generateLogo() {
    try {
      const userInput = await this.promptUser();
      const svgContent = this.generateSVG(userInput.text, userInput.textColor, userInput.shape, userInput.shapeColor);

      await fs.writeFile('logo.svg', svgContent);
      console.log('Generated logo.svg');
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
}

class Shape {
  constructor(color) {
    this.color = color;
  }

  setColor(color) {
    this.color = color;
  }

  render() {
    throw new Error('Render method must be implemented by subclasses');
  }
}

class Circle extends Shape {
  render() {
    return `<circle cx="150" cy="100" r="80" fill="${this.color}" />`;
  }
}

class Triangle extends Shape {
  render() {
    return `<polygon points="150,18 244,182 56,182" fill="${this.color}" />`;
  }
}

class Square extends Shape {
  render() {
    return `<rect x="50" y="50" width="200" height="100" fill="${this.color}" />`;
  }
}

const shapeGenerator = new ShapeGenerator(['circle', 'triangle', 'square']);
shapeGenerator.generateLogo();

