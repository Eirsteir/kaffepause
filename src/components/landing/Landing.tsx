import type { ReactElement } from 'react';

import Divider from '@/components/elements/Divider';
import About from '@/components/landing/About';
import HeadingSection from '@/components/landing/HeadingSection';
import InfoSection1 from '@/components/landing/InfoSection1';
import InfoSection2 from '@/components/landing/InfoSection2';
import InfoSection3 from '@/components/landing/InfoSection3';
import KeyBenefits from '@/components/landing/KeyBenefits';
import Pitcher from '@/components/landing/Pitcher';
import DefaultLayout from '@/components/layouts/defaultLayout';
import { Container } from '@mui/material';

export default function Landing() {
  return (
    <Container maxWidth='lg'>
      <HeadingSection />
      <Divider />
      <InfoSection1 />
      <Divider />
      <KeyBenefits />
      <Divider />
      <InfoSection2 />
      {/* <Divider />
      <InfoSection3 /> */}
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
