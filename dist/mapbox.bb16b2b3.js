// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"data/detector_dots.geojson":[function(require,module,exports) {
module.exports = "/detector_dots.db551656.geojson";
},{}],"scripts/mapbox.js":[function(require,module,exports) {
var _map = null;
var _centerLat = 40;
var _centerLng = 116.5;

var _dataFile = require('/data/detector_dots.geojson');

var _accessToken = 'pk.eyJ1IjoieGlhb2xlaWFvIiwiYSI6ImNqdzc4YTltNzJic3c0OHFxeWhlZDVodGkifQ.fq-KOXgjoJwsGRBsfqmy6w';
var _mapStyle = 'mapbox://styles/mapbox/light-v10';
mapboxgl.accessToken = _accessToken;
_map = new mapboxgl.Map({
  container: 'map',
  style: _mapStyle,
  center: [_centerLng, _centerLat],
  zoom: 7.9
});

function init() {
  _map.addSource('markers-source', {
    type: 'geojson',
    data: _dataFile
  });

  _map.addLayer({
    id: 'markers',
    type: 'circle',
    source: 'markers-source',
    paint: {
      'circle-color': 'orange',
      'circle-radius': 4,
      'circle-stroke-width': 0
    }
  });

  var popup = null;

  _map.on('mouseenter', 'markers', function (e) {
    var features = _map.queryRenderedFeatures(e.point, {
      layers: ['markers']
    });

    if (!features.length) {
      return;
    }

    var feature = features[0];
    popup = new mapboxgl.Popup().setLngLat(_map.unproject(e.point)).setHTML('<ul>' + '<img src="' + feature.properties.image + '">' + '<li>Sale price: <b>' + feature.properties.AdjustedSa + '</b></li>' + '<li>Address: <b>' + feature.properties.Address + '</b></li>' + '<li>Property type: <b>' + feature.properties.PropType + '</b></li>' + '</ul>').addTo(_map);
  });

  _map.on('mouseleave', 'markers', function () {
    _map.getCanvas().style.cursor = '';
    popup.remove();
  });
} // "<h3>HOME SALES INFORMATION</h3>" +


_map.once('style.load', function (e) {
  init();

  _map.addControl(new mapboxgl.NavigationControl());
});
},{"/data/detector_dots.geojson":"data/detector_dots.geojson"}]},{},["scripts/mapbox.js"], null)
//# sourceMappingURL=/mapbox.bb16b2b3.js.map