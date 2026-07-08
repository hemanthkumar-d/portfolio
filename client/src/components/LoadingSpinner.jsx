import PropTypes from 'prop-types';
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ message }) {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading">
      <div className={styles.spinner} />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};
