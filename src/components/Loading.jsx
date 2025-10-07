import React from 'react'
import loader from "/loader.gif"
const Loading = () => {
    return (
        <div className='w-screen flex items-center justify-center bg-black'>
            <img className='h-[70%] object-cover ' src={loader} alt="" />
            <div className='absolute w-30 h-10 bg-black bottom-20 right-110'></div>
        </div>
    )
}

export default Loading