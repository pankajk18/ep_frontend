import React, { useEffect, useState } from 'react'
import Usp from '../component/Usp'
import thum from '../assets/loan-thum.png'
import KeyBenefits from '../component/KeyBenefits'
import LinkupCity from '../component/LinkupCity'
import CTAApplyNow from '../component/CTAApplyNow'
import DocumentandEgibilityNew from '../component/DocumentandEgibilityNew'
import RateandInterest from '../component/RateandInterest'
import { Link, useParams } from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Faq from '../component/Faq'



export default function LoanbyAmountLanding() {
    const { slug } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        fetch(`https://api.crmpaisa.com/get-byamount-data/${slug}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then((result) => {
                setData(result.data || []);
                setLoading(false);


            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [slug]); // ✅ IMPORTANT
    return (
        <>


            {data.length === 0 ? (
                <p className="text-center text-gray-500">No data found</p>
            )
                :
                (
                    <div>
                        {data.map((item, index) => (
                            <>
                                <div className='ms-hero-banner-sec' style={{ paddingTop: '100px' }}>
                                    <div className="container">
                                        {/* banner section */}
                                        <div className='row align-items-center text-center'>
                                            <div className='col-lg-12'>
                                                <div className='ms-banner-heading pt-4 pb-4'>
                                                    <span className='ms-takeaways ms-bg-secondary'> Quick and Easy    </span>
                                                    <h1 className='fs-1 pt-3 fw-bold'>{item.serviceName} </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='container py-5'>
                                    <div className="row align-items-center g-5">
                                        <div className="col-lg-7 pt-5 pb-3">
                                            <h3 className="fw-semibold mb-4" style={{ lineHeight: '40px' }}>
                                                {item.titleHeading}
                                            </h3>
                                            <p className="fw-medium mb-3 opacity-75" style={{ lineHeight: "28px" }} dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                            <Link to='https://emergencypaisa.com/apply-now?utm_source=seo&utm_medium=Web&utm_campaign=amountpages' target='blank'>
                                                <button className="btn-paynow ms-bg-secondary px-4 py-2 mt-4"> Apply Now →</button>
                                            </Link>

                                        </div>

                                        <div className="col-lg-5 text-end">                                           
                                            <img
                                                src={item?.thumbImage
                                                    ? `https://crmpaisa.com/direct-document-file/${item.thumbImage}`
                                                    : thum}
                                                alt={item?.titleHeading || "Loan By Amount"}
                                                className="img-fluid rounded-4"

                                            />
                                        </div>
                                    </div>
                                </div>



                                <Usp />
                                <div className='container py-5'>
                                    <p className="fw-medium mb-3 opacity-75" style={{ lineHeight: "28px" }} dangerouslySetInnerHTML={{ __html: item.extradescription }}></p>
                                </div>
                                <CTAApplyNow />
                                <DocumentandEgibilityNew />
                                <RateandInterest />
                                <div className='p-5 rounded-4 shadow-lg pb-0 pt-0 mb-5 ' style={{ maxWidth: '60%', margin: '0 auto' }}>
                                    <Faq />
                                </div>

                            </>


                        ))}

                    </div>
                )}



        </>
    )
}
