const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Project = require('../models/Project');

let mongod;

const sampleProjects = [
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
  }
];

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  await Project.deleteMany({});
  await Project.insertMany(sampleProjects);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('1. Health Check API', () => {
  it('should return status ok on /api/health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, data: { status: 'ok' } });
  });

  it('should return 404 on nonexistent route', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBeDefined();
  });
});

describe('2. Projects API', () => {
  it('should return an array of 4 projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(4);
  });

  it('should return only featured projects when queried', async () => {
    const res = await request(app).get('/api/projects?featured=true');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(3); // 3 out of 4 are featured
    expect(res.body.data.every(p => p.featured === true)).toBe(true);
  });

  it('should return a single project for a valid ID', async () => {
    const project = await Project.findOne();
    const res = await request(app).get(`/api/projects/${project._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe(project.title);
  });

  it('should return 404 for an invalid ID', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/projects/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it('should create a project with valid body', async () => {
    const newProject = {
      title: 'New Project',
      description: 'Test description',
      techStack: ['Jest'],
      featured: false
    };
    const res = await request(app).post('/api/projects').send(newProject);
    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe('New Project');
  });

  it('should return 400 when missing title', async () => {
    const newProject = {
      description: 'Test description',
      techStack: ['Jest'],
      featured: false
    };
    const res = await request(app).post('/api/projects').send(newProject);
    expect(res.statusCode).toBe(400);
  });

  it('should update a project with valid body', async () => {
    const project = await Project.findOne();
    const res = await request(app).put(`/api/projects/${project._id}`).send({ title: 'Updated Title' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe('Updated Title');
  });

  it('should delete a project', async () => {
    const project = await Project.findOne();
    const res = await request(app).delete(`/api/projects/${project._id}`);
    expect(res.statusCode).toBe(200);
    
    // verify it's gone
    const check = await Project.findById(project._id);
    expect(check).toBeNull();
  });
});

describe('3. Contact API', () => {
  it('should return 201 with valid body', async () => {
    const res = await request(app).post('/api/contact').send({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Hello',
      message: 'Test message'
    });
    expect(res.statusCode).toBe(201);
  });

  it('should return 400 with missing email', async () => {
    const res = await request(app).post('/api/contact').send({
      name: 'John Doe',
      subject: 'Hello',
      message: 'Test message'
    });
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 with invalid email', async () => {
    const res = await request(app).post('/api/contact').send({
      name: 'John Doe',
      email: 'not-an-email',
      subject: 'Hello',
      message: 'Test message'
    });
    expect(res.statusCode).toBe(400);
  });

  it('should return 429 when rate limited (6 requests in quick succession)', async () => {
    let lastStatusCode;
    for (let i = 0; i < 6; i++) {
      const res = await request(app).post('/api/contact').send({
        name: `User ${i}`,
        email: `test${i}@example.com`,
        subject: 'Hello',
        message: 'Test'
      });
      lastStatusCode = res.statusCode;
    }
    expect(lastStatusCode).toBe(429);
  });
});
