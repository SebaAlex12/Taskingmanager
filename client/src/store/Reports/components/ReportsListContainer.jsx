import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addReport, removeReport } from '../actions';
import { fetchReportsPayments } from '../../ReportsPayments/actions';
import ReportsAddForm from './ReportsAddForm';
import ReportsMonthSelector from './ReportsMonthSelector';
import ReportsItem from './ReportsItem';
import ReportsSummary from './ReportsSummary';

import ReportsPaymentsForm from '../../ReportsPayments/components/ReportsPaymentsForm';

import { salary } from '../../ini';

import styles from '../styles/basic.module.css';

const presentMonth = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    return parseInt(month);
}

const ReportsListContainer = () => {

    const loggedUser = useSelector(state => state.users.logged_user);
    const reportsList = useSelector(state => state.reports.reports);

    const [ message, setMessage ] = useState(null);
    const [ month, setMonth ] = useState(presentMonth());
    // const [ reports, setReports ] = useState([]);
    const [ filteredReports, setFilteredReports ] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchReportsPayments());
    },[]);

    useEffect(() => {
        setTimeout(() => {
            setMessage(null);
        },5000);
    },[message]);
    
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

    const list = filteredReports.length > 0 && filteredReports.map((report,index)=>{
                    report.number = index + 1;
                    return( <ReportsItem item={report} key={index} deleteHandler={deleteHandler} /> )
    });

    const content = filteredReports.length > 0 ? 
        <table className={styles.table}>
            <tbody>
                <tr className={styles.tr}><th>Nr</th><th>Dzień</th><th>Opis</th><th>Marian godz.</th><th>Piotrek godz.</th></tr>
                { list }
            </tbody> 
        </table> : 'Brak wyników dla wybranego miesiąca';

    return(
        <div className={styles["reports-list-container-box"]}>
            <header>
                <ReportsMonthSelector selectedMonth={month} changeMonthHandler={changeMonthHandler} />
                <div>
                    <ReportsPaymentsForm employerName={salary.employer_first} month={month}/>
                    <ReportsPaymentsForm employerName={salary.employer_second} month={month}/>
                </div>
            </header>
            { message && <div className={styles.message}>{ message }</div> }
            <ReportsAddForm submitHandler={submitHandler} />
            <div className={styles['report-items-box']}>{ content }</div>
            <ReportsSummary MarianSalary={salary.Franek.Marian} PiotrekSalary={salary.Franek.Piotrek} reports={filteredReports} />
        </div>
    )
}

export default ReportsListContainer;