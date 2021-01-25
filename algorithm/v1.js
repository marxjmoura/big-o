(function (challenge) {

  function cut(wall) {
    var count = 0;
    var position = 0;

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

        if (currentCount < count || count === 0) {
          count = currentCount;
          position = size;
        }
      }
    }

    return {
      count: count,
      position: position
    }
  }

  challenge.v1 = {
    cut: cut
  };

})((window.challenge = window.challenge || {}));
