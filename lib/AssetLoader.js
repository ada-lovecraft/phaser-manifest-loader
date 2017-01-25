'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _phaser = require('phaser');

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AssetLoader = function (_Phaser$Plugin) {
  _inherits(AssetLoader, _Phaser$Plugin);

  function AssetLoader() {
    _classCallCheck(this, AssetLoader);

    return _possibleConstructorReturn(this, (AssetLoader.__proto__ || Object.getPrototypeOf(AssetLoader)).apply(this, arguments));
  }

  _createClass(AssetLoader, [{
    key: 'init',
    value: function init() {
      this.loaders = {
        'audio': this.loadAudio,
        'spritesheets': this.loadSpriteSheet,
        'images': this.loadImage,
        'bitmap_fonts': this.loadBitmapFont
      };
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.loaders = null;
      _get(AssetLoader.prototype.__proto__ || Object.getPrototypeOf(AssetLoader.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'loadManifest',
    value: function loadManifest(manifest, assetPostfix) {
      var _this2 = this;

      Object.keys(this.loaders).forEach(function (assetType) {
        var assets = manifest[assetType];
        if (!assets) return;
        assets.forEach(function (assetKey) {
          _this2.loaders[assetType].call(_this2, assetKey, assetPostfix);
        });
      });
    }
  }, {
    key: 'loadAudio',
    value: function loadAudio(key) {
      var url = require('assets/audio/' + key + '.mp3');
      this.game.load.audio(key, url);
    }
  }, {
    key: 'loadSpriteSheet',
    value: function loadSpriteSheet(key, assetPostfix) {
      var imageUrl = require('assets/spritesheets/' + key + assetPostfix + '.png');
      var jsonUrl = require('assets/spritesheets/' + key + assetPostfix + '.json');
      this.game.load.atlasJSONArray(key, imageUrl, null, jsonUrl);
    }
  }, {
    key: 'loadImage',
    value: function loadImage(key, assetPostfix) {
      var url = void 0;
      try {
        url = require('assets/images/' + key + assetPostfix + '.jpg');
      } catch (err) {
        url = require('assets/images/' + key + assetPostfix + '.png');
      }

      this.game.load.image(key, url);
    }
  }, {
    key: 'loadBitmapFont',
    value: function loadBitmapFont(key, assetPostfix) {
      var imageUrl = require('assets/bitmap_fonts/' + key + assetPostfix + '.png');
      var xmlUrl = require('assets/bitmap_fonts/' + key + assetPostfix + '.xml');
      this.game.load.bitmapFont(key, imageUrl, xmlUrl);
    }
  }]);

  return AssetLoader;
}(_phaser2.default.Plugin);

exports.default = AssetLoader;