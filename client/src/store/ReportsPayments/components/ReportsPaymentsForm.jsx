import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addReportPayments, updateReportPayments } from '../actions';

import { DefaultForm } from '../../../themes/basic';
import classes from '../styles/basic.module.css';

const ReportsPaymentsForm = ({employerName, employerId, employeeId, month}) =>{

    console.log('reports add form render...');

    const paymentData = useSelector(state => state.reportsPayments.reportsPayments.find(payment=>payment.month===month && payment.sendedBy===employerId));

    const [ sendedDate, setSendedDate ] = useState('');
    const [ sendedBy, setSendedBy ] = useState(false);
    const [ approvedBy, setApprovedBy ] = useState(false);
    const [ description, setDescription ] = useState('');

    const dispatch = useDispatch();

    console.log('reports add form paymentData before useEffect',paymentData);
    
    useEffect(() => {
        if(paymentData){
            setSendedDate(paymentData.sendedDate);
            setSendedBy(paymentData.sendedBy && true);
            setApprovedBy(paymentData.approvedBy && true);
            setDescription(paymentData.description);
        }
    },[]);

    const savePayment = (event) => {
        
        event.preventDefault();

            const reqData = {
                userId: employeeId,
                month: month,
                description: description,
                sendedBy: employerId,
                approved: employeeId,
                MarianPrice: 300,
                PiotrekPrice: 400
            };

            dispatch(addReportPayments(reqData));

    }

    const updatePayment = (event, paymentId) => {
        event.preventDefault();
        dispatch(updateReportPayments(paymentId));
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
                    <input type="checkbox" checked={ sendedBy } onChange={() => setSendedBy(prevState => !prevState)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Franek</label>
                    <input type="checkbox" checked={ approvedBy } onChange={() => setApprovedBy(prevState => !prevState)}/>
                </div>
                <div className="form-group">
                    <textarea className={classes.textarea} value={ description } onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                <div className="actions">
                    <button onClick={paymentData && paymentData._id ? (event) => updatePayment(event,paymentData._id) : savePayment}>{paymentData && paymentData._id ? 'Zaktualizuj' : 'Zapisz'}</button>
                </div>
            </form>
        </DefaultForm>
    )
}
export default ReportsPaymentsForm;