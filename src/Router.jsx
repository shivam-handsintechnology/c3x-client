import { useState, useEffect } from 'react';
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Aboutus from './pages/Aboutus';
import Ourservices from './pages/Ourservices';
import Career from './pages/Career';
import Deliveryservice from './pages/Deliveryservice';
import Contact from './pages/Contact';
import Domestic_couriers from './pages/services/domestic_couriers';
import International_couriers from './pages/services/International_couriers';
import Import_and_clearance_express from './pages/services/Import_and_clearance_express';
import Export_airland_sea from './pages/services/Export_airland_sea';
import Ecommerce_delivery from './pages/services/Ecommerce_delivery';
import Ecommerce_fulfilment from './pages/services/Ecommerce_fulfilment';
import Termsconditions from './pages/Termsconditions';
import Privacypolicy from './pages/Privacypolicy';
import OurGallery from './pages/OurGallery';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ChangePassword from './pages/Auth/ChangePassword';
import DomesticRatefinder from './pages/Ratefinder/DomesticRatefinder';
import Dashboard from './pages/Admin/Dashboard';
import Topuphistory from './pages/Admin/Topuphistory';
import PrepaidTopuprequest from './pages/Admin/PrepaidTopuprequest';
import Topuprequest from './pages/Admin/Toprequest';
import Pickuphistory from './pages/Admin/Pickuphistory';
import Schedulepickupbooking from './pages/Admin/Schedulepickupbooking';
import Managingshipping from './pages/Admin/Managingshipping';
import DashboardLayout from './Components/Common/DashboardLayout';
import ManageSubUsers from './pages/Admin/ManageSubUsers';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUerProfileQuery } from './service/apiServices';
import InvoicePage from './pages/Admin/Invoices';
import PaymentDues from './pages/Admin/PaymentDues';
import { setUserDetails, setUserLogout } from './redux/reducers/UserReducer';
import PrepaidAccountStatus from './pages/Admin/PrepaidAccountStatus';
import ManageAddress from './pages/Admin/ManageAddress';
import Loader from './heplers/Loaders/Loader';
import Bookshipment from './pages/BookShipments/Bookshipment';
import ManageServiceType from './pages/Admin/ManageServiceTypes';
import ThankYouPage from './pages/ThankYouPage';
import HelpDesk from './pages/Helpdesk';
import { toast } from 'react-toastify';
import SchadulePickupThankYouPage from './pages/Admin/SchedulePickupComponents/SchadulePickupThankYouPage';
import InternationalRatefinder from './pages/Ratefinder/InternationalRatefinder';
import Thankyou from './pages/Thankyou';

