export default class Utils {
  static randInRange(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }
}
