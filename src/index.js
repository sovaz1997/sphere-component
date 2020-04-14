import Sphere from './components/sphere';

window.onload = () => {
  const sphere = new Sphere(300);

  const app = document.getElementById('app');
  app.innerHTML = '';
  app.append(sphere.el);
};
