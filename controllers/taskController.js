exports.getAllTasks = (req, res) => {
  res.send('get all items');
};

exports.createTask = (req, res) => {
  res.json(req.body);
};

exports.getOneTask = (req, res) => {
  res.json({ id: req.params.id });
};

exports.updateTask = (req, res) => {
  res.send('update items');
};

exports.deleteTask = (req, res) => {
  res.send('delete items');
};
