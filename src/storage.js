export default class Storage {
  constructor() {
    this._offersInfo = {};
    this._destinationsInfo = {};
  }

  static setOffers(offersInfo) {
    this._offersInfo = offersInfo;
  }

  static setDestinations(destinationsInfo) {
    this._destinationsInfo = destinationsInfo;
  }

  static getOffers() {
    return this._offersInfo;
  }

  static getDestinations() {
    return this._destinationsInfo;
  }
}
