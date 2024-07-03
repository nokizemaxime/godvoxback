const { listGroups } = require('../services/whatsappService');

const listGroupsController = async (req, res) => {
  try {
    const groups = await listGroups();
    res.json(groups);
  } catch (error) {
    res.status(500).send('Error listing groups');
  }
};

module.exports = {
  listGroupsController,
};
