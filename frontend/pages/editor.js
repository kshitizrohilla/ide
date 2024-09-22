import styles from '@/styles/Editor.module.css';
import { Editor as MonacoEditor } from '@monaco-editor/react';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Editor() {
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState(`const express = require('express') \n // code here`);

  // useEffect(() => {
  //   const getFiles = async () => {
  //     const response = await axios.post('http://localhost:5000/get-files');
  //     console.log(response.data.files);
  //     setFiles(response.data.files);
  //   };
    
  //   getFiles();
  // }, []);

  return (
    <div className={styles.editorContainer}>
      <ul className={styles.textEditor}>
        <li>file1</li>
        <li>file2</li>
        {/* {files.map((item, index) => (
          <li key={index}>{item}</li>
        ))}       */}
      </ul>

      <div className={styles.monacoEditorContainer}>
        <MonacoEditor
          height="100vh"
          language="javascript"
          theme="vs-dark"
          value={code}
          options={{
            wordWrap: 'on',
            automaticLayout: true,
            minimap: { enabled: false },
            scrollbar: {
              verticalScrollbarSize: 0,
            },
            fontSize: 16,
            smoothScrolling: true,
            mouseWheelZoom: true,
          }}
          onChange={(e) => setCode(e.target.value)}

        />
      </div>

      <object className={styles.object1} data="http://localhost:5001" />
      <object className={styles.object2} data="http://localhost:5002" />
    </div>
  );
};

export default Editor;