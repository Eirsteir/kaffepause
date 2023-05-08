import { Container } from '@mui/material';
import Box from '@mui/material/Box';

export default function PageContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <Container disableGutters maxWidth='lg' sx={{ paddingTop: '2.25rem' }}>
      {children}
    </Container>
  );
}
