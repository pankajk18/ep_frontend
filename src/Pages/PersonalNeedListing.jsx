import React, { useEffect, useState } from 'react'
import '../css/personalneed.css'
import defaultThum from '../assets/default.png'
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export default function PersonalNeedListing() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchList = async () => {
            try {
                setLoading(true)
                const res = await fetch('https://api.crmpaisa.com/get-bypersonalneed-data')

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const result = await res.json()
                setData(result?.data || [])
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchList()
    }, [])

    return (
        <>

            <div className='ms-hero-banner-sec' style={{ paddingTop: '100px' }}>
                <div className="container">
                    {/* banner section */}
                    <div className='row align-items-center text-center'>
                        <div className='col-lg-12'>
                            <div className='ms-banner-heading pt-4 pb-4'>
                                <span className='ms-takeaways ms-bg-secondary'> Personal Need</span>
                                <h1 className='fs-2 pt-3 fw-semibold'>Get loan on your Personal Need </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="features-section">
                <div className="container">
                    {loading && (
                        <p className="text-center py-5 fs-4">Loading...</p>
                    )}

                    {error && (
                        <p className="text-center py-5 text-danger fs-5">
                            {error}
                        </p>
                    )}

                    {!loading && !error && data.length === 0 && (
                        <p className="text-center py-5 fs-5">No data found</p>
                    )}
                    {!loading && !error && data.length > 0 && (
                        <div className="row g-0">
                            {data.map((item, index) => (
                                <div className="col-lg-3 col-md-6 col-12 mt-4" key={index}>
                                    <div className="feature-card" style={{ margin: '10px' }}>
                                        <img className='icon'
                                            src={item.thumbImage ?
                                                `https://crmpaisa.com/direct-document-file/${item.thumbImage}`
                                                : defaultThum
                                            }
                                            alt={item?.alticonimagetitle || "EmergencyPaisa"}
                                        />


                                        <h4>{item.serviceName}</h4>
                                        {/* <p>{item.shortdescription}</p> */}
                                        <p className="text-muted small mb-0" dangerouslySetInnerHTML={{ __html: item.shortdescription }}></p>
                                        <Link to={`/personal-need/${item.slug}`} >
                                            <button className='mt-4'>
                                                Know More <span> <KeyboardArrowRightIcon />  </span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

                </div>
            </div>
        </>

    )
}
