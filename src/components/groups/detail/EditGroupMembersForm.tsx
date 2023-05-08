import { useState } from 'react';

import LoadingButton from '@/components/elements/LoadingButton';
import AddGroupMembersForm from '@/components/groups/AddGroupMembersForm';
import { useRemoveGroupMember } from '@/hooks/Groups';
import { useMe } from '@/hooks/User';
import { Group } from '@/types/Group';
import { User } from '@/types/User';
import { Box, Button, Typography } from '@mui/material';

interface EditGroupMembersFormProps {
  user: User;
  group: Group;
  onClose: () => void;
}
export default function EditGroupMembersForm({
  user,
  group,
  onClose,
}: EditGroupMembersFormProps) {
''  const [editGroupMembers, { loading, error }] = useRemoveGroupMember();
  const [members, setMembers] = useState<Group['members']>(group.members);

  const handleAddMember = (event, value) => {
    if (value && !members.includes(value)) {
      setMembers([...members, value]);
    }
  };

  const handleRemoveMember = (member: User) => {
    setMembers((current) => current.filter((m) => m.uuid !== member.uuid));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editGroupMembers({
      variables: { groupUuid: group.uuid, members: members.map((m) => m.uuid) },
      onCompleted: (data) => {
        if (data?.editGroupMembers.success) {
          alert('Gruppen ble oppdatert');
          onClose();
        }
      },
    });
  };

  return (
    <Box sx={{ paddingTop: 2, width: '70%' }}>
      <form onSubmit={handleSubmit}>
        <AddGroupMembersForm
          handleRemove={handleRemoveMember}
          members={members}
          onChange={handleAddMember}
          size='small'
          user={me}
        />
      </form>
      <Button onClick={onClose}>Avbryt</Button>
      <LoadingButton
        loading={loading}
        onClick={handleSubmit}
        variant='contained'>
        Ferdig
      </LoadingButton>
      {error && <Typography color='error.main'>{error.message}</Typography>}
    </Box>
  );
}
