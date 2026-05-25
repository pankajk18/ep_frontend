

import React from 'react'
import { ButtonWrapper } from './style';


function Button({title="Button",loading=false,onClick=()=>{}, className=""}) {
  return (
    <>
    <ButtonWrapper onClick={onClick} disabled={loading} className={loading?"disabled "+className:className}>
        {!loading?title:<div className='loader'></div>}
    </ButtonWrapper>


    </>
  )
}

export default Button;

