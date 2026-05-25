import React, { useEffect, useState } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import cityThum from '../assets/loan-thum.png'
import { Link, useParams } from 'react-router-dom'
import defaultThum from '../assets/default.png'


export default function LinkupCity() {
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
        <section className="py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h4 className="fw-bold mb-3 fs-3"> Personal Loans Available in <span className='ms-text-secondary'>Your City </span> </h4>
                    <p className="text-muted mx-auto fs-6" style={{ maxWidth: "850px" }}>
                        An Instant Personal Loan gives you fast access to funds whenever you</p>
                </div>

                {/* Linked Cities */}
                <div className="row g-4">
                    {data?.[0]?.linkedCities?.map((item, index) => (
                        <div className="col-md-6 col-lg-3" key={index}>
                            <div className="card border h-100">
                                <div className="p-2 ">
                                    {/* {
                                        item?.linkedCities ? (
                                            <Link to={`/${item.linkedCitySlug}`} className="text-decoration-none text-black">
                                                <p>Two</p>
                                            </Link>
                                        ) : (
                                            <div className="opacity-50 cursor-not-allowed">
                                                <p>one</p>
                                            </div>
                                        )
                                    } */}

                                    {/* <Link
  to={city?.slug ? `/${city.slug}` : "#"}
  className={`text-decoration-none text-black ${
    !city?.slug ? "pointer-events-none opacity-50" : "" d-flex align-items-center gap-2 text-decoration-none text-black
  }`}
></Link> */}
{/* {`/${item.linkedCitySlug}` */}
                                    <Link to={item.linkedCitySlug ? `/personal-loan-in-${item.linkedCitySlug}` :'#' } className="d-flex align-items-center gap-2 text-decoration-none text-black">
                                        <div className='icon-wrap me-3 ' style={{ width: "80px" }}>
                                            <img
                                                src={item?.linkedCityThumbImage
                                                    ? `https://crmpaisa.com/direct-document-file/${item.linkedCityThumbImage}`
                                                    : defaultThum}
                                                alt={item?.titleHeading || "Loan By Amount"}
                                                style={{ width: '100%', borderRadius: '50%' }}
                                            />
                                        </div>
                                        <div>
                                            <span className="fw-semibold fs-6">
                                                {item.linkedCityName}
                                            </span>
                                            <p className="text-muted small mb-0 fw-medium opacity-75">
                                                {item.linkedCityShortDescription}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}
