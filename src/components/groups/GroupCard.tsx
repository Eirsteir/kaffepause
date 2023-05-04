import Avatar from '@/components/elements/Avatar';
import Card from '@/components/elements/Card';
import GroupMembersList from '@/components/groups/GroupMembersList';
import Link from '@/components/navigation/Link';
import dayjs from '@/dayjs';
import { Group } from '@/types/Group';
import URLS from '@/URLS';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { Box, CardActionArea, Chip, Stack } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type GroupCardProps = {
  group: Group;
};

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <Link href={`${URLS.GROUPS}/${group.uuid}`} noLinkStyle>
      <Card sx={{ marginTop: 3 }}>
        <CardActionArea>
          <CardContent>
            <Typography component='div' variant='h3'>
              {group.name}
            </Typography>
            <Typography
              color='text.secondary'
              component='div'
              gutterBottom
              variant='caption'>
              {dayjs(group.created).format('LLL')}
            </Typography>

            <Box
              sx={{
                paddingTop: 0.5,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              <GroupOutlinedIcon color='primary' fontSize='small' />
              <Box pl={1}>
                <GroupMembersList members={group.members} />
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
