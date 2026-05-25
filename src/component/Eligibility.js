import React from 'react'
// import thumImg from '../../src/assets/img/company.png'
import thumImg from '../assets/eligibility_criteria.webp'
export default function Eligibility() {
    return (
        <>
            <div className='row align-items-center'>
                <div className='col-lg-6'>
                    <h3 className='pb-4'>Eligibility Criteria</h3>
                    
                    <div className='eligibility-wrap d-flex'>
                        <div className='icon'>
                           01
                        </div>
                        <div>
                            <h4>Nationality</h4>
                            <p>Must be an Indian resident</p>
                        </div>
                    </div>
                    <div className='eligibility-wrap d-flex'>
                        <div className='icon'>
                           02
                        </div>
                        <div>
                            <h4>Employment</h4>
                            <p> Should be a salaried employee at a reputed MNC, private, or public limited company.</p>
                        </div>
                    </div>
                    <div className='eligibility-wrap d-flex'>
                        <div className='icon'>
                           03
                        </div>
                        <div>
                            <h4>Credit score</h4>
                            <p> CIBIL Score Should be Fair</p>
                        </div>
                    </div>
                    <div className='eligibility-wrap d-flex pb-5'>
                        <div className='icon'>
                          04
                        </div>
                        <div>
                            <h4>Income</h4>
                            <p> This is short term loan service only for salaried individuals with a salary above INR 30000/-. </p></div>
                    </div>
                   
                </div>
                <div className='col-lg-6 el-img'>
                    <img src={thumImg} className='img-fluid'  alt='SOT' />
                </div>
            </div>
        </>
    )
}
