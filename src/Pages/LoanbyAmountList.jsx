import React, { useEffect, useState } from 'react'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Helmet } from 'react-helmet';
import '../css/loanCards.css'
import { Link } from 'react-router-dom';


export default function LoanbyAmountList() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchServiceAreas = async () => {
            try {
                setLoading(true)
                const res = await fetch('https://api.crmpaisa.com/get-byamount-data')

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
                <div className="container py-5">
                    <div className='row  align-items-center'>
                        <div className='col-lg-12 text-center'>
                            <div className='ms-banner-heading'>
                                <span className='ms-takeaways ms-bg-secondary'> Loan By Amount</span>
                                <h1 className='fs-2 pt-3 fw-semibold'>All Instant Loan Lists</h1>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

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
                <div className="service-wrap container pt-5 mb-4">
                    <div className="row g-4 py-4 ">
                        {data.map((amtList) => (
                            <div key={amtList.byamount_id} className="col-lg-3 col-md-6 col-sm-12">
                                <Link to={`/amount/${amtList.slug}`} className='text-decoration-none text-black'>
                                <div className="loan-card d-flex align-items-center gap-3 p-3">
                                    <div className="text-primary fs-4 ms-bg-secondary text-white text-center rupee-icon">
                                        <CurrencyRupeeIcon />
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-1">{amtList.serviceName.split(" ")[0]}</h5>
                                        <p className="text-muted small mb-0">
                                            Instant personal loan
                                        </p>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )
            }


        </>
    )
}
