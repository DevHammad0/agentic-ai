import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function HomepageCTA(): ReactNode {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaContent}>
          <Heading as="h2" className={styles.ctaTitle}>Ready to Lead the Agentic Revolution?</Heading>
          <p className={styles.ctaDescription}>
            Join thousands of professionals learning how to harness AI agents for organizational success. Start your journey today and gain competitive advantage.
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className={clsx('button button--primary button--lg', styles.primaryBtn)}
              to="/docs/intro">
              Begin Your Journey
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
