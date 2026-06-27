import { useState } from "react"

function Mod({ mod, removeMod, saveMod }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(null);

    function handleChange(e) {
        setEditForm({...editForm, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <li>
                {isEditing 
                    ? (
                    <>
                    <form>
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
                    </form>
                    <button onClick={() => {
                        saveMod(editForm);
                        setIsEditing(false);
                    }}>Сохранить</button>
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
                        setEditForm({
                            ...mod});
                        setIsEditing(true)}}>Редактировать</button>
                    <button onClick={() => removeMod(mod.id)}>Удалить мод</button>
                    </>
                    )} 
            </li>
        </div>
    )
}

export default Mod