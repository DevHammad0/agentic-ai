import React from 'react';
import Layout from '@theme/Layout';
import { PurpleCard } from '../components/PurpleCard';

export default function PurplePage() {
  return (
    <Layout title="Purple Card" description="A beautiful purple card component with Tailwind CSS">
      <PurpleCard
        title="Purple Component Page"
        description="This is a beautiful purple card component created with React and Tailwind CSS"
      />
    </Layout>
  );
}
