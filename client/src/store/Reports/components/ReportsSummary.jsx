import styles from '../styles/basic.module.css';

const ReportsSummary = ({ MarianSalary, PiotrekSalary, reports }) => {
    const MarianTotalHours = reports.reduce((total, item)=> total + item.Marian, 0);
    const MSalary = MarianTotalHours * MarianSalary;

    const PiotrekTotalHours = reports.reduce((total, item)=> total + item.Piotrek, 0);
    const PSalary = PiotrekTotalHours * PiotrekSalary;

    return(
        <div className={styles['reports-summary']}>
            <div>
                <span>  Marian: </span>{ MarianTotalHours } * { MarianSalary } = { MSalary } /  
                <span> Piotrek: </span>{ PiotrekTotalHours } * { PiotrekSalary } = { PSalary }
            </div>
        </div>
    )

};
export default ReportsSummary;