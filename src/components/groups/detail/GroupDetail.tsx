import Head from 'next/head';

import Divider from '@/components/elements/Divider';
import PageContainer from '@/components/elements/PageContainer';
import GroupDetailCardSection from '@/components/groups/detail/GroupDetailCardSection';
import GroupDetailHeader from '@/components/groups/detail/GroupDetailHeader';
import GroupMembersSection from '@/components/groups/detail/GroupMembersSection';
import { QueryResult } from '@/components/QueryResult';
import { useGroup } from '@/hooks/Groups';
import { Grid } from '@mui/material';

type GroupDetailProps = {
  uuid: string;
};

export default function GroupDetail({ uuid }: GroupDetailProps) {
  const { data, loading, error } = useGroup(uuid);
  const group = data?.group;

  return (
    <>
      <Head>
        <title>{`${group?.name ?? ''} - Kaffepause`}</title>
      </Head>
      <PageContainer>
        <QueryResult
          data={group}
          error={error}
          loading={loading}
          loadingComponent={null}>
          <Grid container spacing={5}>
            <Grid item md={8} order={{ xs: 2, sm: 2, md: 1, lg: 1 }} xs={12}>
              <GroupDetailHeader group={group} />
              <GroupMembersSection group={group} />
              <Divider />
            </Grid>
            <Grid item md={4} order={{ xs: 1, sm: 1, md: 2, lg: 2 }} xs={12}>
              <GroupDetailCardSection />
            </Grid>
          </Grid>
        </QueryResult>
      </PageContainer>
    </>
  );
}
