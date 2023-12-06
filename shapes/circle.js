// shapes/Circle.js
const Shape = require('./Shape');

class Circle extends Shape {
  render() {
    return `<circle cx="150" cy="100" r="80" fill="${this.color}" />`;
  }
}

module.exports = Circle;
