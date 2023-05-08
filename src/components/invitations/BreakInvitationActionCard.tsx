import BreakReplyButtons from '@/components/breaks/BreakReplyButtons';
import Divider from '@/components/elements/Divider';
import AvatarChips from '@/components/modules/breaks/ParticipantsAvatarChips';
import AddresseesAvatarChips from '@/components/modules/invitations/AddresseesAvatarChips';
import GroupAvatarChip from '@/components/modules/invitations/GroupAvatarChip';
import Link from '@/components/navigation/Link';
import dayjs from '@/dayjs';
import { Invitation, InvitationContext } from '@/types/Break';
import URLS from '@/URLS';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type BreakInvitationActionCardProps = {
  invitation: Invitation;
};

export default function BreakInvitationActionCard({
  invitation,
}: BreakInvitationActionCardProps) {
  const break_ = invitation.subject!;
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
              {break_.location?.title || 'Sted ikke oppgitt'}
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
              {invitation.addressees.edges.length !== 0 && (
                <AddresseesAvatarChips
                  addressees={invitation.addressees.edges.map(
                    (edge) => edge.node,
                  )}
                />
              )}
              {invitation.recipientGroup && (
                <GroupAvatarChip group={invitation.recipientGroup} />
              )}
            </Box>
          </Box>

          {invitation.context === InvitationContext.CAN_REPLY && (
            <>
              <Divider />
              <BreakReplyButtons
                invitationUuid={invitation.uuid}
                onError={() => undefined}
              />
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
