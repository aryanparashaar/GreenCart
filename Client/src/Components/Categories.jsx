import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'
import { motion } from 'framer-motion'

const Categories = () => {
    const { navigate } = useAppContext()
    return (
        <div className='mt-16'>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-2xl md:text-3xl font-medium"
            >
                Categories
            </motion.p>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>

                {categories.map((category, index) => (



                    <motion.div
                        key={index}
                        className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center'
                        style={{ backgroundColor: category.bgColor }}
                        onClick={() => {
                            navigate(`/products/${category.path.toLowerCase()}`);
                            scrollTo(0, 0)
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                    >
                        <img src={category.image} alt={category.text} className='group-hover:scale-108 transition max-w-28' />
                        <p className='text-sm font-medium'>{category.text}</p>
                    </motion.div>

                ))}
            </div>
        </div>
    )
}

export default Categories
