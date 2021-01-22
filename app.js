(function () {

  var wall = [
    [1, 2, 2, 1],
    [3, 1, 2],
    [1, 3, 2],
    [2, 4],
    [3, 1, 2],
    [1, 3, 1, 1]
  ];

  var minimumCutCount = 0;
  var position = {};

  for (var currentRow = 0; currentRow < wall.length; currentRow++) {
    var currentSize = 0;

    for (var currentBrick = 0; currentBrick < wall[currentRow].length - 1; currentBrick++) {
      var currentBrickCuts = 0;

      currentSize += wall[currentRow][currentBrick];

      for (var nextRow = 0; nextRow < wall.length; nextRow++) {
        if (nextRow === currentRow) continue;

        var nextSize = 0;

        for (var nextBrick = 0; nextSize < currentSize; nextBrick++) {
          nextSize += wall[nextRow][nextBrick];
        }

        if (nextSize > currentSize) {
          currentBrickCuts++;
        }
      }
    }

    if (currentBrickCuts < minimumCutCount || minimumCutCount === 0) {
      position.row = currentRow;
      position.brick = currentBrick;
      minimumCutCount = currentBrickCuts;
    }
  }

  console.log('Best cut = ' + minimumCutCount + ' (row ' + (position.row + 1) + ' after brick ' + position.brick + ')');

})();
