import Head from 'next/head';

import BreakDetailActionCard from '@/components/breaks/BreakDetailActionCard';
import { BreakDetailHeader } from '@/components/breaks/BreakDetailHeader';
import { BreakDetailInvitationAddresseesSection } from '@/components/breaks/BreakDetailInvitationAddresseesSection';
import { BreakDetailLocationSection } from '@/components/breaks/BreakDetailLocationSection';
import { BreakDetailParticipantsSection } from '@/components/breaks/BreakDetailParticipantsSection';
import Divider from '@/components/elements/Divider';
import PageContainer from '@/components/elements/PageContainer';
import { QueryResult } from '@/components/QueryResult';
import { useBreak } from '@/hooks/Breaks';
import { Grid } from '@mui/material';

type BreakProps = {
  uuid: string;
};

export default function BreakDetail({ uuid }: BreakProps) {
  const { data, loading, error } = useBreak(uuid);
  const break_ = data?.break_;

  return (
    <>
      <Head>
        <title>Pause - Kaffepause</title>
      </Head>
      <PageContainer>
        <QueryResult
          data={data}
          error={error}
          loading={loading}
          loadingComponent={null}>
          <Grid container spacing={5}>
            <Grid item md={8} order={{ xs: 2, sm: 2, md: 1, lg: 1 }} xs={12}>
              <BreakDetailHeader
                startingAt={break_?.startingAt}
                title={break_?.title}
              />
              <BreakDetailLocationSection
                canViewerEditBreak={break_?.canViewerEditBreak}
                location={break_?.location}
              />

              <Divider />

              <BreakDetailInvitationAddresseesSection
                addressees={
                  break_?.invitation?.addressees.edges.map(
                    (edge) => edge.node,
                  ) ?? []
                }
                canViewerEditBreak={break_?.canViewerEditBreak}
              />
              <Divider />

              {break_?.hasPassed && (
                <>
                  <BreakDetailParticipantsSection
                    participants={
                      break_?.participants.edges.map((edge) => edge.node) ?? []
                    }
                  />
                  <Divider />
                </>
              )}
            </Grid>
            <Grid item md={4} order={{ xs: 1, sm: 1, md: 2, lg: 2 }} xs={12}>
              <BreakDetailActionCard break_={break_} />
            </Grid>
          </Grid>
        </QueryResult>
      </PageContainer>
    </>
  );
}
