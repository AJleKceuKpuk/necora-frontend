import Signin from "../pages/Auth/SinginPage";
import Signup from "../pages/Auth/SingupPage";
import Start from "../pages/Start/Start";
import Activate from "../pages/Auth/ActivationPage"
import About from "./../pages/About"
import Logout from "./../pages/Auth/LogoutPage"

export const routes = [
    {
        path: '/',
        element: <Start />,
        meta: { public: true }
    },
    {
        path: '/signin',
        element: <Signin />,
        meta: { guestOnly: true }
    },
    {
        path: '/signup',
        element: <Signup />,
        meta: { guestOnly: true }
    },
    {
        path: '/logout',
        element: <Logout />,
        meta: { auth: true }
    },
    {
        path: '/chat',
        element: <About />, //Временно!
        meta: { auth: true, activationRequired: true }
    },
    {
        path: '/activate',
        element: <Activate />,
        meta: { auth: true, onlyIfNotActivated: true }
    },
    {
        path: '/profile',
        element: <About />, //Временно
        meta: { auth: true }
    },
    {
        path: '/admin',
        element: <About />, //Временно
        meta: { auth: true, roles: ['admin'] }
    },
    {
        path: '/moderator',
        element: <About />, //Временно
        meta: { auth: true, roles: ['moderator', 'admin'] }
    },
];
