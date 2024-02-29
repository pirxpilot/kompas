var kompas = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/.pnpm/component-emitter@2.0.0/node_modules/component-emitter/index.js
  var require_component_emitter = __commonJS({
    "node_modules/.pnpm/component-emitter@2.0.0/node_modules/component-emitter/index.js"(exports, module) {
      function Emitter(object) {
        if (object) {
          return mixin(object);
        }
        this._callbacks = /* @__PURE__ */ new Map();
      }
      function mixin(object) {
        Object.assign(object, Emitter.prototype);
        object._callbacks = /* @__PURE__ */ new Map();
        return object;
      }
      Emitter.prototype.on = function(event, listener) {
        const callbacks = this._callbacks.get(event) ?? [];
        callbacks.push(listener);
        this._callbacks.set(event, callbacks);
        return this;
      };
      Emitter.prototype.once = function(event, listener) {
        const on = (...arguments_) => {
          this.off(event, on);
          listener.apply(this, arguments_);
        };
        on.fn = listener;
        this.on(event, on);
        return this;
      };
      Emitter.prototype.off = function(event, listener) {
        if (event === void 0 && listener === void 0) {
          this._callbacks.clear();
          return this;
        }
        if (listener === void 0) {
          this._callbacks.delete(event);
          return this;
        }
        const callbacks = this._callbacks.get(event);
        if (callbacks) {
          for (const [index, callback] of callbacks.entries()) {
            if (callback === listener || callback.fn === listener) {
              callbacks.splice(index, 1);
              break;
            }
          }
          if (callbacks.length === 0) {
            this._callbacks.delete(event);
          } else {
            this._callbacks.set(event, callbacks);
          }
        }
        return this;
      };
      Emitter.prototype.emit = function(event, ...arguments_) {
        const callbacks = this._callbacks.get(event);
        if (callbacks) {
          const callbacksCopy = [...callbacks];
          for (const callback of callbacksCopy) {
            callback.apply(this, arguments_);
          }
        }
        return this;
      };
      Emitter.prototype.listeners = function(event) {
        return this._callbacks.get(event) ?? [];
      };
      Emitter.prototype.listenerCount = function(event) {
        if (event) {
          return this.listeners(event).length;
        }
        let totalCount = 0;
        for (const callbacks of this._callbacks.values()) {
          totalCount += callbacks.length;
        }
        return totalCount;
      };
      Emitter.prototype.hasListeners = function(event) {
        return this.listenerCount(event) > 0;
      };
      Emitter.prototype.addEventListener = Emitter.prototype.on;
      Emitter.prototype.removeListener = Emitter.prototype.off;
      Emitter.prototype.removeEventListener = Emitter.prototype.off;
      Emitter.prototype.removeAllListeners = Emitter.prototype.off;
      if (typeof module !== "undefined") {
        module.exports = Emitter;
      }
    }
  });

  // lib/kompas.js
  var require_kompas = __commonJS({
    "lib/kompas.js"(exports, module) {
      var emitter = require_component_emitter();
      module.exports = tracker;
      var RAD_PER_DEG = Math.PI / 180;
      function toRad(deg) {
        return deg * RAD_PER_DEG;
      }
      function toDeg(rad) {
        return rad / RAD_PER_DEG;
      }
      function compassHeading({ alpha, beta, gamma }) {
        if (typeof alpha !== "number" || typeof beta !== "number" || typeof gamma !== "number") {
          return;
        }
        const _x = toRad(beta);
        const _y = toRad(gamma);
        const _z = toRad(alpha);
        const sX = Math.sin(_x);
        const sY = Math.sin(_y);
        const sZ = Math.sin(_z);
        const cY = Math.cos(_y);
        const cZ = Math.cos(_z);
        const Vx = -cZ * sY - sZ * sX * cY;
        const Vy = -sZ * sY + cZ * sX * cY;
        let heading = Math.atan(Vx / Vy);
        if (Vy < 0) {
          heading += Math.PI;
        } else if (Vx < 0) {
          heading += 2 * Math.PI;
        }
        return toDeg(heading);
      }
      function tracker({ calculate = true } = {}) {
        let watching = false;
        let lastHeading;
        const DO_EVENT = "ondeviceorientationabsolute" in window ? "deviceorientationabsolute" : "deviceorientation";
        const self = {
          watch,
          clear
        };
        function onDeviceOrientation(ev) {
          let heading;
          if ("compassHeading" in ev) {
            heading = ev.compassHeading;
          } else if ("webkitCompassHeading" in ev) {
            heading = ev.webkitCompassHeading;
          } else if (calculate && ev.absolute) {
            heading = compassHeading(ev);
          }
          if (typeof heading === "number" && !Number.isNaN(heading)) {
            heading = Math.round(heading);
            if (lastHeading !== heading) {
              self.emit("heading", heading);
              lastHeading = heading;
            }
          }
        }
        function watch() {
          if (!watching) {
            watching = true;
            window.addEventListener(DO_EVENT, onDeviceOrientation);
          }
          return self;
        }
        function clear() {
          if (watching) {
            window.removeEventListener(DO_EVENT, onDeviceOrientation);
            watching = false;
          }
          return self;
        }
        return emitter(self);
      }
    }
  });

  // index.js
  var require_kompas2 = __commonJS({
    "index.js"(exports, module) {
      module.exports = require_kompas();
    }
  });
  return require_kompas2();
})();
//# sourceMappingURL=index.js.map
