import { useParams } from "react-router-dom"
import { useState } from "react";
import Mod from "../components/Mod";

function CollectionPage({ collections, setCollections }) {
    const { id } = useParams();
    const [inputValue, setInputValue] = useState("");
    const currentCollection = collections.find(collection => collection.id === Number(id));
    if (!currentCollection) {
        return (
            <div>
                <h3>Коллекция не найдена</h3>
            </div>
        )
    }

    function addMod(id) {
        const value = inputValue.trim();
        if (!value) return;

        const mod = {
            title: value,
            id: Date.now()
        }

        setCollections(collections.map(collection => (
            collection.id === Number(id)
            ? {...collection, mods: [...collection.mods, mod]}
            : collection)
            )
        )
        setInputValue("");
    }

    function removeMod(modId) {
            setCollections(
                collections.map(collection => (
                    collection.id === Number(id) ? {...collection, 
                        mods: collection.mods.filter(mod => mod.id !== modId)}
                    : collection
                ))
            );
        }
    
    function saveMod(modId, newText) {
        setCollections(
            collections.map(collection => (
                collection.id === Number(id) 
                ? {...collection, 
                    mods: collection.mods.map(mod => 
                        modId === mod.id ? {...mod, title: newText} : mod)}
                : collection
            ))
        );
    }
    
    return (
        <div>
            <h3>{currentCollection.title}</h3>
            <label htmlFor="mod-input">Введите название мода: </label>
            <input id="mod-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}/>
            <button onClick={() => addMod(currentCollection.id)}>Добавить мод</button>
            <ul>
                {currentCollection.mods.map(mod => (
                    <Mod key={mod.id}
                    mod={mod}
                    removeMod={removeMod}
                    saveMod={saveMod}/>
                ))}
            </ul>
        </div>
    )
}

export default CollectionPage