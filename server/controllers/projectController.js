const { validationResult } = require('express-validator');
const Project = require('../models/Project');
const asyncHandler = require('../middleware/asyncHandler');

const getProjects = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.featured === 'true') {
    filter.featured = true;
  }

  const projects = await Project.find(filter).sort({ createdAt: -1 });

  res.json({ success: true, data: projects });
});

const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.json({ success: true, data: project });
});

const createProject = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map((e) => e.msg).join(', '));
  }

  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.json({ success: true, data: project });
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.json({ success: true, data: {} });
});

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
