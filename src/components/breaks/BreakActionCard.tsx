import ParticipantsAvatarChips from '@/components/modules/breaks/ParticipantsAvatarChips';
import AddresseesAvatarChips from '@/components/modules/invitations/AddresseesAvatarChips';
import GroupAvatarChip from '@/components/modules/invitations/GroupAvatarChip';
import dayjs from '@/dayjs';
import { Break } from '@/types/Break';
import URLS from '@/URLS';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type BreakActionCardProps = {
  break_: Break;
};

export default function BreakActionCard({ break_ }: BreakActionCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        marginTop: 3,
        boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
        position: 'relative',
      }}>
      <CardActionArea href={`${URLS.BREAKS}/${break_.uuid}`}>
        <CardContent>
          {break_.kicker && (
            <Paper
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                borderRadius: '8px',
                padding: '3px 8px',
                backgroundColor: 'primary.main',
              }}
              variant='outlined'>
              <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                {break_.kicker}
              </Typography>
            </Paper>
          )}

          <Typography component='div' variant='h3'>
            {break_.title}
          </Typography>
          <Typography
            color='text.secondary'
            component='div'
            gutterBottom
            variant='caption'>
            {dayjs(break_.startingAt).format('LLL')}
          </Typography>

          <Box
            sx={{
              paddingTop: 0.5,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <LocationOnOutlinedIcon color='primary' fontSize='small' />
            <Typography pl={1} variant='body2'>
              {break_.location?.title || 'Ikke oppgitt'}
            </Typography>
          </Box>

          <Box
            sx={{
              paddingTop: 0.5,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <GroupOutlinedIcon color='primary' fontSize='small' />
            <Box pl={1}>
              {break_.hasPassed ? (
                break_.participants.edges.length ? (
                  <ParticipantsAvatarChips
                    users={break_.participants.edges.map((edge) => edge.node)}
                  />
                ) : (
                  <Typography variant='body2'>Ingen deltakere</Typography>
                )
              ) : (
                <>
                  {break_.invitation?.addressees.edges.length !== 0 && (
                    <AddresseesAvatarChips
                      addressees={break_.invitation.addressees.edges.map(
                        (edge) => edge.node,
                      )}
                    />
                  )}

                  {break_.invitation?.recipientGroup && (
                    <GroupAvatarChip group={break_.invitation.recipientGroup} />
                  )}

                  {break_.invitation?.recipientGroup === null &&
                    break_.invitation?.addressees.edges.length === 0 && (
                      <Typography variant='body2'>Ingen inviterte</Typography>
                    )}
                </>
              )}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
