import React, {useContext, useState} from "react";
import {css} from "styled-components";
import Router, {useRouter} from "next/router"

import Layout from "../components/layout/Layout";
import {Error, Field, Form, InputSubmit} from "../components/ui/Form";
import firebase, {FirebaseContext} from "../firebase";

// Validations
import useValidations from "../hooks/useValidation"
import validateNewProduct from "../validation/validateNewProduct";
import FileUploader from "react-firebase-file-uploader";
import Error404 from "../components/layout/404";

const INIT_STATE = {
    name: "",
    company: "",
    // image: "",
    url: "",
    description: ""
};

const NewProduct = () => {

    // Image uploader state
    const [imageName, setImageName] = useState("");
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imageURL, setImageURL] = useState("");

    const [error, setError] = useState(false);
    const {user, firebase} = useContext(FirebaseContext);

    // Routing hook, to redirect
    const router = useRouter();

    const {values, errors, handleSubmit, handleChange} = useValidations(INIT_STATE, validateNewProduct, createProduct);
    const {name, company, image, url, description} = values;

    async function createProduct() {
        // If user is not log in, redirect to login page
        if (!user) {
            return router.push("/login")
        }

        // Create products object
        const product = {
            name,
            company,
            url,
            imageURL,
            description,
            votes: [],
            votesLength: 0,
            comments: [],
            createdAt: Date.now(),
            createdBy: {
                id: user.uid,
                name: user.displayName
            }
        };

        // Insert on database
        await firebase.db.collection("products").add(product);

        return router.push("/");
    }

    const handleUploadStart = () => {
        console.info("handleUploadStart");
        setUploading(true);
        setProgress(0);
    };

    const handleProgress = progress => {
        console.info("handleProgress");
        setProgress(progress);
    };

    const handleUploadError = error => {
        console.info("handleUploadError");
        setUploading(false);
        console.log(error);
    };

    const handleUploadSuccess = async name => {
        console.info("handleUploadSuccess");
        await firebase
            .storage
            .ref("products")
            .child(name)
            .getDownloadURL()
            .then(url => {
                setImageURL(url)
            });
        setImageName(name);
        setProgress(100);
        setUploading(false);
    };

    return (
        <div>
            <Layout>
                {!user ?
                    <Error404
                        message="You must be logged in to publish a new product"
                    />
                    :
                    <>
                        <h1
                            css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                        >New Id</h1>
                        <Form
                            onSubmit={handleSubmit}
                            noValidate
                        >

                            <fieldset>
                                <legend>General information</legend>

                                <Field>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Id name"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </Field>
                                {errors.name && <Error>{errors.name}</Error>}

                                <Field>
                                    <label htmlFor="company">Company</label>
                                    <input
                                        type="text"
                                        id="company"
                                        placeholder="Company name"
                                        name="company"
                                        value={company}
                                        onChange={handleChange}
                                    />
                                </Field>
                                {errors.company && <Error>{errors.company}</Error>}

                                <Field>
                                    <label htmlFor="image">Image</label>
                                    <FileUploader
                                        accept="image/*"
                                        id="image"
                                        name="image"
                                        randomizeFilename
                                        storageRef={firebase.storage.ref("products")}
                                        onUploadStart={handleUploadStart}
                                        onUploadError={handleUploadError}
                                        onUploadSuccess={handleUploadSuccess}
                                        onProgress={handleProgress}
                                    />
                                </Field>

                                <Field>
                                    <label htmlFor="url">URL</label>
                                    <input
                                        type="url"
                                        id="url"
                                        name="url"
                                        placeholder="Id URL"
                                        value={url}
                                        onChange={handleChange}
                                    />
                                </Field>
                                {errors.url && <Error>{errors.url}</Error>}
                            </fieldset>

                            <fieldset>
                                <legend>About your product</legend>

                                <Field>
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={description}
                                        onChange={handleChange}
                                    />
                                </Field>
                                {errors.description && <Error>{errors.description}</Error>}
                            </fieldset>

                            {error && <Error>{error}</Error>}

                            <InputSubmit
                                type="submit"
                                value="Create Product"
                            />
                        </Form>

                    </>
                }
            </Layout>
        </div>
    );
}

export default NewProduct;
