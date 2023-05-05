import Card from '@/components/elements/Card';
import Heading from '@/components/elements/Heading';
import PageContainer from '@/components/elements/PageContainer';
import Link from '@/components/navigation/Link';
import { QueryResult } from '@/components/QueryResult';
import { useMyAccount } from '@/hooks/Accounts';
import { useMe } from '@/hooks/User';
import URLS from '@/URLS';
import { Grid, Typography } from '@mui/material';

function AccountGridItem({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <Grid item xs={4}>
      <Card sx={{ minHeight: 120, padding: 3 }}>
        <Typography gutterBottom variant='h3'>
          {title}
        </Typography>
        <Typography variant='body2'>{subTitle}</Typography>
      </Card>
    </Grid>
  );
}

export default function Account() {
  const { me, loading: meLoading, error: meError } = useMe();
  const {
    data: accountData,
    loading: accountLoading,
    error: accountError,
  } = useMyAccount();
  const account = accountData?.myAccount;

  return (
    <PageContainer>
      <Heading noGutterBottom>Konto</Heading>
      <QueryResult data={account} error={accountError} loading={accountLoading}>
        <Typography gutterBottom variant='subtitle1'>
          <b>{me?.name}</b>, {account?.email} -{' '}
          <Link href={`${URLS.USERS}/${me?.uuid}`}>
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
  );
}
