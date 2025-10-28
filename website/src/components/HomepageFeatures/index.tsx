import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Comprehensive Learning Path',
    icon: '📚',
    description: (
      <>
        Structured courses covering AI agents, organizational transformation, and real-world applications. Learn from foundational concepts to advanced implementation strategies.
      </>
    ),
  },
  {
    title: 'Industry Insights',
    icon: '💡',
    description: (
      <>
        Discover how leading organizations leverage AI agents to drive innovation. Understand competitive landscapes and strategic opportunities in the agentic economy.
      </>
    ),
  },
  {
    title: 'Practical Assessments',
    icon: '✓',
    description: (
      <>
        Test your knowledge with self-assessment quizzes at multiple levels. Validate your understanding with both basic and graduate-level challenges.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featureHeader}>
          <Heading as="h2" className={styles.sectionTitle}>Why Choose TutorsGPT?</Heading>
          <p className={styles.sectionDescription}>
            Everything you need to master AI agents and lead organizational transformation
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
