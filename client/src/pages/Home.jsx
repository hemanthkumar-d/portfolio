import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getProjects } from '../api/projects';
import { mockProjects } from '../api/mockProjects';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from './Home.module.css';

export default function Home() {
  const { data: projects, loading, error, wakingUp, timedOut, refetch } = useFetch(
    () => getProjects({ featured: true }),
    []
  );

  const isOffline = !!error || timedOut;
  const displayProjects = projects || (isOffline ? mockProjects.filter((p) => p.featured) : []);
  const showFallback = isOffline && displayProjects.length > 0;

  return (
    <>
      <Helmet>
        <title>Hemanth Kumar | Full Stack Developer</title>
        <meta
          name="description"
          content="Full Stack Developer building clean, scalable web applications with the MERN stack."
        />
      </Helmet>

      <section className={styles.hero}>
        {/* Animated background elements */}
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.orb3} />
          <div className={styles.gridLines} />
        </div>

        <div className={styles.heroContent}>
          <p className={styles.greeting}>
            <span className={styles.wave} aria-hidden="true">👋</span>
            {' '}Hi, I&apos;m
          </p>
          <h1 className={styles.name}>
            <span className="gradient-text">Hemanth Kumar</span>
          </h1>
          <p className={styles.role}>Full Stack Developer</p>
          <p className={styles.tagline}>
            I build clean, scalable web applications with the MERN stack —
            turning ideas into polished digital experiences.
          </p>
          <div className={styles.cta}>
            <Link to="/projects" className="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              View My Work
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Get In Touch
            </Link>
          </div>
        </div>

        <div className={styles.scrollIndicator} aria-hidden="true">
          <div className={styles.scrollDot} />
        </div>
      </section>

      <section className={`container ${styles.featured}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.sectionLine} />
        </div>

        {loading && !timedOut && !displayProjects.length && (
          <LoadingSpinner
            message={wakingUp ? 'Backend is waking up...' : 'Loading projects...'}
          />
        )}

        {showFallback && (
          <div className={styles.offlineWarning} role="status">
            <span>⚠️ Live API server is offline/waking up. Showing local portfolio projects.</span>
          </div>
        )}

        {timedOut && !displayProjects.length && (
          <div className={styles.errorBox} role="alert">
            <p>Server is taking longer than expected. Please try again.</p>
            <button className="btn btn-primary" onClick={refetch} style={{ marginTop: 16 }}>
              Retry
            </button>
          </div>
        )}

        {error && !loading && !displayProjects.length && (
          <div className={styles.errorBox} role="alert">
            <p>Failed to load projects. Please try again later.</p>
            <p className={styles.errorDetail}>{error}</p>
          </div>
        )}

        {!loading && displayProjects.length === 0 && (
          <p className={styles.empty}>No featured projects yet.</p>
        )}

        {displayProjects.length > 0 && (
          <div className={styles.grid}>
            {displayProjects.map((project, i) => (
              <div key={project._id} className={styles.gridItem} style={{ animationDelay: `${i * 100}ms` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        {displayProjects.length > 0 && (
          <div className={styles.viewAll}>
            <Link to="/projects" className="btn btn-outline">
              View All Projects →
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
