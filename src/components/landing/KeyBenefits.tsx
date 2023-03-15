import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';

type Props = {
    title: string;
    text: string
    Icon: JSX.Element;
}

const KeyBenefitItem = ({ title, text, Icon }: Props) => (
    <>
        <Box display='flex' justifyContent='center' sx={{marginBottom: '.5rem'}}>
            { Icon }
        </Box>
        <Typography variant="h6" color='secondary' component="div" align="center" sx={{fontWeight: 700}}>
            { title }
        </Typography>       
        <Typography variant="subtitle2" color='secondary' component="div" align="center">
            { text }
        </Typography>   
</>
)

export default function KeyBenefits() {
    return (
        <Box 
              sx={{ marginTop: '2rem', padding: '1rem' }}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                    <KeyBenefitItem 
                        title='Easy to Use'
                        text='Our tool is designed to be user-friendly, making it easy for anyone to plan the perfect coffee break with their friends.'
                        Icon={<TouchAppOutlinedIcon fontSize="large" color='secondary'/>}
                    />
                </Grid>
                <Grid item xs={4}>
                    <KeyBenefitItem 
                        title='More Productive Breaks'
                        text='By planning your breaks ahead of time, you can ensure that you make the most of your time with friends while still staying productive.'
                        Icon={<AddTaskOutlinedIcon fontSize="large" color='secondary'/>}
                    />
                </Grid>
                <Grid item xs={4}>
                    <KeyBenefitItem 
                        title='More Fun'
                        text="Planning coffee breaks with friends is not only productive, but it's also a lot of fun!"
                        Icon={<LocalCafeOutlinedIcon fontSize="large" color='secondary'/>}
                    />
                </Grid>
              </Grid>
            </Box>
    )
}