import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addReport, removeReport } from '../actions';
import ReportsAddForm from './ReportsAddForm';
import ReportsMonthSelector from './ReportsMonthSelector';
import ReportsItem from './ReportsItem';
import ReportsSummary from './ReportsSummary';

import ReportsPeymentsMessages from '../../ReportsPayments/components/ReportsPeymentsMessages';
import ReportsPaymentsForm from '../../ReportsPayments/components/ReportsPaymentsForm';
import { summaryPayments } from './ReportsSummary';

import { salary } from '../../ini';

import styles from '../styles/basic.module.css';

const presentMonth = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    return parseInt(month);
}

const ReportsListContainer = () => {

    console.log('reports container render...');

    const loggedUser = useSelector(state => state.users.logged_user);
    const reportsList = useSelector(state => state.reports.reports);

    const mySalary = salary.find(element=>element.id==='5d97128b60880011b0425489'); // it has to be change when will be added selecting employees from the list loggedUser._id

    const [ message, setMessage ] = useState(null);
    const [ month, setMonth ] = useState(presentMonth());
    // const [ reports, setReports ] = useState([]);
    const [ filteredReports, setFilteredReports ] = useState();

    const dispatch = useDispatch();

    // useEffect(() => {
    //     setTimeout(() => {
    //         setMessage(null);
    //     },5000);
    // },[message]);
    
    // useEffect(() => {
    //     // setReports(reportsList);
    //     const selected = Reportselector();
    //     setFilteredReports(selected);
    // },[reportsList]);

    const Reportselector = useCallback(() => {
        const selected = reportsList.filter(row => {
            const d = new Date(row.date);
            const m = d.getMonth() + 1;
            // console.log('month',month);
            // console.log('m',m);
            if(m === month){
                return row;  
            }else{
                return false;
            }
        });
        return selected ;
    },[month,reportsList]);

    useEffect(()=>{
        const selected = Reportselector(reportsList);
        setFilteredReports(selected);
    },[month,reportsList,Reportselector]);

    const submitHandler = (event,report) => {
        event.preventDefault();
        if(report.date && report.description && report.Marian && report.Piotrek){

            const data = {
                userId: loggedUser._id,
                date: report.date,
                description: report.description,
                Marian: report.Marian,
                Piotrek: report.Piotrek
            }
            dispatch(addReport(data));
            setMessage('Rekord został dodany');
        }
    }

    const deleteHandler = (id) => {
        if(window.confirm("Jeśli chcesz usunąć wybierz tak") === true){
            dispatch(removeReport(id));
            setMessage('Rekord został usunięty');
        }
    }

    const changeMonthHandler = (event) => {
        setMonth(parseInt(event.target.value));
    }

    console.log('filteredReports',filteredReports);

    const list = filteredReports && filteredReports.length > 0 && filteredReports.map((report,index)=>{
                    report.number = index + 1;
                    return( <ReportsItem item={report} key={index} deleteHandler={deleteHandler} /> )
    });

    const content = filteredReports && filteredReports.length > 0 ? 
        <table className={styles.table}>
            <tbody>
                <tr className={styles.tr}><th>Nr</th><th>Dzień</th><th>Opis</th><th>Marian godz.</th><th>Piotrek godz.</th></tr>
                { list }
            </tbody> 
        </table> : 'Brak wyników dla wybranego miesiąca';

    const peymentsList = filteredReports && mySalary.prices.map(employer => {
            const { summarySalary } = summaryPayments(employer,filteredReports);
            return <ReportsPaymentsForm key={employer.id} employerName={employer.name} employerId={employer.id} employeeId={mySalary.id} summarySalary={summarySalary} month={month}/>
        }
    )

    return(
        <div className={styles["reports-list-container-box"]}>
            <ReportsPeymentsMessages />
            <header>
                { filteredReports && <ReportsMonthSelector selectedMonth={month} changeMonthHandler={changeMonthHandler} /> }
                <div>{ peymentsList }</div>
            </header>
            { message && <div className={styles.message}>{ message }</div> }
            { filteredReports && <ReportsAddForm submitHandler={submitHandler} /> }
            <div className={styles['report-items-box']}>{ content }</div>
            { filteredReports && <ReportsSummary employers={mySalary.prices} reports={filteredReports} /> }
        </div>
    )
}

export default ReportsListContainer;