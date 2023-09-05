import CenteredBox from '@/components/elements/CenteredBox';
import Button from '@mui/material/Button';

export default function ShowMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <CenteredBox>
      <Button
        onClick={onClick}
        sx={{ textDecoration: 'underline' }}
        variant='text'>
        Vis mer
      </Button>
    </CenteredBox>
  );
}
