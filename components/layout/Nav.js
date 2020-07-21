import React, {useContext} from "react";
import Link from "next/link";
import styled from "styled-components";
import {FirebaseContext} from "../../firebase";

const NavContainer = styled.nav`
    padding-left: 2rem;
  
    a {
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--grey2);
        font-family: "PT Sans", sans-serif;
        
        &:last-of-type {
            margin-right: 0;
        }
    }
`;

const Nav = () => {

    const {user} = useContext(FirebaseContext);

    return (
        <NavContainer>
            <Link href="/"><a>Home</a></Link>
            <Link href="/populars"><a>Populars</a></Link>
            {user && <Link href="/new-product"><a>New product</a></Link>}
        </NavContainer>
    );
}

export default Nav;
