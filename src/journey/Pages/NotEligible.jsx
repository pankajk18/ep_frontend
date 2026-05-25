import React from 'react'
import MobileNav from '../component/MobileNav'
import notEligibleMob from '../assets-crm/not-ele-mobile.jpg'
import { Link } from 'react-router-dom'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { Button } from '@mui/material';


export default function NotEligible() {
    return (
        <>
            <div className="bg-failed">
                <div className="thanks-left text-center">
                    <div className='thanksmobile'>
                        <img src={notEligibleMob} alt='Thank you for showing interest' />
                    </div>
                    <h1 className='fw-bold fs-2'>Thanks for Showing Interest! <span style={{ color: '#1973be' }}>EmergencyPaisa</span></h1>
                    <h6 className='pt-4'> Unfortunately, you are <strong>not eligible</strong> at the moment due to our internal policy.
                        <br /> <br />
                        Please try again after one or two days.
                        <div className='pt-4 fw-semibold fs-5 text-center'>
                        </div>
                    </h6>
                    <Button variant="outlined" className='icon-color-primary mt-4 fs-5' style={{ background: '#9a141a', color: '#fff', padding: '10px 15px' }} startIcon={<LibraryAddCheckIcon />}>
                        <Link to='/journey/dashboard' className='text-decoration-none icon-color-primary text-white fw-bold'  > Go to Dashboard </Link>
                    </Button>
                </div>

            </div>
            <MobileNav />

            {/* Thanks for Showing Interest!
      
        Unfortunately, you are not eligible at the moment due to some reason.
      
    Please try again after one or two days */}

        </>
    )
}
