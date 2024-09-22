import styles from '@/styles/Dashboard.module.css';
import { useState } from 'react';

import Link from 'next/link';

function Dashboard() {
  const [project, setProject] = useState('nodejs');
  const [projectName, setProjectName] = useState();

  const handleProjectCreate = (e) => {
    e.preventDefault();
    console.log(project, projectName);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardExistingProjects}>
        <h1>Existing Projects</h1>
        <p>No existing projects found</p>
      </div>

      <div className={styles.dashboardNewProject}>
        <h1>Create new Project</h1>
        <p>Choose from a list of most popular frameworks</p>
        <form onSubmit={handleProjectCreate} method="post">
          <select value={project} onChange={(e) => setProject(e.target.value)}>
            <option value="nodejs">Node.js</option>
            <option value="html-css-js">HTML, CSS, JS</option>
            <option value="c++">C++</option>
          </select>

          <input
            type="text"
            placeholder="Name your project..."
            required
            onChange={(e) => setProjectName(e.target.value)} />

          <Link href={{ pathname: '/project-process', query: { project, projectName } }}><button className={styles.mainButtons} type="submit">Create</button></Link>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;