import React, { useEffect, useState } from 'react';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


export default function MobileNav() {
    const [name, setName] = useState('');
    const [activebtn, setActivebtn] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);



    // Pre-fill input fields from Redux
    useEffect(() => {
        if (customerDetails) {
            setName(customerDetails.full_name);
        }
    }, [customerDetails]);

    const handleLogout = () => {
        window.clevertap?.event.push("logout");
        dispatch({ type: "LOGOUT" });
        navigate('/apply-now');

    };

    const handleBtn = () => {
        setActivebtn(!activebtn)
    }
    const {pathname} = useLocation();
    const [activeTab, setActiveTab] = useState('home'); // default active tab
    const tabs = [
        { id: 'dashboard', label: 'Dashboard', Icon: CottageOutlinedIcon, pageLink:'/journey/dashboard' },
        { id: 'history', label: 'History', Icon: RestoreOutlinedIcon, pageLink:'/journey/loan-history' },
        { id: 'contact', label: 'Contact', Icon: SupportAgentOutlinedIcon, pageLink:'/journey/support-detail' },
        
    ];

    return (
        <div className='bottom-nav'>

            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', textAlign:'center'}}>
                {tabs.map((tab) => (
                    <Link to={tab.pageLink} className={`${pathname === tab.pageLink ? 'ms-active' : 'text-white text-decoration-none'}`}
                        key={tab.id}                       
                        
                        onClick={() => setActiveTab(tab.id)}
                    >
                          <tab.Icon/> <br/> 
                        <span style={{ fontSize: '12px' }}>{tab.label}</span>
                       
                    </Link>
                ))}
                <div onClick={handleLogout} className='text-white text-decoration-none text-center'><LogoutOutlinedIcon style={{ fontSize: '25px' }} />
                    <br /><span style={{ fontSize: '10px' }}>SignOut</span>
                </div>
            </div>
          

           

            {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">MEMU</button>
                <div className="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasBottomLabel">Offcanvas bottom</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body small">
                        ...
                    </div>
                </div> */}
        </div>
    )
}