const Router = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.UserReducer);
    const ProfileData = useGetUerProfileQuery(undefined, {
        skip: !userData.access_token
    });

    const [isLoader, setLoader] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (ProfileData.data && !ProfileData.isLoading) {
            // Successfully received data
            dispatch(setUserDetails({ data: ProfileData.data }));
        } else if (!ProfileData.isLoading && ProfileData.isError) {
            // Error occurred
            dispatch(setUserLogout());
            toast.error(ProfileData.error?.data?.message || 'An error occurred.');
            setHasError(true);
            window.location.assign("/login")
        }
    }, [ProfileData.data, ProfileData.isLoading, ProfileData.isError]);

    useEffect(() => {
        // Loader logic
        setLoader(true);
        setTimeout(() => setLoader(false), 4000);
    }, []);

    if (isLoader) {
        return <Loader />;
    }


    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home userAuthData={ProfileData} />} />
                <Route path="/help-desk" element={<HelpDesk />} />
                <Route path="/Helpdesk" element={<Navigate replace to="/help-desk" />} />
                <Route path='/Thankyou/:id' element={<ThankYouPage />} />
                <Route path='/PickupRequest/:id' element={<SchadulePickupThankYouPage />} />
                <Route path="/Bookshipment" element={ProfileData.isLoading ? <Loader /> : <Bookshipment userAuthData={ProfileData} />} />
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/Aboutus" element={<Navigate replace to="/about-us" />} />
                <Route path="/Ourservices" element={<Ourservices />} />
                <Route path="/OurGallery" element={<OurGallery />} />
                <Route path="/Career" element={<Career />} />
                <Route path='/Deliveryservice' element={<Deliveryservice />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/Contact" element={<Navigate replace to="/contact-us" />} />
                <Route path="/Thankyou" element={<Thankyou />} />
                <Route path="/services/domestic-parcel-service-in-dubai" element={<Domestic_couriers />} />
                <Route path="/services/domestic_couriers" element={<Navigate replace to="/services/domestic-parcel-service-in-dubai" />} />
                <Route path="/services/international-courier-service-provider-in-dubai" element={<International_couriers />} />
                <Route path="/services/international_couriers" element={<Navigate replace to="/services/international-courier-service-provider-in-dubai" />} />
                <Route path="/services/import-customs-clearance-in-dubai" element={<Import_and_clearance_express />} />
                <Route path="/services/import_and_clearance_express" element={<Navigate replace to="/services/import-customs-clearance-in-dubai" />} />
                <Route path="/services/international-shipping-by-land-sea-air" element={<Export_airland_sea />} />
                <Route path="/services/Export_airland_sea" element={<Navigate replace to="/services/international-shipping-by-land-sea-air" />} />
                <Route path="/services/ecommerce-delivery-service-in-dubai" element={<Ecommerce_delivery />} />
                <Route path="/services/Ecommerce_delivery" element={<Navigate replace to="/services/ecommerce-delivery-service-in-dubai" />} />
                <Route path="/services/ecommerce-fulfilment-service-in-dubai" element={<Ecommerce_fulfilment />} />
                <Route path="/services/Ecommerce_fulfilment" element={<Navigate replace to="/services/ecommerce-fulfilment-service-in-dubai" />} />
                <Route path="/terms-and-conditions" element={<Termsconditions />} />
                <Route path="/Termsconditions" element={<Navigate replace to="/terms-and-conditions" />} />
                <Route path="/privacy-and-policy" element={<Privacypolicy />} />
                <Route path="/Privacypolicy" element={<Navigate replace to="/privacy-and-policy" />} />
                <Route path="/Ratefinder" element={<DomesticRatefinder />} />
                <Route path="/InternationalRatefinder" element={<InternationalRatefinder />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/ChangePassword" element={<ChangePassword />} />
                <Route path="/Dashboard" element={ProfileData.isLoading ? <Loader /> : <DashboardLayout userAuthData={ProfileData}><Dashboard userAuthData={ProfileData} /></DashboardLayout>} />
                <Route path="/Topuphistory" element={ProfileData.isLoading ? <Loader /> : <DashboardLayout userAuthData={ProfileData}><Topuphistory userAuthData={ProfileData} /></DashboardLayout>} />
                <Route path="/PrepaidTopuprequest" element={ProfileData.isLoading ? <Loader /> : <DashboardLayout userAuthData={ProfileData}  ><PrepaidTopuprequest /></DashboardLayout>} />
                <Route path="/Topuprequest" element={ProfileData.isLoading ? <Loader /> : <DashboardLayout userAuthData={ProfileData}><Topuprequest userAuthData={ProfileData} /></DashboardLayout>} />
                <Route path="/Pickuphistory" element={ProfileData.isLoading ? <Loader /> : <DashboardLayout userAuthData={ProfileData}><Pickuphistory userAuthData={ProfileData} /></DashboardLayout>} />
                <Route path="/Schedulepickupbooking" element={ProfileData.isLoading ? <Loader /> : <DashboardLayout userAuthData={ProfileData}><Schedulepickupbooking userAuthData={ProfileData} /></DashboardLayout>} />
                <Route path="/Managingshipping" element={ProfileData.isLoading ? <Loader /> : <DashboardLayout userAuthData={ProfileData}><Managingshipping userAuthData={ProfileData} /></DashboardLayout>} />
                <Route path="/ManageSubUsers" element={ProfileData.isLoading ? <Loader /> : <DashboardLayout userAuthData={ProfileData}><ManageSubUsers userAuthData={ProfileData} /></DashboardLayout>} />
                <Route path="/ManageServiceTypes" element={ProfileData.isLoading ? <Loader /> : <DashboardLayout userAuthData={ProfileData}><ManageServiceType userAuthData={ProfileData} /></DashboardLayout>} />
                <Route path="/Invoices" element={ProfileData.isLoading ? <Loader /> : <DashboardLayout userAuthData={ProfileData}><InvoicePage /></DashboardLayout>} />
                <Route path="/PaymentDues" element={ProfileData.isLoading ? <Loader /> : <DashboardLayout userAuthData={ProfileData}><PaymentDues /></DashboardLayout>} />
                <Route path="/PrepaidAccountStatus" element={ProfileData.isLoading ? <Loader /> : <DashboardLayout userAuthData={ProfileData}><PrepaidAccountStatus /></DashboardLayout>} />
                <Route path="/ManageAddress" element={ProfileData.isLoading ? <Loader /> : <DashboardLayout userAuthData={ProfileData}><ManageAddress /></DashboardLayout>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>

    );
};

export default Router;
