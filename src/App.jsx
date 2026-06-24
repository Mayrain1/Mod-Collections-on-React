import { useState, useEffect} from "react"
import {Link, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/home";
import CollectionPage from "./pages/collection-page";

function App() {
  const [collections, setCollections] = useState(() => {
    const saved = localStorage.getItem("collections");
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(collections))
  }, [collections]);

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={
          <Home 
          collections={collections} 
          setCollections={setCollections}/>
          }/>
        <Route path="/collection/:id" element={
          <CollectionPage
          collections={collections}
          setCollections={setCollections}/>
          }/>
      </Routes>
    </Router>
  )
}

export default App