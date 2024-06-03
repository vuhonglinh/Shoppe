import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
// import Login from './pages/Login'
// import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import { useContext, lazy, Suspense } from 'react'
import { AppContext } from './contexts/app.context'
import path from './contexts/path'
// import ProductDetail from './pages/ProductDetail'
// import Cart from './pages/Cart'
// import CartLayout from './layouts/CartLayout'
// import UserLayout from './pages/User/layouts/UserLayout'
// import ChangePassword from './pages/User/pages/ChangePassword'
// import HistoryPurchase from './pages/User/pages/HistoryPurchase'
// import Profile from './pages/User/pages/Profile'
// import NotFound from './pages/NotFound'


const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const UserLayout = lazy(() => import('./pages/User/layouts/UserLayout'));
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'));
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'));
const CartLayout = lazy(() => import('./layouts/CartLayout'));
const Profile = lazy(() => import('./pages/User/pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ProtectedRoute() {
  //Khi đã đăng nhập
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  //Khi đã đăng xuất
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user, //Trang user
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.ChangePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.HistoryPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      index: true,
      path: '/',
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    }, {
      path: '*',
      element: (<Suspense>
        <NotFound />
      </Suspense>)
    }
  ])

  return routeElements
}
