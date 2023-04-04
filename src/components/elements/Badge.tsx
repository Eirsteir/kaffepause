import * as React from 'react';

import MuiBadge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(MuiBadge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function Badge({
  badgeCount = 0,
  children,
}: {
  badgeCount: number;
  children: React.ReactNode;
}) {
  return (
    <StyledBadge badgeContent={badgeCount} color='primary'>
      {children}
    </StyledBadge>
  );
}
