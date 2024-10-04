import styles from '@/styles/dashboard.module.css';
import React, { useState, useRef, useEffect } from 'react';

import Link from 'next/link';
import axios from 'axios';

const Dashboard = () => {
  const [projectName, setProjectName] = useState('');
  const [templateSearchInput, setTemplateSearchInput] = useState('');
  
  const [singleProject, setSingleProject] = useState(null);
  const [templateAutocomplete, setTemplateAutocomplete] = useState(false);

  const templates = ['NextJS', 'ExpressJS', 'Vite', 'VueJS', 'ReactJS', 'NodeJS', 'C', 'C++', 'Python', 'Java', 'Django', 'Flask', 'HTML, CSS, JavaScript', 'Rust'];

  const filteredItems = templates.filter(template => template.toUpperCase().indexOf(templateSearchInput.toUpperCase()) > -1);

  useEffect(() => {
    const value = localStorage.getItem('projectName');
    setSingleProject(value);
  }, []);

  useEffect(() => {
    console.log(filteredItems);
  }, [filteredItems]);

  const handleDeleteProject = async () => {
    const containerName = localStorage.getItem('projectName');
    
    const response = await axios.post('http://localhost:5000/delete-container', {
      containerName
    });

    if (response.data === 'Container deleted') {
      localStorage.removeItem('projectName');
      setSingleProject(null);
    }
    
    console.log(response);
  };

  return (
    <div className={styles.dashboardWrapper}>
      <ul className={styles.navbarWrapper}>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><input placeholder="Command Palette" type="text" /></li>
        <li><Link href="/">Signout</Link></li>
      </ul>

      <div className={styles.newProjectWrapper}>
        <h2>Create a New Project</h2>
      
        <div className={styles.templateSearchWrapper}>
          <input
            type="text"
            placeholder="Name your project..."
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Search templates..."
            value={templateSearchInput}
            onChange={(e) => {
              setTemplateSearchInput(e.target.value);
              setTemplateAutocomplete(true);
            }}
          />

          {templateAutocomplete && (
            <ul className={styles.filteredList}>
              {filteredItems.map((item, index) => (
                <li key={index}>
                  <button onClick={() => {
                    setTemplateAutocomplete(false);
                    setTemplateSearchInput(item);
                  }}>{item}</button>
                </li>
              ))}
            </ul>
          )}

          <button>
            <Link href={{ pathname: '/create-project', query: { projectName: projectName, image: templateSearchInput } }}>Create</Link>
          </button>
        </div>

        <div className={styles.templateSelectWrapper}>
            <h2>Popular Templates</h2>
          <div>
            {templates.map((item, index) => (
              <button onClick={() => {
                setTemplateSearchInput(item);
                setTemplateAutocomplete(false);
              }} key={index}>{item}</button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.recentProjectWrapper}>
        <h2>Recent Projects</h2>

        <div className={styles.recentProjectSearchWrapper}>
          <input placeholder="Search projects..." type="text" />
        </div>

        <div className={styles.projectSelectWrapper}>
          {singleProject && (
            <div>
              <Link href="/editor"><button>{singleProject}</button></Link>
              <button onClick={handleDeleteProject} title="Delete project" className={styles.deleteBtn}>❌</button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.githubWrapper}>
        <h2>My Repositories</h2>
        <form>
          <Link href="#"><button>Connect your GitHub account</button></Link>
        </form>

        <h2>From URL</h2>
        <form>
          <input type="text" placeholder="GitHub Repository URL" />
          <Link href="#"><button>Import</button></Link>
        </form>
      </div>

      <div className={styles.emptyWrapper}></div>
    </div>
  );
};

export default Dashboard;