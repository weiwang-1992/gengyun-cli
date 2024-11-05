import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import createLogger from 'progress-estimator';
import chalk from 'chalk';

//初始化进度条
const logger = createLogger({
  spinner: {
    interval: 300, 
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item => {
    // frames: ["+", "-","+", "-","+", "-","+", "-","+", "-","+", "-",].map(item => {
      // chalk.green(item)
      return chalk.green(item)
    })
  }
})

const gitOptions: Partial<SimpleGitOptions> = {
   baseDir: process.cwd(), // 当前工作目录
   binary: 'git',  // 指定git 二进制文件路径
   maxConcurrentProcesses: 6, // 最大并发进程数量
};

export async function clone(url: string, projectName: string, options: string[]) {
  const git: SimpleGit = simpleGit(gitOptions);
  try {
    await logger(git.clone(url, projectName, options),'代码下载中：',{
      estimate: 5000, // 预计下载时间
    })
    console.log();
    console.log(chalk.blueBright('================================================'));
    console.log(chalk.blueBright('========== 欢迎使用 gengyun-cli 脚手架 =========='));
    console.log(chalk.blueBright('================================================'));
    console.log();
    console.log();
    console.log(chalk.blueBright('============= 请使用 npm install 安装依赖 ============'));
    console.log(chalk.blueBright('============= 使用 npm run dev 运行项目 =============='));
  }catch(error){
    console.log(error);
  }
}