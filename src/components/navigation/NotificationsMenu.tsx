import { useRouter } from 'next/router';
import * as React from 'react';

import Avatar from '@/components/elements/Avatar';
import Badge from '@/components/elements/Badge';
import ShowMoreButton from '@/components/elements/ShowMoreButton';
import Link from '@/components/navigation/Link';
import { QueryResult } from '@/components/QueryResult';
import dayjs from '@/dayjs';
import {
  useMarkAllNotificationsAsSeen,
  useNotifications,
  useNotificationsBagdeCount,
} from '@/hooks/Notifications';
import { User } from '@/types/User';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Skeleton } from '@mui/lab';
import { ListItemText } from '@mui/material';
import MuiBadge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const LoadingSkeleton = () => (
  <>
    {[1, 2, 3].map((i) => (
      <Box key={i} sx={{ display: 'flex', alignItems: 'center', width: 360 }}>
        <Box sx={{ margin: 1 }}>
          <Skeleton
            animation='wave'
            height={56}
            variant='circular'
            width={56}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Skeleton width='90%'>
            <Typography variant='subtitle2'>.</Typography>
          </Skeleton>
          <Skeleton width='40%'>
            <Typography variant='subtitle2'>.</Typography>
          </Skeleton>
        </Box>
      </Box>
    ))}
  </>
);

export default function NotificationsMenu() {
  const { data: notificationBadgeCountData } = useNotificationsBagdeCount();
  const [fetchNotifications, { data, loading, error }] = useNotifications();
  const [markAllAsSeen] = useMarkAllNotificationsAsSeen();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    fetchNotifications({
      variables: { first: 5 },
      onCompleted: markAllAsSeen,
    });
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Varsler'>
          <IconButton
            aria-controls={open ? 'notification-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
            sx={{
              ml: 2,
              padding: 1,
            }}>
            <Badge
              badgeCount={
                notificationBadgeCountData?.notificationBadgeCount.count || 0
              }>
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        id='account-menu'
        onClick={handleClose}
        onClose={handleClose}
        open={open}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 200,
            maxWidth: 360,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 56,
              height: 56,
              mr: 1.5,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <Typography sx={{ padding: 1, paddingLeft: 2 }} variant='h2'>
          Varsler
        </Typography>

        <QueryResult
          data={data}
          error={error}
          loading={loading}
          loadingComponent={<LoadingSkeleton />}>
          <>
            {data?.notifications?.edges.map((edge) => {
              const node = edge.node;
              return (
                <Link
                  href={node.url}
                  key={`notification-${node.uuid}`}
                  noLinkStyle>
                  <MenuItem>
                    <Avatar user={node.actor} />
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ whiteSpace: 'normal' }}
                          variant='subtitle2'>
                          {node.text}
                        </Typography>
                      }
                      secondary={dayjs(node.created).fromNow()}
                    />
                  </MenuItem>
                </Link>
              );
            })}
            {data?.notifications?.edges.length === 0 && (
              <Typography p={2} variant='subtitle2'>
                Du er up to speed!
              </Typography>
            )}
            {data?.notifications?.edges.length !== 0 && <ShowMoreButton />}
          </>
        </QueryResult>
      </Menu>
    </React.Fragment>
  );
}
