import Card from '@/components/elements/Card';
import { Button, CardContent, Typography } from '@mui/material';

export default function GroupDetailCardSection() {
  return (
    <Card sx={{ padding: 2 }}>
      <CardContent>
        <Typography pb={1} variant='subtitle2'>
          Medlem siden 1. mai 2023
        </Typography>
        <Button variant='contained'>Forlat gruppe</Button>
      </CardContent>
    </Card>
  );
}
