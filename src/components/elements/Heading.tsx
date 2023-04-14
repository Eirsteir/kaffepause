import Typography from '@mui/material/Typography';

export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{ paddingTop: '2.25rem', paddingBottom: '3rem' }}
      variant='h1'>
      {children}
    </Typography>
  );
}
