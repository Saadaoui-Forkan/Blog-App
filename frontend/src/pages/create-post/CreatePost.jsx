import React, {useState, useEffect} from 'react';
import './create-post.css';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { createPost } from '../../redux/apiCalls/postApiCall';
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from '../../redux/apiCalls/categoryApiCall';

function CreatePost() {
  const dispatch = useDispatch();
  const { loading, isPostcreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault()
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    if (!file) return toast.error("Post Image is required");
    
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData))
  }

  const navigate = useNavigate();
  useEffect(()=>{
    if (isPostcreated) {
      navigate("/");
    }
  }, [ isPostcreated, navigate])

  useEffect(()=>{
    dispatch(fetchCategories())
  }, [])

  return (
    <section className="create-post">
      <h1 className="create-post-title">Create New Post</h1>
      <form className="create-post-form" onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <select
          className="create-post-input"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          {
            categories.map((cat) => (
              <option value={cat?.title} key={cat?._id}>
                {cat?.title}
              </option>
            ))
          }
        </select>
        <textarea
          className="create-post-textarea"
          rows="5"
          placeholder="Post Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
          onChange={(e)=>setFile(e.target.files[0])}
        />
        <button type="submit" className="create-post-btn">
          {loading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </section>
  )
}

export default CreatePost