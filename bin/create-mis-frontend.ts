#!/usr/bin/env node
import inquirer from 'inquirer'
import shell from 'shelljs'
import fs from 'fs'
import path from 'path'
import { buildProject } from '../src/index'
import { Project } from '../src/types'
;(async function () {
  const answers = await inquirer.prompt<Project>([
    {
      type: 'input',
      message: 'Pick the name of your app:',
      name: 'name',
      default: 'starter',
    }
  ])

    const appAnswers = await inquirer.prompt<Project>([
      {
        type: 'input',
        message: 'Port number:',
        name: 'port',
        default: '2022',
      },
      {
        type: 'list',
        message: 'CSS:',
        name: 'css',
        choices: ['Tailwind'],
        default: 'CSS',
      },
    ])

    buildProject({
      ...answers,
      ...appAnswers,
    })

  shell.echo(`Your '${answers.name}' project is ready to go.

Next steps:

▶️ cd ${answers.name}
▶️ npm ci
▶️ npm start
`)
})()
