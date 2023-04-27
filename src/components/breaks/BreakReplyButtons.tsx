import CenteredBox from '@/components/elements/CenteredBox';
import LoadingButton from '@/components/elements/LoadingButton';
import {
  useAcceptBreakInvitation,
  useDeclineBreakInvitation,
  useIgnoreBreakInvitation,
} from '@/hooks/Breaks';
import Box from '@mui/material/Box';

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
      Avslå
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
    <CenteredBox flexDirection='row' sx={{ width: '100%' }}>
      <AcceptButton invitationUuid={invitationUuid} onError={onError} />
      <DeclineButton invitationUuid={invitationUuid} onError={onError} />
    </CenteredBox>
  );
}
