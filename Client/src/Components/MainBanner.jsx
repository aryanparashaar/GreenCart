import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
const MainBanner = () => {
    return (
        <div className='relative'>
            <img src={assets.main_banner_bg} alt='banner' className='w-full hidden md:block' />
            <img src={assets.main_banner_bg_sm} alt='banner' className='w-full md:hidden' />
            <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-20 lg:pl-24'>
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-lg md:max-w-xl lg:max-w-2xl leading-tight lg:leading-snug'>
                    Freshness You Can Trust, Savings You Will Love!
                </motion.h1>

                <div className='flex items-center mt-6 font-medium'>
                    {/* Shop Now Button Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }} // slight delay
                    >
                        <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
                            Shop Now
                            <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt='arrow' />
                        </Link>
                    </motion.div>

                    {/* Explore Deals Button Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }} // delay a little more for stagger effect
                        className="ml-4" // small margin between two buttons
                    >
                        <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
                            Explore Deals
                            <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt='arrow' />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default MainBanner
