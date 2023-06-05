import type { ReactElement } from 'react';

import Divider from '@/components/elements/Divider';
import About from '@/components/landing/About';
import Hero from '@/components/landing/Hero';
import InfoSection1 from '@/components/landing/InfoSection1';
import InfoSection2 from '@/components/landing/InfoSection2';
import InfoSection3 from '@/components/landing/InfoSection3';
import Pitcher from '@/components/landing/Pitcher';
import DefaultLayout from '@/components/layouts/defaultLayout';
import { Container } from '@mui/material';

export default function Landing() {
  return (
    <Container maxWidth='lg'>
      <Hero />
      {/* <KeyBenefits /> */}
      <Divider />
      <InfoSection1 />
      <Divider />
      <InfoSection2 />
      <Divider />
      <InfoSection3 />
      <Divider />
      <About />
      <Divider />
      <Pitcher />
    </Container>
  );
}

Landing.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
