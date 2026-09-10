import React, { useState } from 'react'

const NewsLatterBox = () => {
    const [formData, setFormData] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (formData.trim() === "") {
            alert("Please enter a valid email address.");
            return;
        }

        alert(`Welcome! You have successfully subscribed with ${formData}`);
        setFormData("");
    };

    return (
        <div className='text-center '>
            <p className='text-2xl font-medium text-gray-900 dark:text-white'>Subscribe Now get 20% off</p>
            <p className='text-gray-600 mt-3 dark:text-gray-300'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est, recusandae?</p>

            <form onSubmit={submitHandler} className='w-full sm:w-1/2 flex gap-4 mx-auto my-5 border pl-3 items-center'>
                <input 
                    className='w-full py-5 sm:flex-1 outline-none' 
                    value={formData} 
                    onChange={(e) => setFormData(e.target.value)} 
                    type="email" 
                    placeholder='Enter Email' 
                    required 
                />
                <button type='submit' className='bg-gray-900 text-white px-5 py-5 cursor-pointer'>SUBSCRIBE</button>
            </form>
        </div>
    );
}

export default NewsLatterBox;
