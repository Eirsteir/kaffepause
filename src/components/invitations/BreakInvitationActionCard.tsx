import BreakReplyButtons from '@/components/breaks/BreakReplyButtons';
import AvatarChips from '@/components/elements/AvatarChips';
import Divider from '@/components/elements/Divider';
import Link from '@/components/navigation/Link';
import dayjs from '@/dayjs';
import { IInvitation, InvitationContext } from '@/types/Break';
import URLS from '@/URLS';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type BreakInvitationActionCardProps = {
  invitation: IInvitation;
};

export default function BreakInvitationActionCard({
  invitation,
}: BreakInvitationActionCardProps) {
  const break_ = invitation.subject!;
  return (
    <Link href={`${URLS.BREAKS}/${break_.uuid}`} noLinkStyle>
      <Card
        elevation={0}
        sx={{
          marginTop: 3,
          boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
          position: 'relative',
        }}>
        <CardActionArea>
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
                {invitation.addressees.edges.length ? (
                  <AvatarChips
                    users={invitation.addressees.edges.map((edge) => edge.node)}
                  />
                ) : (
                  <Typography variant='body2'>Ingen inviterte</Typography>
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
    </Link>
  );
}
