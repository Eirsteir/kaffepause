import Head from 'next/head';

import AvatarChips from '@/components/elements/AvatarChips';
import Divider from '@/components/elements/Divider';
import { QueryResult } from '@/components/QueryResult';
import dayjs from '@/dayjs';
import { useBreak } from '@/hooks/Breaks';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type BreakProps = {
  uuid: string;
};

export default function Break({ uuid }: BreakProps) {
  const { data, loading, error } = useBreak(uuid);
  const break_ = data?.break_;
  console.log(data);

  return (
    <>
      <Head>
        <title>{`Pause`}</title>
      </Head>
      <QueryResult
        data={data}
        error={error}
        loading={loading}
        loadingComponent={null}>
        <Box sx={{ padding: '2rem 7rem' }}>
          <div>
            <div>
              <Typography sx={{ marginBottom: '0.5rem' }} variant='h4'>
                {break_?.invitation.sender.shortName} inviterte deg til pause
              </Typography>
              <Typography sx={{ marginBottom: '0.5rem' }} variant='body2'>
                {dayjs(break_?.startingAt).format('LLL')}
              </Typography>
            </div>

            <Box sx={{ marginTop: '2rem' }}>
              <Typography variant='h5'>Sted</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginTop: '0.5rem',
                }}>
                <LocationOnOutlinedIcon fontSize='small' />
                <Typography variant='body1'>
                  {break_?.location?.title || 'Ikke spesifisert'}
                </Typography>
              </Box>
            </Box>
          </div>

          <Divider />

          <Box sx={{ marginTop: '2rem' }}>
            <Typography variant='h5'>Inviterte</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: '0.5rem',
              }}>
              <AvatarChips
                users={break_?.invitation.addressees.edges.map(
                  (edge) => edge.node,
                )}
              />
            </Box>
          </Box>

          <Divider />
        </Box>
      </QueryResult>
    </>
  );
}
