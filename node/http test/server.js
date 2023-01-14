var http = require('http')
const path = require('path')
var url = require('url')
var fs = require('fs')
var globalConfig = require('./config')

//创建连接
http
  .createServer(function (request, response) {
    var myurl = new URL('http:127.0.0.1:12306' + request.url)
    var pathname = myurl.pathname
    var host = myurl.host

    //是否请求的是静态文件
    var isStatic = isStaticsRequest(pathname)
    if (isStatic) {
      //请求的静态的文件
      try {
        var data = fs.readFileSync(globalConfig['page_path'] + pathname)
        response.writeHead(200)
        response.write(data)
        response.end()
      } catch (e) {
        var err = fs.readFileSync(globalConfig['page_path'] + '/404.html')
        response.writeHead(404)
        response.write(err)
        response.end()
      }
    } else {
      //动态的文件
      console.log('请求了动态的数据')
    }
  })
  .listen(globalConfig['port'])

// 根据globalConfig静态数据判断链接请求是否是请求静态文件
function isStaticsRequest(pathname) {
  for (var i = 0; i < globalConfig.static_file_type.length; i++) {
    var temp = globalConfig.static_file_type[i]
    if (pathname.indexOf(temp) == pathname.length - temp.length) {
      return true
    }
  }
  return false
}
