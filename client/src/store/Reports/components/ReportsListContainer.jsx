import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReportsAddForm from './ReportsAddForm';
const ReportsListContainer = () => {

    // const [ reports, setReports ] = useState([]);
    const [ message, setMessage ] = useState(null);
    const loggedUser = useSelector(state => state.users.logged_user);

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
            const jsonData = JSON.stringify(data);

            console.log('jsonData',jsonData);

            const response = await fetch(
                'http://localhost:5000/reports/',
                { 
                    method: "POST", 
                    headers:{ "Content-Type": "application/json", body: data } 
                }
            );

            if(response){
                console.log('response',response);
                const data = await response;
                console.log('data', data);
            }

            // console.log('data',data);
        }else{
            setMessage('Rekord nie został dodany');
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