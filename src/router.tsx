import { createBrowserRouter } from 'react-router-dom'
import { Router as RemixRouter } from '@remix-run/router/dist/router'
import AuthComponent from './auth/AuthComponent'
import GeneralLayout from './layout/GeneralLayout'
import SignLayout from './layout/SignLayout'
import MypageLayout from './layout/MypageLayout'
import OwnerDashboard from './pages/OwnerDashboard/OwnerDashboard'
import CustomerSignup from './pages/CustomerSignup/CustomerSignup'
import Main from './pages/Main'
import Mypage from './components/Mypage/Mypage'
import CustomerSignin from './pages/CustomerSignin/CustomerSignin'
import OwnerSignup from './pages/OwnerSignup/OwnerSignup'
import OwnerSignin from './pages/OwnerSignin/OwnerSignin'

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
    ],
  },
  {
    id: 50,
    path: '/123',
    label: 'signlayout',
    element: <SignLayout />,
    withAuth: false,
    children: [
      {
        id: 51,
        path: '',
        label: 'test',
        element: <OwnerSignup />,
      },
      {
        id: 51,
        path: '50',
        label: 'test',
        element: <OwnerSignin />,
      },
    ],
  },
  {
    id: 60,
    path: '/11',
    label: 'mypagelayout',
    element: <MypageLayout />,
    withAuth: false,
    children: [
      {
        id: 61,
        path: '',
        label: 'test',
        element: <OwnerDashboard />,
      },
    ],
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
