import { useState } from 'react';

import BreakReplyButtons from '@/components/breaks/BreakReplyButtons';
import CenteredBox from '@/components/elements/CenteredBox';
import dayjs from '@/dayjs';
import { IBreak, InvitationContext } from '@/types/Break';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function BreakDetailActionCard({ break_ }: { break_: IBreak }) {
  const [error, setError] = useState('');

  return (
    <Paper
      elevation={0}
      sx={{
        padding: '2rem',
        boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
      }}>
      <CenteredBox sx={{ paddingBottom: 2 }}>
        {!break_.hasPassed && (
          <Paper
            style={{
              borderRadius: '8px',
              padding: '3px 8px',
              backgroundColor: 'primary.main',
              marginTop: 2,
              marginBottom: '1.5rem',
            }}
            variant='outlined'>
            <Typography sx={{ fontWeight: 600 }} variant='subtitle2'>
              {break_?.kicker || dayjs(break_.startingAt).fromNow()}
            </Typography>
          </Paper>
        )}

        {break_.canViewerEditBreak && (
          <Button variant='outlined'>Endre pausen</Button>
        )}

        {break_.invitation?.context == InvitationContext.CANNOT_REPLY && (
          <Typography textAlign='center' variant='subtitle2'>
            Du kan ikke svare på denne invitasjonen lengre.
          </Typography>
        )}

        {break_.hasPassed ? (
          <>
            {break_.invitation?.context == InvitationContext.HAS_ACCEPTED && (
              <Typography variant='subtitle2'>Deltatt</Typography>
            )}

            {break_.invitation?.context === InvitationContext.HAS_IGNORED && (
              <>
                <Typography variant='subtitle2'>Ignorert</Typography>
              </>
            )}

            {break_.invitation?.context === InvitationContext.HAS_DECLINED && (
              <>
                <Typography variant='subtitle2'>Avslått</Typography>
              </>
            )}
          </>
        ) : (
          <>
            {break_.invitation?.context == InvitationContext.CAN_REPLY && (
              <>
                <Typography pb={1.5} variant='h3'>
                  Vil du delta?
                </Typography>
                <BreakReplyButtons
                  invitationUuid={break_?.invitation.uuid}
                  onError={(err) => setError(err)}
                />
              </>
            )}

            {break_.invitation?.context == InvitationContext.HAS_ACCEPTED && (
              <Typography variant='subtitle2'>Godtatt</Typography>
            )}

            {break_.invitation?.context === InvitationContext.HAS_IGNORED && (
              <>
                <Typography variant='subtitle2'>Ignorert</Typography>
                <Button variant='outlined'>Angre</Button>
              </>
            )}

            {break_.invitation?.context === InvitationContext.HAS_DECLINED && (
              <>
                <Typography variant='subtitle2'>Avslått</Typography>
                <Button variant='outlined'>Angre</Button>
              </>
            )}
          </>
        )}
        {error && (
          <Typography color='error.main' variant='subtitle2'>
            {error}
          </Typography>
        )}
      </CenteredBox>
    </Paper>
  );
}
