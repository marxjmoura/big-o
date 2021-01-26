(function (algorithm) {

  function cut(wall) {
    var spaceCount = {};
    var cutPosition = 0;

    for (var row = 0, brick = 0, position = 0; row < wall.length && brick < wall[row].length;) {
      position += wall[row][brick];
      spaceCount[position] = spaceCount[position] || 0

      if (wall[row].length > 1) {
        spaceCount[position]++;
      }

      if (cutPosition === 0 || spaceCount[position] > spaceCount[cutPosition]) {
        cutPosition = position;
      }

      if (++brick >= wall[row].length - 1) {
        row++;
        brick = 0;
        position = 0;
      }
    }

    if (cutPosition === 0) {
      return { count: 0, position: 0 };
    }

    if (spaceCount[cutPosition] === 0) {
      cutPosition /= 2;
    }

    return {
      count: wall.length - (spaceCount[cutPosition] || 0),
      position: cutPosition
    };
  }

  algorithm.cut = cut;

})((window.algorithm = window.algorithm || {}));
