const express = require('express');
const { listGroupsController } = require('../controllers/groupController');
const router = express.Router();

router.get('/list-groups', listGroupsController);

module.exports = router;
