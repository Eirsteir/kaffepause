import CenteredBox from '@/components/elements/CenteredBox';
import LoadingButton from '@/components/elements/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

interface StartBreakButtonProps {
  title: string;
  loading: boolean;
  onClick: () => void;
}
export default function StartBreakButton({
  title,
  loading,
  onClick,
}: StartBreakButtonProps) {
  return (
    <CenteredBox>
      <LoadingButton
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition='end'
        onClick={onClick}
        size='large'
        sx={{
          marginTop: '2rem',
          textTransform: 'none',
          maxWidth: 300,
        }}
        variant='contained'>
        <span>{title}</span>
      </LoadingButton>
    </CenteredBox>
  );
}
