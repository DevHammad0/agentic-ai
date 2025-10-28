import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageStats from '@site/src/components/HomepageStats';
import HomepageCTA from '@site/src/components/HomepageCTA';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <p className={styles.heroDescription}>
            Master the future of business with AI agents. Learn how organizations are transforming with agentic AI to unlock new opportunities and competitive advantages.
          </p>
          <div className={styles.buttonGroup}>
            <Link
              className={clsx('button button--primary button--lg', styles.primaryBtn)}
              to="/docs/intro">
              Start Learning Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="Comprehensive educational platform for learning about AI agents and organizational transformation">
      <HomepageHeader />
      <main>
        <HomepageStats />
        <HomepageFeatures />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
