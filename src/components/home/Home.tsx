import CenteredBox from '@/components/elements/CenteredBox';
import PageContainer from '@/components/elements/PageContainer';
import PendingBreakInvitations from '@/components/home/PendingInvitations';
import UpcomingBreaks from '@/components/home/UpcomingBreaks';
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
      <Grid container spacing={2}>
        {/* <BreakPlanner /> */}
        <Grid item xs={8}>
          <UpcomingBreaks />
          <PendingBreakInvitations />
        </Grid>
        <Grid item xs={4}>
          <PendingBreakInvitations />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
