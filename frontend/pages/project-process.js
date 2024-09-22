import styles from '@/styles/ProjectProcess.module.css';
import { useState, useRef, useEffect } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

function ProjectProcess() {
  const router = useRouter();
  const { project, projectName } = router.query;
  const image = project + '_custom';
  console.log(image, projectName);

  const [containerCreation, setContainerCreation] = useState(true);
  const [shellConnection, setShellConnection] = useState(false);
  const [filesLoading, setFilesLoading] = useState(false);
  const [editorLoading, setEditorLoading] = useState(false);

  const hasContainerCreated = useRef(false);

  const createContainer = async () => {
    const response = await axios.post('http://localhost:5000/create-new-container', {
      image: image
    });
    console.log(response);
    if (response.status === 200) {
      setShellConnection(true);
      hasContainerCreated.current = true;
    }
  };

  // const establishShellConnection = async () => {
  //   const resopnse = await axios.

  useEffect(() => {
    const first = async () => {
      const status = localStorage.getItem('containerCreation');
      if (status === '0' || status === null) {
        createContainer();
        localStorage.setItem('containerCreation', '1');
        console.log('container created');
      }
    };

    first();

    // if (shellConnection) {

  }, []);

  return (
    <div className={styles.projectProcessContainer}>
      <ul className={styles.projectProcessesList}>
        {containerCreation && <li>Creating container...</li>}
        {shellConnection && <li>Establishing connection with container shell...</li>}
        {filesLoading && <li>Loading files...</li>}
        {editorLoading && <li>Loading editor...</li>}
      </ul>
    </div>
  );
};

export default ProjectProcess;