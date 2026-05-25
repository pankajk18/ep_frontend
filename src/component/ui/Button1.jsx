

import React from 'react'
import { ButtonWrapper1 } from './style';


function Button1({title="Button",loading=false,onClick=()=>{}, className=""}) {
  return (
    <>
    <ButtonWrapper1 onClick={onClick} disabled={loading} className={loading?"disabled "+className:className}>
        {!loading?title:<div className='loader'></div>}
    </ButtonWrapper1>


    </>
  )
}

export default Button1;

