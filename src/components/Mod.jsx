import { useState } from "react"

function Mod({ mod, removeMod, saveMod }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(mod.title);
    return (
        <div>
            <li>
                {isEditing ? (
                    <>
                    <input value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}/>
                    <button onClick={() => {
                        saveMod(mod.id, editValue);
                        setIsEditing(false);
                    }}>Сохранить</button>
                    </>
                ) : (
                    <>
                    <span>{mod.title}</span>
                    <button onClick={() => setIsEditing(true)}>Редактировать</button>
                    <button onClick={() => removeMod(mod.id)}>Удалить мод</button>
                    </>
                )} 
            </li>
        </div>
    )
}

export default Mod