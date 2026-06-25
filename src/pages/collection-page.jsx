import { useParams } from "react-router-dom"
import { useState } from "react";
import Mod from "../components/Mod";

function CollectionPage({ collections, setCollections }) {
    const { id } = useParams();
    const [form, setForm] = useState({
        title: "",
        description: "",
        link: "",
        image: ""
    });
    const currentCollection = collections.find(collection => collection.id === Number(id));
    if (!currentCollection) {
        return (
            <div>
                <h3>Коллекция не найдена</h3>
            </div>
        )
    }

    function handleChange(e) {
        setForm({...form, 
            [e.target.name]: e.target.value})
    }

    function addMod(id) {
        const hasEmptyField = Object.values(form).some(field => field.trim().length === 0)
        if (hasEmptyField) return;

        const mod = {
            id: Date.now(),
            title: form.title.trim(),
            description: form.description.trim(),
            link: form.link.trim(),
            image: form.image.trim()
        }

        setCollections(collections.map(collection => (
            collection.id === Number(id)
            ? {...collection, mods: [...collection.mods, mod]}
            : collection)
            )
        )
        setForm({
            title: "",
            description: "",
            link: "",
            image: ""
        });
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
            <form>

                <label htmlFor="mod-input-title">Введите название мода: </label>
                <input id="mod-input-title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}/>

                <label htmlFor="mod-input-description">Введите описание: </label>
                <input id="mod-input-description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}/>

                <label htmlFor="mod-input-link">Введите ссылку на мод: </label>
                <input id="mod-input-link"
                    name="link"
                    value={form.link}
                    onChange={handleChange}/>

                <label htmlFor="mod-input-image">Введите ссылку на картинку мода: </label>
                <input id="mod-input-image"
                    name="image"
                    value={form.image}
                    onChange={handleChange}/>

                <button onClick={() => addMod(currentCollection.id)}>Добавить мод</button>
            </form>
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