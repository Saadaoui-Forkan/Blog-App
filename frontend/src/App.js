import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/posts-page/PostsPage";
import CreatePost from "./pages/create-post/CreatePost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import { ToastContainer } from 'react-toastify'
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter >
      <ToastContainer theme="colored"/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        {/* posts nested route */}
        <Route path="posts">
          <Route index element={<PostsPage/>}/>
          <Route path="create-post" element={<CreatePost/>}/>
          <Route path="categories/:category" element={<Category/>}/>
          <Route path="details/:id" element={<PostDetails/>}/>
        </Route>
        
        <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
