import { client } from '../src/lib/sanity.client';
import { TimelineQuery } from '../src/lib/queries';
import Timeline from './Timeline';

export default async function TimelineServer() {
  const entries = await client.fetch(TimelineQuery);
  return <Timeline entries={entries} titleLinkHref="/timeline" />;
}