// import Terminal from '../components/terminal';
// import axios from 'axios';

// function Home() {
//   const handleSubmit = async () => {
//     const response = await axios.post('http://localhost:5000/create-new-machine');
//     console.log(response);
//   };

//   return (
//     <div>
//       <h1>Terminal</h1>
//       <button onClick={handleSubmit}>create new machine</button>
//       <br /><br />
//       <Terminal />
//     </div>
//   );
// };

// export default Home;

// import axios from 'axios';
// import Link from 'next/link';

// function Home() {
//   return (
//     <div>
//       <h1>Home</h1>

//       <Link href="/create-new-machine">
//         <button>Create new machine</button>
//       </Link>

//       <br /><br />

//       <Link href="connect-existing-machine">
//         <button>Connect to an existing machine</button>
//       </Link>
//     </div>
//   );
// };

// export default Home;

import styles from '@/styles/Home.module.css';
import { useState } from 'react';

import Link from 'next/link';
import axios from 'axios';

function Home() {
  const [containerId, setContainerId] = useState();
  const [newContainerId, setNewContainerId] = useState();
  const [containerSelect, setContainerSelect] = useState('debian');
  const [containerCreated, setContainerCreated] = useState(false);

  const handleCreateContainerSubmit = async () => {
    console.log(containerSelect);
    const response = await axios.post('http://localhost:5000/create-new-conatiner', {
      image: containerSelect
    });
    setNewContainerId(response.data.containerId);
    setContainerCreated(true);
  };

  const handleContainerIdSubmit = async () => {
    console.log(containerId);
    const response = await axios.post('http://localhost:5000/get-container-ip', {
      containerId: containerId
    });
    console.log(response);
  };

  return (<>
    <div className={styles.homeContainer}>
      <div className={styles.createContainer}>
        <h1>Create a new container</h1>
        <select value={containerSelect} onChange={(e) => setContainerSelect(e.target.value)} className={styles.containerSelect}>
          <option value="debian">Debian</option>
          <option value="ubuntu">Ubuntu</option>
        </select>
        <button onClick={handleCreateContainerSubmit} className={styles.homeBtn}>Create</button>
        {containerCreated && <p className={styles.newContainerId}>Your new container ID is: <span className={styles.markdownCode}>{newContainerId}</span></p>}
      </div>

      <div className={styles.connectContainer}>
        <h1>Connect to an existing container</h1>
        <input className={styles.containerIdInput} type="text" onChange={(e) => setContainerId(e.target.value)} placeholder="Container ID..." />
        <button onClick={handleContainerIdSubmit} className={styles.homeBtn}>Connect</button>
      </div>
    </div>
  </>);
};

export default Home;