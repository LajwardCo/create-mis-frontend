import util from 'util'
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import { Profiler, Project } from './types'

const ncp = util.promisify(require('ncp').ncp)

const templateFile = (fileName: string, replacements: Profiler) => {
  const fileContent = fs.readFileSync(fileName, 'utf8').toString()

  const template = Object.entries(replacements).reduce((acc, [key, value]) => {
    return acc.replace(
      new RegExp(`(\{\{${key}\}\}|\{\{ ${key} \}\})`, 'g'),
      value?.toString() ?? ''
    )
  }, fileContent)
  fs.writeFileSync(fileName, template)
}

// required for npm publish
const renameGitignore = (projectName: string) => {
  if (fs.existsSync(path.normalize(`${projectName}/gitignore`))) {
    fs.renameSync(
      path.normalize(`${projectName}/gitignore`),
      path.normalize(`${projectName}/.gitignore`)
    )
  }
}

const buildProfiler = ({
  name,
  css,
  port,
}: Project) => {
  const profiler: Profiler = {
    NAME: name,
    SAFE_NAME: name.replace(/-/g, '_').trim(),
  }

  profiler.PORT = port
    const isTailwind = css === 'Tailwind'
    profiler.CSS_EXTENSION = isTailwind ? 'scss' : 'css'
    profiler.CONTAINER = isTailwind
      ? 'mt-10 text-3xl mx-auto max-w-6xl'
      : 'container'
    profiler.CSS = isTailwind ? 'Tailwind' : 'Empty CSS'

  return profiler
}

export const buildProject = async (project: Project) => {
  const { name } = project
  const lang = 'ts'
  const profiler = buildProfiler(project)

    await ncp(
      path.join(__dirname, `../templates/application/react/base`),
      name
    )
    await ncp(
      path.join(__dirname, `../templates/application/react/ts`),
      name
    )

    if (profiler.CSS_EXTENSION === 'scss') {
      fs.unlinkSync(path.normalize(`${name}/src/index.css`))
      await ncp(
          path.join(__dirname, '../templates/application-extras/tailwind'),
          name
      )

      const packageJSON = JSON.parse(
          fs.readFileSync(path.join(name, 'package.json'), 'utf8')
      )
      packageJSON.devDependencies.tailwindcss = '^2.0.2'
      fs.writeFileSync(
          path.join(name, 'package.json'),
          JSON.stringify(packageJSON, null, 2)
      )
    }

  renameGitignore(name)

  glob.sync(`${name}/**/*`).forEach((file) => {
    if (fs.lstatSync(file).isFile()) {
      templateFile(file, profiler)
    }
  })
}
