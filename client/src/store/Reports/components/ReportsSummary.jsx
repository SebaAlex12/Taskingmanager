import styles from '../styles/basic.module.css';

const ReportsSummary = ({ employers, reports }) => {

    const content = employers.map(employer => {
        const TotalHours = reports.reduce((total, item)=> total + item[employer.name],0);
        const MSalary = TotalHours * employer.price;
        return <div key={employer.id}><span>{ employer.name }</span>: <span>{ TotalHours } * { employer.price } = { MSalary }</span>&nbsp;</div>
    });

    return(
        <div className={styles['reports-summary']}>
            { content }
        </div>
    )

};
export default ReportsSummary;