import React, { useEffect } from 'react'
import { categories, posts } from '../../dummyData'
import PostList from '../../components/posts/PostList'
import Sidebar from '../../components/sidebar/Sidebar'
import Pagination from '../../components/pagination/Pagination'

function PostsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar categories={categories}/>
      </section>
      <Pagination 
      //  pages={pages} 
      //  currentPage={currentPage}
      //  setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default PostsPage