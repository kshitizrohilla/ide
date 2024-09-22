const express = require('express');
const app = express();

const Docker = require('dockerode');
const docker = new Docker();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'hello from the intermediate server' });
});

// app.post('/get-files', async (req, res) => {
//   const container = docker.getContainer('ac8742177b4641022518b42aa58e42cad1d640feceb3d7306b660418be5328d4');
//   const exec = await container.exec({
//     Cmd: ['ls', '-a', '/app'],
//     AttachStdout: true,
//     AttachStderr: true
//   });

//   await exec.start({ detach: false, Tty: false }, (err, stream) => {
//     if (err) console.log(err);
//     let outputData = '';

//     stream.on('data', (data) => {
//       outputData += data.toString();
//     });

//     stream.on('end', () => {
//       const filesArray = outputData.split('\n').filter(file => file);
//       filesArray.splice(0, 2);
//       res.json({ files: filesArray });
//     });
//   }); 
// });

app.post('/get-container-ip', async (req, res) => {
  const { containerId } = req.body;
  // res.json({ containerId });
  try {
    const container = docker.getContainer(containerId);
    const data = await container.inspect();
    res.json({ data });
    const ipAddress = data.networkSettings.IPAddress;
    res.status(200).json({ containerIP: ipAddress });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post('/press', async (req, res) => {
  const { containerId } = req.body;
  const container = docker.getContainer(containerId);
  const exec1 = await container.exec({
    AttachStdout: true,
    AttachStderr: true,
    Cmd: [`service`, `shellinabox` `restart`]
  });
  const response1 = await exec1.start({ Detach: false, Tty: false });
  console.log(response1);
});

app.post('/create-new-container', async (req, res) => {
  const image = req.body.image;
  console.log(image);

  try {
    const container = await docker.createContainer({
      Image: image,
      Cmd: ['nodemon', 'app.js', '&&', 'service', 'shellinabox', 'start'],
      Tty: true,
      HostConfig: {
        PortBindings: {
          '5000/tcp': [{ HostPort: '5001' }],
          '5001/tcp': [{ HostPort: '5002' }]
        },
      },
      ExposedPorts: {
        '5000/tcp': {},
        '5001/tcp': {}
      }
    });

    await container.start();

    // const info = await container.inspect();
    // const ipAddress = info.NetworkSettings.IPAddress;

    // console.log(ipAddress);

    const exec1 = await container.exec({
      AttachStdout: true,
      AttachStderr: true,
      Cmd: [`service`, `shellinabox`, `restart`]
    });

    // const exec2 = await container.exec({
    //   AttachStdout: true,
    //   AttachStderr: true,
    //   Cmd: ['service', 'shellinabox', 'restart']
    // });

    const response1 = await exec1.start({ Detach: false, Tty: false });
    // const response2 = await exec2.start({ Detach: false, Tty: false });

    // console.log(response1, response2);

    res.status(200).json({
      message: `new container created using image: ${image}`,
      containerId: container.id
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});