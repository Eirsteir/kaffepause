import Head from 'next/head';
import { useRouter } from 'next/router';

import BreakActionCard from '@/components/breaks/BreakActionCard';
import Divider from '@/components/elements/Divider';
import Heading from '@/components/elements/Heading';
import PageContainer from '@/components/elements/PageContainer';
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
      <PageContainer>
        <Heading>Pauser</Heading>

        <Divider />

        <QueryResult
          data={data}
          error={error}
          loading={loading}
          loadingComponent={null}>
          {data?.breaksPresentation.sections.map((section, i) => (
            <div key={i}>
              <Typography variant='h2'>{section.heading}</Typography>

              {section.breaks.edges
                .map((edge) => edge.node)
                .map((break_, i) => (
                  <BreakActionCard break_={break_} key={i} />
                ))}

              {section.isEmpty && (
                <>
                  <Typography mb={1.5} mt={3}>
                    {section.emptyStateText}
                    {/* Når du er klar for å starte din neste pause, er vi her. */}
                  </Typography>
                  <Button
                    onClick={() => router.push(URLS.LANDING)}
                    variant='contained'>
                    {section.emptyStateActionText}
                    {/* Planlegg pause */}
                  </Button>
                </>
              )}

              <Divider />
            </div>
          ))}
        </QueryResult>
      </PageContainer>
    </>
  );
}
