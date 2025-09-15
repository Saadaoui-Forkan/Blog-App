import { useParams, Link } from "react-router-dom";
import "./category.css";
import PostList from "../../components/posts/PostList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";

const Category = () => {
  const dispatch = useDispatch();
  const { postsCate } = useSelector((state) => state.post);

  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category, dispatch]);

  return (
    <section className="category">
      {postsCate.length === 0 ? (
        <div className="category-not-found-container">
          <h1 className="category-not-found-title">
            Posts with <span>{category}</span> category not found
          </h1>
          <Link to="/posts" className="category-not-found-link">
            Go to posts page
          </Link>
        </div>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postsCate} />
        </>
      )}
    </section>
  );
};

export default Category;
