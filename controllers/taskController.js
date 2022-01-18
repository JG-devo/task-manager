const Task = require('../models/taskModel');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/customError');

exports.getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

exports.createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

exports.getOneTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task)
    return next(
      createCustomError(`Cannot find task with the ID: ${req.params.id}`, 404)
    );
  res.status(200).json({ task });
});

exports.deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task)
    return next(
      createCustomError(`Cannot find task with the ID: ${req.params.id}`, 404)
    );
  res.status(200).json({ success: true });
});

exports.updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true, //always return the updated document
    runValidators: true,
  });
  if (!task)
    return next(
      createCustomError(`Cannot find task with the ID: ${req.params.id}`, 404)
    );
  res.status(200).json({ task });
});
