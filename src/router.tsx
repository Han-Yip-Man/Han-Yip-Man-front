import { createBrowserRouter } from 'react-router-dom'
import { Router as RemixRouter } from '@remix-run/router/dist/router'
import AuthComponent from './auth/AuthComponent'
import GeneralLayout from './layout/GeneralLayout'
import MenuDetail from './pages/menuDetail/MenuDetail/MenuDetail'
import Cart from './pages/cart/Cart'
import Order from './pages/order/Order/Order'
import SignLayout from './layout/SignLayout'
import MypageLayout from './layout/MypageLayout'
import OwnerSignup from './pages/ownerSignup/OwnerSignup/OwnerSignup.tsx'
import OwnerSignin from './pages/ownerSignin/OwnerSignin/OwnerSignin.tsx'
import CustomerSignin from './pages/customerSignin/CustomerSignin/CustomerSignin.tsx'
import KaKao from './components/KaKaoLogin/KaKao'
import Store from './pages/store/store/Store.tsx'
import CustomerSignup from './pages/customerSignup/CostomerSignup/CustomerSignup.tsx'
import OwnerDashboard from './pages/ownerDashboard/OwnerDashboard/OwnerDashboard.tsx'
import Mypage from './pages/customerMypage/mypage/Mypage.tsx'
import SignupSelectionPage from './pages/SignupSelectionPage/SignupSelectionPage.tsx'
import SignInSelectionPage from './pages/SignInSelectionPage/SignInSelectionPage.tsx'
import Main from './pages/main/Main.tsx'
import CategoryMain from './pages/categoryMain/CategoryMain.tsx'

interface RouterBase {
  id: number // 페이지 아이디 (반복문용 고유값)
  path: string // 페이지 경로
  label: string // 사이드바에 표시할 페이지 이름
  element: React.ReactNode // 페이지 엘리먼트
  children?: RouterElement[] // 중첩라우팅에서 인증이 필요한 페이지가 있을경우 처리하기 위해서 RouterBase 에서 RouterElement로 바꿨습니다
  errorElement?: React.ReactNode // 에러 페이지 엘러먼트
}

interface UserAccessibleRouterElement extends RouterBase {
  withAuth?: boolean // 인증이 필요한 페이지 여부
}

interface AdminAccessibleRouterElement extends RouterBase {
  withAuth: true // 인증이 필요한 페이지 여부
  isAdminPage?: boolean // 어드민 페이지 여부
}

interface RouteObject {
  path: string
  element: React.ReactNode
  children?: RouteObject[]
}

type RouterElement = UserAccessibleRouterElement | AdminAccessibleRouterElement

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    label: 'Layout',
    element: <GeneralLayout />,
    withAuth: false,
    children: [
      {
        id: 0,
        path: 'menuDetail/:menuId',
        label: 'MenuDetail',
        element: <MenuDetail />,
      },
      {
        id: 1,
        path: 'cart',
        label: 'Cart',
        element: <Cart />,
      },
      {
        id: 2,
        path: 'order',
        label: 'Order',
        element: <Order />,
      },
      {
        id: 1,
        path: '',
        label: 'Main',
        element: <Main />,
      },
      {
        id: 2,
        path: 'main',
        label: 'CategoryMain',
        element: <CategoryMain />,
      },
      {
        id: 3,
        path: '/store/:storeId',
        label: 'Store',
        element: <Store />,
      },
      {
        id: 4,
        path: '*',
        label: 'Not Found',
        element: <div>페이지를 찾을 수 없습니다.</div>,
      },
    ],
  },
  {
    id: 50,
    path: '/auth',
    label: 'signlayout',
    element: <SignLayout />,
    withAuth: false,
    children: [
      {
        id: 51,
        path: 'sellersignup',
        label: 'sellersignup',
        element: <OwnerSignup />,
      },
      {
        id: 52,
        path: 'sellersignin',
        label: 'sellersignin',
        element: <OwnerSignin />,
      },
      {
        id: 53,
        path: 'usersignup',
        label: 'usersignup',
        element: <CustomerSignup />,
      },
      {
        id: 54,
        path: 'usersignin',
        label: 'usersignin',
        element: <CustomerSignin />,
      },
    ],
  },
  {
    id: 60,
    path: '/dashboard',
    label: 'mypagelayout',
    element: <MypageLayout />,
    withAuth: true,
    children: [
      {
        id: 61,
        path: 'seller',
        label: 'sellerdashboard',
        element: <OwnerDashboard />,
      },
      {
        id: 62,
        path: 'user',
        label: 'userdashboard',
        element: <Mypage />,
      },
    ],
  },
  {
    id: 70,
    path: '/selectedsignup',
    label: 'selectedsignup',
    element: <SignupSelectionPage />,
    withAuth: false,
  },
  {
    id: 71,
    path: '/selectedsignin',
    label: 'selectedsignin',
    element: <SignInSelectionPage />,
    withAuth: false,
  },
  {
    id: 90,
    path: '/auth/kakao',
    label: 'kakaologin',
    element: <KaKao />,
    withAuth: false,
  },
]

function transformRoutes(routerArray: RouterElement[]): RouteObject[] {
  return routerArray.map((router) => {
    const routeElement = router.withAuth ? (
      <AuthComponent>{router.element}</AuthComponent>
    ) : (
      router.element
    )

    const routeObject: RouteObject = {
      path: router.path,
      element: routeElement,
    }

    if (router.children && router.children.length) {
      routeObject.children = transformRoutes(router.children)

      if (router.children.some((child) => child.withAuth)) {
        routeObject.element = <AuthComponent>{router.element}</AuthComponent>
      }
    }

    return routeObject
  })
}

export const routers: RemixRouter = createBrowserRouter(transformRoutes(routerData))
