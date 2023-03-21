import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Link from '@/components/navigation/Link'
import URLS from '@/URLS'

export default function Hero() {
    return (
        <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="80vh"
              sx={{ justifyContent: 'space-evenly' }}
            >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                
              <Box sx={{paddingLeft: '5rem'}}>
                <Typography variant="h2" component="div" align="left" sx={{fontWeight: 900}}>
                Elevate Your Study Breaks with Friends
                </Typography>            
                <Typography variant="subtitle1" component='div' align='left'>
                  Whether you need a quick caffeine boost or want to catch up with friends over a cup of coffee, our tool makes it easy to plan the perfect coffee break.
                </Typography>

                  <Link href={URLS.SIGNIN}>
                        <Button variant="contained" disableElevation sx={{ marginTop: '1rem'}}>
                            Take a break
                        </Button>
                    </Link>
                    <Link href={URLS.SIGNUP}>
                        <Button variant="contained" disableElevation sx={{ marginTop: '1rem', marginLeft: '1rem'}}>
                          Register
                        </Button>
                    </Link> 
              </Box>

              </Grid>
              <Grid item xs={6}>
                
              <Box>
                <Typography variant="h1" component="div" align="center">
                    {/* IMAGE */}
                </Typography>            

              </Box>

              </Grid>
            </Grid>          
            </Box> 
    )
}