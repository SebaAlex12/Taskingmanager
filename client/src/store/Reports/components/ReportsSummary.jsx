import styles from '../styles/basic.module.css';

export const summaryPayments = (employer,reports) => {
    const totalHours = reports.reduce((total, item)=> total + item[employer.name],0);
    const summarySalary = totalHours * employer.price;
    return {
        employerHourPrice:employer.price,
        totalHours,
        summarySalary
    }
}

const ReportsSummary = ({ employers, reports }) => {

    const content = employers.map(employer => {
        const { employerHourPrice, totalHours, summarySalary } = summaryPayments(employer,reports);
        return <div key={employer.id}><span>{ employer.name }</span>: <span>{ totalHours } * { employerHourPrice } = { summarySalary }</span>&nbsp;</div>
    });

    return(
        <div className={styles['reports-summary']}>
            { content }
        </div>
    )

};
export default ReportsSummary;