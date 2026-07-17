import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// Since this is a TypeScript server run by tsx/esbuild, we can import from our data module directly
import { 
  initialProperties, 
  initialServices, 
  initialProjects, 
  initialGalleryItems, 
  initialBlogs, 
  initialFAQs, 
  initialTeamMembers, 
  initialTestimonials, 
  initialSettings 
} from './src/data';
import { Property, Service, Project, GalleryItem, Blog, Testimonial, FAQ, TeamMember, AppSettings, Enquiry } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory Database initialized with static premium content
let db = {
  properties: [...initialProperties],
  services: [...initialServices],
  projects: [...initialProjects],
  gallery: [...initialGalleryItems],
  blogs: [...initialBlogs],
  faqs: [...initialFAQs],
  team: [...initialTeamMembers],
  testimonials: [...initialTestimonials],
  settings: { ...initialSettings },
  enquiries: [
    {
      id: 'enq-1',
      name: 'Manish Patel',
      email: 'manish.patel@gmail.com',
      phone: '+91 94260 98765',
      type: 'Property',
      propertyName: 'Balaji Business Hub',
      message: 'Interested in leasing 5,000 Sq.Ft. office space for our software development firm. Please schedule a call.',
      date: '2026-07-16',
      status: 'Pending'
    },
    {
      id: 'enq-2',
      name: 'Ketan Shah',
      email: 'ketan.shah@outlook.com',
      phone: '+91 98980 54321',
      type: 'Consultation',
      message: 'Looking for a wealth-building real estate advisory. Want to invest ₹5 Crore in high-yield assets.',
      date: '2026-07-15',
      status: 'Contacted'
    }
  ] as Enquiry[],
  visitorCount: 148
};

// --- AUTH ROUTE ---
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  // Simple, robust credentials for testing the Admin Panel
  if (username === 'admin' && password === 'balaji@2026') {
    res.json({ success: true, token: 'mock-jwt-token-12345', user: { name: 'Admin Balaji' } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid corporate credentials' });
  }
});

// --- ANALYTICS ROUTE ---
app.get('/api/analytics', (req, res) => {
  db.visitorCount += 1;
  const pendingEnquiries = db.enquiries.filter(e => e.status === 'Pending').length;
  const totalEnquiries = db.enquiries.length;
  
  res.json({
    visitorCount: db.visitorCount,
    totalProperties: db.properties.length,
    pendingEnquiries,
    totalEnquiries,
    blogsCount: db.blogs.length,
    projectsCount: db.projects.length
  });
});

// --- PROPERTIES CRUD ---
app.get('/api/properties', (req, res) => {
  res.json(db.properties);
});

app.post('/api/properties', (req, res) => {
  const property: Property = {
    id: `prop-${Date.now()}`,
    ...req.body
  };
  db.properties.unshift(property);
  res.json({ success: true, property });
});

app.put('/api/properties/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.properties.findIndex(p => p.id === id);
  if (idx !== -1) {
    db.properties[idx] = { ...db.properties[idx], ...req.body };
    res.json({ success: true, property: db.properties[idx] });
  } else {
    res.status(404).json({ error: 'Property not found' });
  }
});

app.delete('/api/properties/:id', (req, res) => {
  const { id } = req.params;
  db.properties = db.properties.filter(p => p.id !== id);
  res.json({ success: true });
});

// --- SERVICES CRUD ---
app.get('/api/services', (req, res) => {
  res.json(db.services);
});

app.post('/api/services', (req, res) => {
  const service: Service = {
    id: `srv-${Date.now()}`,
    ...req.body
  };
  db.services.push(service);
  res.json({ success: true, service });
});

app.put('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.services.findIndex(s => s.id === id);
  if (idx !== -1) {
    db.services[idx] = { ...db.services[idx], ...req.body };
    res.json({ success: true, service: db.services[idx] });
  } else {
    res.status(404).json({ error: 'Service not found' });
  }
});

app.delete('/api/services/:id', (req, res) => {
  const { id } = req.params;
  db.services = db.services.filter(s => s.id !== id);
  res.json({ success: true });
});

// --- PROJECTS CRUD ---
app.get('/api/projects', (req, res) => {
  res.json(db.projects);
});

