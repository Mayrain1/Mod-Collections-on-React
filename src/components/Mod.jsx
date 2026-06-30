import { useState } from "react"

function Mod({ mod, removeMod, saveMod }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(null);

    function handleChange(e) {
        setEditForm(prev => ({...prev, [e.target.name]: e.target.value }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        saveMod({...editForm, 
                title: editForm.title.trim(),
                description: editForm.description.trim(),
                link: editForm.link.trim(),
                image: editForm.image.trim()
            });
        setIsEditing(false);
    }

    return (
        <>
            <li>
                {isEditing 
                    ? (
                    <>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="mod-input-title">Введите название мода: </label>
                        <input id="mod-input-title"
                        name="title"
                        value={editForm.title}
                        onChange={handleChange}/>

                        <label htmlFor="mod-input-description">Введите описание мода: </label>    
                        <input id="mod-input-description"
                        name="description"
                        value={editForm.description}
                        onChange={handleChange}/>

                        <label htmlFor="mod-input-link">Введите адрес мода: </label>
                        <input id="mod-input-link"
                        name="link"
                        value={editForm.link}
                        onChange={handleChange}/>

                        <label htmlFor="mod-input-image">Введите адрес картинки: </label>
                        <input id="mod-input-image"
                        name="image"
                        value={editForm.image}
                        onChange={handleChange}/>

                        <button type="submit">Сохранить</button>
                        <button type="button" 
                        onClick={() => setIsEditing(false)}>Отмена</button>
                    </form>
                    </>
                    ) 

                    : (
                    <>
                    <img src={mod.image} alt="mod image"/> 
                    <h3>{mod.title}</h3>
                    <p>{mod.description}</p>
                    <a href={mod.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    >Ссылка на мод</a>
                    <button onClick={() => {
                        setEditForm({...mod});
                        setIsEditing(true)}}>Редактировать</button>
                    <button onClick={() => removeMod(mod.id)}>Удалить мод</button>
                    </>
                    )} 
            </li>
        </>
    )
}

export default Mod