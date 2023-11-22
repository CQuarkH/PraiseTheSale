import ConfirmAccount from "../pages/auth/ConfirmAccount";
import ForgotPassword from "../pages/auth/ForgotPassword";
import LoginRegister from "../pages/auth/LoginRegister";
import ResetPassword from "../pages/auth/ResetPassword";

export const authRoutes = [
  {
    path: "/login",
    component: LoginRegister,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/confirm-account",
    component: ConfirmAccount,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
  },
];
