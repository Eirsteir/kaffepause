import CenteredBox from '@/components/elements/CenteredBox';
import { IBreak } from '@/types/Break';
import { Button, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function BreakDetailReplyActionCard({
  break_,
}: {
  break_: IBreak;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        padding: '1.5rem',
        boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
      }}>
      <CenteredBox>
        <Typography sx={{ fontWeight: 600 }} variant='subtitle2'>
          {break_?.kicker}
        </Typography>

        <div
          style={{
            display: 'flex',
            padding: '1rem',
            justifyContent: 'center',
          }}>
          <Button sx={{ marginRight: 0.5 }} variant='outlined'>
            Ignorer
          </Button>
          <Button sx={{ marginLeft: 0.5 }} variant='contained'>
            Bli med
          </Button>
        </div>
      </CenteredBox>
    </Paper>
  );
}
