const express = require('express');
const createContainer = require('../functions/createContainer.js');

const router = express.Router();
router.use(express.json());

router.post('/createContainer', async (req, res) => {
  const { projectName, image } = req.body;
  console.log(projectName, image);
  
  const createStatus = await createContainer(projectName, image);

  if (createStatus === 'Container created and started') {
    res.send('Container created');
  } else {
    res.send('Failed to create container');
  }
});

module.exports = router;