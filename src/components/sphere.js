import * as PIXI from 'pixi.js';

export default class Sphere {
  state = {
    points: [],
  };

  constructor(data, size = 300, pointRadius = 3, pointCount = 20) {
    this.size = size;
    this.pointRadius = pointRadius;
    this.data = Sphere.normalizeData(data, pointCount);

    this.createElement();
    this.appendPoints();
    this.render();
  }

  render() {
    this.state.points.forEach((point) => {
      const position = this.getCoords(point.position);

      this.drawContainer.beginFill(0xDE3249, 1);
      this.drawContainer.drawCircle(position.x, position.y, 5);
      this.drawContainer.endFill();
    });
  }

  getCoords(position) {
    return {
      x: this.size / 2 + position.radius * Math.cos(position.angle),
      y: this.size / 2 + position.radius * Math.sin(position.angle),
    };
  }

  static normalizeData(data, count) {
    const res = [];

    for (let i = 0; i < data.items.length && i < count; i += 1) {
      res.push(data.items[i]);
    }

    return res;
  }

  getDrawRadius() {
    return this.size / 2 - this.pointRadius - 5;
  }

  createElement() {
    this.el = document.createElement('div');

    this.app = new PIXI.Application({
      width: this.size,
      height: this.size,
      transparent: true,
      antialias: true,
    });

    this.drawContainer = new PIXI.Graphics();
    this.app.stage.addChild(this.drawContainer);

    this.el.append(this.app.view);
  }

  appendPoints() {
    for (let i = 0; i < this.data.length; i += 1) {
      const position = {
        angle: 2 * Math.PI * Math.random(),
        radius: ((i + 1) / this.data.length) * this.getDrawRadius(),
      };

      const speed = Math.random() * 0.1 - 0.05;

      this.appendPoint(position, speed, this.data[i]);
    }
  }

  appendPoint(position, speed, data) {
    this.state.points.push({ position, speed, data });
  }

  movePoints() {
    for (let i = 0; i < this.data.length; i += 1) {
      this.data[i].position.angle += this.data[i].speed;
    }
  }
}
