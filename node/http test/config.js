var fs = require('fs')

// 获取配置文件
var config = fs.readFileSync('./server.config')

// 将配置文件按照换行拆分成数组
var configs = config.toString().split('\r\n')

// 声明全局配置对象
var globalConfig = {}

// 循环配置文件数组，进行拆分整理到globalConfig
for (let i = 0; i < configs.length; i++) {
  var temp = configs[i].toString().split('=')
  globalConfig[temp[0]] = temp[1]
}

// 判断是否拥有静态文件类型，讲静态类型传给globalConfig
if (globalConfig.static_file_type) {
  globalConfig.static_file_type = globalConfig.static_file_type.split('|')
} else {
  throw new Error('配置文件异常，缺少static_file_type')
}

module.exports = globalConfig
