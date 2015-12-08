var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});
function preload() {
    game.cache.destroy();
    game.load.image('ballBlue', 'images/ball.png');
    game.load.image('ballRed', 'images/ball-red.png');
    game.load.image('ballYellow', 'images/ball-yellow.png');
    game.load.image('ballGreen', 'images/ball-green.png');
    game.load.image('ballPink', 'images/ball-pink.png');
    game.load.image('ballOrange', 'images/ball-orange.png');
}

firstBallPos = {x:100, y:200};
step = 5;
speedArray = [4500, 5500, 5000, 6500, 6000, 4000];
ballsNames = ['ballBlue', 'ballRed', 'ballYellow', 'ballGreen', 'ballPink', 'ballOrange'];
displayNames = ['ballBlue', 'ballRed', 'ballYellow', 'ballGreen', 'ballPink', 'ballOrange'];
ballsQuantity = 6;
questions = {ballBlue: 'blue', ballRed: 'red', ballYellow: 'yellow', ballGreen: 'green', ballPink: 'pink', ballOrange: 'orange'};
distanse = 50;
gameCondition = validAnswer = gameTask = '';

function create() {
    game.stage.backgroundColor = '#ffffff';
    balls = gameLib.showBalls(ballsNames);
    balls.forEach(function(ball, count) {
        gameLib.tweenBalls(ball, count);
        gameLib.selectBall(ball);
    });
    gameCondition = game.add.text(32, 0+32, gameLib.getGameTask(), { fill: 'black' });
}

function update() {
    gameCondition;
}


gameLib = {
    // получаем у координаты для полета шарика
    getFlyY: function (point, reverse){
        coordinates = [];
        coordinates[coordinates.length] = point - step;
        coordinates[coordinates.length] = point - step*2;
        coordinates[coordinates.length] = point - step;
        coordinates[coordinates.length] = point;
        coordinates[coordinates.length] = point + step;
        coordinates[coordinates.length] = point + step*2;
        coordinates[coordinates.length] = point + step;
        coordinates[coordinates.length] = point;
        if (reverse) {
            coordinates = coordinates.reverse();
            coordinates.splice(0,1);
            coordinates[coordinates.length] = point;
        }
        return coordinates;
    },
    //получаем х координаты для полета шарика
    getFlyX: function (point, reverse) {
        coordinates = [];
        coordinates[coordinates.length] = point - step;
        coordinates[coordinates.length] = point;
        coordinates[coordinates.length] = point + step;
        coordinates[coordinates.length] = point;
        coordinates[coordinates.length] = point - step;
        coordinates[coordinates.length] = point;
        coordinates[coordinates.length] = point + step;
        coordinates[coordinates.length] = point;
        if (reverse) {
            coordinates = coordinates.reverse();
        }
        return coordinates;
    },
    showBalls: function(){
        sprites = [];
        for (ballsCounter = 0; ballsCounter < ballsQuantity; ballsCounter++) {
            ballName = this.getRandomElement(displayNames);
            displayNames.splice(displayNames.indexOf(ballName), 1);
            ballSprite = game.add.sprite(firstBallPos.x+distanse*ballsCounter, firstBallPos.y, ballName);
            sprites[sprites.length] = ballSprite;
        }
        return sprites;
    },
    tweenBalls: function(ball, count){
        speed = this.getRandomElement(speedArray);
        tweenball = game.add.tween(ball);
        reverse = count & 1 ? true : false;
        tweenball.to({x: this.getFlyX(firstBallPos.x+50*count, false), y: this.getFlyY(firstBallPos.y, reverse)}, speed, "Linear", true, 0, -1);
    },
    selectBall: function(ball){
        ball.inputEnabled = true;
        ball.input.pixelPerfectClick = true;
        ball.events.onInputDown.add(this.printAnswer, this);
    },
    printAnswer: function(ball){
        if (questions[ball.key] === validAnswer) {
            gameCondition.text = 'Right!\n' + this.getGameTask();
        } else {
            gameCondition.text = 'Wrong!\n' + gameTask;
        }
    },
    getGameTask: function(){
        ballName = this.getRandomElement(ballsNames);
        validAnswer = questions[ballName];
        gameTask = 'Select ' + questions[ballName] + ' ball';
        return gameTask;
    },
    getRandomElement: function(arr) {
        element = arr[Math.floor(Math.random()*arr.length)];
        return element;
    }
};