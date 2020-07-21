import React from "react";
import styled from "styled-components";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Link from "next/link";

const Image = styled.img`
    width: 200px
`;

const Product = styled.li`
    padding: 2rem 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--grey3);
`;

const ProductDescription = styled.div`
    flex: 0 1 1200px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
    margin-right: 2rem;
`;

const Title = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    
    &:hover {
        cursor: pointer;
    }
`;

const DescriptionText = styled.p`
    font-size: 1.6rem;
    margin: 0;
    color: #888;
`;

const Votes = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid var(--grey3);
    padding: 1rem 3rem;
    
    div {
        font-size: 2rem;
    }
    
    p {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`;

const Comments = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    
    div {
        display: flex;
        align-items: center;
        border: 1px solid var(--grey3);
        padding: .3rem 1rem;
        margin-right: 2rem;
    }
    img {
        width: 2rem;
        margin-right: 2rem;
    }
    p {
        font-size: 1.6rem;
        margin-right: 1rem;
        font-weight: 700;
        &:last-of-type {
            margin: 0;
        }
    }
`;

const ProductDetails = ({product}) => {

    const {id, comments, createdAt, company, imageURL, votes, url, name, description, votesLength} = product;

    return (
        <Product>
            <ProductDescription>
                <div>
                    <Image src={imageURL} alt={name}/>
                </div>
                <div>
                    <Link href="/products/[id]" as={`/products/${id}`}>
                        <Title>{name}</Title>
                    </Link>
                    <DescriptionText>{description}</DescriptionText>

                    <Comments>
                        <div>
                            <img src="/static/img/comment.png" alt="comments"/>
                            <p>{comments.length} Comments</p>
                        </div>
                    </Comments>

                    <p>Published {formatDistanceToNow(new Date(createdAt))} ago</p>
                </div>
            </ProductDescription>
            <Votes>
                <div>&#9650;</div>
                <p>{votesLength}</p>
            </Votes>
        </Product>
    );
}

export default ProductDetails;
