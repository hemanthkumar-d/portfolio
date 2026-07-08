import { Helmet } from 'react-helmet-async';
import useFetch from '../hooks/useFetch';
import { getProjects } from '../api/projects';
import { mockProjects } from '../api/mockProjects';
import ProjectCard from '../components/ProjectCard';
import SectionHeading from '../components/SectionHeading';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from './Projects.module.css';

export default function Projects() {
  const { data: projects, loading, error, wakingUp, timedOut, refetch } = useFetch(
    () => getProjects(),
    []
  );

  const isOffline = !!error || timedOut;
  const displayProjects = projects || (isOffline ? mockProjects : []);
  const showFallback = isOffline && displayProjects.length > 0;

  return (
    <>
      <Helmet>
        <title>Projects — Hemanth Kumar</title>
        <meta
          name="description"
          content="Explore projects built by Hemanth Kumar using the MERN stack and modern web technologies."
        />
      </Helmet>

      <section className={`container page`}>
        <SectionHeading
          title="Projects"
          subtitle="A collection of projects I've built"
        />

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
            <button className="btn btn-primary" onClick={refetch} style={{ marginTop: 12 }}>
              Retry
            </button>
          </div>
        )}

        {error && !loading && !displayProjects.length && (
          <div className={styles.errorBox} role="alert">
            <p>Failed to load projects.</p>
            <p className={styles.errorDetail}>{error}</p>
            <button className="btn btn-primary" onClick={refetch}>
              Try Again
            </button>
          </div>
        )}

        {!loading && displayProjects.length === 0 && (
          <div className={styles.empty}>
            <p>No projects yet. Check back soon!</p>
          </div>
        )}

        {displayProjects.length > 0 && (
          <div className={styles.grid}>
            {displayProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
