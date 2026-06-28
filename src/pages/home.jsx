import { use, useState } from "react";
import Collection from "../components/Collection";

function Home({ collections, setCollections }) {
  const [collectionForm, setCollectionForm] = useState({
    title: "",
    description: ""
  });

  const [searchValue, setSearchValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addCollection();
  }

  function handleChange(e) {
    setCollectionForm({...collectionForm, [e.target.name]: e.target.value});
  }

  function addCollection() {
    const hasEmptyField = Object.values(collectionForm).some(field => field.trim().length === 0);
    if (hasEmptyField) return;
   
    const collection = {
      id: Date.now(),
      title: collectionForm.title.trim(),
      description: collectionForm.description.trim(),
      mods: []
    }

    setCollections([...collections, collection]);
    setCollectionForm({
      title: "",
      description: ""
    });
  }

  function removeCollection(id) {
    setCollections(collections.filter(collection => id !== collection.id));
  }

  const filteredCollections = collections.filter(col => 
    col.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="container">
      <label htmlFor="collection-search-input">Введите название чтобы найти коллекцию: </label>
      <input id="collection-search-input"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}/>

      <form onSubmit={handleSubmit}>
          <label htmlFor="collection-title">Введите название коллекции: </label>
          <input id="collection-title"
          name="title"
          value={collectionForm.title}
          onChange={handleChange}/>

           <label htmlFor="collection-title">Введите описание коллекции: </label>
          <input id="collection-description"
          name="description"
          value={collectionForm.description}
          onChange={handleChange}/>
          <button onClick={addCollection}>Добавить коллекцию</button>
      </form>

      <ul className="collections-list">
        {filteredCollections.map(collection => (
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