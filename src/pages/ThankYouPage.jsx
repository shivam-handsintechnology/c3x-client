import React, { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { usePostasaGuestSchedulePickupDataMutation } from '../service/apiServices';
import Loader from '../heplers/Loaders/Loader';

const ThankYouPage = () => {
    const location = useLocation()
    const { state } = location

    const { id } = useParams()
    const [PickuRequstNumber, setPickuRequstNumber] = React.useState('')
    const [postAsGuestSchedulePickupData, { isLoading, isSuccess }] = usePostasaGuestSchedulePickupDataMutation();
    useEffect(() => {
        if (id === "authorised") {
            if (!state) {
                if (localStorage.getItem('order')) {
                    // localStorage.removeItem('order')
                    let data = JSON.parse(localStorage.getItem('order'))
                    postAsGuestSchedulePickupData(data).unwrap().then((res) => {
                        console.log(res.data.PickupRequestNo)

                        setPickuRequstNumber(res.data.PickupRequestNo)
                        localStorage.setItem("pickupRequestNo", res.data.PickupRequestNo)

                        localStorage.removeItem('order')
                    }
                    ).catch((err) => {
                        console.log(err)
                    })
                }
            } else if (state) {
                setPickuRequstNumber(state.PickupRequestNo)
            } else if (localStorage.getItem('pickupRequestNo')) {
                setPickuRequstNumber(localStorage.getItem('pickupRequestNo'))
            }
        }

    }, [id])
    //console.log(state)
    if (isLoading) {
        return <Loader />
    } else {
        return (
            <>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title />
                <link
                    href="https://fonts.googleapis.com/css?family=Lato:300,400|Montserrat:700"
                    rel="stylesheet"
                    type="text/css"
                />

                <link
                    rel="stylesheet"
                    href="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/default_thank_you.css"
                />
                <header className="site-header" id="header">
                    <h3 className="site-header__title" style={{ fontSize: "5.25rem", color: "black" }} data-lead-id="site-header-title">
                        THANK YOU!
                    </h3>
                </header>
                <div className="main-content">
                    <i className={`fa ${id === 'authorised' ? 'fa-check  bg-blue-color' : 'fa-close error'} main-content__checkmark`} id="checkmark" />
                    <p className="main-content__body" data-lead-id="main-content-body">
                        {
                            id === "authorised" ? (<>
                                Your pick-up request placed successfully
                                <br />
                                Your Pickup Request Number is {PickuRequstNumber}
                            </>) : id === "cancelled" || "declined" ? (<>
                                <span className='error'> Sorry, your transaction has been cancelled.<Link className="bg-blue-color" to="/Contact">Contact Us</Link> for more information</span>

                            </>) : <></>
                        }

                        <br />
                        <br />
                        <Link onClick={() => localStorage.removeItem("pickupRequestNo")} className='' to="/"> <button style={{ border: "3px", borderColor: "#2ca2c6" }} className='bg-blue  text-white'>Go Back</button> </Link>
                    </p>
                </div>

            </>

        )
    }

}

export default ThankYouPage