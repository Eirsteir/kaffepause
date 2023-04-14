import Head from 'next/head';
import { useRouter } from 'next/router';

import BreakActionCard from '@/components/breaks/BreakActionCard';
import Divider from '@/components/elements/Divider';
import Heading from '@/components/elements/Heading';
import { QueryResult } from '@/components/QueryResult';
import { useBreaksPresentation } from '@/hooks/Breaks';
import URLS from '@/URLS';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

export default function Breaks() {
  const router = useRouter();
  const { data, loading, error } = useBreaksPresentation();

  return (
    <>
      <Head>
        <title>Dine pauser - Kaffepause</title>
      </Head>
      <>
        <Heading>Pauser</Heading>

        <QueryResult
          data={data}
          error={error}
          loading={loading}
          loadingComponent={null}>
          {data?.breaksPresentation.sections.map((section, i) => (
            <div key={i}>
              <Typography
                sx={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
                variant='h2'>
                {section.heading}
              </Typography>

              {section.breaks.edges
                .map((edge) => edge.node)
                .map((break_, i) => (
                  <BreakActionCard break_={break_} key={i} />
                ))}

              {section.isEmpty && (
                <>
                  <Typography mb={1.5}>{section.emptyStateText}</Typography>
                  <Button
                    onClick={() => router.push(URLS.LANDING)}
                    variant='contained'>
                    {section.emptyStateActionText}
                  </Button>
                </>
              )}

              <Divider />
            </div>
          ))}
        </QueryResult>
      </>
    </>
  );
}
