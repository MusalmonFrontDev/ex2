import { memo } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout';
import Home from './pages/Home/Home';
import Cart from './pages/Home/Cart/Cart';
import Checkout from "./pages/Сheckout/Сheckout";
import Shop from "./pages/Shop/Shop";
import AuthForm from "./pages/AuthForm/AuthForm";
const App = memo(() => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "shop",
          element: <Shop />,
        },
        {
          path: "authForm",
          element: <AuthForm />,
        },
      ],
    },
  ]); 
  return <RouterProvider router={router} />
})

export default App