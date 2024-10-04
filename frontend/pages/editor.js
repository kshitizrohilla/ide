const { Editor: MonacoEditor } = require('@monaco-editor/react');

import Terminal from '@/components/Terminal';
import Explorer from '@/components/Explorer';
import axios from 'axios';

import styles from '@/styles/custom.module.css';
import { useState, useEffect, useRef } from 'react';

const Editor = () => {
  const [code, setCode] = useState(``);
  const [fileTree, setFileTree] = useState([]);

  const buttonRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState('');
  const [selectedFileContent, setSelectedFileContent] = useState('');

  const explorerFetched = useRef(false);
  const codeRef = useRef(code);

  useEffect(() => {
    codeRef.current = code;
  }, [code]);  

  const fetchFile = async (path) => {
    try {
      const response = await axios.post('http://localhost:5002/get-file', {
        fileName: path
      });

      if (typeof (response.data) === 'string') {
        setCode(response.data);
      } else {
        setCode(JSON.stringify(response));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updatePreview = () => {
    const preview = document.getElementById('preview');
    preview.src = preview.src;
  };

  const writeFile = async () => {
    try {
      console.log(codeRef.current);
      const response = await axios.post('http://localhost:5002/write-file', {
        fileName: selectedFile,
        code: codeRef.current
      });
      console.log(response);
      setTimeout(updatePreview, 500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 's' || e.key === 'S') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (buttonRef.current) {
          buttonRef.current.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (explorerFetched.current) return;
    explorerFetched.current = true;

    const getFiles = async () => {
      const response = await axios.post('http://localhost:5002/api/get-files');
      setFileTree(response.data.tree);
    };

    getFiles();
  }, []);

  const functionEx = async (path) => {
    console.log('Feching file:', path);
    await fetchFile(path);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.explorerContainer}>
        <div className={styles.explorerHeading}>
          <p>SAMPLE EXPRESS APP</p>
        </div>

        <Explorer
          onSelect={(path) => {
            setSelectedFileContent("");
            setSelectedFile(path);
            functionEx(path);
          }}
          tree={fileTree}
        />
      </div>


      <div className={styles.editorContainer}>
        <ul className={styles.currentFile}>
          <li>
            <img className={styles.filesIcons} src="https://static-00.iconduck.com/assets.00/javascript-js-icon-2048x2048-nyxvtvk0.png" />
            {selectedFile}
            <span className={styles.symbolX}>✖</span>
          </li>
          <li ref={buttonRef} className={styles.saveBtn} style={{ padding: "10px 25px" }} onClick={writeFile}>__Save__</li>
        </ul>

        <MonacoEditor
          height="100vh"
          width="50vw"
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
            renderLineHighlight: false,
          }}
          onChange={(e) => {
            setCode(e);
          }}
        />
      </div>

      <div className={styles.rightContainer}>
        <ul className={styles.currentTerminal}>
          <li>🐳 Preview<span className={styles.symbolX}>✖</span></li>
        </ul>
        <div className={styles.previewContainer}>
          {/* The iframe was populating the browser's history stack with its navigational entries, resulting in the back button functionality being influenced by the iframe's history. As a consequence, navigating back through the main window also triggered the iframe's previous states, potentially leading to an unexpected user experience. */}
          
          <iframe style={{ width: "50vw" }} id="preview" className={styles.preview} src="http://localhost:5001" />
          {/* <h2 style={{ fontFamily: "Segoe UI", fontWeight: "500" }}>🚧 Live Preview Under Development 🚧</h2> */}
        </div>

        <div className={styles.terminalContainer}>
          <ul className={styles.currentTerminal}>
            <li>$ Bash<span className={styles.symbolX}>✖</span></li>
          </ul>
          <div className={styles.terminalContainerChild}>
            <Terminal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;