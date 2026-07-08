import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found</title>
      </Helmet>

      <section className={`container page ${styles.wrapper}`}>
        {/* Decorative elements */}
        <div className={styles.decor} aria-hidden="true">
          <div className={styles.floater1} />
          <div className={styles.floater2} />
        </div>

        <div className={styles.content}>
          <h1 className={styles.code}>
            <span className="gradient-text">404</span>
          </h1>
          <h2 className={styles.title}>Page Not Found</h2>
          <p className={styles.text}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
          <Link to="/" className="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
