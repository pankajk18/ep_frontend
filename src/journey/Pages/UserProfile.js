import React from 'react'
import '../profile.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// import './App.css';
// import ProfileInfo from '../component/profileInfo'
import ProfileNav from '../component/ProfileNav'
import TextField from '@mui/material/TextField';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { Grid } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// import ProfileInfo from '../component/ProfileInfo'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function UserProfile() {
  return (
    <>
      <div className='container mt-5' style={{ display: 'flex' }}>
        <div className='left-box mt-4 pt-5'>
          <ProfileNav />
        </div>
        <div className='right-box'>
          <div className='panel'>
            <div className='top-panel'>
              <div className='d-flex justify-content-start p-1'>
                <div className='bor rounded-circle '>
                  <ArrowForwardIosIcon style={{ color: '#1EBDDA' }} />
                </div>
                <h4>Basic Details </h4>
              </div>
            </div>
            <div className='info-panal p-3'>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={6}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={3}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={3}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={3}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={3}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>

                </Grid>
              </Box>



            </div>
          </div>
          <div className='panel mt-4'>
            <div className='top-panel'>
              <div className='d-flex justify-content-start p-1'>
               <div className='bor rounded-circle '>
                  <ArrowForwardIosIcon style={{color:'#9a141a'}}/>
                </div>
                <h4>Residence Address </h4>
              </div>
            </div>
            <div className='info-panal p-3'>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={6}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={3}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={3}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={3}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={3}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>

                </Grid>
              </Box>
            </div>
          </div>
          <div className='panel mt-4'>
            <div className='top-panel'>
              <div className='d-flex justify-content-start p-1'>
                <div className='bor rounded-circle '>
                  <ArrowForwardIosIcon style={{ color: '#9a141a' }} />
                </div>

                <h4>Employment Information</h4>
              </div>
            </div>
            <div className='info-panal p-3'>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={6}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={3}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={3}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={3}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>
                  <Grid size={3}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth className='bg-white' />
                  </Grid>

                </Grid>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
