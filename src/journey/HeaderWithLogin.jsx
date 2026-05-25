import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import userIcon from './assets-crm/user-icon.png';
import brandLogo from './assets-crm/ep_logo_white.png';
import LogoutModal from './component/LogoutModal';



export default function HeaderWithLogin() {

    const [isOpen, setIsopen] = useState(false);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const openVideo = () => {
        window.open('/demo-with-ep.mp4', '_blank');
    };

    // Pre-fill input fields from Redux
    useEffect(() => {
        if (customerDetails) {
            setName(customerDetails.full_name);
        }
    }, [customerDetails]);

    const handleLogout = () => {
        window.clevertap?.event.push("lje_logout", {
            "message": "User logged out"
        });
        dispatch({ type: "LOGOUT" });
        navigate('/apply-now');
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        setShowLogoutModal(false);
        handleLogout();
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg_primary fixed-top">
                <div className="container">
                    <Link to='/'> <img src={brandLogo} alt='EmergencyPaisa' style={{ width: '130px' }} /></Link>
                    <div className='d-flex text-white  align-items-center'>
                        <div className='profile-lable dektop-none mobile-show p-2'> <p className='mb-0 fw-semibold mob-none'>Hi {name} </p></div>
                        <button className="navbar-toggler" type="button" onClick={() => setIsopen(true)} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                            style={{ background: '#fff', padding: '2px 4px' }}>
                            <span className="navbar-toggler-icon"></span>
                        </button>

                    </div>

                    <div className="collapse navbar-collapse menu-none justify-content-end" id="navbarSupportedContent">

                        <div className="d-flex justify-content-end">
                            <div className='social d-flex align-items-center ' style={{ width: '170px' }}>
                                <Grid container spacing={1}>
                                    {/* <XIcon className='text-white' /> */}
                                    <Link to='https://www.linkedin.com/company/emergencypaisa' target='_blank' className='socilthum ms-bg-secondary' > <LinkedInIcon /></Link>
                                    <Link to='https://www.facebook.com/emergencypaisa' target='_blank' className='socilthum ms-bg-secondary'> <FacebookIcon /></Link>
                                    <Link to='https://www.youtube.com/@emergencypaisa' target='_blank' className='socilthum ms-bg-secondary'><YouTubeIcon /></Link>
                                    <Link to='https://www.instagram.com/emergency_paisa' target='_blank' className='socilthum ms-bg-secondary'><InstagramIcon /></Link>
                                </Grid>

                            </div>

                            <div className='demo-wrapper d-flex align-items-center border rounded-3'>
                                <p className='mb-0 text-white' onClick={openVideo} style={{ color: '#fff', cursor: 'pointer', padding: '5px 10px' }}>  <PlayCircleOutlineIcon style={{ color: '#fff', fontSize: '20px' }} />
                                    &nbsp;&nbsp; Click here to watch  demo video </p>
                            </div>


                            <div className='profile-wrap d-flex align-items-center' style={{ position: 'relative', minWidth: '250px' }}>
                                <div className='profile-img'>
                                    <img src={customerDetails?.profile_pic || userIcon} alt='User Icon' style={{ width: '40px', height: "40px", borderRadius: "50%", border: " 2px solid rgb(255, 255, 255)" }} />
                                </div>
                                <Button id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#fff' }} endIcon={<ExpandCircleDownIcon />}>
                                    Hi {(name && (name != null && name != undefined && name.toUpperCase() != 'NULL')) ? name : ''}
                                </Button>
                                <div className="dropdown-menu custome-drop"
                                    aria-labelledby="dropdownMenuButton1">
                                    <div className='drop-inner'>
                                        <div className='profile-top'>
                                            <span>{name?.charAt(0)}</span>
                                            <p>{String(name)}</p>
                                        </div>
                                        <div className='profilemenu'>
                                            <ul>

                                                <li>
                                                    <Link to='/journey/dashboard'>
                                                        <DashboardIcon style={{ color: '#9a141a', paddingRight: '10px', fontSize: '40px' }} />
                                                        User Dashboard
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link to='/journey/loan-history'>
                                                        <WorkHistoryIcon style={{ color: '#9a141a', paddingRight: '10px', fontSize: '40px' }} />
                                                        Loan History
                                                    </Link>
                                                </li>

                                            </ul>
                                            <hr style={{ marginTop: '0px', marginBottom: '10px' }} />
                                            <ul>
                                                <Link onClick={handleLogoutClick} style={{ paddingLeft: '15px', textDecoration: 'none', color: '#235496', fontWeight: '500' }}>
                                                    <ExitToAppIcon style={{ color: '#9a141a', paddingRight: '10px', fontSize: '40px', }} />
                                                    Sign Out
                                                </Link>
                                            </ul>
                                        </div>

                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* responsive menu */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ paddingTop: '4rem' }}>
                <div className='d-flex' style={{ flexDirection: 'column' }}>
                    <p className='fs-4 fw-medium text-center'> Hi {(name && (name != null && name != undefined && name.toUpperCase() != 'NULL')) ? name : ''}</p>
                    <ul className='navbar-nav mb-2'>
                        <li className='nav-item p-2'>
                            <Link to='/journey/dashboard' style={{ textDecoration: 'none', color: '#fff', fontWeight: '500' }}>
                                <DashboardIcon style={{ color: '#fff', paddingRight: '10px', fontSize: '40px' }} />
                                User Dashboard
                            </Link>
                        </li>
                        <li className='nav-item p-2'>
                            <Link to='/journey/loan-history' style={{ textDecoration: 'none', color: '#fff', fontWeight: '500' }}>
                                <WorkHistoryIcon style={{ color: '#fff', paddingRight: '10px', fontSize: '40px' }} />
                                Loan History
                            </Link>
                        </li>

                        <li className='nav-item p-2'>
                            <Link onClick={handleLogoutClick} style={{ textDecoration: 'none', color: '#fff', fontWeight: '500' }}>
                                <ExitToAppIcon style={{ color: '#fff', paddingRight: '10px', fontSize: '40px', }} />
                                Sign Out
                            </Link>
                        </li>
                    </ul>
                    <button className="close-btn" onClick={() => setIsopen(false)} style={{ marginTop: '-300px' }}>
                        {/* &times; */}
                        <XIcon style={{ color: '#fff', fontSize: '35px', border: '2px solid #ddd', padding: '5px' }} />
                    </button>
                </div>
                {/* <div className='demo-wrapper d-flex align-items-center pt-4'>
                    <Link to='/journey/demo' className='text-decoration-none text-white d-flex align-items-center' style={{ paddingLeft: '35px' }}>
                        <p className='mb-0'>  <PlayCircleOutlineIcon style={{ color: '#fff', fontSize: '30px' }} />
                            &nbsp;&nbsp; Click here to watch video Demo </p>
                    </Link>
                </div> */}



                <div className='social-wrap' style={{ position: 'absolute', bottom: '20px', borderTop: '1px solid #ddd', paddingTop: '10px', width: '100%' }}>
                    <Link to='/' target='_blank' color='#fff' aria-label="Facebook"><FacebookIcon size={50} className='socilthum' /></Link>
                    <Link to='/' target='_blank' aria-label="Youtube"><YouTubeIcon size={50} className='socilthum' /></Link>
                    <Link to='/' target='_blank' aria-label="Linkedin"><LinkedInIcon size={50} className='socilthum' /></Link>
                    <Link to='/' target='_blank' aria-label="Instagram"><InstagramIcon size={50} className='socilthum' /></Link>

                </div>


            </div>
            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />
        </>
    );
}
