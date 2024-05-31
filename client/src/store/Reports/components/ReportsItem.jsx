import { useState } from 'react';

import ModalBox from "../../../common/ModalBox";
import ReportsEditForm from "./ReportsEditForm";

const ReportsItem = ({item, deleteHandler}) => {
    const [ editModal, setEditModal ] = useState(false);

    return <tr>
        <td rel="number">{item.number}</td>
        <td rel="date">{item.date}</td>
        <td rel="description">{item.description}</td>
        <td rel="number">{item.Marian}</td>
        <td rel="number">{item.Piotrek}</td>
        <td rel="edit"><button onClick={() => setEditModal(true)}>
            edytuj
        </button></td>
        <td rel="delete"><button onClick={() => deleteHandler(item._id)}>usuń</button></td>
        { editModal && <ModalBox modalLevel={2} title="Edycja raportu" closeHandler={() => setEditModal(false)}><ReportsEditForm closeModalHandler={()=>setEditModal(false)} report={item} /></ModalBox> }
    </tr>
}
export default ReportsItem;