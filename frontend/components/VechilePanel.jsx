import React from 'react'

const VechilePanel = (props) => {
    return (
        <>
            <h5

                onClick={() => {
                    props.setVechilePanel(false);
                }
                }
                className=' absolute  top-0 text-center w-[93%]  text-3xl' >
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-bold mb-5' >Choose a vechile</h3>
            {/* for uber car */}
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.setVechilePanel(false);
                }
                }
                tabIndex={0}
                className='flex gap-4 mb-2 justify-between items-center w-full border-gray-200 border-2 rounded-lg p-3 active:border-black'
            >
                <img className='h-10 ' src="images\car.webp" alt="ddd" />
                <div className='-ml-2 w-1/2 '>
                    <h4 className='text-base font-medium'>carX <span><i className="ri-user-3-fill"></i>4 seats </span> </h4>
                    <h5 className='text-xs font-medium'> 2 min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold' >₹199.20</h2>

            </div>
            {/* for uber bike */}
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.setVechilePanel(false);
                }
                }
                className='flex gap-4 mb-2 justify-between items-center w-full border-gray-200 border-2 active:border-black rounded-lg  p-3'>
                <img className='h-10 ' src="images\bike.webp" alt="ddd"  />
                <div className='-ml-2 w-1/2 '>
                    <h4 className='text-base font-medium'>Moto <span><i className="ri-user-3-fill"></i>1 seats </span> </h4>
                    <h5 className='text-xs font-medium'> 3 min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold' >₹65</h2>

            </div>
            {/* for uber auto */}
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.setVechilePanel(false);
                }
                }
                className='flex gap-4 mb-2 justify-between items-center w-full  border-gray-200 border-2 active:border-black rounded-lg  p-3'>
                <img className='h-10 ' src="images\auto.jpeg" alt="ddd"  />
                <div className=' -ml-2 w-1/2 '>
                    <h4 className='text-base font-medium'>UberAuto <span><i className="ri-user-3-fill"></i>4 seats </span> </h4>
                    <h5 className='text-xs font-medium'> 5 min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold' >₹116.20</h2>

            </div>
        </>
    )
}

export default VechilePanel