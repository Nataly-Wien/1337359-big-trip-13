export default class Observer {
  constructor() {
    this._observers = [];
  }

  subscribe(observer) {
    this._observers.push(observer);
  }

  unsubscribe(observer) {
    this._observers.filter((item) => item !== observer);
  }

  _notify(evt, payload) {
    this._observers.forEach((callback) => callback(evt, payload));
  }
}
