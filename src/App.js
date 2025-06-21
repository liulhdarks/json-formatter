import React, { useState, useEffect } from 'react';
import JsonInput from './components/JsonInput';
import FormattedOutput from './components/FormattedOutput';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedJson, setParsedJson] = useState(null);
  const [error, setError] = useState('');
  const [unescaped, setUnescaped] = useState(false);

  // 格式化JSON
  const formatJson = () => {
    if (!jsonInput.trim()) {
      setParsedJson(null);
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      setParsedJson(parsed);
      setError('');
    } catch (err) {
      setParsedJson(null);
      setError(`解析错误: ${err.message}`);
    }
  };

  // 当输入变化时重新格式化
  useEffect(() => {
    formatJson();
  }, [jsonInput]);

  // 加载示例JSON
  const loadSample = () => {
    const sample = {
      "name": "JSON格式化工具",
      "features": ["格式化", "语法高亮", "节点展开收起", "字符串转义处理"],
      "version": 1.0,
      "author": {
        "name": "开发者",
        "email": "dev@example.com"
      },
      "isActive": true,
      "description": "这是一个包含转义字符串的样例: \n 换行 \t 制表符",
      "nullValue": null,
      "nestedArray": [
        {
          "id": 1,
          "items": ["a", "b", "c"]
        },
        {
          "id": 2,
          "items": ["d", "e", "f"]
        }
      ]
    };
    
    setJsonInput(JSON.stringify(sample, null, 2));
  };

  // 清空输入
  const clearInput = () => {
    setJsonInput('');
    setParsedJson(null);
    setError('');
  };

  // 切换是否启用unescape
  const toggleUnescape = () => {
    setUnescaped(!unescaped);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>JSON格式化工具</h1>
      </div>

      <div className="main-content">
        {/* 左侧输入面板 */}
        <div className="input-panel">
          <div className="panel-header">
            <span>JSON输入</span>
            <div className="controls">
              <button onClick={loadSample}>加载示例</button>
              <button className="button-secondary" onClick={clearInput}>清空</button>
            </div>
          </div>
          <JsonInput value={jsonInput} onChange={setJsonInput} />
        </div>

        {/* 右侧输出面板 */}
        <div className="output-panel">
          <div className="panel-header">
            <span>格式化输出</span>
            <div className="controls">
              <button 
                onClick={toggleUnescape}
                className={unescaped ? "button-active" : ""}
              >
                {unescaped ? "已解除转义" : "解除转义"}
              </button>
            </div>
          </div>
          
          {error ? (
            <div className="formatted-json">
              <p style={{ color: 'red' }}>{error}</p>
            </div>
          ) : (
            <FormattedOutput jsonData={parsedJson} unescaped={unescaped} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;