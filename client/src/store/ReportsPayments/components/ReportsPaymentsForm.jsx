import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addReportPayments, updateReportPayments } from '../actions';

import { DefaultForm } from '../../../themes/basic';
import classes from '../styles/basic.module.css';

const ReportsPaymentsForm = ({employerName, month}) =>{

    const employerRef = useRef();
    const employeeRef = useRef();
    const descriptionRef = useRef();

    const loggedUser = useSelector(state => state.users.logged_user);
    const employerData = useSelector(state => state.users.users.find(user=>user.name===employerName));
    const paymentData = useSelector(state => state.reportsPayments.reportsPayments);

    const dispatch = useDispatch();

    const savePayment = (event) => {
        
        event.preventDefault();

        if(!employerRef.current.checked){
            return;
        }

        // if(paymentId){
        //     dispatch(updateReportPayments(paymentId));
        // }else{
            const reqData = {
                userId: loggedUser._id,
                month: month,
                description: descriptionRef.current.value,
                sendedBy: employerData._id,
                approved: employeeRef.current.checked,
                MarianPrice: 300,
                PiotrekPrice: 400
            };

            dispatch(addReportPayments(reqData));
        // }
    }

    return(
        <DefaultForm>
            <form>
                <div className="form-group">
                    <label htmlFor="">Data realizacji</label>
                    <input type="date" value="" disabled/>
                </div>               
                <div className="form-group">
                    <label htmlFor="">{ employerData.name }</label>
                    <input type="checkbox" ref={ employerRef } />
                </div>
                <div className="form-group">
                    <label htmlFor="">{ loggedUser.name }</label>
                    <input type="checkbox" ref={ employeeRef }/>
                </div>
                <div className="form-group">
                    <textarea ref={descriptionRef} className={classes.textarea}></textarea>
                </div>
                <div className="actions">
                    <button onClick={savePayment}>Zapisz</button>
                </div>
            </form>
        </DefaultForm>
    )
}
export default ReportsPaymentsForm;