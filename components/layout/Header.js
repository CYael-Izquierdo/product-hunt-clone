import React, {useContext} from "react";
import Link from "next/link";
import styled from "styled-components";

import Find from "../ui/Find";
import Nav from "./Nav";
import Button from "../ui/Button";
import {css} from "next";
import FirebaseContext from "../../firebase/context";

const HeaderContainer = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--orange);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: "Roboto Slab", serif;
    margin-right: 2rem;
    
    &:hover {
        cursor: pointer;
    }
`;

const Header = () => {

    const {user, firebase} = useContext(FirebaseContext);

    return (
        <header
            css={`
                border-bottom: 2px solid var(--grey3);
                padding: 1rem 0;
            `}
        >
            <HeaderContainer>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>
                    <Find/>
                    <Nav/>
                </div>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    {user ?
                        <>
                            <p
                                css={css`margin-right: 2rem;`}
                            >Hi: {user.displayName && user.displayName.split(" ")[0]}</p>
                            <Button
                                bgColor={true}
                                onClick={() => firebase.signOut()}
                            >Sign Out</Button>
                        </>
                        :
                        <>
                            <Link href="/login">
                                <Button
                                    css={css`margin-right: 1rem`}
                                    bgColor={true}
                                >Log In</Button>
                            </Link>
                            <Link href="/sign-in">
                                <Button>Sign In</Button>
                            </Link>
                        </>
                    }
                </div>
            </HeaderContainer>
        </header>
    );
}

export default Header;
