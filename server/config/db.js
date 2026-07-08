const mongoose = require('mongoose');
const Project = require('../models/Project');

const connectDB = async () => {
  let uri = process.env.MONGODB_URI;

  if (!uri) {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
    console.log('Using in-memory MongoDB (no MONGODB_URI env var set)');
  }

  const conn = await mongoose.connect(uri);
  console.log(`MongoDB connected: ${conn.connection.host}`);

  const count = await Project.countDocuments();
  if (count === 0) {
    const projects = [
      {
        title: 'Personal Portfolio Website',
        description: 'A full-stack personal portfolio showcasing skills, projects, and custom interactive components. Built with a MERN stack backend and Vite React frontend.',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Vercel'],
        githubUrl: 'https://github.com/hemanthkumar-d/personal-portfolio',
        liveUrl: 'https://hemanth-portfolio.vercel.app',
        imageUrl: 'https://placehold.co/800x500/2563EB/FFFFFF?text=Personal+Portfolio+Website',
        featured: true,
      },
      {
        title: 'Task Management Application',
        description: 'A full-stack task management web application for creating, updating, and tracking tasks. Features secure user authentication and dynamic CRUD operations.',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
        githubUrl: 'https://github.com/hemanthkumar-d/task-manager',
        liveUrl: 'https://tasks-demo.example.com',
        imageUrl: 'https://placehold.co/800x500/0EA5E9/FFFFFF?text=Task+Management+App',
        featured: true,
      },
      {
        title: 'E-Commerce Web Application',
        description: 'A complete e-commerce store with product catalog management, add-to-cart, user authentication (Admin/User), and order tracking workflows.',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
        githubUrl: 'https://github.com/hemanthkumar-d/ecommerce-platform',
        liveUrl: 'https://ecommerce-demo.example.com',
        imageUrl: 'https://placehold.co/800x500/10B981/FFFFFF?text=E-Commerce+Platform',
        featured: false,
      },
      {
        title: 'Blog Platform with Comments',
        description: 'A responsive blogging platform with user authentication, custom post editor (create, edit, delete), and interactive comment threads.',
        techStack: ['Next.js', 'MongoDB', 'Tailwind CSS', 'MDX'],
        githubUrl: 'https://github.com/hemanthkumar-d/blog-platform',
        liveUrl: 'https://blog-demo.example.com',
        imageUrl: 'https://placehold.co/800x500/8B5CF6/FFFFFF?text=Blog+Platform',
        featured: true,
      },
    ];
    await Project.insertMany(projects);
    console.log('Seeded 4 sample projects');
  }
};

module.exports = connectDB;
