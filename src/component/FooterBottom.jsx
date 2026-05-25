import React from 'react'
import { Link } from 'react-router-dom'


export default function FooterBottom() {
  return (
    <div style={{ backgroundColor: '#333' }}>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 pt-3 text-white'>
            <p>© SUBURBAN FINANCE AND INVESTMENT PRIVATE LIMITED</p>
          </div>
          <div className='col-lg-4'>
            <ul className='term-list d-flex pt-3 link-text justify-content-start list-unstyled justify-content-sm-center justify-content-md-center'>
              <li> <Link to='/privacy-policy' className='text-white text-decoration-none m-2'> Privacy Policy </Link></li> &nbsp;
              <li> <Link to='/terms-and-conditions' className='text-white text-decoration-none m-2'>Terms and Conditions </Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
