import React, { useState } from 'react';
import Title from './Title';
import ClipLoader from "react-spinners/ClipLoader";

const FeedBack = () => {

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState("");

    const OnSubmitHandler = async (e) => {
        e.preventDefault();

        setLoading(true)

        const formData = new FormData()
        formData.append("access_key", "d2121a9b-bdce-4acf-aa25-9e0ca0ccd42a")
        formData.append("name", name)
        formData.append("email", email)
        formData.append("message", message)

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })

            if (response.ok) {
                setSuccess("Thank you for your feedback! Your message has been sent successfully. 🎉")
                setName("")
                setEmail("")
                setMessage("")
            } else {
                setSuccess("Oops! Something went wrong. Please try again. ❌")
            }
        } catch (error) {
            setSuccess("Failed to send your message. Please try again.")
        } finally {
            setLoading(false)
        }

        setTimeout(() => setSuccess(""), 3000)
    }

    return (
        <div className="text-center mx-auto mt-10 w-full h-auto px-4 py-10 bg-gray-100 dark:bg-gray-800 ">
            <Title text1={"Feed"} text2={"Back"} />
            <p className='text-gray-700 font-medium text-sm dark:text-white'>Your feedback is valuable to us! Let us know your thoughts, suggestions, or any issues you faced. We appreciate your time!</p>
            <form
                onSubmit={OnSubmitHandler}
                className="max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md p-6 sm:p-8 mt-4 dark:bg-gray-900 dark:text-white"
            >
                <input type="hidden" name="access_key" value="d2121a9b-bdce-4acf-aa25-9e0ca0ccd42a"
                />

                <div className="flex flex-col sm:flex-row mt-4 mb-3 gap-4">

                    <input required
                        name="name"
                        type="text"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 p-4 border border-gray-300 outline-none rounded-md bg-white focus:ring-2 focus:ring-gray-400 dark:bg-gray-900 dark:text-white text-gray-800" />

                    <input required
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 p-4 border border-gray-300 outline-none rounded-md bg-white focus:ring-2 focus:ring-gray-400 dark:bg-gray-900 dark:text-white text-gray-800" />

                </div>

                <textarea required
                    name="message"
                    rows="3"
                    placeholder="Enter Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-4 border border-gray-300 outline-none rounded-md bg-white focus:ring-2 focus:ring-gray-400 dark:bg-gray-900  dark:text-white text-gray-800"></textarea>


                {loading ? (
                     <div className="flex items-center justify-center gap-2 w-full bg-gray-400 text-white py-4 rounded-full mt-5">
                     <ClipLoader color="#000" loading={loading} size={25} speedMultiplier={1.5} />
                     <span className="text-black text-sm font-medium">Submitting...</span>
                 </div>
                ) : (<button type="submit"
                    className="w-full sm:w-max px-8 py-3 my-5 flex items-center justify-center sm:justify-between gap-2 bg-black rounded-full mx-auto hover:bg-gray-800 duration-500 dark:bg-gray-900 text-white">
                    Submit now
                </button>)}

            </form>
            {success && <p className="mt-4 text-green-600">{alert(success)}</p>}
        </div>
    );
};

export default FeedBack;
