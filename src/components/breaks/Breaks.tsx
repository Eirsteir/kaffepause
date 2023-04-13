import Head from 'next/head';
import { useMemo } from 'react';

import BreakActionCard from '@/components/breaks/BreakActionCard';
import Heading from '@/components/elements/Heading';
import PageContainer from '@/components/elements/PageContainer';
import { QueryResult } from '@/components/QueryResult';
import { useBreaksPresentation } from '@/hooks/Breaks';
import { Typography } from '@mui/material';

export default function Breaks() {
  const { data, loading, error } = useBreaksPresentation();
  console.log(data);

  return (
    <>
      <Head>
        <title>Dine pauser - Kaffepause</title>
      </Head>
      <PageContainer>
        <Heading>Pauser</Heading>

        <QueryResult
          data={data}
          error={error}
          loading={loading}
          loadingComponent={null}>
          {data?.breaksPresentation.sections.map((section, i) => (
            <div key={i}>
              <Typography variant='h2'>{section.heading}</Typography>
              {/* {[1, 2, 3].map((_) => (
                <BreakActionCard key={_} />
              ))} */}
            </div>
          ))}
        </QueryResult>
      </PageContainer>
    </>
  );
}
