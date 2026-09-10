import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'
import { useDarkMode } from '../ThemeContext/Theme'


const SearchBar = () => {

    const { darkMode } = useDarkMode()

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
    const [visible, setVisible] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])


    return showSearch && visible ? (
        <div className="text-gray-50 p-4 text-center flex items-center justify-center gap-3">
            {/* Search Input & Icon */}
            <div className="inline-flex border border-gray-400 items-center justify-between px-5 py-2 my-2 rounded-full w-full sm:w-2/4 overflow-hidden">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 outline-none bg-inherit text-sm text-gray-800 dark:text-white"
                    placeholder="search..."
                />
                <img
                    src={assets.search_icon}
                    className={`w-4 ${darkMode ? "invert brightness-200" : ""}`}
                    alt="search icon"
                />
            </div>

            <img
                className={`h-4 cursor-pointer self-center ${darkMode ? "invert brightness-200" : ""}`}
                onClick={() => setShowSearch(false)}
                src={assets.cross_icon}
                alt="Close"
            />
        </div>
    ) : null
}

export default SearchBar