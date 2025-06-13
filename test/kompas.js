const { describe, it, beforeEach, afterEach } = require('node:test');

const kompas = require('../');

function dispatch(options) {
  const ev = new window.Event('deviceorientation');
  Object.assign(ev, options);
  window.dispatchEvent(ev);
}

describe('kompas', () => {
  beforeEach(function () {
    this.k = kompas().watch();
  });

  afterEach(function () {
    this.k.clear();
  });

  it('must display heading if provided', function (_, done) {
    this.k.on('heading', heading => {
      setTimeout(() => {
        heading.should.equal(270);
        done();
      }, 0);
    });
    dispatch({ webkitCompassHeading: 270 });
  });

  it('must calculate heading if not provided', function (_, done) {
    this.k.on('heading', heading => {
      setTimeout(() => {
        heading.should.be.within(-360, 360);
        done();
      }, 0);
    });
    dispatch({ absolute: true, alpha: 200, beta: 1, gamma: 1 });
  });
});
