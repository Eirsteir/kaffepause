import MuiLoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

export default function LoadingButton({ ...props }: LoadingButtonProps) {
  return (
    <MuiLoadingButton
      sx={{
        marginTop: '.5rem',
        ...props.sx,
      }}
      variant='contained'
      {...props}
    />
  );
}
