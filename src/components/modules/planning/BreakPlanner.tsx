import { useEffect } from 'react';

import Heading from '@/components/elements/Heading';
import BreakPlannerCreateForm from '@/components/modules/planning/BreakPlannerCreateForm';
import dayjs from '@/dayjs';
import { useNextBreak } from '@/hooks/Breaks';
import { IUser } from '@/types/User';
import { socialTextTruncated } from '@/utils';
import { NetworkStatus } from '@apollo/client';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface BreakPlannerProps {
  user: IUser;
}

export default function BreakPlanner({ user }: BreakPlannerProps) {
  return (
    <Box>
      <Heading>Planlegg en pause</Heading>
      <BreakPlannerCreateForm user={user} />
    </Box>
  );
}
