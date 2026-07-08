import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  const name = 'Hemanth Kumar';
  const githubUrl = 'https://github.com/hemanthkumar-d';
  const linkedinUrl = 'https://www.linkedin.com/in/hemanth-kumar-1234813a1';

  return (
    <>
      <Navbar name={name} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer name={name} githubUrl={githubUrl} linkedinUrl={linkedinUrl} />
    </>
  );
}
