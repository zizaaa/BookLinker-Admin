import { authenticate } from "../hooks/auth";
import ProtectedRoute from "../hooks/ProtectedRoutes";
import LogedIn from "../hooks/LogedIn";
import RootLayout from "../pages/RootLayout";
import Login from "../pages/forms/Login";
import Nav from "./navigationbar/Nav";
import SideNav from "./navigationbar/SideNav";
import Dashboard from "../pages/Dashboard";
import InboxLayout from "../pages/InboxLayout";
import toastError from "./toastModal/toastError";
import toastSuccess from "./toastModal/toastSuccess";
import axios from "axios";
import Spinner from './Spinner'
import cookie from "../hooks/cookie";
import admin from "../hooks/admin";
import BookBorrow from "../pages/BookBorrow";
import BookBorrowRequest from "./borrow/BookBorrowRequest";
import BookBorrowRequestTable from "./tables/BookBorrowRequestTable";
import RequestInfo from './borrow/RequestInfo'
import handleGetRequestInformations from "../hooks/handleGetRequestInformations";
import UserInfoCard from "./cards/UserInfoCard";
import BookInfoCard from "./cards/BookInfoCard";

export {
    RootLayout,
    Login,
    Nav,
    SideNav,
    Dashboard,
    InboxLayout,
    authenticate,
    ProtectedRoute,
    LogedIn,
    toastError,
    toastSuccess,
    axios,
    Spinner,
    cookie,
    admin,
    BookBorrow,
    BookBorrowRequest,
    BookBorrowRequestTable,
    RequestInfo,
    handleGetRequestInformations,
    UserInfoCard,
    BookInfoCard
}