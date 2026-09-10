import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItems = ({id,name,image,price}) => {

    const { CurrencySymbole } = useContext(ShopContext)

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
            <div className='overflow-hidden dark:bg-gray-900 dark:text-white mt-2'>
                <img className='w-full h-64 object-cover hover:scale-110 transition duration-300 ease-in-out' src={image[0]} alt="" />
                <p className='pt-3 pb-1 text-sm sm:text-lg font-bold'>{name}</p>
                <p className='text-sm sm:text-lg font-medium'>{`${CurrencySymbole} :`}{price}</p>
            </div>
        </Link>
    )
}

export default ProductItems