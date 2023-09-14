import { createBrowserRouter } from 'react-router-dom'
import { Router as RemixRouter } from '@remix-run/router/dist/router'
import AuthComponent from './auth/AuthComponent'
import GeneralLayout from './layout/GeneralLayout'
import SignLayout from './layout/SignLayout'
import MypageLayout from './layout/MypageLayout'
import OwnerDashboard from './pages/OwnerDashboard/OwnerDashboard'
import { Store } from './pages/Store'
import CategoryMain from './pages/CategoryMain/CategoryMain'
import OwnerSignup from './pages/OwnerSignup/OwnerSignup'
import OwnerSignin from './pages/OwnerSignin/OwnerSignin'
import CustomerSignup from './pages/CustomerSignup/CustomerSignup'
import CustomerSignin from './pages/CustomerSignin/CustomerSignin'
import Mypage from './components/Mypage/Mypage/Mypage'
import SignupSelectionPage from './pages/SignupSelectionPage/SignupSelectionPage'
import SignInSelectionPage from './pages/SignInSelectionPage/SignInSelectionPage'
import Main from './pages/Main/Main'

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
        id: 1,
        path: '',
        label: 'Main',
        element: <Main />,
      },
      {
        id: 2,
        path: '/main',
        label: 'CategoryMain',
        element: <CategoryMain />,
      },
      {
        id: 3,
        path: '/store/:shopId',
        label: 'Store',
        element: <Store />,
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
    withAuth: false,
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
