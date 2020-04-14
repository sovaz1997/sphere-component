import * as PIXI from 'pixi.js';

export default class Sphere {
  state = {
    points: [],
  };

  constructor(data, size = 200) {
    this.data = data;
    this.size = size;
    this.createElement();
  }

  createElement() {
    this.el = document.createElement('div');

    this.app = new PIXI.Application({ width: this.size, height: this.size, transparent: true });
    this.el.append(this.app.view);
  }

  appendPoints() {
    for (let i = 0; i < this.data.length; i += 1) {
      const position = {
        angle: 2 * Math.PI * Math.random(),
        radius: ((i + 1) / this.data.length) * (this.size / 2),
      };

      const speed = Math.random() * 0.1 - 0.05;

      this.appendPoint(position, speed, this.data[i]);
    }
  }

  appendPoint(position, speed, data) {
    this.state.points.push({ position, speed, data });
  }
}
