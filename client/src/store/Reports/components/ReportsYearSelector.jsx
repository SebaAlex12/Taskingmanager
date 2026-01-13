const ReportsYearSelector = ({ selectedYear, changeYearHandler }) => {
    return (
        <select name="" id="" onChange={changeYearHandler} defaultValue = {selectedYear}>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
        </select>
    )
}
export default ReportsYearSelector;