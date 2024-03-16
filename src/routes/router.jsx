import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import { 
        Login,
        Dashboard,
        InboxLayout,
        ProtectedRoute,
        authenticate, 
        LogedIn, 
        BookBorrow, 
        BookBorrowRequest ,
        RequestInfo,
        ExtensionRequest,
        ExtentionList,
        ExtensionRequestInfo,
        Reservation,
        BookReservationRequest,
        BookReservationInfo
    } from "../components/linkImports";

export const router = createBrowserRouter([
    {
        path:'/',
        element:(
            <ProtectedRoute authenticate={authenticate}>
                <RootLayout/>
            </ProtectedRoute>
        ),
        children:[
            {
                path:'/',
                element:<Dashboard/>
            },
            {
                path:'inbox',
                element:<InboxLayout/>
            },
            {
                path:'book-borrow',
                element:<BookBorrow/>,
                children:[
                    {
                        path:'/book-borrow/request',
                        element:<BookBorrowRequest/>
                    },
                    {
                        path:'/book-borrow/request/:collectionID/:borrowerID/:requestID',
                        element:<RequestInfo/>
                    }
                ]
            },
            {
                path:'extension-request',
                element:<ExtensionRequest/>,
                children:[
                    {
                        path:'/extension-request/list',
                        element:<ExtentionList/>
                    },
                    {
                        path:'/extension-request/list/:requestID',
                        element:<ExtensionRequestInfo/>
                    }
                ]
            },
            {
                path:'reservation-request',
                element:<Reservation/>,
                children:[
                    {
                        path:'/reservation-request/list',
                        element:<BookReservationRequest/>
                    },
                    {
                        path:'/reservation-request/list/:collectionID/:borrowerID/:requestID',
                        element:<BookReservationInfo/>
                    }
                ]
            }
        ]
    },
    {
        path:'/form/login',
        element:(
            <LogedIn authenticate={authenticate}>
                <Login/>
            </LogedIn>
        )
    }
]);