import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItems from '../components/ProductItems'
import { toast } from 'react-toastify'


const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)
  const [ShowFilter, setShowFilter] = useState(false)
  const [filterProduct, setFilterProducts] = useState([])
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [sortType, setSortType] = useState("relevent")


  // custom pagination 
  const [currentPage, setCurrentPage] = useState(1)
  const recoredPerPage = 20
  const lastIndex = currentPage * recoredPerPage
  const firstindex = lastIndex - recoredPerPage
  const records = filterProduct.slice(firstindex, lastIndex)
  const npage = Math.ceil(filterProduct.length / recoredPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  const prevPage = () => {
    if (currentPage !== firstindex) {
      setCurrentPage(currentPage - 1)
    }
  }
  const NextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1)
    }
  }
  const ChangeCurrentPage = (_id) => {
    setCurrentPage(_id)
  }



  // filter category products 
  const toggleProduct = (e) => {
    if (category.includes(e.target.value)) {
      setcategory(prev => prev.filter(item => item !== e.target.value))
      console.log(e.target.value)
    } else {
      setcategory(prev => [...prev, e.target.value])
    }
  }

  // filter subCategory products
  // const toggleSubCategory = (e) => {
  //   if (subcategory.includes(e.target.value)) {
  //     setsubcategory(prev => prev.filter(item => item !== e.target.value))
  //   } else {
  //     setsubcategory(prev => [...prev, e.target.value])
  //   }
  // }


  //apply filter on products
  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category.toUpperCase()));
    }

    // if (subcategory.length > 0) {
    //   productCopy = productCopy.filter(item => subcategory.includes(item.subCategory));
    // }

    setFilterProducts(productCopy);
  };


  // sort products by price 
  const sortProduct = () => {
    let pCopy = filterProduct.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProducts(pCopy.sort((a, b) => a.price - b.price))
        break;
      case 'high-low':
        setFilterProducts(pCopy.sort((a, b) => b.price - a.price))
        break;
      default:
        applyFilter()
        break;
    }
  }

  const categories = ["MEN", "WOMEN", "KIDS", "FASHION", "ELECTRONICS", "SHOES", "WATCHES", "BAGS"];




  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct()
  }, [sortType])

  // useEffect(() => {
  //   setFilterProducts(products)
  // }, [])





  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t transition-all duration-300 overflow-hidden'>

      {/* filter section */}
      <div className='min-w-60 h-[50%] bg-gray-200  p-5 transition-all duration-300 overflow-hidden dark:bg-gray-900 text-white'>
        <p className='sm:hidden text-gray-800 dark:text-white'>Note: click on filter</p>
        <div onClick={() => setShowFilter(!ShowFilter)} className='my-2 text-2xl flex items-center cursor-pointer gap-2'>

          <Title text1={"FILTER"} />
          <img className={`w-4 h-4 items-center justify-center  sm:hidden transition-transform duration-400 ${ShowFilter ? " rotate-90" : ""}`} src={assets.dropdown_icon} alt="" />
        </div>

        {/* Category filter */}
        <div className={`border border-gray-700 mt-6 py-3 pl-5 transition-transform duration-500 overflow-hidden  ${ShowFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium text-gray-700 dark:text-white'>ALL CATERGORY</p>
          <div className='flex flex-col font-medium text-gray-500 text-sm gap-4'>
            {categories.map((cat, idx) => (
              <p className='flex gap-2' key={idx}>
                <input className='w-3' value={cat} type="checkbox" onChange={toggleProduct} />{cat}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right side  */}
      <div className='flex-1 p-3 dark:bg-gray-900 dark:text-white'>
        <div className='flex justify-between sm:text-2x text-base mb-4 items-center'>
          {/* <Title text1={"All"} text2={"Collections"} /> */}
          <p className='text-gray-600 text-sm sm:text-2xl font-bold dark:text-white  '>ALL COLLECTIONS</p>
          {/* product sorting  */}
          <select onChange={(e) => setSortType(e.target.value)} name="" id="" className='border-2 border-gray-400 px-1 py-1 text-sm dark:bg-gray-900 dark:text-white'>
            <option value="product sort" disabled>"product sort filter"</option>
            <option value="relevent">sort by: RELEVENT</option>
            <option value="low-high">sort by: LOW TO HIGH</option>
            <option value="high-low">sort by: HIGH TO LOW</option>
          </select>
        </div>

        {/* product display start */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y6 mt-10 p-3 sm:p-5'>
          {records.length > 0 ? (
            records.map((item, index) => (
              <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          ) : (
            <div className='w-full flex justify-center text-red-700 text-xl sm:text-2xl font-medium'>
              No products found
            </div>


          )}
        </div>
        {/* product display end */}


        {/* custom pagination numbers start  */}
        <div className='flex items-center justify-center mt-10'>
          <nav className='inline-flex items-center space-x-1 decoration-0 gap-3 '>
            <button
              onClick={prevPage}
              className="px-3 py-2 text-sm font-medium text-white bg-gray-700  hover:bg-gray-600 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {
              (() => {
                const pageLimit = 2;
                const start = Math.max(1, currentPage - Math.floor(pageLimit / 2));
                const end = Math.min(npage, start + pageLimit - 1);
                const visiblePages = numbers.slice(start - 1, end);

                return visiblePages.map((n, i) => (
                  <button
                    key={i}
                    onClick={() => ChangeCurrentPage(n)}
                    className={`px-3 py-2 text-sm font-medium  ${currentPage === n
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                  >
                    {n}
                  </button>
                ));
              })()
            }
            <button
              onClick={NextPage}
              className="px-3 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 disabled:opacity-50 "
              disabled={currentPage === npage}
            >
              Next
            </button>
          </nav>
        </div>
        {/* custom pagination numbers end  */}


      </div>
    </div>
  )
}
export default Collection









// instead of this i use another code the pagination issue will solve
// {
//   (() => {
//     const pageLimit = 5;
//     const start = Math.max(1, currentPage - Math.floor(pageLimit / 2));
//     const end = Math.min(npage, start + pageLimit - 1);
//     const visiblePages = numbers.slice(start - 1, end);

//     return visiblePages.map((n, i) => (
//       <button
//         key={i}
//         onClick={() => ChangeCurrentPage(n)}
//         className={`px-3 py-2 text-sm font-medium  ${currentPage === n
//             ? "bg-blue-600 text-white"
//             : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
//           }`}
//       >
//         {n}
//       </button>
//     ));
//   })()
// }
