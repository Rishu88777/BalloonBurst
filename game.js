const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#fff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let pump;
let balloons = [];
let symbolImages = ['symbol1', 'symbol2','symbol3']; 

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('balloon', 'assets/balloon.png');
    this.load.image('pump', 'assets/pump.png');
    this.load.image('symbol1', 'assets/symbol1.png');
    this.load.image('symbol2', 'assets/symbol2.png');
    this.load.image('symbol3', 'assets/symbol3.png');
}

function create() {
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background').setDisplaySize(window.innerWidth, window.innerHeight);

    
    pump = this.add.image(100, window.innerHeight - 100, 'pump').setInteractive();
    pump.setScale(0.5); 

   
    pump.on('pointerdown', createBalloon, this);
}

function update() {
    balloons.forEach(item => {
        let balloon = item.balloon;
        let symbol = item.symbol;

        symbol.setPosition(balloon.x, balloon.y);
    });
}

function createBalloon() {
    let randomSymbol = symbolImages[Math.floor(Math.random() * symbolImages.length)];
    let balloon = this.physics.add.sprite(400, 300, 'balloon').setInteractive();
    balloon.setScale(0.5); 
    let symbol = this.add.image(balloon.x, balloon.y, randomSymbol);
    symbol.setScale(0.25);

    balloon.on('pointerdown', () => burstBalloon(balloon), this);
    balloon.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
    balloon.setBounce(1, 1);
    balloon.setCollideWorldBounds(true);

    balloons.push({ balloon: balloon, symbol: symbol });
}

function burstBalloon(balloon) {
    let index = balloons.findIndex(item => item.balloon === balloon);
    if (index > -1) {
        balloons[index].balloon.destroy();
        balloons[index].symbol.destroy();
        balloons.splice(index, 1);
    }
}
