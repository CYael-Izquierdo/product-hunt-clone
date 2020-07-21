import React, {useState} from "react";
import styled, {css} from "styled-components";
import Router from "next/router";

const InputText = styled.input`
      border: 1px solid var(--grey3);
      padding: 1rem;
      min-width: 300px;
`;

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url("/static/img/search.png");
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: transparent;
    border: none;
    
    &:hover {
        cursor: pointer;
    }
`;

const Find = () => {

    const [search, setSearch] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        if(search.trim() === "") return;

        // redirect /search
        Router.push({
            pathname: "/search",
            query: {
                q: search
            }
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            css={css`
                position: relative;
            `}
        >
            <InputText
                type="text"
                placeholder="Search Products"
                onChange={e => setSearch(e.target.value)}
            />
            <InputSubmit type="submit"/>
        </form>
    );
}

export default Find;
