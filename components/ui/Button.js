import styled from "styled-components";

const Button = styled.a`
    display: block;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #D1D1D1;
    padding: .8rem 2rem;
    margin: 1rem auto;
    background-color: ${props => props.bgColor ? "var(--orange)" : "white"};
    color: ${props => props.bgColor ? "white" : "#000"};
    
    &:last-of-type {
        margin-right: 0;
    }
    
    &:hover {
      cursor: pointer;
    }
`;

export default Button;
