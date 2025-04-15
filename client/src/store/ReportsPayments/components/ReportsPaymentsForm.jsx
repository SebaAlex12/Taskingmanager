import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addReportPayments, updateReportPayments } from '../actions';

import { DefaultForm } from '../../../themes/basic';
import classes from '../styles/basic.module.css';

const ReportsPaymentsForm = ({employerName, employerId, employeeId, summarySalary, month}) =>{

    const paymentData = useSelector(state => state.reportsPayments.reportsPayments.find(payment=>payment.month===month && payment.sendedBy===employerId));

    const [ sendedDate, setSendedDate ] = useState('');
    const [ sendedBy, setSendedBy ] = useState(false);
    const [ approvedBy, setApprovedBy ] = useState(false);
    const [ description, setDescription ] = useState('');
    const [ salary, setSalary ] = useState(summarySalary);

    const dispatch = useDispatch();
    
    useEffect(() => {

        if(paymentData){
            setSendedDate(paymentData.sendedDate);
            setSendedBy(paymentData.sendedBy && true);
            setApprovedBy(paymentData.approvedBy && true);
            setDescription(paymentData.description);
            setSalary(paymentData.salary);
        }else{
            setSendedDate('');
            setSendedBy(false);
            setApprovedBy(false);
            setDescription('');
            setSalary(summarySalary);
        }

    },[paymentData,summarySalary]);

    // useEffect(() => {
    //     if(!paymentData){
    //         setSalary(summarySalary);
    //     }
    // },[summarySalary]);

    const savePayment = (event) => {
        
        event.preventDefault();

            const date = new Date();
 
            const presentFullYear = date.getFullYear();
            const presentMonth = parseInt(date.getMonth()) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
            const presentDay = parseInt(date.getDay()) < 10 ? `0${date.getDay()}` : date.getDay();
            const presentDateFormat = `${presentFullYear}-${presentMonth}-${presentDay}`;

            const reqData = {
                userId: employeeId,
                month: month,
                description: description,
                sendedBy: employerId,
                approvedBy: false,
                sendedDate: presentDateFormat,
                salary: salary
            };

            dispatch(addReportPayments(reqData));

    }

    const updatePayment = (event, paymentId) => {
        event.preventDefault();
        dispatch(updateReportPayments({paymentId,approvedBy:employeeId,description}));
    }


    return(
        <DefaultForm>
            <form>
                <div className="form-group">
                    <label htmlFor="">Data realizacji</label>
                    <input value={sendedDate} onChange={(e) => setSendedDate(e.target.value)} disabled/>
                </div>               
                <div className="form-group">
                    <label htmlFor="">{ employerName }</label>
                    <input type="checkbox" checked={ sendedBy } onChange={() => setSendedBy(prevState => !prevState)} disabled={sendedBy}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Franek</label>
                    <input type="checkbox" checked={ approvedBy } onChange={() => setApprovedBy(prevState => !prevState)} disabled={approvedBy}/>
                </div>
                <div className="form-group">
                    <input className={classes.input} type="text" value={salary} onChange={(e) => setSalary(e.target.value)} disabled/>
                </div>
                <div className="form-group">
                    <textarea className={classes.textarea} value={ description } onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                <div className="actions">
                    <button onClick={paymentData && paymentData._id ? (event) => updatePayment(event,paymentData._id) : savePayment}>{paymentData && paymentData._id ? 'Zatwierdź' : 'Dodaj'}</button>
                </div>
            </form>
        </DefaultForm>
    )
}
export default ReportsPaymentsForm;