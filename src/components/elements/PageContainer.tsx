import type { PropsWithChildren } from 'react';

import { Container } from '@mui/material';

const PageContainer = ({ children }: PropsWithChildren) => (
  <Container maxWidth='lg' sx={{ paddingTop: '2.25rem' }}>
    {children}
  </Container>
);

export default PageContainer;
