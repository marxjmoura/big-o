(function (algorithm) {

  function cut(wall) {
    var cutCount = 0;
    var cutPosition = null;

    for (var row = 0; row < wall.length; row++) {
      var size = 0;

      for (var brick = 0; brick < wall[row].length - 1; brick++) {
        var currentCount = 0;

        size += wall[row][brick];

        for (var nextRow = 0; nextRow < wall.length; nextRow++) {
          if (nextRow === row) continue;

          var nextSize = 0;

          for (var nextBrick = 0; nextSize < size; nextBrick++) {
            nextSize += wall[nextRow][nextBrick];
          }

          if (nextSize > size) {
            currentCount++;
          }
        }

        if (currentCount < cutCount || cutCount === 0) {
          cutCount = currentCount;
          cutPosition = size;
        }
      }
    }

    return {
      count: cutCount,
      position: cutPosition
    }
  }

  algorithm.v1 = {
    cut: cut
  };

})((window.algorithm = window.algorithm || {}));
