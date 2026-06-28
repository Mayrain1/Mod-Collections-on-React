import { useState } from "react";
import {Link} from "react-router-dom";

function Collection({collection, removeCollection}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(null);
    return (
        <li>
            {isEditing ? (<>

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