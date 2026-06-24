import { useState } from "react";
import {Link} from "react-router-dom";

function Collection({collection, removeCollection}) {
    return (
        <li>
            <Link to={`/collection/${collection.id}`}>{collection.title}</Link>
            <button onClick={() => removeCollection(collection.id)}>Удалить</button>
        </li>
    )
}

export default Collection