import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

interface Plant {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  discount?: string;
  size: 'Small' | 'Medium' | 'Large';
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

const INITIAL_PLANTS: Plant[] = [
  {
    id: 1,
    name: 'Barberton Daisy',
    category: 'House Plants',
    price: 119.0,
    image:
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=500&auto=format&fit=crop',
    size: 'Small',
  },
  {
    id: 2,
    name: 'Angel Wing Begonia',
    category: 'House Plants',
    price: 169.0,
    image:
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=500&auto=format&fit=crop',
    size: 'Medium',
  },
  {
    id: 3,
    name: 'African Violet',
    category: 'Potter Plants',
    price: 199.0,
    oldPrice: 229.0,
    discount: '13% OFF',
    image:
      'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=500&auto=format&fit=crop',
    size: 'Large',
  },
  {
    id: 4,
    name: 'Beach Spider Lily',
    category: 'Seeds',
    price: 129.0,
    image:
      'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=500&auto=format&fit=crop',
    size: 'Small',
  },
  {
    id: 5,
    name: 'Blushing Bromeliad',
    category: 'Small Plants',
    price: 139.0,
    image:
      'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=500&auto=format&fit=crop',
    size: 'Medium',
  },
  {
    id: 6,
    name: 'Aluminum Plant',
    category: 'Big Plants',
    price: 179.0,
    image:
      'https://images.unsplash.com/photo-1487070183336-b863922373d4?q=80&w=500&auto=format&fit=crop',
    size: 'Large',
  },
  {
    id: 7,
    name: "Bird's Nest Fern",
    category: 'Succulents',
    price: 99.0,
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500&auto=format&fit=crop',
    size: 'Small',
  },
  {
    id: 8,
    name: 'Broadleaf Lady Palm',
    category: 'Trerrariums',
    price: 59.0,
    image:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=500&auto=format&fit=crop',
    size: 'Medium',
  },
  {
    id: 9,
    name: 'Chinese Evergreen',
    category: 'Gardening',
    price: 39.0,
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=500&auto=format&fit=crop',
    size: 'Large',
  },
];

export default function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useOutletContext<{ isDarkMode: boolean }>();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  const state = location.state as { plantId?: number } | null;
  
  const targetId = state?.plantId || Number(localStorage.getItem('greenshop_last_plant_id')) || 1;

  if (state?.plantId) {
    localStorage.setItem('greenshop_last_plant_id', String(state.plantId));
  }

  const plant = INITIAL_PLANTS.find((p) => p.id === targetId) || INITIAL_PLANTS[0];

