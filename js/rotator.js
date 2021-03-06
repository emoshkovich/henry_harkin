window.onload = function() {

  var game = new Phaser.Game(600, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
  var player, keys, henry, startScreen, arrow;
  var keys;
  var json = { "ps1": "img/Ps1.png", "ps2": "img/Ps2.png", "ps3": "img/Ps3.png", "ps4": "img/Ps4.png", "ps5": "img/Ps1.png", "ps6": "img/Ps2.png", "ps7": "img/Ps3.png", "ps8": "img/Ps4.png", "ps9": "img/Ps1.png", "ps10": "img/Ps2.png", "ps11": "img/Ps3.png", "ps12": "img/Ps4.png", "ps13": "img/Ps1.png", "ps14": "img/Ps2.png", "ps15": "img/Ps3.png", "ps16": "img/Ps4.png", "ps17": "img/Ps1.png", "ps18": "img/Ps2.png", "ps19": "img/Ps3.png", "ps20": "img/Ps3.png", "ps21": "img/Ps1.png", "ps22": "img/Ps2.png", "ps23": "img/Ps3.png", "ps24": "img/Ps4.png", "ps25": "img/Ps1.png", "ps26": "img/Ps2.png", "ps27": "img/Ps3.png", "ps28": "img/Ps4.png", "ps29": "img/Ps1.png", "ps30": "img/Ps2.png", "ps31": "img/Ps3.png", "ps32": "img/Ps4.png", "ps33": "img/Ps1.png", "ps34": "img/Ps2.png", "ps35": "img/Ps3.png", "ps36": "img/Ps4.png" };
  var tiles = new Array(6);
  for (var i = 0; i<6; i++){
  	tiles[i] = new Array(6);
  }
  var canMove = true;
  var timeX = 0;
  
  function preload () {
    loadImages(function() {
      game.load.image('bg', 'img/background.png');
      game.load.image('player', 'img/Phero.png');
      game.load.image('arrow', 'img/arrow.png');
      game.load.spritesheet('henrywalk', 'img/henrywalk.png', 40, 40, 18);
      game.load.image('startScreen', 'img/introscreen.png');
      game.load.image('endScreen', 'img/endscreen.png');
      keys = game.input.keyboard.createCursorKeys();
      jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    });
  }

  function create () {
    game.add.tileSprite(0, 0, 600, 600, 'bg');
    createImages(function() {
      startScreen = game.add.tileSprite(0, 0, 600, 600, 'startScreen');
      endScreen = game.add.tileSprite(0, 0, 600, 600, 'endScreen');
      endScreen.visible = false;
      player = game.add.sprite(50, 50, 'henrywalk');
      arrow = game.add.sprite(520, 535, 'arrow');
      arrow.visible = false;
      player.anchor.setTo(.5, .5);
      player.body.setSize(100, 100, 0, 0);
      player.animations.add('walk');
      player.visible = false;
      game.input.onDown.add(startGame, this);
    });
  }
  
  function startGame() {
  	startScreen.visible = false;
  	player.visible = true;
    arrow.visible = true;
  }
  
  function endGame() {
    arrow.visible = false;
    player.kill();
    endScreen.visible = true;
  }
  
  function restartGame() {
    create();
  	startGame();
  }

  function update() {
  	var d = new Date();
  	
  	var x = Math.floor((player.x)/100);
  	var y = Math.floor((player.y)/100);
  	if (x === 5 && y === 5){
  	  endGame();
  	  
  	  game.input.onDown.add(restartGame, this);
  	}
	if (jump.isDown && canMove){
		canMove = false;
	  	rotate(player.x, player.y);
	  	timeX = d.getTime();
	}
	else if ((d.getTime() - timeX) > 500){
	  	canMove = true;
	}
    player.body.velocity.setTo(0, 0);
    if (keys.right.isDown){
      player.body.velocity.x = 200;
      player.angle = 90;
      player.animations.play('walk', 20, true);
    }
    else if (keys.left.isDown) {
      player.body.velocity.x = -200;
      player.angle = 270;
      player.animations.play('walk', 20, true);
    }
    else if( keys.up.isDown) {
      player.body.velocity.y = -200;
      player.angle = 0;
      player.animations.play('walk', 20, true);
    }
    else if ( keys.down.isDown) {
      player.body.velocity.y = 200;
      player.angle = 180;
      player.animations.play('walk', 20, true);
    }
    else {
    	player.frame = 0;
	}
  }

  function loadImages(callback) {
    $.each(json, function(key, value) {
      game.load.image(key, value);
    });
    callback();
  }

  function createImages(callback) {
    var x = 0;
    var y = 0;
    var i =0;
    var j=0;
    $.each(json, function(key, value) {
      var temp = game.add.sprite(x+50, y+50, key);
      temp.anchor.setTo(0.5,0.5);
      var obj;
      if(value.indexOf("1") !== -1){
      	obj={n:false, e:true, s:false, w:true, img: temp};
      }
      else if(value.indexOf("2") !== -1){
      	obj={n:true, e:false, s:false, w:true, img: temp};
      }
      else if(value.indexOf("3") !== -1){
      	obj={n:true, e:true, s:false, w:true, img: temp};
      }
      else if(value.indexOf("4") !== -1){
      	obj={n:false, e:false, s:false, w:true, img: temp};
      }
      else{
      	obj={n:true, e:true, s:true, w:true, img: temp};
      }
      tiles[j][i] = obj;
      x += 100;
      if (x % 600 === 0) {
        y +=100;
        x = 0;
      }
      if (j!==0 && j%5 === 0){
      	i++;
      	j = -1;
      }
      j++;
    });
    callback();
  }
  function rotate(x, y){
  	x = Math.floor((x)/100);
  	y = Math.floor((y)/100);
	console.log(x +" " + y);
	if (x > 0 && x < 5 && y > 0 && y < 5){
		tiles[x-1][y-1].img.angle += 90;
		render(tiles[x-1][y-1].img);
		tiles[x-1][y].img.angle += 90;
		render(tiles[x-1][y].img);
		tiles[x-1][y+1].img.angle += 90;
		render(tiles[x-1][y+1].img);
		tiles[x][y-1].img.angle += 90;
		render(tiles[x][y-1].img);
		tiles[x][y+1].img.angle += 90;
		render(tiles[x][y+1].img);
		tiles[x+1][y-1].img.angle += 90;
		render(tiles[x+1][y-1].img);
		tiles[x+1][y].img.angle += 90;
		render(tiles[x+1][y].img);
		tiles[x+1][y+1].img.angle += 90;
		render(tiles[x+1][y+1].img);
	}
	else if (x === 0 && y === 0){
		tiles[x+1][y].img.angle += 90;
		render(tiles[x+1][y].img);
		tiles[x+1][y+1].img.angle += 90;
		render(tiles[x+1][y+1].img);
		tiles[x][y+1].img.angle += 90;
		render(tiles[x][y+1].img);
	}
	else if (x === 5 && y === 5) {
		tiles[x-1][y].img.angle += 90;
		render(tiles[x-1][y].img);
		tiles[x-1][y-1].img.angle += 90;
		render(tiles[x-1][y-1].img);
		tiles[x][y-1].img.angle += 90;
		render(tiles[x][y-1].img);
	}
	else if (x === 5 && y === 0) {
		tiles[x-1][y].img.angle += 90;
		render(tiles[x-1][y].img);
		tiles[x-1][y+1].img.angle += 90;
		render(tiles[x-1][y+1].img);
		tiles[x][y+1].img.angle += 90;
		render(tiles[x][y+1].img);
	}
	else if (x === 0 && y === 5) {
		tiles[x+1][y].img.angle += 90;
		render(tiles[x+1][y].img);
		tiles[x+1][y-1].img.angle += 90;
		render(tiles[x+1][y-1].img);
		tiles[x][y-1].img.angle += 90;
		render(tiles[x][y-1].img);
	}
	else if (x === 0 && y > 0 && y < 5) {
		tiles[x][y-1].img.angle += 90;
		render(tiles[x][y-1].img);
		tiles[x+1][y-1].img.angle += 90;
		render(tiles[x+1][y-1].img);
		tiles[x+1][y].img.angle += 90;
		render(tiles[x+1][y].img);
		tiles[x][y+1].img.angle += 90;
		render(tiles[x][y+1].img);
		tiles[x+1][y+1].img.angle += 90;
		render(tiles[x+1][y+1].img);
	}
	else if (x === 5 && y > 0 && y < 5) {
		tiles[x][y-1].img.angle += 90;
		render(tiles[x][y-1].img);
		tiles[x-1][y-1].img.angle += 90;
		render(tiles[x-1][y-1].img);
		tiles[x-1][y].img.angle += 90;
		render(tiles[x-1][y].img);
		tiles[x][y+1].img.angle += 90;
		render(tiles[x][y+1].img);
		tiles[x-1][y+1].img.angle += 90;
		render(tiles[x-1][y+1].img);
	}
	else if (y === 0 && x > 0 && x < 5) {
		tiles[x-1][y].img.angle += 90;
		render(tiles[x-1][y].img);
		tiles[x+1][y].img.angle += 90;
		render(tiles[x+1][y].img);
		tiles[x-1][y+1].img.angle += 90;
		render(tiles[x-1][y+1].img);
		tiles[x][y+1].img.angle += 90;
		render(tiles[x][y+1].img);
		tiles[x+1][y+1].img.angle += 90;
		render(tiles[x+1][y+1].img);
	}
	else if (y === 5 && x > 0 && x < 5) {
		tiles[x-1][y].img.angle += 90;
		render(tiles[x-1][y].img);
		tiles[x+1][y].img.angle += 90;
		render(tiles[x+1][y].img);
		tiles[x-1][y-1].img.angle += 90;
		render(tiles[x-1][y-1].img);
		tiles[x][y-1].img.angle += 90;
		render(tiles[x][y-1].img);
		tiles[x+1][y-1].img.angle += 90;
		render(tiles[x+1][y-1].img);
	}

   }
	function render(sprite) {
	    game.debug.renderSpriteInfo(sprite, 32, 32);
	}
}
