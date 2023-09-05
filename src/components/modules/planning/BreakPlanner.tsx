import Heading from '@/components/elements/Heading';
import BreakPlannerCreateForm from '@/components/modules/planning/BreakPlannerCreateForm';
import { QueryResult } from '@/components/QueryResult';
import { useMe } from '@/hooks/User';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function BreakPlanner() {
  const { data, loading, error } = useMe();

  return (
    <Box sx={{ paddingTop: '1rem' }}>
      <Heading noGutterBottom>Planlegg en pause</Heading>
      <Typography sx={{ marginBottom: '3rem' }} variant='body2'>
        Start en pause ved å legge til et tidspunkt. Resten kan du ta senere.
      </Typography>
      <QueryResult data={data} error={error} loading={loading}>
        <BreakPlannerCreateForm user={data?.me} />
      </QueryResult>
    </Box>
  );
}
