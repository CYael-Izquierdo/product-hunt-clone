import React from "react";
import ProductDetails from "../components/layout/ProductDetails";
import Layout from "../components/layout/Layout";
import useProducts from "../hooks/useProducts";

const Populars = () => {

    const {products} = useProducts("votesLength");

    return (
        <div>
            <Layout>
                <div className="product-list">
                    <div className="container-custom">
                        <ul className="bg-white">
                            {products.map(product => (
                                <ProductDetails
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        </div>
    )
};

export default Populars;
