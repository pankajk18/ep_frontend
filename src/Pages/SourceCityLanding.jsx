import React, { useEffect, useState } from 'react'
import thum from '../assets/loan-thum.png'

import Usp from '../component/Usp'
import KeyBenefits from '../component/KeyBenefits'
import LinkupCity from '../component/LinkupCity'
import CTAApplyNow from '../component/CTAApplyNow'
import DocumentandEgibilityNew from '../component/DocumentandEgibilityNew'
import RateandInterest from '../component/RateandInterest'
import { Link, useParams } from 'react-router-dom'




export default function SourceCityLanding() {
    const { slug } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(() => {
        if (!slug) return;
        const city = slug.replace("personal-loan-in-", "");
        setLoading(true);
        fetch(`https://api.crmpaisa.com/get-service-area-data/${city}`)
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
    }, [slug]);

    
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

                                <div className='ms-hero-banner-sec'>
                                    <div className='row align-items-center text-center'>
                                        <div className='col-lg-12'>
                                            <div className='ms-banner-heading pt-4 pb-4'>
                                                <span className='ms-takeaways ms-bg-secondary'> Source City</span>
                                                <h1 className='fs-1 pt-3 fw-semibold'>Cities We Serve - {item.cityName}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='container py-5'>
                                    <div className="row align-items-center g-5">
                                        {/* LEFT CONTENT */}
                                        <div className="col-lg-7 pt-5 pb-3">
                                            <h3 className="fw-bold mb-4">
                                                {item.cityHeading}
                                            </h3>
                                            {/* <div dangerouslySetInnerHTML={{  blogdata.long_description }}></div> */}
                                            <p className="fw-medium mb-3 opacity-75" style={{ letterSpacing: '1px' }} dangerouslySetInnerHTML={{ __html: item.description }}>

                                            </p>



                                            <Link to={'https://emergencypaisa.com/apply-now?utm_source=seo&utm_medium=Web&utm_campaign=citiespages'} target='_blank'>
                                                <button className="btn-paynow ms-bg-secondary px-4 py-2 mt-4">
                                                    Apply Now →
                                                </button>
                                            </Link>
                                        </div>

                                        {/* RIGHT IMAGE */}
                                        <div className="col-lg-5 text-end">
                                            {/* <img
                                                src={thum}
                                                alt="Instant Loan Approval"
                                                className="img-fluid rounded-4 shadow"
                                            /> */}
                                            <img
                                                src={item?.thumbImage
                                                    ? `https://crmpaisa.com/direct-document-file/${item.thumbImage}`
                                                    : thum}
                                                alt={item?.titleHeading || "Loan By Aadhar"}
                                                className="img-fluid rounded-4"

                                            />
                                        </div>

                                    </div>
                                </div>

                            </>


                        ))}

                    </div>
                )}









            {/* intro section */}


            {/* benifit section start */}
            <Usp />

            <KeyBenefits />

            {/* redirection (Linkup pages one city to other city) */}

            <LinkupCity />
            <CTAApplyNow />
            <DocumentandEgibilityNew />
            <RateandInterest />

        </>
    )
}
