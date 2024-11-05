import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import createLogger from 'progress-estimator';
import chalk from 'chalk';

//初始化进度条
const logger = createLogger({
  spinner: {
    interval: 300, 
    // frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item => {
    frames: ["+", "-","+", "-","+", "-","+", "-","+", "-","+", "-",].map(item => {
      chalk.green(item)
      return item
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
    chalk.green('下载成功');
    
  }catch(error){
    console.log(error);
  }
}