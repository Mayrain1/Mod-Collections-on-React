import { useState } from "react";
import Collection from "../components/Collection";

function Home({ collections, setCollections }) {
  const [inputValue, setInputValue] = useState("");

  function addCollection() {
    const value = inputValue.trim();
    if (!value) return;
   
    const collection = {
      id: Date.now(),
      title: value,
      description: null,
      mods: []
    }

    setCollections([...collections, collection]);
    setInputValue("");
  }

  function removeCollection(id) {
    setCollections(collections.filter(collection => id !== collection.id));
  }

  return (
    <div className="container">
      <label htmlFor="collection-title">Введите значение: </label>
      <input id="collection-title"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}/>
      <button onClick={addCollection}>Добавить</button>

      <ul className="collections-list">
        {collections.map(collection => (
          <Collection 
          key={collection.id}
          collection={collection}
          removeCollection={removeCollection}
          />
        ))}
      </ul>
    </div>
  )
}

export default Home