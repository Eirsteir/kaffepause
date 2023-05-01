import CenteredBox from '@/components/elements/CenteredBox';
import Button from '@mui/material/Button';

export default function ShowMoreButton() {
  return (
    <CenteredBox>
      <Button sx={{ textDecoration: 'underline' }} variant='text'>
        Vis mer
      </Button>
    </CenteredBox>
  );
}
