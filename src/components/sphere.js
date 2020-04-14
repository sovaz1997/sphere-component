import * as PIXI from 'pixi.js';


export default class Sphere {
  constructor(size = 200) {
    this.size = size;
    this.createElement();
  }

  createElement() {
    this.el = document.createElement('div');

    this.app = new PIXI.Application({ width: this.size, height: this.size });
    this.el.append(this.app.view);
  }
}
