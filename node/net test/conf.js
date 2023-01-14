var fs = require('fs')

var globalConf = {}
// 获取配置文件
var conf = fs.readFileSync('server.conf')
// 根据换行符来分割成数组
var confs = conf.toString().split('\r\n')

for (let i = 0; i < confs.length; i++) {
  // 循环数组中每一个进行=号分割，变成对象
  var tempConf = confs[i].split('=')
  if (tempConf.length < 2) {
    continue
  } else {
    globalConf[tempConf[0]] = tempConf[1]
  }
}
// 地址变换
if (globalConf.path_position == 'relative') {
  globalConf.basePath = __dirname + globalConf.path
} else {
  globalConf.basePath = globalConf.path
}
module.exports = globalConf
