import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";
import useProducts from "../hooks/useProducts";

const search = () => {

    const [result, setResult] = useState([]);
    const router = useRouter();
    const {query: {q}} = router;

    const {products} = useProducts("createdAt");

    useEffect(() => {
        if (products.length !== 0) {
            const formattedQ = q.toLowerCase();
            const res = products.filter(product => (
                product.name.toLowerCase().includes(formattedQ) ||
                product.company.toLowerCase().includes(formattedQ)
            ));
            setResult(res);
        }
    }, [products, q]);

    return (
        <div>
            <Layout>
                <>
                    <div className="product-list">
                        <div className="container-custom">
                            <h2>Results for "{q}"</h2>

                            <ul className="bg-white">
                                {result.map(product => (
                                    <ProductDetails
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            </Layout>
        </div>
    );
}

export default search;
