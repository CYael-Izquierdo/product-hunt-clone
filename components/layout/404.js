import React from "react";
import {css} from "styled-components";

const Error404 = ({message, code}) => {
    return (
        <div
            css={css`
                text-align: center;
                color: var(--grey2);
            `}
        >
            <h1
                css={css`
                margin-top: 5rem;
            `}
            >{message}</h1>
            {code &&
            <h1
                css={css`
                    font-size: 15rem;
                    margin: 0;
                `}
            >
                {code}
            </h1>
            }
        </div>
    );
}

export default Error404;
