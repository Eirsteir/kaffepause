import Box from '@mui/material/Box';

export default function PageContainer({
  fullWidth,
  children,
}: {
  fullWidth?: boolean;
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <Box sx={{ padding: fullWidth ? '2.25rem 0' : '2.25rem 5rem' }}>
      {children}
    </Box>
  );
}
