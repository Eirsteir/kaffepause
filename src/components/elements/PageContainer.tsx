import Box from '@mui/material/Box';

export default function PageContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return <Box sx={{ padding: '1rem 7rem' }}>{children}</Box>;
}
