(function (algorithm) {

  var $editor = $('#editor');
  var $wall = $('#wall');
  var $result = $('#result');
  var $code = $('code');

  function parse(matrix) {
    try {
      var wall = eval(matrix);
      var sum = [];

      if (!$.isArray(wall)) return []

      for (var row = 0, brick = 0; row < wall.length;) {
        if (!$.isArray(wall[row])) return []
        if (!$.isNumeric(wall[row][brick])) return []

        wall[row][brick] = Number(wall[row][brick]);
        sum[row] = (sum[row] || 0) + wall[row][brick];

        if (++brick === wall[row].length) {
          if (sum[row] !== sum[0]) return []
          row++
          brick = 0;
        }
      }

      return wall;
    } catch {
      return []
    }
  }

  function print(cut) {
    var count = 'Bricks = ' + cut.count;
    var units = cut.position + (cut.position > 1 ? ' units' : ' unit');
    var position = 'Position = ' + units + ' (from left to right):'

    $result.text(count + '; ' + position);
  }

  function draw(wall, cut) {
    if (!wall.length) return;

    var maxWidth = 0;

    for (var brick = 0; brick < wall[0].length; brick++) {
      maxWidth += wall[0][brick];
    }

    var $container = $('<div/>');

    for (var row = 0, brick = 0; row < wall.length;) {
      var width = wall[row][brick];

      var $row = $row || $('<div class="wall-row"></div>');
      var $cell = $('<div class="wall-cell"></div>').css('width', (width * 100 / maxWidth) + '%')
      var $brick = $('<div class="wall-brick"></div>').html(width);

      $cell.append($brick);
      $row.append($cell);
      $container.append($row);

      if (++brick === wall[row].length) {
        row++
        brick = 0;
        $row = null;
      }
    }

    var $cut = $('<div class="wall-cut"></div>').css('left', (cut.position * 100 / maxWidth) + '%');

    $container.append($cut);

    $wall.html($container.children());
  }

  $code.each(function (i, code) {
    hljs.highlightBlock(code);
  });

  $editor.on('input', function () {
    var wall = parse($editor.val());
    var cut = algorithm.cut(wall);

    print(cut);
    draw(wall, cut);

    $editor.toggleClass('is-invalid', !wall.length);
    $wall.toggleClass('disabled', !wall.length);
  })

  $editor.trigger('input');

})(window.algorithm);
