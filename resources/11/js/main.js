
enchant();

(function (onload) {

  var core = new Core(320, 320);
  core.fps = 30;

  core.keybind(13, "enter");
  core.keybind(87, "w");
  core.keybind(65, "a");
  core.keybind(83, "s");
  core.keybind(68, "d");

  core.onload = onload;

  core.start();

})(function () {
  var core = this;

  // 正しくキーの押された回数
  var count = 0;
  // キーが押されたままなら false
  var isReady = true;

  function startScene() {
    var scene = new Scene();
    var label = new Label("スタート画面");

    scene.addChild(label);

    scene.on(enchant.Event.ENTER_FRAME, function () {
      if (! core.input.enter) {
        isReady = true;
      }

      if (isReady && core.input.enter) {
        core.replaceScene(gameScene());
      }
    });

    return scene;
  };

  function gameScene() {
    // 押せた回数の初期化
    count = 0;

    // 入力期待値
    var key = null;
    // 入力範囲
    var keys = ["w", "a", "s", "d"];

    var scene = new Scene();
    var label = new Label();
    label.x = core.width / 2;
    label.y = core.height / 2;
    label.font = "30px serif";
    scene.addChild(label);

    scene.on(enchant.Event.ENTER_FRAME, function () {
      var test = false;

      var isTyping = keys.some(function (inputKey) {
        return core.input[inputKey];
      });

      // キーが押されたままなら判定しない
      if (! isReady && isTyping) {
        return;
      } else {
        isReady = true;
      }

      if (key !== null) {
        test = keys.some(function (inputKey) {
          // 間違ったキーが押されていると評価結果が true
          return inputKey !== key && core.input[inputKey];
        });
        // test が true で Game Over
        if (test) {
          core.replaceScene(resultScene());
        } else if (isTyping) {
          // 押せた回数の加算
          count++;
          // 入力期待値の初期化
          key = null;
          // キーの連続認識を防ぐ
          isReady = false;
        }
      } else {
        key = keys[Math.floor(Math.random() * 4)];
        label.text = key;
      }
    });

    return scene;
  }

  function resultScene() {
    var scene = new Scene();
    var label = new Label("押せた回数は " + count + " 回です。");
    scene.addChild(label);
    scene.on(enchant.Event.ENTER_FRAME, function () {
      if (core.input.enter) {
        core.replaceScene(startScene());
        // キーの連続認識を防ぐ
        isReady = false;
      }
    });

    return scene;
  }

  core.pushScene(startScene());

});
