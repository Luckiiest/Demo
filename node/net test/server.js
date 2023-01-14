var net = require('net') //TCP/IP协议
var fs = require('fs')
// 加载配置文件
var globalConf = require('./conf')

var server = net.createServer()
// 监听端口为globalConf.port的客户端
server.listen(globalConf.port, '127.0.0.1')

server.on('listening', function () {
  console.log('服务已启动')
})

server.on('connection', function (socket) {
  socket.on('data', function (data) {
    // 获取url中需要获取的文件
    var url = data.toString().split('\r\n')[0].split(' ')[1]
    try {
      // 进行获取数据，发送数据
      var dataFile = fs.readFileSync(globalConf['basePath'] + url)
      socket.write('HTTP/1.1 200OK\r\n\r\n')
      socket.write(dataFile)
    } catch (e) {
      // 发送失败报文
      socket.write('HTTP1.1 404NotFound\r\n\r\n<html><body><h1>404 Not Found</h1></body></html>')
    }
    // 服务端断开连接
    socket.end()
  })
})
