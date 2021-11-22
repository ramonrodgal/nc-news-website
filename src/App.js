import './App.css';
import { Routes, Route } from 'react-router-dom';

import ArticlesList from './components/ArticlesList';
import Article from './components/Article';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import User from './components/User';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path='/articles/:topic' element={<ArticlesList />} />
        <Route path="/articles/:topic/:article_id" element={<Article />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/users/:user_id" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
