import CenteredBox from '@/components/elements/CenteredBox';
import PageContainer from '@/components/elements/PageContainer';
import PendingBreakInvitations from '@/components/home/PendingInvitations';
import BreakPlanner from '@/components/modules/planning/BreakPlanner';
import NextBreakActionCard from '@/components/navigation/NextBreakActionCard';
import { QueryResult } from '@/components/QueryResult';
import { useMe } from '@/hooks/User';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
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
      <Box sx={{ minHeight: '80vh' }}>
        <BreakPlanner />

        <PendingBreakInvitations />
      </Box>
    </PageContainer>
  );
}
