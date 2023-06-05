import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type Props = {
  title: string;
  text: string;
  Icon: JSX.Element;
};

const KeyBenefitItem = ({ title, text, Icon }: Props) => (
  <>
    <Box display='flex' justifyContent='center' sx={{ marginBottom: '.5rem' }}>
      {Icon}
    </Box>
    <Typography
      align='center'
      component='div'
      sx={{ fontWeight: 700 }}
      variant='h6'>
      {title}
    </Typography>
    <Typography align='center' component='div' variant='subtitle2'>
      {text}
    </Typography>
  </>
);

export default function KeyBenefits() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '7.5vw',
        paddingRight: '7.5vw',
        paddingTop: '5rem',
        paddingBottom: '3.5rem',
        textAlign: 'center',
      }}>
      <Typography
        gutterBottom
        sx={{
          fontSize: { xs: '2.5rem', md: '2.5rem', lg: '3rem' },
          marginBottom: '3.5rem',
        }}
        variant='h2'>
        Bruk mindre tid på koordinering
      </Typography>
      <Grid container spacing={4}>
        <Grid item sm={4} xs={6}>
          <KeyBenefitItem
            Icon={<TouchAppOutlinedIcon color='primary' fontSize='large' />}
            text='Planlegg en pause når det passer deg.'
            title='Bestem et tidspunkt'
          />
        </Grid>
        <Grid item sm={4} xs={6}>
          <KeyBenefitItem
            Icon={<AddTaskOutlinedIcon color='primary' fontSize='large' />}
            text='Inviter til pause akkurat der du vil, enten det er i kafè, biblioteket eller på linjeforeningskontoret.'
            title='Velg et sted'
          />
        </Grid>
        <Grid item sm={4} xs={6}>
          <KeyBenefitItem
            Icon={<LocalCafeOutlinedIcon color='primary' fontSize='large' />}
            text='Med kaffepause kan du invitere enkeltpersoner eller grupper som du vil.'
            title='Inviter'
          />
        </Grid>
        <Grid item sm={4} xs={6}>
          <KeyBenefitItem
            Icon={<LocalCafeOutlinedIcon color='primary' fontSize='large' />}
            text='Hvis ikke tidspunktet passer for deg, kan du foreslå et nytt ett.'
            title='Foreslå endringer'
          />
        </Grid>
        <Grid item sm={4} xs={6}>
          <KeyBenefitItem
            Icon={<LocalCafeOutlinedIcon color='primary' fontSize='large' />}
            text='Flytt kollokviegruppen din til kaffepause så kan dere enkelt planlegge pauser sammen.'
            title='Opprett grupper'
          />
        </Grid>
        <Grid item sm={4} xs={6}>
          <KeyBenefitItem
            Icon={<LocalCafeOutlinedIcon color='primary' fontSize='large' />}
            text='Finn vennene dine på kaffepause eller inviter dem hit og planlegg pauser sammen.'
            title='Finn venner'
          />
        </Grid>
      </Grid>
    </Box>
  );
}
