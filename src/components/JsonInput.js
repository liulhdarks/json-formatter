import React from 'react';

const JsonInput = ({ value, onChange }) => {
  return (
    <div className="textarea-container">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="请输入JSON字符串..."
        spellCheck="false"
      />
    </div>
  );
};

export default JsonInput;