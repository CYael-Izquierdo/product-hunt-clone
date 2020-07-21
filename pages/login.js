import React, {useState} from "react";
import {css} from "styled-components";
import Router from "next/router"

import Layout from "../components/layout/Layout";
import {Error, Field, Form, InputSubmit} from "../components/ui/Form";
import firebase from "../firebase";

// Validations
import useValidations from "../hooks/useValidation"
import validateLogIn from "../validation/validateLogIn";

const INIT_STATE = {
    email: "",
    password: ""
};

const LogIn = () => {

    const [error, setError] = useState(false);

    const {values, errors, handleSubmit, handleChange} = useValidations(INIT_STATE, validateLogIn, logIn);
    const {email, password} = values;

    async function logIn() {
        try {
            await firebase.logIn(email, password);
            await Router.back();
        } catch (e) {
            console.log(e);
            setError(e.message);
        }
    }

    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >Log In</h1>
                    <Form
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        {error && <Error>{error}</Error>}
                        <Field>
                            <label htmlFor="name">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email address"
                                autoComplete="username"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Field>
                        {errors.email && <Error>{errors.email}</Error>}
                        <Field>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Your password"
                                autoComplete="current-password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </Field>
                        {errors.password && <Error>{errors.password}</Error>}
                        <InputSubmit
                            type="submit"
                            value="Log In"
                        />
                    </Form>

                </>
            </Layout>
        </div>
    );
}

export default LogIn;
