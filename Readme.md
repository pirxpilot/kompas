[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# kompas

Calculates heading based on `deviceorientation` event.
The algorithm is a version proposed in the [stackoverflow answer] and [deviceorientation spec] modified for [chrome].
Check out [demo] page to see how it works on your device.

## Install

```sh
$ npm install --save kompas
```

## Usage

```js
const kompas = require('kompas');

// start watching and add callback
kompas.watch();


kompas.on('heading', function(heading) {
  console.log('Heading:', heading);
});

// stop watching
kompas.clear();

```

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[demo]: https://pirxpilot.github.io/kompas/

[stackoverflow answer]: https://stackoverflow.com/questions/18112729/calculate-kompas-from-deviceorientation-event-api#21829819
[deviceorientation spec]: https://w3c.github.io/deviceorientation/#worked-example

[chrome]: https://developers.google.com/web/updates/2016/03/device-orientation-changes

[npm-image]: https://img.shields.io/npm/v/kompas
[npm-url]: https://npmjs.org/package/kompas

[build-url]: https://github.com/pirxpilot/kompas/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/kompas/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/kompas
[deps-url]: https://libraries.io/npm/kompas

