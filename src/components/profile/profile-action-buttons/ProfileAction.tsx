import { useSnackbar } from 'material-ui-snackbar-provider';

import LoadingButton from '@/components/elements/LoadingButton';
import { ApolloError } from '@apollo/client';
import { LoadingButtonProps } from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ProfileActionProps {
  title: string;
  actionText: string;
  action: (options: any) => void;
  loading: boolean;
  error: ApolloError | undefined;
  success: boolean;
  successState: JSX.Element;
  buttonProps?: LoadingButtonProps;
}

export default function ProfileAction({
  title,
  actionText,
  action,
  loading,
  error,
  success,
  successState,
  buttonProps,
}: ProfileActionProps) {
  const snackbar = useSnackbar();

  if (success) {
    return successState;
  }

  if (error) {
    snackbar.showMessage(error);
  }

  return (
    <Box sx={{ paddingTop: '.5rem', textAlign: 'center' }}>
      <Typography sx={{ fontWeight: 500 }} variant='body2'>
        {title}
      </Typography>
      <LoadingButton loading={loading} onClick={action} {...buttonProps}>
        {actionText}
      </LoadingButton>
    </Box>
  );
}
