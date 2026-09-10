import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLatterBox from '../components/NewsLatterBox'
const About = () => {

  const [visible, setVisible] = useState(true);
  const [tapCount, setTapCount] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleTap = () => {
    // Increment tap count
    setTapCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount === 3) {
        // If 3 taps, open the admin panel
        window.open('http://localhost:5174/', '_blank');
      }
      return newCount;
    });

    // Reset tap count after 1 second
    setTimeout(() => setTapCount(0), 1000);
  };

  // Handling drag functionality
  const handleMouseDown = (e) => {
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div>

      {/* Secret Click Area */}
      <div
        onClick={handleTap}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          position: 'fixed',
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: '40px',
          height: '40px',
          // backgroundColor: visible ? 'red' : 'transparent',
          opacity: visible ? 0.5 : 0,
          cursor: 'pointer',
          zIndex: 9999,
          // border: visible ? '2px dashed white' : 'none'
        }}
      ></div>


      <div className='text-2xl text-center pt-4 mt-5'>
        <Title text1={"ABOUT "} text2={"US"} />
      </div>

      <div className='flex flex-col md:flex-row my-10 gap-6 dark:text-white'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center md:w-1/2 gap-6 text-gray-500 dark:text-white'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati quis at eum saepe consequatur quas architecto, maxime officia cumque aliquid deserunt quaerat soluta ratione quod sapiente omnis cum porro dolorum.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea omnis praesentium itaque earum eligendi porro dolore, debitis odio explicabo architecto maiores, quo eaque quaerat natus. Ad voluptatibus voluptates eum aliquam.</p>

          <b className='text-gray-800'>OUR MISSION</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa omnis harum dolore. Temporibus ut culpa, saepe, corporis ad sit doloribus ea delectus, quam quis tempore nostrum. Labore vitae quasi asperiores.</p>
        </div>
      </div>

      <div className='mt-10 text-2xl mb-10'>
        <Title text1={"OUR "} text2={"QUALITY"} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 dark:text-white gap-1'>
        <div className='border px-10 md:px-10 py-8 md:py-16 flex flex-col gap-5 dark:text-white hover:bg-rose-500 hover:text-white transition-all duration-500 ease-out'>
          <b>OUR QUALITY:</b>
          <p className='text-gray-600 dark:text-white hover:text-white'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consequuntur, tempore hic soluta aperiam numquam accusamus dignissimos provident corporis doloremque?</p>
        </div>

        <div className='border px-10 md:px-10 py-8 md:py-16 flex flex-col gap-5 hover:bg-rose-500 hover:text-white transition-all duration-500 ease-out'>
          <b>OUR QUALITY:</b>
          <p className='text-gray-600 dark:text-white hover:text-white'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consequuntur, tempore hic soluta aperiam numquam accusamus dignissimos provident corporis doloremque?</p>
        </div>

        <div className='border px-10 md:px-10 py-8 md:py-16 flex flex-col gap-5 hover:bg-rose-500 hover:text-white transition-all duration-500 ease-out'>
          <b>OUR QUALITY:</b>
          <p className='text-gray-600 dark:text-white hover:text-white'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consequuntur, tempore hic soluta aperiam numquam accusamus dignissimos provident corporis doloremque?</p>
        </div>
      </div>

      <NewsLatterBox />
    </div>
  )
}

export default About