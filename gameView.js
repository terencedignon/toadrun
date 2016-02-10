(function () {
  if (typeof Logger === "undefined") {
    window.Logger = {};
  }

  Logger.Pusher = new Pusher('74f1190e2fe3c6780c88', {
    encrypted: true
  });
  Logger.Channel = Logger.Pusher.subscribe('test_channel');
  Logger.Channel.bind("frog_moved", function(data) {
    console.log("hello");
  });
  Logger.Channel.bind('my_event', function(data) {
    alert(data.message);
  });

  var GameView = Logger.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.frog = this.game.addFrog();

  };

  GameView.MOVES = {
      "w": [0, -1],
      "a": [-1, 0],
      "s": [0,  1],
      "d": [1,  0],
      "b": [10, 0]
    };

  GameView.prototype.bindKeyHandlers = function () {

    var frog = this.frog;
    Object.keys(GameView.MOVES).forEach(function(k) {
      var move = GameView.MOVES[k];
      key(k, function () { frog.move(k, move); });
    });
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    this.lastTime = 0;
    // this.setBackground();
    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function (time) {
    var timeDelta = time - this.lastTime;
    this.game.draw(this.ctx);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  };





})();
