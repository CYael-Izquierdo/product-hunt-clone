import React from "react";
import {css} from "styled-components";
import {ClipLoader} from "react-spinners";

const Spinner = () => {
    return (
        <div
            css={css`
                text-align: center;
                margin-top: 5rem;
            `}
        >
            <ClipLoader
                color="#DA552F"
                size="100px"
            />
        </div>
    );
}

export default Spinner;
