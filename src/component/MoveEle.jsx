import React from 'react'
import moveEle1 from '../assets/element/el-1.svg'
import moveEle2 from '../assets/element/el-2.svg'
import moveEle3 from '../assets/element/el-3.svg'
import moveEle4 from '../assets/element/el-4.svg'

export default function MoveEle() {
    return (
        <>
            <div id="box1">
                <img src={moveEle1} alt='SP' className='el1' style={{mixBlendMode:'multiply'}} />
                <img src={moveEle2} alt='SP' className='el2' style={{mixBlendMode:'multiply'}} />
                <img src={moveEle3} alt='SP' className='el3' style={{mixBlendMode:'multiply'}}/>
                <img src={moveEle4} alt='SP' className='el4' style={{mixBlendMode:'multiply'}}/>
            </div>
        </>
    )
}
