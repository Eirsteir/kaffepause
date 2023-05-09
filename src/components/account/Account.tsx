import { useSession } from 'next-auth/react';
import Head from 'next/head';

import Card from '@/components/elements/Card';
import Heading from '@/components/elements/Heading';
import PageContainer from '@/components/elements/PageContainer';
import Link from '@/components/navigation/Link';
import { QueryResult } from '@/components/QueryResult';
import { useMyAccount } from '@/hooks/Accounts';
import URLS from '@/URLS';
import { CardActionArea, CardContent, Grid, Typography } from '@mui/material';

function AccountGridItem({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <Grid item xs={4}>
      <Card>
        <CardActionArea sx={{ minHeight: 120, padding: 1 }}>
          <CardContent>
            <Typography gutterBottom variant='h3'>
              {title}
            </Typography>
            <Typography variant='body2'>{subTitle}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default function Account() {
  const { data: session } = useSession();

  const {
    data: accountData,
    loading: accountLoading,
    error: accountError,
  } = useMyAccount();
  const account = accountData?.myAccount;

  return (
    <>
      <Head>
        <title>Kontoinstillinger - Kaffepause</title>
      </Head>
      <PageContainer>
        <Heading noGutterBottom>Konto</Heading>
        <QueryResult
          data={account}
          error={accountError}
          loading={accountLoading}>
          <Typography gutterBottom variant='subtitle1'>
            <b>{session?.user?.name}</b>, {account?.email} •{' '}
            <Link href={`${URLS.USERS}/${session?.user?.uuid}`}>
              <b>Gå til profil</b>
            </Link>
          </Typography>
          <Grid container pt={4} spacing={2}>
            <AccountGridItem
              subTitle='Passord, innlogginger etc.'
              title='Personlige opplysninger'
            />
            <AccountGridItem
              subTitle='Passord, innlogginger etc.'
              title='Innlogging og sikkerhet'
            />
            <AccountGridItem
              subTitle='Se, endre og oppdater varslingsinnstillingene dine.'
              title='Varslinger'
            />
          </Grid>
        </QueryResult>
      </PageContainer>
    </>
  );
}
