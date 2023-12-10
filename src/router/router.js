import { createBrowserRouter } from "react-router-dom";
import Login from "../page/login/Login";
import Error from "../page/error/Error";
import HomePage from "../page/home-page/HomePage";
import ReviewDetails from "../page/review-details/ReviewDetails";
import SubmitsStatus from "../page/submits-status/SubmitsStatus";
const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <Error /> },
  { path: "/home-page", element: <HomePage /> },
  { path: "/review-details", element: <ReviewDetails /> },
  { path: "/submits-status", element: <SubmitsStatus /> },
]);

export default router;
