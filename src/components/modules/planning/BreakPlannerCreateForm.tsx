import { Dayjs } from 'dayjs';
import { useSnackbar } from 'material-ui-snackbar-provider';

import BreakPlannerForm from '@/components/modules/planning/BreakPlannerForm';
import { useIniateBreak } from '@/hooks/Breaks';
import { Group } from '@/types/Group';
import { Location } from '@/types/Location';
import { User } from '@/types/User';
import { ApolloError } from '@apollo/client';

interface BreakPlannerCreateFormProps {
  user: User;
}

export default function BreakPlannerCreateForm({
  user,
}: BreakPlannerCreateFormProps) {
  const snackbar = useSnackbar();

  const [initiateBreak, { loading, error }] = useIniateBreak({
    onCompleted: ({ initiateBreak }) => {
      if (initiateBreak.success) {
        snackbar.showMessage('Vent på svar og gjør deg klar til pause!');
      } else {
        snackbar.showMessage('Noe gikk galt!');
      }
    },
    onError: (e: ApolloError) => snackbar.showMessage(e.message),
  });

  const handleSubmit = (
    location: Location,
    startTime: Dayjs,
    invitees: User[],
    recipientGroup: Group | null,
  ) => {
    initiateBreak({
      variables: {
        addressees: [...invitees].map((user) => user.uuid),
        recipientGroupId: recipientGroup && recipientGroup.uuid,
        startTime: startTime,
        location: location?.uuid,
      },
    });
  };

  return (
    <BreakPlannerForm
      error={error}
      loading={loading}
      onSubmit={handleSubmit}
      user={user}
    />
  );
}
