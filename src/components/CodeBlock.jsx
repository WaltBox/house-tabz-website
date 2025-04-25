// CodeBlock.jsx
import React, { useState } from 'react';

const CodeBlock = ({ code, language }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  return (
    <div className="relative group">
      <pre className="bg-gray-800 text-gray-100 rounded-md p-4 overflow-auto text-sm">
        <code>{code}</code>
      </pre>
      <button 
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copySuccess || 'Copy'}
      </button>
    </div>
  );
};

export default CodeBlock;