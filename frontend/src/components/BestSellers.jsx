import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import ProductItems from './ProductItems'

const BestSellers = () => {

    const { products } = useContext(ShopContext)
    const [bestSellers, setBestSellers] = useState([])

    useEffect(() => {
        const bestProducts = products.filter((item) => (item.bestseller))
        setBestSellers(bestProducts.slice(0, 10))
    }, [products])

    return (
        <div className='my-10'>

            <div className='text-center py-8 text-3xl'>
                <Title text1={"TOP "} text2={"PRODUCTS"} />
                <p className='w-3/4 m-auto text-xs sm:text-md lg:text-base text-gray-700 dark:text-gray-200'>Discover our most popular products carefully handpicked to deliver exceptional quality outstanding performance and unmatched customer satisfaction. Each item in this collection has been selected based on real user feedback high demand and rigorous quality standards—ensuring you get only the best of what we offer.</p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSellers.map((item, index) => (
                        <ProductItems key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))
                }
            </div>



        </div>
    )
}
export default BestSellers