import type { PropsWithChildren } from 'react';

import { Container } from '@mui/material';

export const PageContainer = ({ children }: PropsWithChildren) => (
  <Container maxWidth='lg' sx={{ paddingTop: '2.25rem' }}>
    {children}
  </Container>
);
