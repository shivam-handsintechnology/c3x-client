// Login.js
import React, { useState, useEffect, useRef } from 'react';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { APi_Url } from '../../service/axiosInterceptors';
import { Link, useNavigate } from 'react-router-dom';
import { setUserDetails } from '../../redux/reducers/UserReducer';
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [formData, setFormData] = useState({
    email: 'admin@gmail',
    password: '12345678',
    userInput: "",
    captchaText: "",
  });
  const [Error, setError] = useState(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    initializeCaptcha(ctx);
  }, []);

  const generateRandomChar = (min, max) =>
    String.fromCharCode(Math.floor
      (Math.random() * (max - min + 1) + min));

  const generateCaptchaText = () => {
    let captcha = '';
    for (let i = 0; i < 3; i++) {
      captcha += generateRandomChar(65, 90);
      captcha += generateRandomChar(97, 122);
      captcha += generateRandomChar(48, 57);
    }
    return captcha.split('').sort(
      () => Math.random() - 0.5).join('');
  };

  const drawCaptchaOnCanvas = (ctx, captcha) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
    const letterSpace = 150 / captcha.length;
    for (let i = 0; i < captcha.length; i++) {
      const xInitialSpace = 25;
      ctx.font = '20px Roboto Mono';
      ctx.fillStyle = textColors[Math.floor(
        Math.random() * 2)];
      ctx.fillText(
        captcha[i],
        xInitialSpace + i * letterSpace,

        // Randomize Y position slightly 
        Math.floor(Math.random() * 16 + 25),
        100
      );
    }
  };

  const initializeCaptcha = (ctx) => {
    setError(null)
    setFormData((prev => ({ ...prev, userInput: "" })));
    const newCaptcha = generateCaptchaText();
    setFormData((prev => ({ ...prev, captchaText: newCaptcha })));
    drawCaptchaOnCanvas(ctx, newCaptcha);
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // //console.log(formData)
      if (formData.captchaText === formData.userInput) {
        setError(null)
        await axios.post(APi_Url + 'auth/signin', {
          email: formData.email,
          password: formData.password,
        }).then((res) => {
          // //console.log(res);
          if (res.status === 200) {
            setError(null)
            localStorage.setItem('token', res.data.data.access_token);
            dispatch(setUserDetails({ access_token: res.data.data.access_token }))
            navigate("/")
          }
        }).catch((err) => {
          err.response && setError(err.response.data.message);
        });
      } else {
        setError("Please enter the correct captcha")

      }
    } catch (err) {
      // //console.log(err)
    }
  };

  return (
    <div>
      <section>
        <div className="contact_page_cover" style={{ height: '100vh' }}>
          <Link to="/">
            <img style={{ width: '120px', padding: '10px', position: 'absolute' }} src='https://c3xpress.com/assets/customer/images/logo-c3x.png' />
          </Link>
          <div className="p-section_head" style={{ paddingTop: '60px' }}>
            <h2>Login</h2>
          </div>
          <div className="container p-content_section p-contact">
            <div className="row clearfix" style={{ justifyContent: 'center' }}>
              <div className="col-md-6 col-lg-6 contact_form">
                <form
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <div className="footer_form_outer">
                    <input

                      id="contactEmail"
                      autoComplete="off"
                      defaultValue=""
                      required=""
                      placeholder="Email ID*"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <input

                      id="contactEmail"
                      autoComplete="off"
                      defaultValue=""
                      required=""
                      placeholder="Password*"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <canvas ref={canvasRef}
                      width="200"
                      height="70">

                    </canvas>
                    <button id="reload-button" onClick={
                      () => initializeCaptcha(
                        canvasRef.current.getContext('2d'))}>
                      Reload
                    </button>
                    <br /> <br />
                    <input
                      name="userInput"
                      id="user_captcha"
                      defaultValue=""
                      autoComplete="off"
                      required=""
                      placeholder=" the text shown above *"
                      type="text"
                      value={formData.userInput}
                      onChange={handleChange}

                    />
                    {Error && <p>{Error}</p>}
                    <div className="form_submit_btn" style={{ display: 'block' }}>
                      <input style={{ textAlign: 'center' }} name="" defaultValue="Login" type="submit" onClick={handleSubmit} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
