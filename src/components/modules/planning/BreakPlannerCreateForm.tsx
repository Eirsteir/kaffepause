import { Dayjs } from 'dayjs';

import BreakPlannerForm from '@/components/modules/planning/BreakPlannerForm';
import { useIniateBreak } from '@/hooks/Breaks';
import { Group } from '@/types/Group';
import { Location } from '@/types/Location';
import { User } from '@/types/User';

interface BreakPlannerCreateFormProps {
  user: User;
}

export default function BreakPlannerCreateForm({
  user,
}: BreakPlannerCreateFormProps) {
  const [initiateBreak, { loading, error }] = useIniateBreak({
    onCompleted: ({ initiateBreak }) => {
      if (initiateBreak.success) {
        alert('Vent på svar og gjør deg klar til pause!');
      } else {
        console.log(initiateBreak.error);
      }
    },
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
