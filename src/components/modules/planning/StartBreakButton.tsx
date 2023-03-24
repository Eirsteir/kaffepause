import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

interface StartBreakButtonProps {
  loading: boolean;
}
export default function StartBreakButton({ loading }: StartBreakButtonProps) {
  return (
    <LoadingButton
      endIcon={<SendIcon />}
      loading={loading}
      loadingPosition='end'
      size='large'
      sx={{
        marginTop: '2rem',
        textTransform: 'none',
        maxWidth: 300,
        alignSelf: 'end',
      }}
      variant='contained'>
      <span>Send invitasjon</span>
    </LoadingButton>
  );
}
