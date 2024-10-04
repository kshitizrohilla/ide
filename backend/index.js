const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const Docker = require('dockerode');
const docker = Docker();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server status: RUNNING');
});

const createContainer = require('./routes/createContainer.js');
app.use('/api', createContainer);

const getFiles = require('./routes/getFiles.js');
app.use('/api', getFiles);

app.post('/delete-container', async (req, res) => {
  console.log('This is body', req.body);
  const { containerName } = req.body;
  try {
    const container = docker.getContainer(containerName);
    await container.remove({ force: true });
    res.send('Container deleted');
  } catch (error) {
    console.log(error);
    console.log(containerName);
    res.send('Cannot delete container');
  }
});

app.listen(5000, () => {
  console.log(`Server listening on port 5000`);
});
