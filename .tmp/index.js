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
        loader.add("spriteExample", "./spritesData.json"); // example of loading spriteSheet
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
        var birdFromSprite = this.getBird();
        birdFromSprite.anchor.set(0.5, 0.5);
        birdFromSprite.position.set(Main.GAME_WIDTH / 2, Main.GAME_HEIGHT / 2 + bunny.height);
        stage.addChild(bunny);
        stage.addChild(birdFromSprite);
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
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.app.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;
        window.addEventListener("resize", this.onResize.bind(this));
    };
    Main.prototype.onResize = function () {
        if (!this.app) {
            return;
        }
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.app.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;
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
    Main.prototype.getBird = function () {
        var bird = new PIXI.AnimatedSprite([
            PIXI.Texture.from("birdUp.png"),
            PIXI.Texture.from("birdMiddle.png"),
            PIXI.Texture.from("birdDown.png"),
        ]);
        bird.loop = true;
        bird.animationSpeed = 0.1;
        bird.play();
        bird.scale.set(3);
        return bird;
    };
    Main.GAME_WIDTH = 800;
    Main.GAME_HEIGHT = 600;
    return Main;
}());
new Main();