import React from "react";
import {css, createGlobalStyle} from "styled-components"
import Head from "next/head";

import Header from "./Header";

const Global = createGlobalStyle`
    :root {
        --grey: #3d3d3d;
        --grey2: #6F6F6F;
        --grey3: #E1E1E1;
        --orange: #DA552F;
        --red: #da2f2f;
    }
    
    html {
        font-size: 62.5%;
        box-sizing: border-box;
    }
    
    *, *:before, *:after {
        box-sizing: inherit;
    } 
    
    body {
        font-size: 1.6rem;
        line-height: 1.5;
        font-family: "PT Sans", sans-serif;
    }
    
    h1, h2, h3 {
        margin: 0 0 2rem 0;
        line-height: 1.5;
    }
    
    h1, h2 {
      font-family: "Roboto Slab", serif;
      font-weight: 700;
    }
    
    h3 {
      font-family: "PT Sans", sans-serif;
    }
    
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    a {
        text-decoration: none;
    }
    
    img {
        max-width: 100%;
    }
`;

const Layout = props => {
    return (
        <>
            <Global/>

            <Head>
                <title>Product Hunt - Firebase and Next.js</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
                      integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
                      crossOrigin="anonymous"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap"
                    rel="stylesheet"/>
                <link rel="stylesheet" href="/static/css/app.css"/>
            </Head>
            <Header/>

            <main>
                {props.children}
            </main>
        </>
    );
}

export default Layout;
