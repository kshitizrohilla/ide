import styles from '@/styles/create-project.module.css';
import React, { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';
import axios from 'axios';

const CreateProject = () => {
  const router = useRouter();
  let { projectName, image } = router.query;
  console.log(projectName, image);

  const isCreated = useRef(false);

  const [status, setStatus] = useState([
    { text: 'Setting up workspace', completed: false },
    { text: 'Initializing environment', completed: false },
    { text: 'Building environment', completed: false },
    { text: 'Finalizing', completed: false },
  ]);

  const insertDashes = (str) => {
    return str.replace(/ /g, '-');
  };

  useEffect(() => {
    if (isCreated.current) return;
    isCreated.current = true;

    const createContainer = async () => {
      const response = await axios.post('http://localhost:5000/api/createContainer', {
        projectName, image
      });

      console.log(response.data);
      
      if (projectName) {
        projectName = insertDashes(projectName);
        localStorage.setItem('projectName', projectName);
      }
    };

    const alreadyCreated = localStorage.getItem('projectName');
    if (alreadyCreated !== null && alreadyCreated !== undefined) {
      window.location.href = 'http://localhost:3000/dashboard';
      return;
    }

    createContainer();
  }, []);

  useEffect(() => {
    const timeouts = [
      setTimeout(() => updateStatus(0), 1000),
      setTimeout(() => updateStatus(1), 3000),
      setTimeout(() => updateStatus(2), 4000),
      setTimeout(() => updateStatus(3), 7000),
    ];

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const updateStatus = (index) => {
    setStatus(prevStatus => {
      const newStatus = [...prevStatus];
      newStatus[index].completed = true;

      if (newStatus.every(item => item.completed)) {
        window.location.href = 'http://localhost:3000/editor';
      }

      return newStatus;
    });
  };

  return (
    <div className={styles.createProjectWrapper}>
      <ul>
        {status.map((item, index) => (
          <li key={index}>
            {item.completed ? (
              <span className={styles.checkmark}>✔</span>
            ) : (
              <div className={styles.loader}></div>
            )}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateProject;
