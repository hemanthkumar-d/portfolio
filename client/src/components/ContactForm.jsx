import { useState } from 'react';
import PropTypes from 'prop-types';
import { submitContact } from '../api/contact';
import styles from './ContactForm.module.css';

const INITIAL = { name: '', email: '', subject: '', message: '' };
const ERRORS = {
  name: 'Name is required (max 100 characters)',
  email: 'A valid email is required',
  subject: 'Subject is required (max 150 characters)',
  message: 'Message is required (max 2000 characters)',
};

function validate(values) {
  const errors = {};
  if (!values.name.trim() || values.name.length > 100) errors.name = ERRORS.name;
  if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = ERRORS.email;
  if (!values.subject.trim() || values.subject.length > 150) errors.subject = ERRORS.subject;
  if (!values.message.trim() || values.message.length > 2000) errors.message = ERRORS.message;
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus('submitting');
    try {
      await submitContact(form);
      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      setStatus('error');
      setServerError(err.message);
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successBox} role="alert">
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out. I&apos;ll get back to you soon.</p>
        <button className="btn btn-primary" onClick={() => setStatus('idle')}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {['name', 'email', 'subject', 'message'].map((field) => (
        <div key={field} className={styles.field}>
          <label htmlFor={field} className={styles.label}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          {field === 'message' ? (
            <textarea
              id={field}
              name={field}
              className={`${styles.input} ${fieldErrors[field] ? styles.inputError : ''}`}
              rows="5"
              value={form[field]}
              onChange={handleChange}
              aria-invalid={!!fieldErrors[field]}
              aria-describedby={fieldErrors[field] ? `${field}-error` : undefined}
            />
          ) : (
            <input
              id={field}
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              className={`${styles.input} ${fieldErrors[field] ? styles.inputError : ''}`}
              value={form[field]}
              onChange={handleChange}
              aria-invalid={!!fieldErrors[field]}
              aria-describedby={fieldErrors[field] ? `${field}-error` : undefined}
            />
          )}
          {fieldErrors[field] && (
            <span id={`${field}-error`} className={styles.fieldError} role="alert">
              {fieldErrors[field]}
            </span>
          )}
        </div>
      ))}

      {serverError && (
        <div className={styles.serverError} role="alert">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
