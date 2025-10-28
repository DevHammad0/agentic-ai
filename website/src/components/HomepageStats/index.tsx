import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type Stat = {
  number: string;
  label: string;
  description: string;
};

const StatsList: Stat[] = [
  {
    number: '800M+',
    label: 'Weekly Active Users',
    description: 'ChatGPT has transformed how millions interact with AI daily',
  },
  {
    number: '$500B+',
    label: 'Infrastructure Investment',
    description: 'Global commitment to building the agentic infrastructure',
  },
  {
    number: '2 Comprehensive',
    label: 'Learning Modules',
    description: 'From foundational concepts to organizational transformation',
  },
];

function StatCard({number, label, description}: Stat) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statNumber}>{number}</div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statDescription}>{description}</div>
    </div>
  );
}

export default function HomepageStats(): ReactNode {
  return (
    <section className={styles.stats}>
      <div className="container">
        <div className={styles.statsContent}>
          <Heading as="h2" className={styles.statsTitle}>By The Numbers</Heading>
          <p className={styles.statsSubtitle}>
            The AI revolution is here. These numbers show the scale of transformation happening today.
          </p>
        </div>
        <div className={styles.statsGrid}>
          {StatsList.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
