var frames = [];

frames[frames.length] = `
╭~~~╮
(o^.^o)
`;
frames[frames.length] = `
╭~~~╮
(o~.~o)
`;
frames[frames.length] = `
╭~~~╮
(o@.@o)
`;
frames[frames.length] = `
╭~~~╮
(o'.'o)
`;

var fps = 10;
var current = 0;
var render = () => {
  // 这两行代码清屏
  process.stdout.write('\033[2J');
  process.stdout.write('\033[0f');

  if (current === frames.length) {
    current = 0;
  }
  process.stdout.write(frames[current++]);
 
};

setInterval(render, 1000 / fps);