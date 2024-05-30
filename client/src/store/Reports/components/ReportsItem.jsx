const ReportsItem = ({item, deleteHandler}) => {
    return <tr>
        <td rel="number">{item.number}</td>
        <td rel="date">{item.date}</td>
        <td rel="description">{item.description}</td>
        <td rel="number">{item.Marian}</td>
        <td rel="number">{item.Piotrek}</td>
        <td rel="delete"><button onClick={() => deleteHandler(item._id)}>usuń</button></td>
    </tr>
}
export default ReportsItem;