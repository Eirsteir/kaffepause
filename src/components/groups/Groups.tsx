import Head from 'next/head';

import Heading from '@/components/elements/Heading';
import GroupCard from '@/components/groups/GroupCard';
import ListSection from '@/components/modules/ListSection';
import { QueryResult } from '@/components/QueryResult';
import { useMyGroups } from '@/hooks/Groups';
import { Group } from '@/types/Group';
import URLS from '@/URLS';

export default function Groups() {
  const { data, loading, error } = useMyGroups();

  return (
    <>
      <Head>
        <title>Dine grupper - Kaffepause</title>
      </Head>
      <>
        <Heading>Gruppeoversikt</Heading>

        <QueryResult
          data={data?.myGroups}
          error={error}
          loading={loading}
          loadingComponent={null}>
          <ListSection
            emptyStateActionText='Lag en gruppe nå'
            emptyStateActionUrl={URLS.GROUPS}
            emptyStateText='Du er ikke med i noen grupper enda'
            heading='Dine grupper'
            isEmpty={data?.myGroups.length === 0}
            items={data?.myGroups}
            ListCard={({ item }: { item: Group }) => <GroupCard group={item} />}
          />
        </QueryResult>
      </>
    </>
  );
}
