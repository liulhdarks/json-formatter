const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 创建.nojekyll文件防止GitHub Pages忽略下划线开头的文件
const createNojekyllFile = () => {
  const filePath = path.join(__dirname, 'dist', '.nojekyll');
  fs.writeFileSync(filePath, '');
  console.log('Created .nojekyll file');
};

// 如果不存在dist文件夹则创建
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'));
}

try {
  // 设置NODE_ENV为production
  process.env.NODE_ENV = 'production';
  
  // 执行构建命令
  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // 创建.nojekyll文件
  createNojekyllFile();
  
  console.log('Build completed successfully!');
  console.log('');
  console.log('To deploy to GitHub Pages:');
  console.log('1. Commit the dist folder to your repository');
  console.log('2. Push to GitHub');
  console.log('3. Enable GitHub Pages in your repository settings and select the gh-pages branch');
  console.log('');
  console.log('Or use gh-pages package with: npx gh-pages -d dist');
  
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}