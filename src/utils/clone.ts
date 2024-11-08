import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import createLogger from 'progress-estimator';
import chalk from 'chalk';
import { log } from './log'
const figlet = require('figlet')

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

const goodPrint = async () => {
  const data = await figlet('gengyun-cli')
  console.log(chalk.rgb(40,156,193).visible(data))
}

export async function clone(url: string, projectName: string, options: string[]) {
  const git: SimpleGit = simpleGit(gitOptions);
  try {
    await logger(git.clone(url, projectName, options),'代码下载中：',{
      estimate: 5000, // 预计下载时间
    })
    // 相关提示
    goodPrint();
    console.log();
    console.log(chalk.blueBright('================================================'));
    console.log(chalk.blueBright('========== 欢迎使用 gengyun-cli 脚手架 =========='));
    console.log(chalk.blueBright('================================================'));
    console.log();
    log.success(`项目创建成功${chalk.blueBright(projectName)}`)
    log.success("执行以下命令启动项目：")
    log.info(`cd ${chalk.blueBright(projectName)}`)
    log.info(`${chalk.yellow('npm')} install`)
    log.info(`${chalk.yellow('npm')} run dev`)
  }catch(error){
    log.error(chalk.red('代码下载失败'));
  }
}