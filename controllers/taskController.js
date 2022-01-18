const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.getOneTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    if (!task)
      return res.status(404).json({
        success: false,
        msg: `Cannot find task with the ID: ${req.params.id}`,
      });
    res.status(200).json({ task });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task)
      res.status(404).json({
        success: false,
        msg: `Cannot find task with the ID: ${req.params.id}`,
      });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true, //always return the updated document
      runValidators: true,
    });
    if (!task)
      res.status(404).json({
        success: false,
        msg: `Cannot find task with the ID: ${req.params.id}`,
      });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
