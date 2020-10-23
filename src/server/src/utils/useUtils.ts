import koaLogger from 'koa-logger'
import chalk from 'chalk'

const str =
`_____              
|  _ \\ _   _ _ __  
| |_) | | | |  _ \\ 
|  _ <| |_| | | | |
|_| \\_\\\\__,_|_| |_|`

export function useTerminal () {
  console.log(chalk.bold.magenta(str))
  console.log('')
  console.log(`app is Listen ${chalk.bold.red(5000)}`)
}

export function useLogger () {
  return koaLogger({
    transporter: (str, args) => {
      const [, methods, url, status, time] = args as Array<string>
      // console.log(methods, url, status, time, str)
      // 洋葱模型之 搞两次?
      if (!status) {
        return
      }
      const date = new Date().toLocaleString()
      const statusStr = parseInt(status, 10) > 200 || parseInt(status, 10) < 304 ? chalk.green(status) : chalk.red(status)
      console.log(`[${chalk.cyan(date)}]`, chalk.yellow(methods), statusStr, time, url)
    }
  })
}
