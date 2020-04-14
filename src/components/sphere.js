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
  }

  render() {
    this.movePoints();

    this.state.points.forEach((point) => {
      this.app.stage.addChild(point.circle);
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

    this.drawContainer = new PIXI.Container();
    this.app.stage.addChild(this.drawContainer);

    this.el.append(this.app.view);


    this.appendPoints();

    this.app.ticker.add(() => {
      this.render();
      this.movePoints();
    });
  }

  getCircle(position) {
    const gfx = new PIXI.Graphics();
    gfx.interactive = true;
    gfx.beginFill(0xFF0000);
    gfx.lineStyle(0);
    const coords = this.getCoords(position);
    gfx.drawCircle(0, 0, 3);
    gfx.endFill();

    gfx.x = coords.x;
    gfx.y = coords.y;

    return gfx;
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
    const circle = this.getCircle(position, data);
    this.app.stage.addChild(circle);
    this.state.points.push({
      position,
      speed,
      data,
      circle,
    });
  }

  movePoints() {
    this.state.points.forEach((point) => {
      const { position, circle, speed } = point;
      position.angle += speed;
      const coords = this.getCoords(position);
      circle.x = coords.x;
      circle.y = coords.y;
    });
  }
}
