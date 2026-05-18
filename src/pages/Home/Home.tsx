import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useOutletContext } from 'react-router-dom';

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

const bannerSlides = [
  {
    id: 1,
    subtitle: "WELCOME TO GREENSHOP",
    title: (
      <>
        LET'S MAKE A
        <br />
        BETTER <span className="text-[#46A358]">PLANET</span>
      </>
    ),
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create a unique Urban Jungle. Order your favorite plants!",
    image:
      "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    subtitle: "WELCOME TO GREENSHOP",
    title: (
      <>
        FIND YOUR OWN
        <br />
        PERFECT <span className="text-[#46A358]">MATCH</span>
      </>
    ),
    description:
      "Explore our collection of rare and exotic house plants to elevate your workspace or living room aesthetic effortlessly.",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=600&auto=format&fit=crop",
  },
];

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

const categoriesList = [
  { name: 'House Plants', count: 33 },
  { name: 'Potter Plants', count: 12 },
  { name: 'Seeds', count: 65 },
  { name: 'Small Plants', count: 39 },
  { name: 'Big Plants', count: 23 },
  { name: 'Succulents', count: 17 },
  { name: 'Trerrariums', count: 19 },
  { name: 'Gardening', count: 13 },
  { name: 'Accessories', count: 18 },
];

