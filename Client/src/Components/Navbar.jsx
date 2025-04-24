import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom' // For navigation between pages
import { assets } from '../assets/assets' // Importing assets (images/icons)
import { useAppContext } from '../Context/AppContext' // Custom context for global state

const Navbar = () => {
    const [open, setOpen] = React.useState(false) // State to manage mobile menu open/close
    const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount } = useAppContext(); // Context values

    // Logout function
    const logout = async () => {
        setUser(null); // Clear user from context (logout)
        navigate('/') // Redirect to home page
    }
    useEffect(() => {
        if (searchQuery.length > 0) { navigate("/products") }
    }, [searchQuery])

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white sticky top-0 z-50 transition-all">

            {/* Logo */}
            <NavLink to='/' onClick={() => setOpen(false)}>
                <img className="h-9" src={assets.logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu (visible on sm and larger screens) */}
            <div className="hidden sm:flex items-center gap-8">

                {/* Navigation Links */}
                <NavLink to='/' className="hover:text-primary transition-colors">Home</NavLink>
                <NavLink to='/products' className="hover:text-primary transition-colors">All Product</NavLink>
                <NavLink to='/#contact' className="hover:text-primary transition-colors">Contact</NavLink>

                {/* Search Bar (visible on large screens) */}
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt='search' className='w-4 h-4' />
                </div>

                {/* Cart Icon */}
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
                    {/* Hardcoded Cart Item Count */}
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                {/* If user is not logged in, show Login button */}
                {!user ? (
                    <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                        Login
                    </button>
                ) : (
                    // If user is logged in, show profile icon with dropdown
                    <div className='relative group'>
                        <img src={assets.profile_icon} className='w-10' alt='profile' />
                        {/* Dropdown Menu for Logged-in User */}
                        <ul className='hidden group-hover:flex flex-col absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-40 transition-all duration-300 opacity-0 group-hover:opacity-100'>
                            <li onClick={() => navigate("my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                            <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Hamburger Button (visible on mobile) */}
            <div className='flex items-center gap-6 sm:hidden'>
            <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
                    {/* Hardcoded Cart Item Count */}
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
                    <img src={assets.menu_icon} alt='menu' />
                </button>
            </div>
           

            {/* Mobile Menu (visible when 'open' is true) */}
            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>

                    {/* Navigation Links (Mobile) */}
                    <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">All Product</NavLink>

                    {/* If user is logged in, show My Orders in Mobile Menu */}
                    {user && (
                        <NavLink to="/products" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">My Orders</NavLink>
                    )}

                    <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">Contact</NavLink>

                    {/* Login or Logout Button (Mobile) */}
                    {!user ? (
                        <button onClick={() => { setOpen(false); setShowUserLogin(true) }} className="cursor-pointer px-6 py-2 mt-2 mb-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Login
                        </button>
                    ) : (
                        <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 mb-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Logout
                        </button>
                    )}
                </div>
            )}

        </nav>
    )
}

export default Navbar 
