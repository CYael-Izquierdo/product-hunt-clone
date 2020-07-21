import firebase from "../firebase";
import FirebaseContext from "../firebase/context";
import React from "react";
import useAuthentication from "../hooks/useAuthentication";

const MyApp = props => {

    const {Component, pageProps} = props;
    const user = useAuthentication();

    return (
        <FirebaseContext.Provider
            value={{
                firebase,
                user
            }}
        >
            <Component {...pageProps}/>
        </FirebaseContext.Provider>
    );
}

export default MyApp;