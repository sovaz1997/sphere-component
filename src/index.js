import Sphere from './components/sphere';

window.onload = () => {
  const sphere = new Sphere();

  const app = document.getElementById('app');
  app.innerHTML = '';
  app.append(sphere.el);
};
