import { Helmet } from 'react-helmet-async';
import styles from './About.module.css';

const stats = [
  { value: '2025–29', label: 'B.E. Duration' },
  { value: '4+', label: 'Projects Built' },
  { value: 'MERN', label: 'Core Stack' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Hemanth Kumar</title>
        <meta
          name="description"
          content="Learn more about Hemanth Kumar, a Full Stack Developer with a passion for building clean, scalable web applications."
        />
      </Helmet>

      <section className={`container page`}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              About <span className="gradient-text">Me</span>
            </h1>
            <p className={styles.intro}>
              I&apos;m a passionate engineering student and aspiring Full Stack Developer
              based in Chennai, India. I love turning complex problems into simple,
              beautiful, and intuitive web applications.
            </p>
          </div>

          {/* Stats Row */}
          <div className={styles.statsRow}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Education Timeline */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.sectionIcon}>
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              Education
            </h2>

            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineCard}>
                  <span className={styles.timelineDate}>August 2025 — July 2029</span>
                  <h3 className={styles.timelineTitle}>
                    Prince Shri Venkateshwara Padmavathy Engineering College
                  </h3>
                  <p className={styles.timelineDesc}>
                    Bachelor of Engineering — Electrical, Electronic and Communications Engineering
                  </p>
                  <span className={styles.timelineLocation}>Chennai, Tamil Nadu, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* What I Do */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.sectionIcon}>
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              What I Do
            </h2>
            <div className={styles.whatIDo}>
              <div className={styles.doCard}>
                <div className={styles.doIcon}>🎨</div>
                <h3>Frontend</h3>
                <p>Building responsive, accessible UIs with React and modern CSS</p>
              </div>
              <div className={styles.doCard}>
                <div className={styles.doIcon}>⚙️</div>
                <h3>Backend</h3>
                <p>Designing RESTful APIs with Node.js, Express, and MongoDB</p>
              </div>
              <div className={styles.doCard}>
                <div className={styles.doIcon}>🚀</div>
                <h3>Deployment</h3>
                <p>Deploying production-ready apps on Vercel, Render, and Atlas</p>
              </div>
            </div>
          </div>

          <a
            href="/resume.pdf"
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Resume
          </a>
        </div>
      </section>
    </>
  );
}
