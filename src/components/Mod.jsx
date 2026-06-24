function Mod({ mod, removeMod }) {
    return (
        <div>
            <li>
                <span>{mod.title}</span>
                <button onClick={() => removeMod(mod.id)}>Удалить мод</button>
            </li>
        </div>
    )
}

export default Mod