(function () {

  var $editor = $('#editor');
  var $wall = $('#wall');
  var $result = $('#result');
  var $code = $('pre code');

  function parse(matrix) {
    try {
      var wall = eval(matrix);
      var sum = [];

      if (!$.isArray(wall)) return null;

      for (var row = 0; row < wall.length; row++) {
        if (!$.isArray(wall[row])) return null;

        sum[row] = 0;

        for (var brick = 0; brick < wall[row].length; brick++) {
          if (!$.isNumeric(wall[row][brick])) return null;

          wall[row][brick] = Number(wall[row][brick]);
          sum[row] += wall[row][brick];
        }

        if (row > 0 && sum[row] !== sum[row - 1]) return null;
      }

      return wall;
    } catch {
      return null;
    }
  }

  function print(cut) {
    var count = 'Lowest count = ' + cut.count;
    var position = '(row ' + (cut.row + 1) + ' after brick ' + cut.brick + '):'

    $result.text(count + ' ' + position);
  }

  function draw(wall, cut) {
    var $container = $('<div/>');

    var maxWidth = 0;
    var cutLeft = 0;

    for (var brick = 0; brick < wall[0].length; brick++) {
      maxWidth += wall[0][brick];
    }

    for (var brick = 0; brick < cut.brick; brick++) {
      cutLeft += wall[cut.row][brick];
    }

    for (var row = 0; row < wall.length; row++) {
      var $row = $('<div class="wall-row"></div>');

      for (var brick = 0; brick < wall[row].length; brick++) {
        var width = wall[row][brick];

        var $cell = $('<div class="wall-cell"></div>')
          .css('width', (width * 100 / maxWidth) + '%')

        var $brick = $('<div class="wall-brick"></div>')
          .html(width);

        $cell.append($brick);
        $row.append($cell);
      }

      $container.append($row);
    }

    var $cut = $('<div class="wall-cut"></div>')
      .css('left', (cutLeft * 100 / maxWidth) + '%');

    $container.append($cut);

    $wall.html($container.children());
  }

  $code.each(function (i, code) {
    hljs.highlightBlock(code);
  });

  $editor.on('input', function () {
    var wall = parse($editor.val());

    if (wall !== null) {
      var cut = window.challenge.v1.cut(wall);

      print(cut);
      draw(wall, cut);
    }

    $editor.toggleClass('is-invalid', wall === null);
    $wall.toggleClass('disabled', wall === null);
  })

  $editor.trigger('input');

})();
