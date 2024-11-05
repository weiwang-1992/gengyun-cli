import { input,select } from '@inquirer/prompts';
import { clone } from '../utils/clone';
import path from 'path'
import fs from 'fs-extra'

export interface TemplateInfo {
  name: string, // 模板名称
  downloadUrl: string, // 模板下载地址
  description: string, // 模板描述
  branch: string, // 模板分支
}

export const templates: Map<string,TemplateInfo> = new Map(
  [
    [
      'Vite-Vue3-Typescript-template',
      {
        name: 'Vite-Vue3-Typescript-template',
        downloadUrl: 'https://github.com/weiwang-1992/vue3-admin-template.git',
        description: 'vue3技术栈开发模板dev10',
        branch: 'dev10'
      }
    ],
    [
      'vue3-dev9',
      {
        name: 'vue3-dev9',
        downloadUrl: 'https://github.com/weiwang-1992/vue3-admin-template.git',
        description: 'vue3技术栈开发模板dev9',
        branch: 'dev9'
      }
    ]
  ]
)

export function isOverWrite(fileName: string) {
  console.log(`${fileName}文件夹已存在`)
  return select({
    message: '是否覆盖',
    choices: [
      {name: '覆盖',value: true},
      {name: '取消',value: false},
    ]
  })
}

export async function create(projectName?: string) {
  // 初始化模板列表
  const templateList = Array.from(templates).map( ( item: [ string, TemplateInfo ]) => {
    const [ name, info ] = item
    return {
      name,
      value: name,
      description: info.description
    }
  })

  if(!projectName) {
    projectName = await input({ message: '请输入项目名称' });
  }

  // 如果文件夹已存在，则提示是否覆盖
  const filePath = path.resolve(process.cwd(),projectName)
  if(fs.existsSync(filePath)){
    const run  = await isOverWrite(projectName)
    if(run) {
      await fs.remove(filePath)
    } else {
      return; // 不覆盖直接结束
    }
  }
  
  const TemplateName = await select({
    message: '请选择模板',
    choices: templateList
  })

  const info = templates.get(TemplateName)
  console.log(info)
  if(info) {
    clone(info.downloadUrl,projectName,['-b',info.branch])
  }
}