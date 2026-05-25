import React from 'react'
import benifitList from '../API/Benifit.json'
export default function Benifit() {
    return (
        <>
            <div className='container pt-8'>
                <div className='row servicebox'>
                    <div className='col-lg-4'>
                        <div className='sec-title'>
                            <p className='tag'>Our Benefit</p>
                            <h1>Customised support for diverse fund needs</h1></div>
                    </div>
                    {
                        benifitList.benifitData.slice(0, 2).map((benList, ind) => {
                            let imgPath = require("../assets/icon/"+benList.img);
                           // const imgPath= require('../assets/icon/')
                            return (
                                <div className='col-lg-4' key={benList.id} data-aos="fade-right">
                                    <div className='benifit-box'>
                                        <div className='icon-box1'>
                                            <img src={imgPath} alt='icon' />
                                        </div>
                                        <div className='ser-dis'>
                                            <h4>{benList.ben_name}</h4>
                                            <p>{benList.ben_dis}</p>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
                <div className='row servicebox'>
                    {
                        benifitList.benifitData.slice(2, 5).map((benList, ind) => {
                             let imgPath = require("../assets/icon/"+benList.img);
                            return (
                                <div className='col-lg-4' key={benList.id} data-aos="fade-right">
                                    <div className='benifit-box' style={{ minHeight: '200px !importaint' }}>
                                        <div className='icon-box1'>
                                            <img src={imgPath} alt='icon' />
                                        </div>
                                        <div className='ser-dis'>
                                            <h4>{benList.ben_name}</h4>
                                            <p>{benList.ben_dis}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>


    )
}
