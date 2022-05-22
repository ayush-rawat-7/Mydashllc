import React, { useState, useEffect } from 'react'
import "../styles/landing/landing.css"
import { useNavigate } from "react-router-dom";


import image from "../utilities/image.png"

export const LandingPage = () => {
    const history = useNavigate()

    const [isDesktop, setDesktop] = useState(window.innerWidth > 600);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 600);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });


    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phone: "",
        agreed: false
    })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (name, value) => {
        return setState((state) => {
            return { ...state, [name]: value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(state))
        setIsSubmit(true)
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(state)
            history('/chart')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formErrors])

    const validate = (values) => {
        const errors = {}
        const emailCheck = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        const phoneCheck = /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g
        if (!values.name) {
            errors.name = "Username is required"
        }
        if (!values.email) {
            errors.email = "Email is required"
        } else if (!emailCheck.test(values.email)) {
            errors.email = "Invalid email"
        }
        if (!values.phone) {
            errors.phone = "Phone number is required"
        } else if (!phoneCheck.test(values.phone)) {
            errors.phone = "Invalid Phone Number"
        }
        if (!values.password) {
            errors.password = "Password is required"
        } else if (values.password.length <= 7) {
            errors.password = "Password length must be greater than 7 characters"
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm password is required"
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Password does not match"
        }
        if (!values.agreed) {
            errors.agreed = "Terms and Conditions not agreed"
        }
        return errors
    }

    return (
        <div className="container">
            {!isDesktop || <div className="container__left">
                <img src={image} alt="barchart with a small calculator over it" width='70%' />
                <h2>Choose a date range</h2>
                <section className="container__left__para">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, magnam quis!</p>
                </section>
            </div>
            }

            <div className="container__right">
                <form onSubmit={handleSubmit}>
                    <h2>Create an account</h2>
                    {/* email */}
                    <label htmlFor="email">Your email address</label>
                    <input type="text" name="email" className="container__right_inputs" value={state.email} onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
                    {formErrors.email && <p className="container__right__error">{formErrors.email}</p>}
                    {/* passowrd */}
                    <label htmlFor="password">Your password</label>
                    <input type="password" name="password" className="container__right_inputs" value={state.password} onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
                    {formErrors.password && <p className="container__right__error">{formErrors.password}</p>}

                    {/* confirm password */}
                    <label htmlFor="confirmPassword">Confirm your password</label>
                    <input type="password" name="confirmPassword" className="container__right_inputs" value={state.confirmPassword} onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
                    {formErrors.confirmPassword && <p className="container__right__error">{formErrors.confirmPassword}</p>}

                    {/* full name */}
                    <label htmlFor="name">Your full name</label>
                    <input type="text" name="name" className="container__right_inputs" value={state.name} onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
                    {formErrors.name && <p className="container__right__error">{formErrors.name}</p>}

                    {/* phone number */}
                    <label htmlFor="number">Your phone number</label>
                    <input type="text" name="phone" className="container__right_inputs phone" value={state.phone} onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
                    {formErrors.phone && <p className="container__right__error">{formErrors.phone}</p>}

                    {/* terms */}
                    <label className="container__right_checkbox">
                        <input type="checkbox"
                            onChange={() => setState((state) => {
                                return { ...state, agreed: !state.agreed }
                            })}
                        />
                        <svg className={`checkbox ${state.agreed ? "checkbox--checked" : ""}`}
                            aria-hidden='true'
                            viewBox='0 0 15 11'
                            fill='none'
                        >
                            <path
                                d='M1 4.5L5 9L14 1'
                                strokeWidth="2"
                                stroke={`${state.agreed ? "rgb(49, 133, 223)" : ""}`}
                            // add condition on stroke
                            />
                        </svg>
                        I read and agree Terms and Conditions

                    </label>
                    {formErrors.agreed && <p className="container__right__error">{formErrors.agreed}</p>}
                    <button onClick={handleSubmit} className="container__right_button">Create account</button>
                </form>
            </div>
        </div >
    )
}
