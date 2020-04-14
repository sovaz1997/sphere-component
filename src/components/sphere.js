import * as PIXI from 'pixi.js';

export default class Sphere {
  state = {
    points: [],
    rotation: true,
  };

  constructor(data, size = 300, pointRadius = 3, pointCount = 20) {
    this.size = size;
    this.pointRadius = pointRadius;
    this.data = Sphere.normalizeData(data, pointCount);

    this.createElement();
    this.addEventListeners();
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
    this.el.classList.add('sphere');

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

  getCircle(position, data) {
    const gfx = new PIXI.Graphics();
    gfx.interactive = true;


    let alpha = Number(data.filled);

    if (!alpha) alpha += 0.001;

    gfx.beginFill(0xFF0000, alpha);
    gfx.lineStyle({ width: 1, color: 0xFF0000 });

    const coords = this.getCoords(position);
    gfx.drawCircle(0, 0, this.pointRadius);
    gfx.endFill();

    gfx.x = coords.x;
    gfx.y = coords.y;

    gfx.on('mousedown', () => {
      window.open(data.link, '_blank');
    });

    return gfx;
  }

  appendPoints() {
    for (let i = 0; i < this.data.length; i += 1) {
      const position = {
        angle: 2 * Math.PI * Math.random(),
        radius: ((i + 1) / this.data.length) * this.getDrawRadius(),
      };

      const speed = Math.random() * 0.02 - 0.01;
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
    if (!this.state.rotation) return;

    this.state.points.forEach((point) => {
      const { position, circle, speed } = point;
      position.angle += speed;
      const coords = this.getCoords(position);
      circle.x = coords.x;
      circle.y = coords.y;
    });
  }

  addEventListeners() {
    this.el.addEventListener('mouseover', () => {
      this.state.rotation = false;
    });

    this.el.addEventListener('mouseleave', () => {
      this.state.rotation = true;
    });
  }
}
