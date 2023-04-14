import Typography from '@mui/material/Typography';

export default function Heading({
  noGutterBottom,
  children,
}: {
  noGutterBottom: boolean;
  children: React.ReactNode;
}) {
  return (
    <Typography
      sx={{
        paddingTop: '2.25rem',
        paddingBottom: noGutterBottom ? '.5rem' : '3rem',
      }}
      variant='h1'>
      {children}
    </Typography>
  );
}
