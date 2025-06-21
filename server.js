const express = require('express');
const path = require('path');
const app = express();
const net = require('net');

// 定义一组可用端口
const availablePorts = [3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009];

// 检查端口是否可用
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', () => {
      resolve(false); // 端口不可用
    });
    
    server.once('listening', () => {
      server.close();
      resolve(true); // 端口可用
    });
    
    server.listen(port);
  });
}

// 寻找可用端口并启动服务器
async function startServer() {
  // 提供构建后的静态文件
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // 所有请求都返回index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
  
  // 查找可用端口
  let port;
  for (const testPort of availablePorts) {
    const available = await isPortAvailable(testPort);
    if (available) {
      port = testPort;
      break;
    }
  }
  
  if (!port) {
    console.error('无法找到可用的端口，请关闭一些应用程序后重试');
    process.exit(1);
  }
  
  // 启动服务器
  app.listen(port, () => {
    console.log(`JSON格式化工具正在运行: http://localhost:${port}`);
  });
  
  return port;
}

// 导出startServer函数供cli.js使用
module.exports = { startServer };

// 直接执行时启动服务器
if (require.main === module) {
  startServer();
}