import * as PIXI from 'pixi.js-legacy';

class Main{
    private static readonly GAME_WIDTH = 1280;
    private static readonly GAME_HEIGHT = 720;

    private app: PIXI.Application | undefined;
    private rabbit: string = './assets/rabbit.png';
    constructor() {
        window.onload = (): void => {
            this.startLoadingAssets();
        };
    }
    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("rabbit", this.rabbit);

        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        //
        loader.load();
    }
    private onAssetsLoaded(): void {
        this.createRenderer();

        const stage = this.app!.stage;

        const bunny = this.getBunny();
        bunny.position.set(Main.GAME_WIDTH / 2, Main.GAME_HEIGHT / 2);

        stage.addChild(bunny);

        this.app!.ticker.add(() => {
            bunny.rotation += 0.05;
        });
    }
    private createRenderer(): void {
        this.app = new PIXI.Application({
            backgroundColor: 0xd3d3d3,
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT,
        });

        document.body.appendChild(this.app.view);
        var ratio = Math.min(window.innerWidth/ Main.GAME_WIDTH, window.innerHeight/ Main.GAME_HEIGHT);
        this.app.stage.scale.x = this.app.stage.scale.y = ratio;
        this.app.renderer.resize(Math.ceil( Main.GAME_WIDTH * ratio), Math.ceil( Main.GAME_HEIGHT * ratio));
        window.addEventListener("resize", this.onResize.bind(this));
    }
    private onResize(): void {
        if (!this.app) {
            return;
        }
        var ratio = Math.min(window.innerWidth/ Main.GAME_WIDTH, window.innerHeight/ Main.GAME_HEIGHT);
        this.app.stage.scale.x = this.app.stage.scale.y = ratio;
        this.app.renderer.resize(Math.ceil( Main.GAME_WIDTH * ratio), Math.ceil( Main.GAME_HEIGHT * ratio));
    }

    private getBunny(): PIXI.Sprite {
        const bunnyRotationPoint = {
            x: 0.5,
            y: 0.5,
        };

        const bunny = new PIXI.Sprite(PIXI.Texture.from("rabbit"));
        bunny.anchor.set(bunnyRotationPoint.x, bunnyRotationPoint.y);
        bunny.scale.set(2, 2);

        return bunny;
    }
}
new Main();