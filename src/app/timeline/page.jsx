import { client } from '../../lib/sanity.client';
import { TimelineQuery } from '../../lib/queries';
import Timeline from '../../../components/Timeline';

export const revalidate = 60; // adjust as needed

export default async function TimelinePage() {
  const entries = await client.fetch(TimelineQuery);
  return (
    <main className="rg-container my-10">
      <h1 className="text-3xl font-semibold mb-6" style={{ color: '#8b0000' }}>
        Goose — Monthly Timeline
      </h1>
      <Timeline entries={entries} />
    </main>
  );
}
