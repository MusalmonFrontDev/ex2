import { Outlet, Link } from "react-router-dom";
import SidebarNav from "../components/Sidebarnav/Sidebarnav";
import { Suspense, useState } from "react";


import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

import img1 from ".../../../src/components/img/img1.png";
import img2 from ".../../../src/components/img/img2.png";

const Layout = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [cartCount, setCartCount] = useState(0); 

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`min-h-screen flex flex-col justify-between font-sans text-[#3D3D3D] ${isDarkMode ? "dark bg-gray-900 text-gray-100" : ""}`}>
            
            <header className="w-full max-w-[1200px] mx-auto bg-white dark:bg-gray-900 border-b border-[#46A358]/20 h-[78px] flex items-center justify-between px-4 lg:px-0 transition-colors">
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    <div className="w-[34px] h-[34px] bg-[#46A358] rounded-full flex items-center justify-center text-white font-bold text-xl">
                        🍃
                    </div>
                    <span className="text-[#46A358] font-black text-[20px] tracking-wider uppercase">
                        Greenshop
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-[50px] h-full">
                    <Link to="/home" className="font-bold text-[#3D3D3D] dark:text-gray-100 border-b-4 border-[#46A358] h-full flex items-center pt-1 px-1">
                        Home
                    </Link>
                    <Link to="/shop" className="hover:text-[#46A358] dark:text-gray-300 dark:hover:text-[#46A358] transition-colors h-full flex items-center pt-1 px-1">
                        Shop
                    </Link>
                    <h1  className="hover:text-[#46A358] dark:text-gray-300 dark:hover:text-[#46A358] transition-colors h-full flex items-center pt-1 px-1">
                        Plant Care
                    </h1>
                    <h1  className="hover:text-[#46A358] dark:text-gray-300 dark:hover:text-[#46A358] transition-colors h-full flex items-center pt-1 px-1">
                        Blogs
                    </h1>
                </nav>

                <div className="flex items-center gap-[30px]">
                    <button className="hover:text-[#46A358] transition-colors">
                        <SearchIcon sx={{ fontSize: 26 }} />
                    </button>
                    
                    <Link to="/cart" className="relative hover:text-[#46A358] transition-colors flex items-center">
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 26 }} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-2 bg-[#46A358] text-white text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center font-medium">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button 
                        onClick={toggleTheme} 
                        className="hover:text-[#46A358] transition-colors flex items-center justify-center"
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDarkMode ? <LightModeOutlinedIcon sx={{ fontSize: 24 }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 24 }} />}
                    </button>

                    <Link to="/AuthForm" className="bg-[#46A358] text-white px-[17px] py-[8px] rounded-md flex items-center gap-1 hover:bg-[#3b8a4a] transition-all font-medium text-[14px]">
                        <LoginIcon sx={{ fontSize: 18 }} />
                        Login
                    </Link>
                </div>
            </header>

            <main className="w-full max-w-[1200px] mx-auto flex gap-[50px] items-start justify-center py-10 px-4 lg:px-0 flex-grow">
                <SidebarNav />
                <div className="flex-grow">
                    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
                     <Outlet context={{ isDarkMode }} />
                    </Suspense>
                </div>
            </main>


            <footer className="w-full bg-[#FBFBFB] dark:bg-gray-800 pt-[50px] transition-colors">
                <div className="max-w-[1200px] mx-auto px-4 lg:px-0">
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-[30px] border-b border-[#46A358]/20">
                        <div className="flex flex-col pr-4 border-r border-[#46A358]/10 last:border-0 md:border-r">
                            <div className="w-[60px] h-[60px] bg-[#EAF5ED] dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl mb-4"><img src={img1} alt="" /></div>
                            <h4 className="font-bold text-[17px] mb-2 text-[#3D3D3D] dark:text-gray-100">Garden Care</h4>
                            <p className="text-[14px] text-[#727272] dark:text-gray-300 leading-relaxed">We are an online plant shop offering a wide range of cheap and trendy plants.</p>
                        </div>
                        <div className="flex flex-col pr-4 border-r border-[#46A358]/10 last:border-0 md:border-r">
                            <div className="w-[60px] h-[60px] bg-[#EAF5ED] dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl mb-4"><img src={img1} alt="" /></div>
                            <h4 className="font-bold text-[17px] mb-2 text-[#3D3D3D] dark:text-gray-100">Plant Renovation</h4>
                            <p className="text-[14px] text-[#727272] dark:text-gray-300 leading-relaxed">We are an online plant shop offering a wide range of cheap and trendy plants.</p>
                        </div>

                        <div className="flex flex-col pr-4 border-r border-[#46A358]/10 last:border-0 md:border-none">
                            <div className="w-[60px] h-[60px] bg-[#EAF5ED] dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl mb-4"><img src={img2} alt="" /></div>
                            <h4 className="font-bold text-[17px] mb-2 text-[#3D3D3D] dark:text-gray-100">Watering Graden</h4>
                            <p className="text-[14px] text-[#727272] dark:text-gray-300 leading-relaxed">We are an online plant shop offering a wide range of cheap and trendy plants.</p>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="font-bold text-[18px] mb-4 text-[#3D3D3D] dark:text-gray-100">Would you like to join newsletters?</h4>
                            <div className="flex w-full mb-[15px] shadow-sm">
                                <input 
                                    type="email" 
                                    placeholder="enter your email address..." 
                                    className="flex-grow px-4 py-3 rounded-l-md text-[14px] outline-none border border-gray-200 focus:border-[#46A358] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-[#46A358]"
                                />
                                <button className="bg-[#46A358] text-white px-6 font-bold rounded-r-md hover:bg-[#3b8a4a] transition-colors text-[14px]">
                                    Join
                                </button>
                            </div>
                            <p className="text-[13px] text-[#727272] dark:text-gray-300 leading-relaxed">
                                We usually post offers and challenges in newsletter. We're your online houseplant destination.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#EAF5ED] dark:bg-gray-700 grid grid-cols-1 md:grid-cols-4 items-center gap-6 p-6 my-6 rounded-sm transition-colors">
                        <div className="flex items-center gap-2">
                            <div className="w-[34px] h-[34px] bg-[#46A358] rounded-full flex items-center justify-center text-white font-bold text-xl">🍃</div>
                            <span className="text-[#46A358] font-black text-[20px] tracking-wider uppercase">Greenshop</span>
                        </div>
                        <div className="flex items-center gap-3 text-[14px] text-[#3D3D3D] dark:text-gray-200">
                            <LocationOnOutlinedIcon className="text-[#46A358]" />
                            <span>70 West Buckingham Ave. Farmingdale, NY 11735</span>
                        </div>
                        <div className="flex items-center gap-3 text-[14px] text-[#3D3D3D] dark:text-gray-200">
                            <MailOutlinedIcon className="text-[#46A358]" />
                            <span>contact@greenshop.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-[14px] text-[#3D3D3D] dark:text-gray-200">
                            <CallOutlinedIcon className="text-[#46A358]" />
                            <span>+88 01911 717 490</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 pt-4 border-b border-[#46A358]/10">

                        <div>
                            <h5 className="font-bold text-[16px] mb-4 dark:text-gray-100">My Account</h5>
                            <ul className="space-y-3 text-[14px] text-[#727272] dark:text-gray-300">
                                <li className="hover:text-[#46A358] cursor-pointer">My Account</li>
                                <li className="hover:text-[#46A358] cursor-pointer">Our stores</li>
                                <li className="hover:text-[#46A358] cursor-pointer">Contact us</li>
                                <li className="hover:text-[#46A358] cursor-pointer">Career</li>
                                <li className="hover:text-[#46A358] cursor-pointer">Specials</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-bold text-[16px] mb-4 dark:text-gray-100">Help & Guide</h5>
                            <ul className="space-y-3 text-[14px] text-[#727272] dark:text-gray-300">
                                <li className="hover:text-[#46A358] cursor-pointer">Help Center</li>
                                <li className="hover:text-[#46A358] cursor-pointer">How to Buy</li>
                                <li className="hover:text-[#46A358] cursor-pointer">Shipping & Delivery</li>
                                <li className="hover:text-[#46A358] cursor-pointer">Product Policy</li>
                                <li className="hover:text-[#46A358] cursor-pointer">How to Return</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold text-[16px] mb-4 dark:text-gray-100">Categories</h5>
                            <ul className="space-y-3 text-[14px] text-[#727272] dark:text-gray-300">
                                <li className="hover:text-[#46A358] cursor-pointer">House Plants</li>
                                <li className="hover:text-[#46A358] cursor-pointer">Potter Plants</li>
                                <li className="hover:text-[#46A358] cursor-pointer">Seeds</li>
                                <li className="hover:text-[#46A358] cursor-pointer">Small Plants</li>
                                <li className="hover:text-[#46A358] cursor-pointer">Accessories</li>
                            </ul>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <h5 className="font-bold text-[16px] mb-4 dark:text-gray-100">Social Media</h5>
                                <div className="flex gap-2">
                                    <span className="w-8 h-8 rounded-md border border-[#46A358]/20 flex items-center justify-center text-[#46A358] hover:bg-[#46A358] hover:text-white cursor-pointer transition-colors"><FacebookIcon sx={{ fontSize: 18 }} /></span>
                                    <span className="w-8 h-8 rounded-md border border-[#46A358]/20 flex items-center justify-center text-[#46A358] hover:bg-[#46A358] hover:text-white cursor-pointer transition-colors"><InstagramIcon sx={{ fontSize: 18 }} /></span>
                                    <span className="w-8 h-8 rounded-md border border-[#46A358]/20 flex items-center justify-center text-[#46A358] hover:bg-[#46A358] hover:text-white cursor-pointer transition-colors"><TwitterIcon sx={{ fontSize: 18 }} /></span>
                                    <span className="w-8 h-8 rounded-md border border-[#46A358]/20 flex items-center justify-center text-[#46A358] hover:bg-[#46A358] hover:text-white cursor-pointer transition-colors"><LinkedInIcon sx={{ fontSize: 18 }} /></span>
                                    <span className="w-8 h-8 rounded-md border border-[#46A358]/20 flex items-center justify-center text-[#46A358] hover:bg-[#46A358] hover:text-white cursor-pointer transition-colors"><YouTubeIcon sx={{ fontSize: 18 }} /></span>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0">
                                <h5 className="font-bold text-[16px] mb-3 dark:text-gray-100">We accept</h5>
                                <div className="flex gap-3 items-center opacity-80 dark:opacity-100">
                                    <span className="font-bold text-blue-800 dark:text-blue-400 text-[12px] tracking-tight">PayPal</span>
                                    <span className="font-bold text-red-500 text-[12px] tracking-tight">MasterCard</span>
                                    <span className="font-bold text-blue-600 dark:text-blue-400 text-[12px] tracking-tight">VISA</span>
                                    <span className="font-bold text-cyan-600 dark:text-cyan-400 text-[11px] tracking-tight">AMEX</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center py-[25px] text-[14px] text-[#3D3D3D] dark:text-gray-400">
                        © 2021 GreenShop. All Rights Reserved.
                    </div>

                </div>
            </footer>
        </div>
    );
};

export default Layout;
