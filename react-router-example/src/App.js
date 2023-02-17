import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <Router>
      <nav style={{ margin: 10 }}>
        <Link to='/' style={{ padding: 5 }}>
          Home
        </Link>
        <Link to='/about' style={{ padding: 5 }}>
          About
        </Link>
        <Link to='/posts' style={{ padding: 5 }}>
          Posts
        </Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/posts' element={<Posts />} >
          <Route path='/posts' element={<PostLists />} />
          <Route path=':slug' element={<Post />} />
        </Route>
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Home View</h2>
      <p>Home View paragraph.</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About View</h2>
      <p>About View paragraph.</p>
    </div>
  );
}

const BlogPosts = {
  '1': {
    title: 'First Blog Post',
    description: 'Blog Post 1 desc'
  },
  '2': {
    title: 'Second Blog Post',
    description: 'Blog Post 2 desc'
  }
}

function Posts() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Blog</h2>
      {/* render any matching child */}
      <Outlet />
    </div>
  );
}

function Post() {
  const { slug } = useParams();
  const post = BlogPosts[ slug ];
  const { title, description } = post;
  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function PostLists() {
  return (
    <ul>
      {Object.entries( BlogPosts ).map( ( [ slug, { title } ] ) => (
        <li key={slug}>
          <Link to={`/posts/${ slug }`}>
            <h3>{title}</h3>
          </Link>
        </li>
      ) )}
    </ul>
  );
}

export default App;
