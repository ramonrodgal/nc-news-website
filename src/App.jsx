import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ArticlesList from "./pages/ArticlesList";
import Article from "./pages/Article";
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
        <Route path="/articles/:topic" element={<ArticlesList />} />
        <Route path="/articles/:topic/:article_id" element={<Article />} />
        <Route path="/users/:username" element={<User />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
