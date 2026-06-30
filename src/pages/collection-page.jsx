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

    const [error, setError] = useState("");
    const [searchValue, setSearchValue] = useState("");

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    }

    function handleChange(e) {
        setForm(prev => ({...prev, 
            [e.target.name]: e.target.value}))
    }

    function handleSubmit(e) {
        e.preventDefault();
        addMod();
    }

    function addMod() {
        const hasEmptyField = Object.values(form).some(field => field.trim().length === 0)
        if (hasEmptyField) {
            setError("Введите все значения формы")
            return;
        }

        const hasInvalidUrl = [form.link, form.image].some(field => !isValidUrl(field.trim()));
        if (hasInvalidUrl) {
            setError("Введите корректное значение ссылки, например: https://example.com")
            return;
        }

        const mod = {
            id: Date.now(),
            title: form.title.trim(),
            description: form.description.trim(),
            link: form.link.trim(),
            image: form.image.trim()
        }

        setCollections(prev => prev.map(collection => (
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
            setCollections(prev =>
                prev.map(collection => (
                    collection.id === Number(id) ? {...collection, 
                        mods: collection.mods.filter(mod => mod.id !== modId)}
                    : collection
                ))
            );
        }
    
    function saveMod(newEditMod) {
        setCollections(prev => 
            prev.map(collection => (
                collection.id === Number(id) 
                ? {...collection, 
                    mods: collection.mods.map(mod => 
                        newEditMod.id === mod.id ? {
                            ...newEditMod
                        } : mod)}
                : collection
            ))
        );
    }

    const filteredMods = currentCollection.mods.filter(mod => 
        mod.title.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
    
    return (
        <div>
            <h3>{currentCollection.title}</h3>
            <form id="mod-form" 
            onSubmit={handleSubmit}>

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

                {error && <p className="erroe">{error}</p>}

                <button type="submit">Добавить мод</button>
            </form>

            <label htmlFor="search-input">Поиск по названию мода: </label>
            <input id="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}/>

            <ul>
                {filteredMods.map(mod => (
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