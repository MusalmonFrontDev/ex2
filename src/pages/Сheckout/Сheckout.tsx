import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  sku: string;
  quantity: number;
}

export default function ProceedCheckout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOrderTracked, setIsOrderTracked] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', country: '', city: '', street: '', state: '', zip: '', email: '', phone: ''
  });

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
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 16.00;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleTrackOrder = () => {
    setIsOrderTracked(true);
  };

  return (
    <div className={`w-full max-w-[1200px] mx-auto px-4 py-8 font-sans text-[#3D3D3D] relative ${isDarkMode ? "dark bg-gray-900 text-gray-100" : ""}`}>
      
      <div className="flex items-center gap-1 text-sm mb-10 text-[#3D3D3D] dark:text-gray-300">
        <Link to="/" className="font-bold hover:underline">Home</Link>
        <span className="text-gray-400">/</span>
        <Link to="/shop" className="hover:underline">Shop</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-400">Checkout</span>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-[#3D3D3D] dark:text-gray-200 border-b border-[#EAEAEA] dark:border-gray-700 pb-3">Billing Address</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 text-[#3D3D3D] dark:text-gray-300">First Name <span className="text-red-500">*</span></label>
              <input type="text" className="w-full h-10 border border-[#EAEAEA] dark:border-gray-700 bg-transparent rounded-md px-3 outline-none focus:border-[#46A358]" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[#3D3D3D] dark:text-gray-300">Last Name <span className="text-red-500">*</span></label>
              <input type="text" className="w-full h-10 border border-[#EAEAEA] dark:border-gray-700 bg-transparent rounded-md px-3 outline-none focus:border-[#46A358]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 text-[#3D3D3D] dark:text-gray-300">Country / Region <span className="text-red-500">*</span></label>
              <select className="w-full h-10 border border-[#EAEAEA] dark:border-gray-700 rounded-md px-3 bg-white dark:bg-gray-800 outline-none focus:border-[#46A358]">
                <option value="">Select a country / region</option>
                <option value="US">United States</option>
                <option value="UA">Ukraine</option>
                <option value="KZ">Kazakhstan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 text-[#3D3D3D] dark:text-gray-300">Town / City <span className="text-red-500">*</span></label>
              <input type="text" className="w-full h-10 border border-[#EAEAEA] dark:border-gray-700 bg-transparent rounded-md px-3 outline-none focus:border-[#46A358]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 text-[#3D3D3D] dark:text-gray-300">Street Address <span className="text-red-500">*</span></label>
              <input type="text" placeholder="House number and street name" className="w-full h-10 border border-[#EAEAEA] dark:border-gray-700 bg-transparent rounded-md px-3 outline-none focus:border-[#46A358] text-sm placeholder-gray-300 dark:placeholder-gray-500" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[#3D3D3D] dark:text-gray-300">Appartment, suite, unit, etc. (optional)</label>
              <input type="text" placeholder="Appartment, suite, unit, etc. (optional)" className="w-full h-10 border border-[#EAEAEA] dark:border-gray-700 bg-transparent rounded-md px-3 outline-none focus:border-[#46A358] text-sm placeholder-gray-300 dark:placeholder-gray-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 text-[#3D3D3D] dark:text-gray-300">State <span className="text-red-500">*</span></label>
              <select className="w-full h-10 border border-[#EAEAEA] dark:border-gray-700 rounded-md px-3 bg-white dark:bg-gray-800 outline-none focus:border-[#46A358]">
                <option value="">Select a state</option>
                <option value="NY">New York</option>
                <option value="CA">California</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 text-[#3D3D3D] dark:text-gray-300">Zip <span className="text-red-500">*</span></label>
              <input type="text" className="w-full h-10 border border-[#EAEAEA] dark:border-gray-700 bg-transparent rounded-md px-3 outline-none focus:border-[#46A358]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 text-[#3D3D3D] dark:text-gray-300">Email address <span className="text-red-500">*</span></label>
              <input type="email" className="w-full h-10 border border-[#EAEAEA] dark:border-gray-700 bg-transparent rounded-md px-3 outline-none focus:border-[#46A358]" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[#3D3D3D] dark:text-gray-300">Phone Number <span className="text-red-500">*</span></label>
              <div className="flex border border-[#EAEAEA] dark:border-gray-700 rounded-md overflow-hidden focus-within:border-[#46A358]">
                <select className="bg-gray-50 dark:bg-gray-800 border-r border-[#EAEAEA] dark:border-gray-700 px-2 outline-none text-sm">
                  <option>+966</option>
                  <option>+380</option>
                  <option>+7</option>
                </select>
                <input type="tel" className="w-full h-10 px-3 bg-transparent outline-none" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="shipDifferent" className="accent-[#46A358] w-4 h-4 cursor-pointer" />
            <label htmlFor="shipDifferent" className="text-sm font-medium cursor-pointer text-[#3D3D3D] dark:text-gray-200">Ship to a different address?</label>
          </div>

          <div>
            <label className="block text-sm mb-2 text-[#3D3D3D] dark:text-gray-300">Order notes (optional)</label>
            <textarea rows={4} className="w-full border border-[#EAEAEA] dark:border-gray-700 bg-transparent rounded-md p-3 outline-none focus:border-[#46A358] resize-none" />
          </div>
        </div>

        <div className="w-full space-y-6">
          <h2 className="text-lg font-bold text-[#3D3D3D] dark:text-gray-200 border-b border-[#EAEAEA] dark:border-gray-700 pb-3">Your Order</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium border-b border-[#EAEAEA] dark:border-gray-700 pb-2 text-[#3D3D3D] dark:text-gray-200">
              <span>Products</span>
              <span>Subtotal</span>
            </div>
            
            <div className="max-h-[240px] overflow-y-auto space-y-3 pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-[#FBFBFB] dark:bg-gray-800 p-2 rounded-sm text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
                    <div>
                      <h4 className="font-medium text-[#3D3D3D] dark:text-gray-200">{item.name}</h4>
                      <p className="text-xs text-gray-400 dark:text-gray-500">SKU: {item.sku}</p>
                    </div>
                  </div>
                  <span className="text-gray-400 dark:text-gray-500 text-xs">(x {item.quantity})</span>
                  <span className="font-bold text-[#46A358] dark:text-[#52c46a]">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-right text-xs text-[#3D3D3D] dark:text-gray-300">
            Have a coupon code? <span className="text-[#46A358] dark:text-[#52c46a] cursor-pointer hover:underline">Click here</span>
          </p>

          <div className="space-y-3 text-sm border-b border-[#EAEAEA] dark:border-gray-700 pb-4">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
              <span className="font-bold text-[#3D3D3D] dark:text-gray-200">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Coupon Discount</span>
              <span className="text-[#3D3D3D] dark:text-gray-300">(-) 00.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Shipping</span>
              <div className="text-right">
                <span className="font-bold text-[#3D3D3D] dark:text-gray-200">${shipping.toFixed(2)}</span>
                <button type="button" className="block text-[10px] text-[#46A358] dark:text-[#52c46a] hover:underline">View shipping charge</button>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 text-base font-bold text-[#3D3D3D] dark:text-gray-200">
              <span>Total</span>
              <span className="text-xl text-[#46A358] dark:text-[#52c46a]">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#3D3D3D] dark:text-gray-200">Payment Method</h3>
            
            <label className={`flex items-center justify-between border rounded-md p-3 cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-[#46A358]' : 'border-[#EAEAEA] dark:border-gray-700'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="payment" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="accent-[#46A358] w-4 h-4" />
                <span className="text-sm font-medium text-[#3D3D3D] dark:text-gray-200">PayPal / Visa / Mastercard</span>
              </div>
              <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="paypal" className="h-5 object-contain" />
            </label>

            <label className={`flex items-center border rounded-md p-3 cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-[#46A358]' : 'border-[#EAEAEA] dark:border-gray-700'}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="accent-[#46A358] w-4 h-4 mr-3" />
              <span className="text-sm font-medium text-[#3D3D3D] dark:text-gray-200">Direct bank transfer</span>
            </label>

            <label className={`flex items-center border rounded-md p-3 cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-[#46A358]' : 'border-[#EAEAEA] dark:border-gray-700'}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="accent-[#46A358] w-4 h-4 mr-3" />
              <span className="text-sm font-medium text-[#3D3D3D] dark:text-gray-200">Cash on delivery</span>
            </label>
          </div>

          <button type="submit" className="w-full bg-[#46A358] text-white font-bold py-3 rounded-md hover:bg-[#3b8a4a] transition-colors mt-4">
            Place Order
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-[580px] rounded-sm shadow-2xl overflow-hidden relative border-t-[10px] border-[#46A358] animate-fade-in">
            
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold">
              ✕
            </button>

            <div className="text-center pt-8 pb-6 px-6 bg-[#FBFBFB] dark:bg-gray-800/50 border-b border-[#EAEAEA] dark:border-gray-700 flex flex-col items-center">
              
              {isOrderTracked ? (
                <CheckCircleOutlineIcon className="text-[#46A358] dark:text-[#52c46a] animate-bounce" style={{ fontSize: 60 }} />
              ) : (
                <div className="w-16 h-16 bg-[#EAF5ED] dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#46A358" strokeWidth="2" className="dark:stroke-[#52c46a]">
                    <path d="M22 2H2v20h20V2zM12 17H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
              )}

              <h3 className="text-base font-medium text-gray-600 dark:text-gray-300 mt-2">
                {isOrderTracked ? 'Your purchase was successful!' : 'Your order has been received'}
              </h3>
            </div>

            <div className="grid grid-cols-4 text-center py-4 px-6 border-b border-[#EAEAEA] dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
              <div className="border-r border-gray-100 dark:border-gray-700">
                <p>Order Number</p>
                <p className="font-bold text-[#3D3D3D] dark:text-gray-200 mt-1">19586687</p>
              </div>
              <div className="border-r border-gray-100 dark:border-gray-700">
                <p>Date</p>
                <p className="font-bold text-[#3D3D3D] dark:text-gray-200 mt-1">15 Sep, 2021</p>
              </div>
              <div className="border-r border-gray-100 dark:border-gray-700">
                <p>Total</p>
                <p className="font-bold text-[#3D3D3D] dark:text-gray-200 mt-1">${total.toFixed(2)}</p>
              </div>
              <div>
                <p>Payment Method</p>
                <p className="font-bold text-[#3D3D3D] dark:text-gray-200 mt-1">
                  {paymentMethod === 'cash' ? 'Cash on delivery' : paymentMethod === 'paypal' ? 'PayPal' : 'Bank Transfer'}
                </p>
              </div>
            </div>

            <div className="p-6 max-h-[260px] overflow-y-auto space-y-4 bg-white dark:bg-gray-800">
              <h4 className="text-sm font-bold text-[#3D3D3D] dark:text-gray-200">Order Details</h4>
              
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover" />
                      <div>
                        <h5 className="font-medium text-[#3D3D3D] dark:text-gray-200">{item.name}</h5>
                        <p className="text-xs text-gray-400 dark:text-gray-500">SKU: {item.sku}</p>
                      </div>
                    </div>
                    <span className="text-gray-400 dark:text-gray-500 text-xs">(x {item.quantity})</span>
                    <span className="font-bold text-gray-600 dark:text-gray-300">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-dashed border-gray-200 dark:border-gray-700 text-sm space-y-2 text-right">
                <p className="text-gray-500 dark:text-gray-400">Shipping: <span className="font-bold text-[#3D3D3D] dark:text-gray-200 ml-2">${shipping.toFixed(2)}</span></p>
                <p className="text-base font-bold text-[#3D3D3D] dark:text-gray-200">Total: <span className="text-[#46A358] dark:text-[#52c46a] ml-2">${total.toFixed(2)}</span></p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 border-t border-[#EAEAEA] dark:border-gray-700 text-center">
              <p className="text-xs text-gray-400 dark:text-gray-400 mb-4">
                Your order is currently being processed. You will receive an order confirmation email shortly with the expected delivery date for your items.
              </p>
              <button 
                onClick={handleTrackOrder}
                className={`w-[180px] text-white font-bold py-2.5 rounded-md text-sm transition-colors ${isOrderTracked ? 'bg-[#2b6637]' : 'bg-[#46A358] hover:bg-[#3b8a4a]'}`}
              >
                {isOrderTracked ? 'Order Tracked! ✓' : 'Track your order'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}