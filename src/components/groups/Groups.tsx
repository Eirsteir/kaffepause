import Head from 'next/head';
import { useState } from 'react';

import Heading from '@/components/elements/Heading';
import GroupCard from '@/components/groups/GroupCard';
import GroupFormDialog from '@/components/groups/GroupFormDialog';
import ListSection from '@/components/modules/ListSection';
import { QueryResult } from '@/components/QueryResult';
import { useMyGroups } from '@/hooks/Groups';
import { useMe } from '@/hooks/User';
import { Group } from '@/types/Group';
import URLS from '@/URLS';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';

export default function Groups() {
  const { me: user } = useMe(); // isAuthenticated, loading, error,
  const { data, loading, error } = useMyGroups();
  const [open, toggleOpen] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Grupper - Kaffepause</title>
      </Head>
      <>
        <Heading>Gruppeoversikt</Heading>
        <Button
          onClick={() => toggleOpen(true)}
          startIcon={<AddIcon />}
          sx={{ marginTop: -2 }}
          variant='outlined'>
          Ny gruppe
        </Button>
        <QueryResult
          data={data?.myGroups}
          error={error}
          loading={loading}
          loadingComponent={null}>
          <ListSection
            emptyStateActionText='Lag en gruppe nå'
            emptyStateActionUrl={URLS.GROUPS}
            emptyStateText='Du er ikke med i noen grupper enda'
            heading='Dine grupper'
            isEmpty={data?.myGroups.length === 0}
            items={data?.myGroups}
            ListCard={({ item }: { item: Group }) => <GroupCard group={item} />}
          />
        </QueryResult>
      </>

      <GroupFormDialog
        onClose={() => toggleOpen(false)}
        open={open}
        user={user}
      />
    </>
  );
}
