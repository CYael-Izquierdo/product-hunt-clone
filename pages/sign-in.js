import React, {useState} from "react";
import {css} from "styled-components";
import Router from "next/router"

import Layout from "../components/layout/Layout";
import {Error, Field, Form, InputSubmit} from "../components/ui/Form";
import firebase from "../firebase";

// Validations
import useValidations from "../hooks/useValidation"
import validateSignIn from "../validation/validateSignIn";

const INIT_STATE = {
    name: "",
    email: "",
    password: ""
};

const SignIn = () => {

    const [error, setError] = useState(false);

    const {values, errors, handleSubmit, handleChange} = useValidations(INIT_STATE, validateSignIn, signIn);
    const {name, email, password} = values;

     async function signIn() {
         try {
             await firebase.signIn(name, email, password);
             await Router.push("/");
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
                    >Sign In</h1>
                    <Form
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        {error && <Error>{error}</Error>}
                        <Field>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your name"
                                autoComplete="username"
                                name="name"
                                value={name}
                                onChange={handleChange}
                            />
                        </Field>
                        {errors.name && <Error>{errors.name}</Error>}
                        <Field>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email address"
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
                            value="Sign In"
                        />
                    </Form>

                </>
            </Layout>
        </div>
    );
};

export default SignIn;
