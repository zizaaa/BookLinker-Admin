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
        RequestInfo
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