import { useParams, Link } from "react-router-dom";
import "./category.css";
import PostList from "../../components/posts/PostList";
import { posts } from "../../dummyData";
import { useEffect } from "react";

const Category = () => {
  const { category } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="category">
      {/* {posts.length === 0 ? (
        <>
          <h1 className="category-not-found">
            Posts with <span>{category}</span> category not found
          </h1>
          <Link to="/posts" className="category-not-found-link">
            Go to posts page
          </Link>
        </>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={posts} />
        </>
      )} */}

      <h1 className="category-title">Posts based on {category}</h1>
      <PostList posts={posts} />
    </section>
  );
};

export default Category;