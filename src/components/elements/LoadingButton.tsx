import MuiLoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

export default function LoadingButton({ ...props }: LoadingButtonProps) {
  return (
    <MuiLoadingButton
      sx={{
        textTransform: 'none',
        borderRadius: '21px',
        marginTop: '.5rem',
      }}
      variant='contained'
      {...props}
    />
  );
}
