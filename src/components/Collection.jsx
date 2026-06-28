import { useState } from "react";
import {Link} from "react-router-dom";

function Collection({collection, removeCollection, saveCollection}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(null);

    function handleChange(e) {
        setEditForm({...editForm, [e.target.name]: e.target.value})
    }

    return (
        <li>
            {isEditing ? (<>
                <form>
                    <label htmlFor="collection-title">Введите название коллекции: </label>
                    <input id="collection-title"
                    name="title"
                    value={editForm.title}
                    onChange={handleChange}/>

                    <label htmlFor="collection-description">Введите описание коллекции: </label>
                    <input id="collection-description"
                    name="description"
                    value={editForm.description}
                    onChange={handleChange}/>
                    <button onClick={(e) => {
                        saveCollection(editForm);
                        setIsEditing(false);
                    }}>Сохранить коллекцию</button>
                    <button onClick={() => setIsEditing(false)}>Отмена</button>
                </form>
            </>)
            : (
            <>
            <Link to={`/collection/${collection.id}`}>{collection.title}</Link>
            <p>{collection.description}</p>
            <button onClick={() => removeCollection(collection.id)}>Удалить</button>
            <button onClick={() => {
                setEditForm({...collection})
                setIsEditing(true)
            }}>Редактировать</button>
            </>)}
        </li>
    )
}

export default Collection