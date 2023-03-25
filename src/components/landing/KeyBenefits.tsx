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
    <Box sx={{ marginTop: '2rem', padding: '1rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <KeyBenefitItem
            Icon={<TouchAppOutlinedIcon color='primary' fontSize='large' />}
            text='Verktøyet er utformet for å være brukervennlig, slik at det er enkelt for alle å planlegge en perfekt kaffepause med venner.'
            title='Enkelt å bruke'
          />
        </Grid>
        <Grid item xs={4}>
          <KeyBenefitItem
            Icon={<AddTaskOutlinedIcon color='primary' fontSize='large' />}
            text='Ved å planlegge pausene dine på forhånd, kan du være produktiv og samtidig gjøre mest mulig ut av tiden med venner.'
            title='Mer produktive pauser'
          />
        </Grid>
        <Grid item xs={4}>
          <KeyBenefitItem
            Icon={<LocalCafeOutlinedIcon color='primary' fontSize='large' />}
            text='Kaffepauser med venner er en flott måte å slappe av og ta en pause fra studiene. Kaffepause gjør det enkelt å planlegge, så du kan få mest mulig ut av studieøktene dine.'
            title='Mer moro'
          />
        </Grid>
      </Grid>
    </Box>
  );
}
