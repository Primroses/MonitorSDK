import Koa from 'koa'
import { useLogger } from './utils/useUtils'
// import Router
import { router } from './routes/index'
import { useCors } from './middleware/cors'
import KoaBody from 'koa-bodyparser'
import KoaStatic from 'koa-static'
import path from 'path'

// const debug = require('debug')('app')
// const jsonp = require('koa-jsonp') // 不支持types
// import intercept from './middleware/intercept'

// 创建一个Koa对象表示web app本身:
const app = new Koa() // 扩展State, Context
// 放在前面才可以
app.use(KoaStatic(path.join(__dirname, './public')))
app.use(useCors)
app.use(useLogger())
app.use(
  KoaBody({
    enableTypes: ['json', 'form', 'text']
  })
)
// app.use(jsonp()) // 装个JSONP插件就可以了？
// app.use(wsIntercept)
// debug()
app.use(router.routes()).use(router.allowedMethods())
// 对于任何请求，app将调用该异步函数处理请求：
// 在端口3000监听:

export default app