export default function Home() {
  const { isDarkMode } = useOutletContext<{ isDarkMode: boolean }>();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(1230);

  const [appliedCategory, setAppliedCategory] = useState<string | null>(null);
  const [appliedPrice, setAppliedPrice] = useState<number>(1230);

  const [activeTab, setActiveTab] = useState<string>('All Plants');

  const handleFilterSubmit = () => {
    setAppliedCategory(selectedCategory);
    setAppliedPrice(priceRange);
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setAppliedCategory(null);
    setPriceRange(1230);
    setAppliedPrice(1230);
  };

  const handleAddToCart = (plant: Plant) => {
    const savedCart = localStorage.getItem('greenshop_cart');
    const currentCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = currentCart.find((item) => item.id === plant.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({
        id: plant.id,
        name: plant.name,
        price: plant.price,
        image: plant.image,
        category: plant.category,
        quantity: 1,
      });
    }

    localStorage.setItem('greenshop_cart', JSON.stringify(currentCart));

    alert(
      `Товар "${plant.name}" сохранен в корзину! Перейдите на страницу cart.tsx, чтобы увидеть его.`
    );
  };

  const filteredPlants = INITIAL_PLANTS.filter((plant) => {
    const matchCategory = appliedCategory
      ? plant.category === appliedCategory
      : true;

    const matchPrice = plant.price <= appliedPrice;

    return matchCategory && matchPrice;
  });

  return (
    <div
      className={`min-h-screen flex flex-col justify-between font-sans transition-all duration-300 ${
        isDarkMode
          ? 'dark bg-gray-900 text-gray-100'
          : 'bg-white text-[#3D3D3D]'
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-4">

        <section
          className={`mt-5 mb-10 rounded-sm overflow-hidden relative transition-all duration-300 ${
            isDarkMode ? 'bg-[#1F2937]' : 'bg-[#FBFBFB]'
          }`}
        >
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={1}
            className="mySwiper"
          >
            {bannerSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="flex flex-col md:flex-row items-center justify-between p-4 sm:p-8 md:p-16 gap-6">

                  <div className="flex-1 space-y-2 sm:space-y-4 text-left z-10 min-w-[50%]">
                    <p
                      className={`text-[10px] sm:text-xs font-medium tracking-widest uppercase ${
                        isDarkMode ? 'text-gray-300' : 'text-[#3D3D3D]'
                      }`}
                    >
                      {slide.subtitle}
                    </p>

                    <h1
                      className={`text-xl sm:text-4xl md:text-6xl font-black leading-tight tracking-wide ${
                        isDarkMode ? 'text-white' : 'text-[#3D3D3D]'
                      }`}
                    >
                      {slide.title}
                    </h1>

                    <p
                      className={`text-[11px] sm:text-xs md:text-sm leading-relaxed max-w-[500px] ${
                        isDarkMode ? 'text-gray-400' : 'text-[#727272]'
                      }`}
                    >
                      {slide.description}
                    </p>

                    <button className="bg-[#46A358] text-white font-bold text-[10px] sm:text-sm px-3 sm:px-6 py-1.5 sm:py-3 rounded-md uppercase tracking-wider transition-transform hover:scale-105">
                      SHOP NOW
                    </button>
                  </div>

                  <div className="flex-1 flex justify-center items-center relative">
                    <img
                      src={slide.image}
                      alt="slider plant"
                      className="w-[120px] sm:w-[240px] md:w-[400px] h-[140px] sm:h-[260px] md:h-[350px] object-cover rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style>{`
            .swiper-pagination-bullet-active {
              background: #46A358 !important;
              width: 10px !important;
              height: 10px !important;
            }

            .swiper-pagination-bullet {
              background: #46A358;
              opacity: 0.3;
            }

            .swiper-pagination {
              bottom: 20px !important;
            }
          `}</style>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          <aside
            className={`space-y-8 p-5 rounded-sm h-fit transition-all duration-300 ${
              isDarkMode ? 'bg-[#1F2937]' : 'bg-[#FBFBFB]'
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Categories</h3>

                {selectedCategory && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-red-500 hover:underline font-medium"
                  >
                    Reset
                  </button>
                )}
              </div>

              <ul className="space-y-3">
                {categoriesList.map((cat) => (
                  <li
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex justify-between items-center cursor-pointer text-sm transition-colors ${
                      selectedCategory === cat.name
                        ? 'text-[#46A358] font-bold'
                        : 'hover:text-[#46A358]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-gray-400">
                      ({cat.count})
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Price Range</h3>

              <div className="px-2">
                <input
                  type="range"
                  min="39"
                  max="1230"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#46A358] cursor-pointer"
                />

                <div className="flex justify-between text-sm mt-3">
                  <span>
                    Price:{' '}
                    <strong className="text-[#46A358]">
                      ${39} — ${priceRange}
                    </strong>
                  </span>
                </div>

                <button
                  onClick={handleFilterSubmit}
                  className="mt-4 w-full bg-[#46A358] text-white text-sm font-bold py-2 rounded-md transition-colors hover:bg-[#3b8a4a]"
                >
                  Filter
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Size</h3>

              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Small</span>
                  <span>(119)</span>
                </li>

                <li className="flex justify-between">
                  <span>Medium</span>
                  <span>(86)</span>
                </li>

                <li className="flex justify-between">
                  <span>Large</span>
                  <span>(78)</span>
                </li>
              </ul>
            </div>

            <div className="relative pt-6 overflow-hidden rounded-md text-center bg-gradient-to-b from-[#EAF5ED] to-[#FBFBFB]">
              <span className="text-[#46A358] text-3xl font-black tracking-tighter block">
                Super Sale
              </span>

              <span className="text-xs uppercase font-bold tracking-widest text-[#3D3D3D] block mb-4">
                UP TO 75% OFF
              </span>

              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300&auto=format&fit=crop"
                alt="sale"
                className="w-40 h-40 mx-auto object-cover rounded-full shadow-md mb-4"
              />
            </div>
          </aside>

          <main className="lg:col-span-3">

            <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-6">

              <div className="flex space-x-6 text-sm">
                {['All Plants', 'New Arrivals', 'Sale'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 relative transition-all ${
                      activeTab === tab
                        ? 'text-[#46A358] font-bold border-b-2 border-[#46A358]'
                        : 'hover:text-[#46A358]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="text-sm flex items-center space-x-1 cursor-pointer">
                <span>
                  Short by: <strong>Default sorting</strong>
                </span>

                <KeyboardArrowDownIcon fontSize="small" />
              </div>
            </div>

            {filteredPlants.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                Ничего не найдено.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                {filteredPlants.map((plant) => (
                  <div
                    key={plant.id}
                    className={`group relative flex flex-col justify-between p-2 rounded-md transition-all duration-300 ${
                      isDarkMode ? 'bg-[#1F2937]' : 'bg-white'
                    }`}
                  >
                    <div className="w-full h-72 bg-[#FBFBFB] flex items-center justify-center relative overflow-hidden rounded-sm mb-3">

                      {plant.discount && (
                        <span className="absolute top-3 left-3 bg-[#46A358] text-white text-xs font-semibold px-2 py-1 rounded-sm z-10">
                          {plant.discount}
                        </span>
                      )}

                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 opacity-0 translate-y-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 z-10">

                        <button
                          onClick={() => handleAddToCart(plant)}
                          className="w-9 h-9 bg-white text-[#3D3D3D] hover:text-[#46A358] rounded-md flex items-center justify-center shadow-md transition-colors"
                        >
                          <ShoppingCartOutlinedIcon fontSize="small" />
                        </button>

                        <button
                          onClick={() =>
                            alert(`Добавлено в избранное: ${plant.name}`)
                          }
                          className="w-9 h-9 bg-white text-[#3D3D3D] hover:text-red-500 rounded-md flex items-center justify-center shadow-md transition-colors"
                        >
                          <FavoriteBorderIcon fontSize="small" />
                        </button>

                        <Link
  to="/shop"
  state={{ plantId: plant.id }}
  className="w-9 h-9 bg-white text-[#3D3D3D] hover:text-[#46A358] rounded-md flex items-center justify-center shadow-md transition-colors"
>
  <SearchIcon fontSize="small" />
</Link>
                      </div>
                    </div>

                    <div className="text-left px-1">
                      <h4 className="text-sm font-normal mb-1">
                        {plant.name}
                      </h4>

                      <div className="flex items-center space-x-3">
                        <span className="text-[#46A358] font-bold text-base">
                          ${plant.price.toFixed(2)}
                        </span>

                        {plant.oldPrice && (
                          <span className="text-gray-400 line-through text-sm">
                            ${plant.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end items-center space-x-2 mt-12 mb-6">

              <button className="w-8 h-8 flex items-center justify-center rounded-md border text-sm bg-[#46A358] text-white font-bold border-[#46A358]">
                1
              </button>

              <button className="w-8 h-8 flex items-center justify-center rounded-md border text-sm hover:bg-[#46A358] hover:text-white transition-colors">
                2
              </button>

              <button className="w-8 h-8 flex items-center justify-center rounded-md border text-sm hover:bg-[#46A358] hover:text-white transition-colors">
                3
              </button>

              <button className="w-8 h-8 flex items-center justify-center rounded-md border text-sm hover:bg-[#46A358] hover:text-white transition-colors">
                <KeyboardArrowRightIcon fontSize="small" />
              </button>
            </div>
          </main>
        </div>
      </div>
      <div className={`min-h-screen flex flex-col justify-between font-sans text-[#3D3D3D] ${isDarkMode ? "dark bg-gray-900 text-gray-100" : "bg-white"}`}>
  <main className="max-w-7xl mx-auto px-4 py-12 flex-grow w-full">
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
      
      <div className="bg-[#FBFBFB] dark:bg-gray-800 p-8 rounded-lg flex flex-col sm:flex-row items-center justify-between shadow-sm relative overflow-hidden group">
        <div className="w-full sm:w-1/2 flex justify-center mb-6 sm:mb-0 transition-transform duration-300 group-hover:scale-105">
          <img 
            src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80" 
            alt="Monstera plant" 
            className="h-56 object-contain mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
        <div className="w-full sm:w-1/2 text-right flex flex-col items-end">
          <h2 className="text-xl font-bold tracking-wider text-[#3D3D3D] dark:text-white uppercase mb-2">
            Summer Cactus <br /> & Succulents
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 max-w-[240px]">
            We are an online plant shop offering a wide range of cheap and trendy plants.
          </p>
          <button className="bg-[#46A358] hover:bg-[#3b8a4a] text-white px-4 py-2 rounded-md text-sm font-medium inline-flex items-center gap-2 transition-colors">
            Find More <span>➔</span>
          </button>
        </div>
      </div>

      <div className="bg-[#FBFBFB] dark:bg-gray-800 p-8 rounded-lg flex flex-col sm:flex-row items-center justify-between shadow-sm relative overflow-hidden group">
        <div className="w-full sm:w-1/2 flex justify-center mb-6 sm:mb-0 transition-transform duration-300 group-hover:scale-105">
          <img 
            src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80" 
            alt="Styling trends" 
            className="h-56 object-contain mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
        <div className="w-full sm:w-1/2 text-right flex flex-col items-end">
          <h2 className="text-xl font-bold tracking-wider text-[#3D3D3D] dark:text-white uppercase mb-2">
            Styling Trends <br /> & Much More
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 max-w-[240px]">
            We are an online plant shop offering a wide range of cheap and trendy plants.
          </p>
          <button className="bg-[#46A358] hover:bg-[#3b8a4a] text-white px-4 py-2 rounded-md text-sm font-medium inline-flex items-center gap-2 transition-colors">
            Find More <span>➔</span>
          </button>
        </div>
      </div>

    </div>

    <section className="text-center">
      <h2 className="text-3xl font-bold text-[#3D3D3D] dark:text-white mb-3">
        Our Blog Posts
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
        We are an online plant shop offering a wide range of cheap and trendy plants.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        
        <div className="bg-[#FBFBFB] dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm flex flex-col justify-between group">
          <div>
            <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img 
                src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&q=80" 
                alt="Cactus care" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-medium text-[#46A358]">
                September 12 <span className="text-gray-300 dark:text-gray-600 mx-1">|</span> Read in 6 minutes
              </span>
              <h3 className="text-lg font-bold text-[#3D3D3D] dark:text-white mt-2 mb-2 line-clamp-2">
                Cactus & Succulent Care Tips
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                Cacti are succulents are easy care plants for any home or patio.
              </p>
            </div>
          </div>
          <div className="p-4 pt-0">
            <button className="text-xs font-bold text-[#3D3D3D] dark:text-white hover:text-[#46A358] dark:hover:text-[#46A358] inline-flex items-center gap-1 transition-colors">
              Read More <span className="text-[#46A358]">➔</span>
            </button>
          </div>
        </div>

        <div className="bg-[#FBFBFB] dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm flex flex-col justify-between group">
          <div>
            <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img 
                src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80" 
                alt="Top 10 Succulents" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-medium text-[#46A358]">
                September 13 <span className="text-gray-300 dark:text-gray-600 mx-1">|</span> Read in 2 minutes
              </span>
              <h3 className="text-lg font-bold text-[#3D3D3D] dark:text-white mt-2 mb-2 line-clamp-2">
                Top 10 Succulents for Your Home
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                Best in hanging baskets. Prefers medium to high light.
              </p>
            </div>
          </div>
          <div className="p-4 pt-0">
            <button className="text-xs font-bold text-[#3D3D3D] dark:text-white hover:text-[#46A358] dark:hover:text-[#46A358] inline-flex items-center gap-1 transition-colors">
              Read More <span className="text-[#46A358]">➔</span>
            </button>
          </div>
        </div>

        <div className="bg-[#FBFBFB] dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm flex flex-col justify-between group">
          <div>
            <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img 
                src="https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=400&q=80" 
                alt="Cacti & Succulent" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-medium text-[#46A358]">
                September 15 <span className="text-gray-300 dark:text-gray-600 mx-1">|</span> Read in 3 minutes
              </span>
              <h3 className="text-lg font-bold text-[#3D3D3D] dark:text-white mt-2 mb-2 line-clamp-2">
                Cacti & Succulent Care Tips
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                Cacti and succulents thrive in containers and because most are..
              </p>
            </div>
          </div>
          <div className="p-4 pt-0">
            <button className="text-xs font-bold text-[#3D3D3D] dark:text-white hover:text-[#46A358] dark:hover:text-[#46A358] inline-flex items-center gap-1 transition-colors">
              Read More <span className="text-[#46A358]">➔</span>
            </button>
          </div>
        </div>

        <div className="bg-[#FBFBFB] dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm flex flex-col justify-between group">
          <div>
            <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img 
                src="https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?auto=format&fit=crop&w=400&q=80" 
                alt="Best Houseplants" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-medium text-[#46A358]">
                September 15 <span className="text-gray-300 dark:text-gray-600 mx-1">|</span> Read in 2 minutes
              </span>
              <h3 className="text-lg font-bold text-[#3D3D3D] dark:text-white mt-2 mb-2 line-clamp-2">
                Best Houseplants Room By Room
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                The benefits of houseplants are endless. In addition to..
              </p>
            </div>
          </div>
          <div className="p-4 pt-0">
            <button className="text-xs font-bold text-[#3D3D3D] dark:text-white hover:text-[#46A358] dark:hover:text-[#46A358] inline-flex items-center gap-1 transition-colors">
              Read More <span className="text-[#46A358]">➔</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  </main>
</div>
    </div>
  );
}