import { useState } from 'react';

import BreakReplyButtons from '@/components/breaks/BreakReplyButtons';
import CenteredBox from '@/components/elements/CenteredBox';
import { IBreak } from '@/types/Break';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function BreakDetailActionCard({ break_ }: { break_: IBreak }) {
  const [error, setError] = useState('');

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
          {break_.canViewerEditBreak && (
            <Button variant='outlined'>Endre pausen</Button>
          )}

          {!break_.isViewerInitiator && (
            <BreakReplyButtons
              invitationUuid={break_?.invitation.uuid}
              onError={(err) => setError(err)}
            />
          )}
        </div>
        {error && (
          <Typography color='error.main' variant='subtitle2'>
            {error}
          </Typography>
        )}
      </CenteredBox>
    </Paper>
  );
}
