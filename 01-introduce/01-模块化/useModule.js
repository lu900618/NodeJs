const repo = 'github:su37josephxia/kaikeba-code';
const desc = '../test';

clone(repo, desc);
async function clone(repo, desc) {
  const { promisify } = require('util'); // 内置工具类 将callback转为 promise
  const download = promisify(require('download-git-repo'));
  const ora = require('ora');
  const process = ora(`正在下载...${repo}`);
  process.start();

  try {
    await download(repo, desc);
    process.succeed();
  } catch (error) {
    process.fail();
  }
  // download(repo, desc, (err) => {
  //   if (err) {
  //     process.fail();
  //   } else {
  //     process.succeed();
  //   }
  // });
}
