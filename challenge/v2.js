(function (challenge) {

  function cut(wall) {
    var spaceCount = [];
    var spacePosition = [];
    var cutPosition = null;

    for (var currentRow = 0; currentRow < wall.length; currentRow++) {
      spacePosition[currentRow] = [];

      for (var currentBrick = 0; currentBrick < wall[currentRow].length - 1; currentBrick++) {
        spacePosition[currentRow][currentBrick] = wall[currentRow][currentBrick];
        spacePosition[currentRow][currentBrick] += spacePosition[currentRow][currentBrick - 1] || 0;

        var position = spacePosition[currentRow][currentBrick];
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

  challenge.v2 = {
    cut: cut
  };

})((window.challenge = window.challenge || {}));
