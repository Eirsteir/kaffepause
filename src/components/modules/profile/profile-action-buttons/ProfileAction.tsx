import LoadingButton from '@/components/elements/LoadingButton';
import { ApolloError } from '@apollo/client';
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
}

export default function ProfileAction({
  title,
  actionText,
  action,
  loading,
  error,
  success,
  successState,
}: ProfileActionProps) {
  if (success) {
    return successState;
  }

  return (
    <Box sx={{ paddingTop: '.5rem', textAlign: 'center' }}>
      <Typography sx={{ fontWeight: 500 }} variant='body2'>
        {title}
      </Typography>
      <LoadingButton loading={loading} onClick={action}>
        {actionText}
      </LoadingButton>
      {error && <p>{error.message}</p>}
    </Box>
  );
}
