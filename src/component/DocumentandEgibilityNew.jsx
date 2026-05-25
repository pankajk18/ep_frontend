import React from 'react'

export default function DocumentandEgibilityNew() {
    return (
        <section class="py-5 bg-light">
            <div class="container py-3">

                <div class="text-center mb-5">
                    <h3 class="fw-bold ms-text-primary"> <span className='ms-text-secondary'>Loan Eligibility</span> & Documents Required</h3>
                    <p class="text-muted">
                        Check who can apply and what documents are needed for quick approval
                    </p>
                </div>

                <div class="row g-4">

                    {/* Eligibility Criteria  */}
                    <div class="col-lg-6">
                        <div class="card shadow-sm border-0">
                            <div class="card-body">
                                {/* <h5 class="fw-semibold mb-3 ms-text-secondary">Eligibility Criteria</h5> */}
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> <span className='ms-text-primary'> ✔</span>  Age between 21 to 55 years</li>
                                    <li class="list-group-item"><span className='ms-text-primary'> ✔</span>Indian resident</li>
                                    <li class="list-group-item"><span className='ms-text-primary'> ✔</span> For salaried working professionals </li>
                                    <li class="list-group-item"><span className='ms-text-primary'> ✔</span> Minimum monthly income ₹30,000</li>
                                    <li class="list-group-item"><span className='ms-text-primary'> ✔</span> Valid PAN & mobile number</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Documents Required  */}
                    <div class="col-lg-6">
                        <div class="card h-100 shadow-sm border-0">
                            <div class="card-body">
                                {/* <h5 class="fw-semibold mb-3 ms-text-primary">Documents Required</h5> */}
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">📄 PAN Card</li>
                                    <li class="list-group-item">📄 Aadhaar Card</li>
                                    <li class="list-group-item">📄 Bank Statement (Last 3 months)</li>
                                    <li class="list-group-item">📄 Salary slips or income proof</li>
                                    <li class="list-group-item">📄 Active mobile number</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
