import { useSelector } from 'react-redux';

const ReportsPeymentsMessages = () =>{
    const { success, errors } = useSelector(state => state.reportsPayments);

    return(
        <>
            <div className="success-box">{ success.length > 0 && success.map((message,index) => <div key={index} className="success">{ message }</div>) }</div>
            <div className="errors-box">{ errors.length > 0 && errors.map((message,index) => <div key={index} className="error">{ message }</div>) }</div>
        </>
    )
}
export default ReportsPeymentsMessages;