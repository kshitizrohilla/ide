import { useState } from 'react';
import axios from 'axios';

function CreateNewMachine() {
  const [containerId, setContainerId] = useState('Create new machine to get a new container id');

  const handleSubmit = async () => {
    const response = await axios.post('http://localhost:5000/create-new-machine');
    console.log(response);
    setContainerId('Your new container id: ' + response.data.containerId);
  };

  return (
    <div>
      <button onClick={handleSubmit}>create new machine</button>
      <pre>{containerId}</pre>
    </div>
  );
};

export default CreateNewMachine;