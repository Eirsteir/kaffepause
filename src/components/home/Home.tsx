import CenteredBox from '@/components/elements/CenteredBox';
import PageContainer from '@/components/elements/PageContainer';
import PendingBreakInvitations from '@/components/home/PendingInvitations';
import SocialOverview from '@/components/home/SocialOverview';
import UpcomingBreaks from '@/components/home/UpcomingBreaks';
import BreakPlanner from '@/components/modules/planning/BreakPlanner';
import NextBreakActionCard from '@/components/navigation/NextBreakActionCard';
import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <PageContainer>
      {isMobile && (
        <CenteredBox>
          <NextBreakActionCard />
        </CenteredBox>
      )}
      <Grid container pb={8} spacing={2}>
        <Grid item xs={8}>
          <UpcomingBreaks />
          <PendingBreakInvitations />
        </Grid>
        <Grid item xs={4}>
          <SocialOverview />
        </Grid>
      </Grid>
      <BreakPlanner />
    </PageContainer>
  );
}
