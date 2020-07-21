import React, {useEffect, useContext, useState} from "react";
import {useRouter} from "next/router";
import styled, {css} from "styled-components";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import Layout from "../../components/layout/Layout";
import {FirebaseContext} from "../../firebase";
import Error404 from "../../components/layout/404";
import Spinner from "../../components/layout/Spinner";
import {Field, InputSubmit} from "../../components/ui/Form";
import Button from "../../components/ui/Button";

const ProductContainer = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
    
`;

const ProductCreator = styled.span`
    padding: .5px 1rem;
    background-color: var(--orange);
    color: #FFFFFF;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
    margin: 0;
`;

const Product = () => {

    // Product state
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [comment, setComment] = useState({});
    const [requestDB, setRequestDB] = useState(true);

    // Routing to get
    const router = useRouter();
    const {query: {id}} = router;

    // Firebase context
    const {firebase, user} = useContext(FirebaseContext);

    const {comments, createdAt, company, imageURL, votes, url, name, description, createdBy, votesLength} = product;

    useEffect(() => {
        if (id && requestDB) {
            const getProducts = async () => {
                const productQuery = await firebase.db
                    .collection("products")
                    .doc(id);

                const product = await productQuery.get();

                if (product.exists) {
                    setProduct(product.data());
                } else {
                    setError(true);
                }
                setRequestDB(false);
            };
            getProducts().then();
        }
    }, [id, requestDB]);

    const handleVoteClick = () => {
        // If user is not logged, redirect to login
        if (!user) {
            router.push("/login").then();
        }

        // Verify user has not voted
        if (votes.includes(user.uid)) return;

        // Update DB
        firebase.db.collection("products").doc(id)
            .update({
                votes: firebase.firestore.FieldValue.arrayUnion(user.uid),
                votesLength: votesLength + 1
            }).then();

        setRequestDB(true);
    }

    // Function to add comment
    const handleChange = e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!user) {
            router.push("/login").then();
        }

        if (!comment.message) return;

        comment.userId = user.uid;
        comment.userName = user.displayName;

        // add comment to firebase
        const asd = firebase.db.collection("products").doc(id).update({comments: firebase.firestore.FieldValue.arrayUnion(comment)}).then();

        setComment({});
        setRequestDB(true);
    }

    // identify if the comment was made by user
    const isCreator = id => {
        return createdBy.id === id;
    };

    // Identify if the user is the post creator
    const isProductCreator = () => {
        if (!user) return false;
        return createdBy.id === user.uid;
    }

    // Delete product
    const handleDelete = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        if (createdBy.id !== user.uid) {
            router.push("/");
            return
        }

        try {
            await firebase.db.collection("products").doc(id).delete();
            router.push("/");
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div>
            <Layout>
                <>
                    {error && <Error404
                        message="Product not found"
                        code="404"
                    />}
                    {Object.keys(product).length === 0 ? <Spinner/> :
                        <div className="container-custom">
                            <h1
                                css={css`
                                        margin-top: 0;
                                    `}>{product.name}</h1>
                            <ProductContainer>
                                <div>
                                    <p
                                        css={css`margin: 0 0 1rem`}
                                    >Published {formatDistanceToNow(new Date(createdAt))} ago by {createdBy.name}</p>

                                    <img src={imageURL} alt=""/>
                                    <p>{description}</p>

                                    {user &&
                                    <>
                                        <h2>Comment</h2>
                                        <form
                                            onSubmit={handleSubmit}
                                        >
                                            <Field>
                                                <input
                                                    type="text"
                                                    name="message"
                                                    onChange={handleChange}
                                                />
                                            </Field>
                                            <InputSubmit
                                                type="submit"
                                                value="Add Comment"
                                            />
                                        </form>
                                    </>
                                    }
                                    <h2
                                        css={css`
                                            margin: 2rem 0;
                                        `}
                                    >Comments</h2>
                                    {comments.length === 0 ?
                                        <p>There is no comments</p>
                                        :
                                        <ul>
                                            {
                                                comments.map((comment, index) => (
                                                    <li
                                                        key={index}
                                                        css={css`
                                                            border: 1px solid var(--grey3);
                                                            padding: 2rem;
                                                        `}
                                                    >
                                                        <p>{comment.message}</p>
                                                        <p>Written by
                                                            <span
                                                                css={css`
                                                                font-weight: bold;
                                                            `}
                                                            > {comment.userName} </span>
                                                            {isCreator(comment.userId) &&
                                                            <ProductCreator>Creator</ProductCreator>}
                                                        </p>

                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    }

                                </div>
                                <aside>
                                    <h2>{company}</h2>
                                    <Button
                                        target="_blank"
                                        bgColor="true"
                                        href={url}
                                    >Visit URL</Button>
                                    <div
                                        css={`
                                            margin-top: 5rem;
                                        `}
                                    >
                                        {user &&
                                        <Button
                                            onClick={handleVoteClick}
                                        >Vote</Button>
                                        }

                                        <p
                                            css={css`text-align: center`}
                                        >{votesLength} votes</p>
                                    </div>
                                </aside>
                            </ProductContainer>
                            {isProductCreator() &&
                            <Button
                                onClick={handleDelete}
                            >Delete Product</Button>
                            }
                        </div>
                    }
                </>
            </Layout>
        </div>
    );
}

export default Product;
