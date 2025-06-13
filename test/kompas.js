const test = require('node:test');

const kompas = require('../');

function dispatch(options) {
  const ev = new window.Event('deviceorientation');
  Object.assign(ev, options);
  window.dispatchEvent(ev);
}

test('kompas', async t => {
  t.beforeEach(t => {
    t.kompas = kompas().watch();
  });

  t.afterEach(t => {
    t.kompas.clear();
  });

  await t.test('must display heading if provided', (t, done) => {
    t.kompas.on('heading', heading => {
      setTimeout(() => {
        t.assert.equal(heading, 270);
        done();
      }, 0);
    });
    dispatch({ webkitCompassHeading: 270 });
  });

  await t.test('must calculate heading if not provided', (t, done) => {
    t.kompas.on('heading', heading => {
      setTimeout(() => {
        t.assert.ok(heading >= -360);
        t.assert.ok(heading <= 360);
        done();
      }, 0);
    });
    dispatch({ absolute: true, alpha: 200, beta: 1, gamma: 1 });
  });
});
