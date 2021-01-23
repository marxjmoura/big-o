(function (challenge) {

  function cut(wall) {
    var count = 0;
    var position = 0;

    for (var currentRow = 0; currentRow < wall.length; currentRow++) {
      var currentSize = 0;

      for (var currentBrick = 0; currentBrick < wall[currentRow].length - 1; currentBrick++) {
        var currentCount = 0;

        currentSize += wall[currentRow][currentBrick];

        for (var nextRow = 0; nextRow < wall.length; nextRow++) {
          if (nextRow === currentRow) continue;

          var nextSize = 0;

          for (var nextBrick = 0; nextSize < currentSize; nextBrick++) {
            nextSize += wall[nextRow][nextBrick];
          }

          if (nextSize > currentSize) {
            currentCount++;
          }
        }

        if (currentCount < count || count === 0) {
          count = currentCount;
          position = currentSize;
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
