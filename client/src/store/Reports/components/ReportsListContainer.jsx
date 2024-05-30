import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReportsAddForm from './ReportsAddForm';

import { addReport, fetchReports } from '../actions';

// import axios from 'axios';

const ReportsListContainer = () => {

    // const [ reports, setReports ] = useState([]);
    const [ message, setMessage ] = useState(null);
    const loggedUser = useSelector(state => state.users.logged_user);
    const reports = useSelector(state => state.reports.reports);
    const dispatch = useDispatch();

    console.log('report list render...');

    const submitHandler = async (event,report) => {
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

            // try{
            //     const response = await fetch(
            //         'http://localhost:5000/reports/',
            //         { 
            //             method: "POST", 
            //             headers:{ "Content-Type": "application/json" },
            //             body: JSON.stringify(data)
            //         }
            //     );
            //     if(response.ok){
            //         const data = await response;
            //         console.log('data reports', data);
            //         setMessage("Element listy został dodany");
            //     }
            // }catch(error){
            //     console.log('error',error);
            // }

        }
    }
    return(
        <>
            <div className="message">{ message }</div>
            <ReportsAddForm submitHandler={submitHandler} />
            <h1>Reports list</h1>
        </>
    )
}

export default ReportsListContainer;