import Head from 'next/head';
import { useMemo } from 'react';

import PageContainer from '@/components/elements/PageContainer';
import FriendingPossibilitiesSection from '@/components/profile/FriendingPossibilitiesSection';
import FriendRecommendationsSection from '@/components/profile/FriendRecommendationsSection';
import FriendsSection from '@/components/profile/FriendsSection';
import UserLocationSection from '@/components/profile/LocationSection';
import UserPaperSection from '@/components/profile/UserPaperSection';
import UserSection from '@/components/profile/UserSection';
import { QueryResult } from '@/components/QueryResult';
import { useUser } from '@/hooks/User';
import { User } from '@/types/User';
import MUIDivider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

interface ProfileProps {
  userId: User['uuid'];
}

const Divider = () => (
  <MUIDivider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />
);

export default function Profile({ userId }: ProfileProps) {
  const { data, loading, error } = useUser(userId); // todo: fix loading state
  const actorIsUser = useMemo(
    () => data?.user?.uuid === userId,
    [data, userId],
  );

  return (
    <>
      <Head>
        <title>
          {data?.user ? `${data?.user.shortName} sin profil -` : ''} Kaffepause
        </title>
      </Head>
      <PageContainer>
        <QueryResult data={data?.user} error={error} loading={loading}>
          <Grid container spacing={10}>
            <Grid item md={4} xs={12}>
              <UserPaperSection actorIsUser={actorIsUser} user={data?.user} />
            </Grid>
            <Grid item md={8} xs={12}>
              <UserSection actorIsUser={actorIsUser} user={data?.user} />
              <UserLocationSection
                actorIsUser={actorIsUser}
                user={data?.user}
              />
              <Divider />
              {actorIsUser && (
                <>
                  <FriendsSection user={data?.user} />
                  <Divider />
                  <FriendRecommendationsSection user={data?.user} />
                  <Divider />
                  <FriendingPossibilitiesSection user={data?.user} />
                </>
              )}
            </Grid>
          </Grid>
        </QueryResult>
      </PageContainer>
    </>
  );
}
