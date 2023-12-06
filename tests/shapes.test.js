// shapes.test.js

const { Circle, Triangle, Square } = require('./shapes');

describe('Circle class', () => {
  test('renders correctly', () => {
    const circle = new Circle('#FF0000');
    expect(circle.render()).toEqual('<circle cx="150" cy="100" r="80" fill="#FF0000" />');
  });

  test('setColor updates color', () => {
    const circle = new Circle('#FF0000');
    circle.setColor('#00FF00');
    expect(circle.color).toBe('#00FF00');
  });
});

describe('Triangle class', () => {
  test('renders correctly', () => {
    const triangle = new Triangle('#00FF00');
    expect(triangle.render()).toEqual('<polygon points="150,18 244,182 56,182" fill="#00FF00" />');
  });

  test('setColor updates color', () => {
    const triangle = new Triangle('#00FF00');
    triangle.setColor('#0000FF');
    expect(triangle.color).toBe('#0000FF');
  });
});

describe('Square class', () => {
  test('renders correctly', () => {
    const square = new Square('#0000FF');
    expect(square.render()).toEqual('<rect x="50" y="50" width="200" height="100" fill="#0000FF" />');
  });

  test('setColor updates color', () => {
    const square = new Square('#0000FF');
    square.setColor('#FF0000');
    expect(square.color).toBe('#FF0000');
  });
});
