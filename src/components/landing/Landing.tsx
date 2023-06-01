import Hero from '@/components/landing/Hero';
import KeyBenefits from '@/components/landing/KeyBenefits';
import { Container } from '@mui/material';

export default function Landing() {
  return (
    <Container maxWidth='lg'>
      <Hero />
      <KeyBenefits />
    </Container>
  );
}
