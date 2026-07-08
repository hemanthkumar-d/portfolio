import { Helmet } from 'react-helmet-async';
import SectionHeading from '../components/SectionHeading';
import styles from './Skills.module.css';

const categories = [
  {
    name: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 80 },
      { name: 'React Router', level: 80 },
      { name: 'CSS Modules', level: 85 },
      { name: 'Responsive Design', level: 90 },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 78 },
      { name: 'Express', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'Mongoose', level: 75 },
      { name: 'REST APIs', level: 82 },
    ],
  },
  {
    name: 'Tools & Other',
    icon: '🛠️',
    skills: [
      { name: 'Git', level: 80 },
      { name: 'GitHub', level: 82 },
      { name: 'VS Code', level: 90 },
      { name: 'Postman', level: 78 },
      { name: 'Vite', level: 75 },
      { name: 'Vercel', level: 78 },
      { name: 'Python', level: 70 },
    ],
  },
];

export default function Skills() {
  return (
    <>
      <Helmet>
        <title>Skills — Hemanth Kumar</title>
        <meta
          name="description"
          content="Technical skills and technologies I work with including HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Git, and GitHub."
        />
      </Helmet>

      <section className={`container page`}>
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Technologies and tools I use to bring ideas to life"
        />

        <div className={styles.categories}>
          {categories.map((category, catIndex) => (
            <div
              key={category.name}
              className={styles.category}
              style={{ animationDelay: `${catIndex * 150}ms` }}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                <h3 className={styles.categoryName}>{category.name}</h3>
              </div>
              <div className={styles.grid}>
                {category.skills.map((skill, i) => (
                  <div
                    key={skill.name}
                    className={styles.card}
                    style={{ animationDelay: `${catIndex * 150 + i * 60}ms` }}
                  >
                    <div className={styles.cardTop}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillPercent}>{skill.level}%</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressBar}
                        style={{ '--progress': `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