  const handleAddToCart = (redirect: boolean) => {
    const savedCart = localStorage.getItem('greenshop_cart');
    const currentCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
    const existingItem = currentCart.find((item) => item.id === plant.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({
        id: plant.id,
        name: plant.name,
        price: plant.price,
        image: plant.image,
        category: plant.category,
        quantity: quantity,
      });
    }

    localStorage.setItem('greenshop_cart', JSON.stringify(currentCart));

    if (redirect) {
      navigate('/cart');
    } else {
      alert(`Товар "${plant.name}" в количестве ${quantity} шт. добавлен в корзину!`);
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-all duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-[#3D3D3D]'}`}>
      <div className="w-full max-w-[1200px] mx-auto px-4 py-5">
        
        <div className="text-sm mb-8 flex items-center gap-1"><Link to="/" className="hover:text-[#46A358] font-bold">Home</Link><span>/</span><span className="text-gray-400">Shop</span></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              <div className="w-20 h-20 bg-[#FBFBFB] dark:bg-gray-800 border border-[#46A358] rounded-md overflow-hidden cursor-pointer"><img src={plant.image} alt="thumb" className="w-full h-full object-cover" /></div>
              <div className="w-20 h-20 bg-[#FBFBFB] dark:bg-gray-800 rounded-md overflow-hidden cursor-pointer opacity-60 hover:opacity-100"><img src={plant.image} alt="thumb" className="w-full h-full object-cover" /></div>
              <div className="w-20 h-20 bg-[#FBFBFB] dark:bg-gray-800 rounded-md overflow-hidden cursor-pointer opacity-60 hover:opacity-100"><img src={plant.image} alt="thumb" className="w-full h-full object-cover" /></div>
              <div className="w-20 h-20 bg-[#FBFBFB] dark:bg-gray-800 rounded-md overflow-hidden cursor-pointer opacity-60 hover:opacity-100"><img src={plant.image} alt="thumb" className="w-full h-full object-cover" /></div>
            </div>
            <div className="flex-1 bg-[#FBFBFB] dark:bg-gray-800 rounded-md overflow-hidden flex items-center justify-center p-6 relative"><img src={plant.image} alt={plant.name} className="max-h-[440px] object-contain rounded-lg shadow-sm" /></div>
          </div>

          <div className="flex flex-col justify-start">
            <h1 className="text-3xl font-bold mb-2">{plant.name}</h1>
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <span className="text-2xl font-black text-[#46A358]">${plant.price.toFixed(2)}</span>
              <div className="flex items-center gap-1"><span className="text-yellow-400">★★★★★</span><span className="text-xs text-gray-400 font-medium">(19 Customer Review)</span></div>
            </div>

            <h4 className="text-sm font-bold mb-2">Short Description:</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground.</p>

            <h4 className="text-sm font-bold mb-3">Size:</h4>
            <div className="flex gap-3 mb-6">
              <button onClick={() => setSelectedSize('S')} className={`w-8 h-8 rounded-full border text-xs font-medium flex items-center justify-center transition-colors ${selectedSize === 'S' ? 'border-[#46A358] bg-[#46A358] text-white font-bold' : 'border-gray-300 dark:border-gray-600 hover:border-[#46A358]'}`}>S</button>
              <button onClick={() => setSelectedSize('M')} className={`w-8 h-8 rounded-full border text-xs font-medium flex items-center justify-center transition-colors ${selectedSize === 'M' ? 'border-[#46A358] bg-[#46A358] text-white font-bold' : 'border-gray-300 dark:border-gray-600 hover:border-[#46A358]'}`}>M</button>
              <button onClick={() => setSelectedSize('L')} className={`w-8 h-8 rounded-full border text-xs font-medium flex items-center justify-center transition-colors ${selectedSize === 'L' ? 'border-[#46A358] bg-[#46A358] text-white font-bold' : 'border-gray-300 dark:border-gray-600 hover:border-[#46A358]'}`}>L</button>
              <button onClick={() => setSelectedSize('XL')} className={`w-8 h-8 rounded-full border text-xs font-medium flex items-center justify-center transition-colors ${selectedSize === 'XL' ? 'border-[#46A358] bg-[#46A358] text-white font-bold' : 'border-gray-300 dark:border-gray-600 hover:border-[#46A358]'}`}>XL</button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">-</button>
                <span className="px-4 py-2 text-sm font-bold min-w-[40px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">+</button>
              </div>
              <button onClick={() => handleAddToCart(true)} className="bg-[#46A358] hover:bg-[#3b8a4a] text-white font-bold text-sm px-6 py-2.5 rounded-md uppercase tracking-wider transition-colors">Buy Now</button>
              <button onClick={() => handleAddToCart(false)} className="border border-[#46A358] text-[#46A358] hover:bg-[#46A358] hover:text-white font-bold text-sm px-6 py-2.5 rounded-md uppercase tracking-wider transition-colors">Add to cart</button>
              <button className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors"><FavoriteBorderIcon fontSize="small" /></button>
            </div>

            <div className="space-y-2 text-sm text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4">
              <div className="flex gap-1"><span>SKU:</span><strong className="text-gray-600 dark:text-gray-300 font-normal">1995751877966</strong></div>
              <div className="flex gap-1"><span>Categories:</span><strong className="text-gray-600 dark:text-gray-300 font-normal">{plant.category}</strong></div>
              <div className="flex gap-1"><span>Tags:</span><strong className="text-gray-600 dark:text-gray-300 font-normal">Home, Garden, Plants</strong></div>
              <div className="flex items-center gap-3 pt-2"><span>Share this products:</span><div className="flex items-center gap-3 text-gray-600 dark:text-gray-400"><FacebookIcon className="cursor-pointer hover:text-[#46A358]" fontSize="small" /><TwitterIcon className="cursor-pointer hover:text-[#46A358]" fontSize="small" /><LinkedInIcon className="cursor-pointer hover:text-[#46A358]" fontSize="small" /><EmailIcon className="cursor-pointer hover:text-[#46A358]" fontSize="small" /></div></div>
            </div>
          </div>

        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 flex gap-8 mb-6 text-sm font-medium">
          <button onClick={() => setActiveTab('description')} className={`pb-3 relative transition-colors ${activeTab === 'description' ? 'text-[#46A358] font-bold border-b-2 border-[#46A358]' : 'text-gray-400 hover:text-[#46A358]'}`}>Product Description</button>
          <button onClick={() => setActiveTab('reviews')} className={`pb-3 relative transition-colors ${activeTab === 'reviews' ? 'text-[#46A358] font-bold border-b-2 border-[#46A358]' : 'text-gray-400 hover:text-[#46A358]'}`}>Reviews (19)</button>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed space-y-6 mb-12">
          <p>The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.</p>
          <p>Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi. Cras neque metus, consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod eget. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground.</p>
          <div><h4 className="font-bold text-[#3D3D3D] dark:text-white mb-1">Living Room:</h4><p>The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div>
          <div><h4 className="font-bold text-[#3D3D3D] dark:text-white mb-1">Dining Room:</h4><p>The benefits of houseplants are endless. In addition to cleaning the air of harmful toxins, they can help to improve your mood, reduce stress and provide you with better sleep. Fill every room of your home with houseplants and their restorative qualities will improve your life.</p></div>
          <div><h4 className="font-bold text-[#3D3D3D] dark:text-white mb-1">Office:</h4><p>The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8"><h3 className="text-lg font-bold text-[#46A358] mb-6">Related Products</h3></div>

      </div>
      <div className={`min-h-screen flex flex-col justify-between font-sans text-[#3D3D3D] ${isDarkMode ? "dark bg-gray-900 text-gray-100" : ""}`}>
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
          

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