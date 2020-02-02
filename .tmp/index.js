"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __importStar(require("pixi.js-legacy"));
var Main = /** @class */ (function () {
    function Main() {
        var _this = this;
        this.rabbit = './assets/rabbit.png';
        window.onload = function () {
            _this.startLoadingAssets();
        };
    }
    Main.prototype.startLoadingAssets = function () {
        var _this = this;
        var loader = PIXI.Loader.shared;
        loader.add("rabbit", this.rabbit);
        loader.on("complete", function () {
            _this.onAssetsLoaded();
        });
        //
        loader.load();
    };
    Main.prototype.onAssetsLoaded = function () {
        this.createRenderer();
        var stage = this.app.stage;
        var bunny = this.getBunny();
        bunny.position.set(Main.GAME_WIDTH / 2, Main.GAME_HEIGHT / 2);
        stage.addChild(bunny);
        this.app.ticker.add(function () {
            bunny.rotation += 0.05;
        });
    };
    Main.prototype.createRenderer = function () {
        this.app = new PIXI.Application({
            backgroundColor: 0xd3d3d3,
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT,
        });
        document.body.appendChild(this.app.view);
        var ratio = Math.min(window.innerWidth / Main.GAME_WIDTH, window.innerHeight / Main.GAME_HEIGHT);
        this.app.stage.scale.x = this.app.stage.scale.y = ratio;
        this.app.renderer.resize(Math.ceil(Main.GAME_WIDTH * ratio), Math.ceil(Main.GAME_HEIGHT * ratio));
        window.addEventListener("resize", this.onResize.bind(this));
    };
    Main.prototype.onResize = function () {
        if (!this.app) {
            return;
        }
        var ratio = Math.min(window.innerWidth / Main.GAME_WIDTH, window.innerHeight / Main.GAME_HEIGHT);
        this.app.stage.scale.x = this.app.stage.scale.y = ratio;
        this.app.renderer.resize(Math.ceil(Main.GAME_WIDTH * ratio), Math.ceil(Main.GAME_HEIGHT * ratio));
    };
    Main.prototype.getBunny = function () {
        var bunnyRotationPoint = {
            x: 0.5,
            y: 0.5,
        };
        var bunny = new PIXI.Sprite(PIXI.Texture.from("rabbit"));
        bunny.anchor.set(bunnyRotationPoint.x, bunnyRotationPoint.y);
        bunny.scale.set(2, 2);
        return bunny;
    };
    Main.GAME_WIDTH = 1280;
    Main.GAME_HEIGHT = 720;
    return Main;
}());
new Main();