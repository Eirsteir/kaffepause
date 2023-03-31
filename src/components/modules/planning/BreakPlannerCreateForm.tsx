import { Dayjs } from 'dayjs';

import BreakPlannerForm from '@/components/modules/planning/BreakPlannerForm';
import { useIniateBreak } from '@/hooks/Breaks';
import { IBreak } from '@/types/Break';
import { ILocation } from '@/types/Location';
import { IUser } from '@/types/User';

interface BreakPlannerCreateFormProps {
  user: IUser;
  onSubmit: (break_: IBreak) => void;
}

export default function BreakPlannerCreateForm({
  user,
  onSubmit,
}: BreakPlannerCreateFormProps) {
  const [initiateBreak, { loading, error }] = useIniateBreak({
    onCompleted: ({ initiateBreak }) => {
      if (initiateBreak.success) {
        alert('Vent på svar og gjør deg klar til pause!');
        onSubmit(initiateBreak.break_);
      } else {
        console.log(initialBreak.error);
      }
    },
  });

  const handleSubmit = (
    location: ILocation,
    startTime: Dayjs,
    invitees: IUser[],
  ) => {
    initiateBreak({
      variables: {
        addressees: [...invitees].map((user) => user.uuid),
        startTime: startTime,
        location: location?.uuid,
      },
      skip: !startTime || !location || !invitees.length,
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
