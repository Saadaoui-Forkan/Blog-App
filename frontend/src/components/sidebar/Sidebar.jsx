import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

function Sidebar() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <div className="sidebar">
      <h5 className="sidebar-title">CATEGORIES</h5>
      <ul className="sidebar-links">
        {categories.map((category, i) => (
          <Link
            className="sidebar-link"
            key={i}
            to={`/posts/categories/${category}`}
          >
            {category}
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar