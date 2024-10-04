const Docker = require('dockerode');
const docker = new Docker();

const createContainer = async (projectName, image) => {
  const insertDashes = (str) => {
    return str.replace(/ /g, '-');
  };
  
  if (projectName === undefined || image !== 'ExpressJS') return;

  projectName = insertDashes(projectName);
  image = 'custom_express';

  try {
    const container = await docker.createContainer({
      Image: image,
      name: projectName,
      Tty: true,
      ExposedPorts: {
        '5001/tcp': {},
        '5002/tcp': {}
      },
      HostConfig: {
        PortBindings: {
          '5001/tcp': [{ HostPort: '5001' }],
          '5002/tcp': [{ HostPort: '5002' }]
        }
      }
    });

    await container.start();
    return 'Container created and started';
  } catch (error) {
    console.log(error);
    return 'Failed to create container';
  }
};

module.exports = createContainer;