import React, { useState } from 'react';

// 处理不同类型的JSON节点组件
const JsonNode = ({ data, level = 0, isLast = true, unescaped = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // 处理展开/收起切换
  const toggleCollapse = (e) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };
  
  // 阻止事件冒泡的处理函数，用于阻止内部值点击事件触发父级的展开/收起
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  
  // 根据数据类型渲染不同内容
  const renderValue = () => {
    const indent = '  '.repeat(level);
    
    // 处理 null
    if (data === null) {
      return <span className="json-null" onClick={stopPropagation}>null</span>;
    }
    
    // 处理布尔值
    if (typeof data === 'boolean') {
      return <span className="json-boolean" onClick={stopPropagation}>{data.toString()}</span>;
    }
    
    // 处理数字
    if (typeof data === 'number') {
      return <span className="json-number" onClick={stopPropagation}>{data}</span>;
    }
    
    // 处理字符串，如果启用了unescape，需要处理转义字符
    if (typeof data === 'string') {
      let displayStr = JSON.stringify(data);
      
      // 如果设置了unescaped，移除字符串内容中的转义
      if (unescaped && displayStr.length > 2) {
        try {
          // 取出引号内的内容并进行unescape
          const content = JSON.parse(displayStr);
          displayStr = `"${content}"`;
        } catch (e) {
          // 解析错误，保持原样
        }
      }
      
      return <span className="json-string" onClick={stopPropagation}>{displayStr}</span>;
    }
    
    // 处理数组
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return <span>[]</span>;
      }
      
      // 可折叠的数组
      return (
        <span className="collapsible">
          <span className="collapsible-marker" onClick={toggleCollapse}>{isCollapsed ? '+' : '-'}</span>
          <span className="array-bracket" onClick={toggleCollapse}>[</span>
          {!isCollapsed && (
            <>
              <br />
              {data.map((item, index) => (
                <div key={index} style={{ marginLeft: 20 }}>
                  {indent}
                  <JsonNode 
                    data={item} 
                    level={level + 1} 
                    isLast={index === data.length - 1}
                    unescaped={unescaped}
                  />
                  {index < data.length - 1 ? ',' : ''}<br />
                </div>
              ))}
              {indent}
            </>
          )}
          <span className="array-bracket" onClick={toggleCollapse}>]</span>
        </span>
      );
    }
    
    // 处理对象
    if (typeof data === 'object') {
      const keys = Object.keys(data);
      
      if (keys.length === 0) {
        return <span>{'{}'}</span>;
      }
      
      // 可折叠的对象
      return (
        <span className="collapsible">
          <span className="collapsible-marker" onClick={toggleCollapse}>{isCollapsed ? '+' : '-'}</span>
          <span className="object-bracket" onClick={toggleCollapse}>{'{' }</span>
          {!isCollapsed && (
            <>
              <br />
              {keys.map((key, index) => (
                <div key={key} style={{ marginLeft: 20 }}>
                  {indent}
                  <span className="json-key" onClick={stopPropagation}>"{key}"</span>: {' '}
                  <JsonNode 
                    data={data[key]} 
                    level={level + 1}
                    isLast={index === keys.length - 1}
                    unescaped={unescaped}
                  />
                  {index < keys.length - 1 ? ',' : ''}<br />
                </div>
              ))}
              {indent}
            </>
          )}
          <span className="object-bracket" onClick={toggleCollapse}>{'}'}</span>
        </span>
      );
    }
    
    // 处理其他类型
    return <span onClick={stopPropagation}>{String(data)}</span>;
  };
  
  return renderValue();
};

export default JsonNode;