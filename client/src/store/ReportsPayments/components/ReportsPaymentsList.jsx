
import { useSelector } from 'react-redux';

import ReportsPaymentsForm from './ReportsPaymentsForm';

const ReportsPaymentsList = ({month}) => {
    
    const payments = useSelector(state => {
        const list = state.reportsPayments.reportsPayments;
        console.log('list',list);
        return list;
    });

    console.log('month',month);

    return (
        // payments.length === 0 && <button>Marian</button>
        <>
            <ReportsPaymentsForm month={month} />
        </>
    )
   
}

export default ReportsPaymentsList;