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
import RequestInformationCard from "./cards/RequestInformationCard";
import ExtensionRequest from "../pages/ExtensionRequest";
import ExtensionRequestTable from "./tables/ExtensionRequestTable";
import ExtentionList from "./extension/ExtentionList";
import ExtensionRequestInfo from "./extension/ExtensionRequestInfo";
import getBookInfo from "../hooks/getBookInfo";
import getUserInfo from "../hooks/getUserInfo";
import getBorrowedBy from "../hooks/getBorrowedBy";
import ExtensionRequestInfoCard from "./cards/ExtensionRequestInfoCard";
import Reservation from "../pages/Reservation";
import BookReservationRequest from "./reservation/BookReservationRequest";
import BookReservationTable from "./tables/BookReservationTable";
import BookReservationInfo from "./reservation/BookReservationInfo";
import ReservationInfoCard from "./cards/ReservationInfoCard";

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
    BookInfoCard,
    RequestInformationCard,
    ExtensionRequest,
    ExtensionRequestTable,
    ExtentionList,
    ExtensionRequestInfo,
    getBookInfo,
    getUserInfo,
    getBorrowedBy,
    ExtensionRequestInfoCard,
    Reservation,
    BookReservationRequest,
    BookReservationTable,
    BookReservationInfo,
    ReservationInfoCard
}