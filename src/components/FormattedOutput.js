import React, { useState } from 'react';
import JsonNode from './JsonNode';

const FormattedOutput = ({ jsonData, unescaped }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  
  // 复制格式化的JSON内容
  const copyToClipboard = () => {
    if (!jsonData) return;
    
    // 将JSON对象转换为格式化的字符串
    const formattedText = JSON.stringify(jsonData, null, 2);
    
    navigator.clipboard.writeText(formattedText)
      .then(() => {
        setCopySuccess(true);
        // 3秒后重置状态
        setTimeout(() => {
          setCopySuccess(false);
        }, 3000);
      })
      .catch(err => {
        console.error('复制失败:', err);
      });
  };
  
  // 如果没有数据，显示提示信息
  if (!jsonData) {
    return (
      <div className="formatted-json">
        <p style={{ color: '#666' }}>格式化的JSON将显示在这里</p>
      </div>
    );
  }
  
  return (
    <div className="formatted-json-container">
      <div className="copy-button-container">
        <button 
          className={`copy-button ${copySuccess ? "copy-success" : ""}`}
          onClick={copyToClipboard}
        >
          {copySuccess ? "复制成功!" : "复制"}
        </button>
      </div>
      <div className="formatted-json">
        <JsonNode data={jsonData} unescaped={unescaped} />
      </div>
    </div>
  );
};

export default FormattedOutput;