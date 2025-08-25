import Signin from "../pages/Auth/SinginPage";
import Signup from "../pages/Auth/SingupPage";
import Start from "../pages/Start/Start";
import Activate from "../pages/Auth/ActivationPage"
import About from "./../pages/About"
import Logout from "./../pages/Auth/LogoutPage"
import Recovery from "./../pages/Auth/RecoveryPage"

export const routes = [

    { path: '/', element: <Start />, meta: { public: true } },
    { path: '/forum', element: <About />, meta: { public: true } },

    { path: '/signin', element: <Signin />, meta: { guestOnly: true } },
    { path: '/signup', element: <Signup />, meta: { guestOnly: true } },
    
    { path: '/recovery', element: <Recovery />, meta: { guestOnly: true } },

    { path: '/logout', element: <Logout />, meta: { auth: true } },
    { path: '/profile', element: <About />, meta: { auth: true } },

    { path: '/activate', element: <Activate />, meta: { auth: true, onlyIfNotActivated: true } },


    { path: '/admin', element: <About />, meta: { auth: true, roles: ['ADMIN'] } },
    { path: '/moderator', element: <About />, meta: { auth: true, roles: ['moderator', 'ADMIN'] } },
];
