import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  sku: string;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('greenshop_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems([
        { id: 1, name: 'Barberton Daisy', sku: '1995751877966', price: 119.00, quantity: 2, image: 'https://via.placeholder.com/60' },
        { id: 2, name: 'Blushing Bromeliad', sku: '1995751875706', price: 139.00, quantity: 6, image: 'https://via.placeholder.com/60' },
        { id: 3, name: 'Aluminum Plant', sku: '1995751877786', price: 179.00, quantity: 9, image: 'https://via.placeholder.com/60' },
      ]);
    }
  }, []);

  const saveCart = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem('greenshop_cart', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  const handleUpdateQuantity = (id: number, amount: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + amount;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 16.00;
  const total = subtotal + shipping;

  return (
    <div className={`w-full max-w-[1200px] mx-auto px-4 py-8 font-sans text-[#3D3D3D] ${isDarkMode ? "dark bg-gray-900 text-gray-100" : ""}`}>
      
      <div className="flex items-center gap-1 text-sm mb-10 text-[#3D3D3D] dark:text-gray-300">
        <Link to="/" className="font-bold hover:underline">Home</Link>
        <span className="text-gray-400">/</span>
        <Link to="/shop" className="hover:underline">Shop</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-400">Shopping Cart</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-[#FBFBFB] dark:bg-gray-800 rounded-sm">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Your cart is currently empty.</p>
          <Link to="/" className="inline-block bg-[#46A358] text-white px-6 py-2 rounded-md font-bold text-sm">
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          <div className="lg:col-span-2 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EAEAEA] dark:border-gray-700 text-sm font-medium text-[#3D3D3D] dark:text-gray-200">
                  <th className="pb-3 font-medium text-base">Products</th>
                  <th className="pb-3 font-medium text-base">Price</th>
                  <th className="pb-3 font-medium text-base text-center">Quantity</th>
                  <th className="pb-3 font-medium text-base">Total</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="align-middle bg-[#FBFBFB] dark:bg-gray-800 border-b-[10px] border-white dark:border-gray-900">
                    <td className="py-3 pr-4 flex items-center gap-4">
                      <div className="w-[60px] h-[60px] overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#3D3D3D] dark:text-gray-200 text-base mb-1">{item.name}</h3>
                        <p className="text-xs text-[#A5A5A5] dark:text-gray-400">
                          SKU: <span className="text-[#727272] dark:text-gray-300">{item.sku}</span>
                        </p>
                      </div>
                    </td>
                    
                    <td className="py-3 text-[#727272] dark:text-gray-300 font-medium text-base">
                      ${item.price.toFixed(2)}
                    </td>
                    
                    <td className="py-3 text-center">
                      <div className="inline-flex items-center gap-3">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="w-[26px] h-[26px] rounded-full bg-[#46A358] text-white flex items-center justify-center font-bold hover:bg-[#3b8a4a] transition-colors text-lg pb-0.5"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-[#3D3D3D] dark:text-gray-200 font-medium text-base">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="w-[26px] h-[26px] rounded-full bg-[#46A358] text-white flex items-center justify-center font-bold hover:bg-[#3b8a4a] transition-colors text-lg pb-0.5"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    
                    <td className="py-3 font-bold text-[#46A358] dark:text-[#52c46a] text-base">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    
                    <td className="py-3 text-right pr-2">
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-[#727272] dark:text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <DeleteOutlineIcon className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full">
            <h2 className="text-lg font-bold border-b border-[#EAEAEA] dark:border-gray-700 pb-3 text-[#3D3D3D] dark:text-gray-200 mb-5">Cart Totals</h2>
            
            <div className="mb-8">
              <label className="block text-sm text-[#3D3D3D] dark:text-gray-300 mb-2">Coupon Apply</label>
              <div className="flex h-10 border border-[#46A358] rounded-md overflow-hidden">
                <input 
                  type="text" 
                  placeholder="Enter coupon code here..." 
                  className="flex-1 px-3 text-sm text-[#A5A5A5] dark:text-gray-400 bg-transparent outline-none"
                />
                <button className="bg-[#46A358] text-white px-6 text-sm font-bold hover:bg-[#3b8a4a] transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-[#3D3D3D] dark:text-gray-300">Subtotal</span>
                <span className="font-bold text-[#3D3D3D] dark:text-gray-200 text-base">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#3D3D3D] dark:text-gray-300">Coupon Discount</span>
                <span className="text-[#3D3D3D] dark:text-gray-300">(-) 00.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#3D3D3D] dark:text-gray-300">Shiping</span>
                <div className="text-right">
                  <span className="font-bold text-[#3D3D3D] dark:text-gray-200 text-base">${shipping.toFixed(2)}</span>
                  <button className="block text-xs text-[#46A358] dark:text-[#52c46a] hover:underline mt-0.5">View shipping charge</button>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[#EAEAEA] dark:border-gray-700">
                <span className="font-bold text-[#3D3D3D] dark:text-gray-200 text-base">Total</span>
                <span className="text-xl font-bold text-[#46A358] dark:text-[#52c46a]">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <Link 
              to="/checkout" 
              className="block text-center w-full bg-[#46A358] text-white font-bold py-3 rounded-md text-base hover:bg-[#3b8a4a] transition-colors"
            >
              Proceed To Checkout
            </Link>
          </div>

        </div>
        
      )}
      <div className={`min-h-screen flex flex-col justify-between font-sans text-[#3D3D3D] ${isDarkMode ? "dark bg-gray-900 text-gray-100" : ""}`}>
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
            <h2 className="text-xl font-semibold text-[#46A358] dark:text-[#52c46a]">
              You may be interested in
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            <div className="flex flex-col group cursor-pointer">
              <div className="bg-[#FBFBFB] dark:bg-gray-800 p-6 rounded-sm flex items-center justify-center h-64 transition-all group-hover:shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80" 
                  alt="Beach Spider Lily" 
                  className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                />
              </div>
              <h3 className="mt-3 text-base font-normal text-[#3D3D3D] dark:text-gray-200">
                Beach Spider Lily
              </h3>
              <span className="mt-1 text-lg font-bold text-[#46A358] dark:text-[#52c46a]">
                $129.00
              </span>
            </div>

            <div className="flex flex-col group cursor-pointer">
              <div className="bg-[#FBFBFB] dark:bg-gray-800 p-6 rounded-sm flex items-center justify-center h-64 transition-all group-hover:shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80" 
                  alt="Blushing Bromeliad" 
                  className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                />
              </div>
              <h3 className="mt-3 text-base font-normal text-[#3D3D3D] dark:text-gray-200">
                Blushing Bromeliad
              </h3>
              <span className="mt-1 text-lg font-bold text-[#46A358] dark:text-[#52c46a]">
                $139.00
              </span>
            </div>

            <div className="flex flex-col group cursor-pointer">
              <div className="bg-[#FBFBFB] dark:bg-gray-800 p-6 rounded-sm flex items-center justify-center h-64 transition-all group-hover:shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80" 
                  alt="Aluminum Plant" 
                  className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                />
              </div>
              <h3 className="mt-3 text-base font-normal text-[#3D3D3D] dark:text-gray-200">
                Aluminum Plant
              </h3>
              <span className="mt-1 text-lg font-bold text-[#46A358] dark:text-[#52c46a]">
                $179.00
              </span>
            </div>

            <div className="flex flex-col group cursor-pointer">
              <div className="bg-[#FBFBFB] dark:bg-gray-800 p-6 rounded-sm flex items-center justify-center h-64 transition-all group-hover:shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80" 
                  alt="Bird's Nest Fern" 
                  className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                />
              </div>
              <h3 className="mt-3 text-base font-normal text-[#3D3D3D] dark:text-gray-200">
                Bird's Nest Fern
              </h3>
              <span className="mt-1 text-lg font-bold text-[#46A358] dark:text-[#52c46a]">
                $99.00
              </span>
            </div>

            <div className="flex flex-col group cursor-pointer">
              <div className="bg-[#FBFBFB] dark:bg-gray-800 p-6 rounded-sm flex items-center justify-center h-64 transition-all group-hover:shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=400&q=80" 
                  alt="Chinese Evergreen" 
                  className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                />
              </div>
              <h3 className="mt-3 text-base font-normal text-[#3D3D3D] dark:text-gray-200">
                Chinese Evergreen
              </h3>
              <span className="mt-1 text-lg font-bold text-[#46A358] dark:text-[#52c46a]">
                $39.00
              </span>
            </div>

          </div>

          <div className="flex justify-center items-center space-x-2 mt-10">
            <span className="w-2.5 h-2.5 rounded-full border border-[#46A358] dark:border-[#52c46a] cursor-pointer"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#46A358] dark:bg-[#52c46a] cursor-pointer"></span>
            <span className="w-2.5 h-2.5 rounded-full border border-[#46A358] dark:border-[#52c46a] cursor-pointer"></span>
          </div>
        </div>
      </div>
      
    </div>
  );
}