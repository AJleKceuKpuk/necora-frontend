import Logout from "../pages/Auth/LogoutPage";
import Signin from "../pages/Auth/SinginPage";
import Signup from "../pages/Auth/SingupPage";
import Start from "../pages/Start/Start";
import Recovery from "../pages/Auth/RecoveryPage";

export const publicRoutes = [
    { path: '/', element: <Start /> },
    { path: '/logout', element: <Logout /> },
];

export const guestRoutes = [
    { path: '/signin', element: <Signin /> },
    { path: '/signup', element: <Signup /> },
    { path: "/recovery", element: <Recovery />},
];

export const privateRoutes = [
    // { path: '/game', element: <Game /> },
];
