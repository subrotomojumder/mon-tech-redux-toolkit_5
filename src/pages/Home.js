import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../app/features/cart/cartSlice';
import { stockToggle, toggleBrand } from '../app/features/filter/filterSlice';
import { getProducts } from '../app/features/products/productSlice';
import Product from './Components/Product';

const Home = () => {
    const activeClass = "btn-primary";
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    const { isLoading, isError, error, products } = useSelector((state) => state.products)
    const { stock, brands } = useSelector((state) => state.filter);
    // console.log(products)

    let content;
    if (isLoading) {
        return content = <h3 className='text-xl my-6'>Loading...</h3>;
    }
    if (isLoading || isError) {
        return content = <h3>{error}</h3>;
    }

    if (products.length) {
        content = products.map(product => <Product product={product} key={product.idMeal}>
            <div className='flex justify-between items-center mb-4'>
                <button
                    onClick={() => dispatch(addToCart(product))}
                    className='btn btn-primary rounded-full w-full ml-2'
                >Add To Cart</button>
            </div>
        </Product>)
    }
    if (products.length && (stock || brands.length)) {
        content = products
            .filter((product) => {
                if (stock) {
                    return product.strTags === null;
                }
                return product;
            })
            .filter((product) => {
                if (brands.length) {
                    return brands.includes(product.strArea)
                }
                return product;
            })
            .map(product => <Product product={product} key={product.idMeal}>
                <div className='flex justify-between items-center mb-4'>
                    <button
                        onClick={() => dispatch(addToCart(product))}
                        className='btn btn-primary rounded-full w-full ml-2'
                    >Add To Cart</button>
                </div>
            </Product>)
    }
    return (
        <div className=' mx-auto mb-10 mt-2'>
            <div className='my-4 flex justify-between items-center'>
                <h4 className='text-2xl text-left'> Home page</h4>
                <div>
                    <button
                        onClick={() => dispatch(stockToggle())}
                        className={`btn btn-sm ml-1 ${stock ? activeClass : "btn-outline"}`}
                    >In stock</button>
                    <button onClick={() => dispatch(toggleBrand("Canadian"))} className={`btn btn-sm ml-1 ${brands.includes("Canadian") ? activeClass : "btn-outline"}`}>Canadian</button>
                    <button onClick={() => dispatch(toggleBrand("Italian"))} className={`btn btn-sm ml-1 ${brands.includes("Italian") ? activeClass : "btn-outline"}`}>Italian</button>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 max-w-7xl gap-14'>
                {content}
            </div>
        </div>
    );
};

export default Home;