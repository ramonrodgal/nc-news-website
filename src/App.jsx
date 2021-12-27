import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ArticlesList from "./pages/ArticlesList";
import Article from "./pages/Article";
import CreateArticle from "./pages/CreateArticle";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/create-article" element={<CreateArticle />} />
        <Route path="/articles/:topic" element={<ArticlesList />} />
        <Route path="/articles/:topic/:article_id" element={<Article />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/users/:username" element={<User />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
