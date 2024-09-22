import axios from 'axios';
import { useState } from 'react';

function ConnectExistingMachine() {
  const [containerId, setContainerId] = useState(null);

  const handleConnect = (e) => {
    e.preventDefault();
    console.log('Connecting to an existing machine with id:', containerId);
  };

  return (
    <div>
      <form onSubmit={handleConnect} method="POST">
        <input onChange={(e) => setContainerId(e.target.value)} type="text" placeholder="Enter container id" />
        <input type="submit" value="Connect" />
      </form>
    </div>
  );
};

export default ConnectExistingMachine;