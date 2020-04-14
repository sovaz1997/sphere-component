import Sphere from './components/sphere';
import data from '../data/data.json';

window.onload = () => {
  const sphere = new Sphere(data, 600);

  const app = document.getElementById('app');
  app.innerHTML = '';
  app.append(sphere.el);
};
