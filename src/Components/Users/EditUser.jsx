import React from "react";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const EditUser = (props) => {
  const { formData, setFormData, CountryMaster, CityHandle, handleChnageAddress } = props
  console.log("formData???????", formData)
  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };
  return (
    <>
      <div className="col-lg-6 mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          User Name
        </label>
        <input
          name="username"
          value={formData["username"]}
          className="form-control"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          autoComplete="off"
          required=""
          type="text"
        />

      </div>
      <div className="col-lg-6 mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Account No
        </label>
        <input
          name="AccountNo"
          value={formData["AccountNo"]}
          className="form-control"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          autoComplete="off"

          required=""
          type="text"
        />
      </div>
      <div className="col-lg-6 mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Company Name
        </label>
        <input
          name="company_name"
          value={formData["address"]["company_name"]}
          className="form-control"
          onChange={(e) => handleChnageAddress(e.target.name, e.target.value)}
          autoComplete="off"
          defaultValue=""
          required=""
          type="text"
        />
      </div>
      <div className="col-lg-6 mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Contact Person Name
        </label>
        <input
          name="full_name"
          value={formData["full_name"]}
          className="form-control"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          autoComplete="off"
          defaultValue=""
          required=""
          type="text"
        />
      </div>

      <div className="col-lg-6 mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Address Line 1
        </label>
        <input
          name="address_line_1"
          value={formData["address"]["address_line_1"]}
          className="form-control"
          onChange={(e) => handleChnageAddress(e.target.name, e.target.value)}
          autoComplete="off"
          defaultValue=""

          required=""
          type="text"
        />
      </div>
      <div className="col-lg-6 mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Address Line 2
        </label>
        <input
          name="address_line_2"
          value={formData["address"]["address_line_2"]}
          className="form-control"
          onChange={(e) => handleChnageAddress(e.target.name, e.target.value)}
          autoComplete="off"
          defaultValue=""
          required=""
          type="text"
        />
      </div>
      <div className="col-lg-6 mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Country
        </label>
        <select
          name="Country"
          onChange={(e) => handleChnageAddress(e.target.name, e.target.value)}
          value={formData["address"]["Country"]}
          className="form-control"
        >
          <option value={""}>Select Country</option>
          {!CountryMaster.isLoading && CountryMaster.data.data.CountryListLocation
            && CountryMaster.data.data.CountryListLocation.length > 0 &&
            CountryMaster.data.data.CountryListLocation.map((item, index) => (
              <option value={item.CountryCode}>{item.CountryName}</option>
            ))}
        </select>
      </div>
      <div className="col-lg-6 mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          City
        </label>
        <select
          name="City"

          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex]
            const selectedId = selectedOption.getAttribute("id");
            handleChnageAddress("Origin", selectedId)
            handleChnageAddress(e.target.name, e.target.value)
          }}
          value={formData["address"]["City"]}
          className="form-control"
        >
          <option value={""}>Select City</option>
          {!CityHandle.errors.loading &&
            CityHandle.Data && CityHandle.Data.CityListLocation &&
            CityHandle.Data.CityListLocation.length > 0 ?
            CityHandle.Data.CityListLocation.map((item, index) => (
              <option value={item.CityName} id={item.CityCode}>{item.CityName}</option>
            )) : <option value={""}>City Not Found</option>
          }
        </select>
      </div>
      <div className="col-lg-6 mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Phone
        </label>
        <PhoneInput
          // className="form-control"

          name="phone_number"
          value={formData["address"]["phone_number"]}
          international
          countryCallingCodeEditable={false}
          placeholder="Phone  Number"
          defaultCountry={formData["address"]["Country"]}
          onChange={(v) => {
            handleChnageAddress("phone_number", v);
          }}
        />
      </div>
      <div className="col-lg-6 mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Telephone Number
        </label>
        <PhoneInput
          // className="form-control"
          name="telephone_number"
          countryCallingCodeEditable={false}
          value={formData["address"]["telephone_number"]}
          international
          placeholder="Phone  Number"
          defaultCountry={formData["address"]["Country"]}
          onChange={(v) => {
            handleChnageAddress("telephone_number", v);
          }}
        />
      </div>
      <div className="col-lg-6 mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email Address
        </label>
        <input
          name="email"
          value={formData["email"]}
          className="form-control"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          autoComplete="off"
          defaultValue=""
          required=""
          type="text"
        />
      </div>
      <div className="col-lg-6 mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Password
        </label>
        <input
          name="password"
          value={formData["password"]}
          className="form-control"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          autoComplete="off"
          defaultValue=""
          required=""
          type="text"
        />
      </div>


    </>

  );
};
export default EditUser;
