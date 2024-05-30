const ReportsMonthSelector = ({ selectedMonth, changeMonthHandler }) => {
    return (
        <select name="" id="" onChange={changeMonthHandler} defaultValue = {selectedMonth}>
            <option value="1">Styczeń</option>
            <option value="2">Luty</option>
            <option value="3">Marzec</option>
            <option value="4">Kwiecień</option>
            <option value="5">Maj</option>
            <option value="6">Czerwiec</option>
            <option value="7">Lipiec</option>
            <option value="8">Sierpień</option>
            <option value="9">Wrzesień</option>
            <option value="10">Pażdziernik</option>
            <option value="11">Listopad</option>
            <option value="12">Grudzień</option>
        </select>
    )
}
export default ReportsMonthSelector;