Q.Sprite.extend("DragonFire",{
  init: function(p) {
    this._super(p, {
      sheet: "bossfire",
      distance: 0,
      scale: 0.5,
      originalY: p.y,
      vy: 0,
      gravity: 0,
      sensor: true
    });

    if (this.p.vx < 0){
      this.p.flip = "x";
    }
    this.add("2d, animation");
    this.on("sensor");

    this.on('hit',function(collision) {
      if (!collision.obj.isA('Dragon')){
        this.destroy();
      }
    });
  },
  sensor: function (obj) {
      if (obj.isA('Boss')) {
        return;
      }

      if(obj.isA("Player")) {
        Q.audio.play('/sounds/mario_die.wav');
        Q.stageScene("endGame",1, { label: "You Died" });
        obj.destroy();
        this.destroy();
      }

      if (obj.isA("Enemy")) {
        this.destroy();
      }
  },
  step: function (dt) {
    // this.p.y = this.p.originalY - 5 ;
    this.p.distance += 1;

    if (this.p.distance === 100) {
      this.destroy();
    }
  }
});
