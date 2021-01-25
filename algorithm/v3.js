(function (algorithm) {

  function cut(wall) {
    var spaceCount = [];
    var cutPosition = null;

    for (var row = 0, brick = 0, position = 0; row < wall.length;) {
      position += wall[row][brick];
      spaceCount[position] = (spaceCount[position] || 0) + 1;

      if (cutPosition === null || spaceCount[position] > spaceCount[cutPosition]) {
        cutPosition = position;
      }

      if (++brick === wall[row].length - 1) {
        row++;
        brick = 0;
        position = 0;
      }
    }

    return {
      count: wall.length - spaceCount[cutPosition],
      position: cutPosition
    }
  }

  algorithm.v3 = {
    cut: cut
  };

})((window.algorithm = window.algorithm || {}));
