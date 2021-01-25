(function (algorithm) {

  function cut(wall) {
    var spaceCount = [];
    var cutPosition = null;

    for (var row = 0; row < wall.length; row++) {
      var position = 0;

      for (var brick = 0; brick < wall[row].length - 1; brick++) {
        position += wall[row][brick];

        spaceCount[position] = (spaceCount[position] || 0) + 1;

        if (cutPosition === null || spaceCount[position] > spaceCount[cutPosition]) {
          cutPosition = position;
        }
      }
    }

    return {
      count: wall.length - spaceCount[cutPosition],
      position: cutPosition
    }
  }

  algorithm.v2 = {
    cut: cut
  };

})((window.algorithm = window.algorithm || {}));
