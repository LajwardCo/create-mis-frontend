export type Profiler = {
  NAME: string
  SAFE_NAME: string
  PORT?: number
  CSS_EXTENSION?: 'css' | 'scss' | 'less'
  CSS?: 'Tailwind' | 'Empty CSS'
  CONTAINER?: string
}

export type Project = {
  css?: 'CSS' | 'Tailwind'
  port?: number
  name: string
}
