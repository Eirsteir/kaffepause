import Typography from '@mui/material/Typography';

export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ marginBottom: '0.5rem' }} variant='h1'>
      {children}
    </Typography>
  );
}
