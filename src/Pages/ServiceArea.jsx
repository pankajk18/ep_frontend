import React, { useEffect, useState } from 'react'
import aboutTop from '../assets/about-pages/ep_about_banner.webp'
import { Link } from 'react-router-dom'
import defaultThum from '../assets/default.png'
import '../css/loanCards.css'


export default function ServiceArea() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [checked, setChecked] = useState('')

    useEffect(() => {
        const fetchServiceAreas = async () => {
            try {
                setLoading(true)
                const res = await fetch('https://api.crmpaisa.com/get-service-area-data')

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

        fetchServiceAreas()
    }, [])





    return (
        <>

            <div className='ms-hero-banner-sec' style={{ paddingTop: '80px' }}>
                <div className="container">
                    <div className='row align-items-center'>
                        <div className='col-lg-12 text-center'>
                            <div className='ms-banner-heading pt-5 pb-2'>
                                <span className='ms-takeaways ms-bg-secondary'> Source City</span>
                                <h1 className='fs-1 pt-3 fw-semibold'>Cities We Serve </h1>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className='service-wrap container pt-5 mb-4'>
                {/* <div className="text-center pt-5">
                    <h3 className="fw-bold">Services Across Major Cities</h3>
                    <p className="text-muted">
                        Trusted financial solutions available in top metro cities
                    </p>
                </div> */}

                {/* city listing section start */}
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
                    <div className="row g-4 py-4">
                        {data.map((city, index) => (
                            <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                                <div className="loan-card d-flex align-items-center gap-3 p-2">

                                   



                                    <Link to={`/personal-loan-in-${city.slug}`} className='text-decoration-none text-black'>
                                        <div className="card-body d-flex gap-3">                                            
                                            <img
                                                src={city?.thumbImage
                                                    ? `https://crmpaisa.com/direct-document-file/${city.thumbImage}`
                                                    : defaultThum}
                                                alt={city?.cityName || "City"}
                                                width="80"
                                                height="80"
                                                className="rounded"

                                            />
                                            <div>
                                                <h6 className="fw-semibold mb-1">
                                                    {city.cityName}
                                                </h6>
                                                <p className="text-muted small mb-0">{city.shortdescription || 'Fast Online Loans in Every City.'}</p>
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                            </div>
                        ))}
                    </div>
                )}






                {/* end */}
            </div>
        </>
    )
}
