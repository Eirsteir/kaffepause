import LoadingButton from '@/components/elements/LoadingButton';
import {
  useAcceptBreakInvitation,
  useDeclineBreakInvitation,
  useIgnoreBreakInvitation,
} from '@/hooks/Breaks';
import { Box } from '@mui/material';

type ActionButtonProps = {
  invitationUuid: string;
  onError: (error: string) => void;
};

function AcceptButton({ invitationUuid, onError }: ActionButtonProps) {
  const [acceptInvitation, { data, loading }] = useAcceptBreakInvitation();

  const onClick = () =>
    acceptInvitation({
      variables: { invitation: invitationUuid },
      onError: (err) => onError(err.message),
    });

  return (
    <LoadingButton
      loading={loading}
      onClick={onClick}
      sx={{ marginRight: 0.5 }}
      variant='contained'>
      Bli med
    </LoadingButton>
  );
}

function DeclineButton({ invitationUuid, onError }: ActionButtonProps) {
  const [declineInvitation, { data, loading }] = useDeclineBreakInvitation();

  const onClick = () =>
    declineInvitation({
      variables: { invitation: invitationUuid },
      onError: (err) => onError(err.message),
    });

  return (
    <LoadingButton
      loading={loading}
      onClick={onClick}
      sx={{ marginRight: 0.5 }}
      variant='outlined'>
      Ignorer
    </LoadingButton>
  );
}

type ActionButtonGroupProps = {
  invitationUuid: string;
  onError: (error: string) => void;
};

export default function BreakReplyButtons({
  invitationUuid,
  onError,
}: ActionButtonGroupProps) {
  return (
    <>
      <AcceptButton invitationUuid={invitationUuid} onError={onError} />
      <DeclineButton invitationUuid={invitationUuid} onError={onError} />
    </>
  );
}