app.post('/api/projects', (req, res) => {
  const project: Project = {
    id: `proj-${Date.now()}`,
    ...req.body
  };
  db.projects.push(project);
  res.json({ success: true, project });
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.projects.findIndex(p => p.id === id);
  if (idx !== -1) {
    db.projects[idx] = { ...db.projects[idx], ...req.body };
    res.json({ success: true, project: db.projects[idx] });
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  db.projects = db.projects.filter(p => p.id !== id);
  res.json({ success: true });
});

// --- GALLERY CRUD ---
app.get('/api/gallery', (req, res) => {
  res.json(db.gallery);
});

app.post('/api/gallery', (req, res) => {
  const item: GalleryItem = {
    id: `gal-${Date.now()}`,
    ...req.body
  };
  db.gallery.push(item);
  res.json({ success: true, item });
});

app.delete('/api/gallery/:id', (req, res) => {
  const { id } = req.params;
  db.gallery = db.gallery.filter(g => g.id !== id);
  res.json({ success: true });
});

// --- BLOGS CRUD ---
app.get('/api/blogs', (req, res) => {
  res.json(db.blogs);
});

app.post('/api/blogs', (req, res) => {
  const blog: Blog = {
    id: `blog-${Date.now()}`,
    ...req.body
  };
  db.blogs.unshift(blog);
  res.json({ success: true, blog });
});

app.put('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.blogs.findIndex(b => b.id === id);
  if (idx !== -1) {
    db.blogs[idx] = { ...db.blogs[idx], ...req.body };
    res.json({ success: true, blog: db.blogs[idx] });
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

app.delete('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  db.blogs = db.blogs.filter(b => b.id !== id);
  res.json({ success: true });
});

// --- TESTIMONIALS CRUD ---
app.get('/api/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.post('/api/testimonials', (req, res) => {
  const testimonial: Testimonial = {
    id: `test-${Date.now()}`,
    ...req.body
  };
  db.testimonials.push(testimonial);
  res.json({ success: true, testimonial });
});

app.put('/api/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.testimonials.findIndex(t => t.id === id);
  if (idx !== -1) {
    db.testimonials[idx] = { ...db.testimonials[idx], ...req.body };
    res.json({ success: true, testimonial: db.testimonials[idx] });
  } else {
    res.status(404).json({ error: 'Testimonial not found' });
  }
});

app.delete('/api/testimonials/:id', (req, res) => {
  const { id } = req.params;
  db.testimonials = db.testimonials.filter(t => t.id !== id);
  res.json({ success: true });
});

// --- ENQUIRIES CRUD ---
app.get('/api/enquiries', (req, res) => {
  res.json(db.enquiries);
});

app.post('/api/enquiries', (req, res) => {
  const enquiry: Enquiry = {
    id: `enq-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: 'Pending',
    ...req.body
  };
  db.enquiries.unshift(enquiry);
  res.json({ success: true, enquiry });
});

app.put('/api/enquiries/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.enquiries.findIndex(e => e.id === id);
  if (idx !== -1) {
    db.enquiries[idx] = { ...db.enquiries[idx], ...req.body };
    res.json({ success: true, enquiry: db.enquiries[idx] });
  } else {
    res.status(404).json({ error: 'Enquiry not found' });
  }
});

app.delete('/api/enquiries/:id', (req, res) => {
  const { id } = req.params;
  db.enquiries = db.enquiries.filter(e => e.id !== id);
  res.json({ success: true });
});

// --- FAQS CRUD ---
app.get('/api/faqs', (req, res) => {
  res.json(db.faqs);
});

app.post('/api/faqs', (req, res) => {
  const faq: FAQ = {
    id: `faq-${Date.now()}`,
    ...req.body
  };
  db.faqs.push(faq);
  res.json({ success: true, faq });
});

app.put('/api/faqs/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.faqs.findIndex(f => f.id === id);
  if (idx !== -1) {
    db.faqs[idx] = { ...db.faqs[idx], ...req.body };
    res.json({ success: true, faq: db.faqs[idx] });
  } else {
    res.status(404).json({ error: 'FAQ not found' });
  }
});

app.delete('/api/faqs/:id', (req, res) => {
  const { id } = req.params;
  db.faqs = db.faqs.filter(f => f.id !== id);
  res.json({ success: true });
});

// --- TEAM CRUD ---
app.get('/api/team', (req, res) => {
  res.json(db.team);
});

app.post('/api/team', (req, res) => {
  const member: TeamMember = {
    id: `team-${Date.now()}`,
    ...req.body
  };
  db.team.push(member);
  res.json({ success: true, member });
});

app.put('/api/team/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.team.findIndex(t => t.id === id);
  if (idx !== -1) {
    db.team[idx] = { ...db.team[idx], ...req.body };
    res.json({ success: true, member: db.team[idx] });
  } else {
    res.status(404).json({ error: 'Team member not found' });
  }
});

app.delete('/api/team/:id', (req, res) => {
  const { id } = req.params;
  db.team = db.team.filter(t => t.id !== id);
  res.json({ success: true });
});

// --- SETTINGS CRUD ---
app.get('/api/settings', (req, res) => {
  res.json(db.settings);
});

app.put('/api/settings', (req, res) => {
  db.settings = { ...db.settings, ...req.body };
  res.json({ success: true, settings: db.settings });
});

// --- MAIN VITE / STATIC FILE ROUTING ---

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Balaji Consultancy Services fullstack server online on port ${PORT}`);
  });
}

startServer();
