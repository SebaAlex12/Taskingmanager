import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateReport } from '../actions';

import styles from '../styles/basic.module.css';

const ReportsEditForm = ({report, closeModalHandler}) => {
    
    const [ date, setDate ] = useState(report.date);
    const [ description, setDescription ] = useState(report.description);
    const [ Marian, setMarian ] = useState(report.Marian);
    const [ Piotrek, setPiotrek ] = useState(report.Piotrek);

    const dispatch = useDispatch();

    const updateHandler = (event) => {
        event.preventDefault();
        dispatch(updateReport({
            _id:report._id,
            date:date,
            description:description,
            Marian:Marian,
            Piotrek:Piotrek
        }));
        closeModalHandler();
    }

    return(
        <div className={styles['reports-edit-form-box']}>
            <form action="" className={styles['reports-edit-form']}>
                <div className={styles['reports-edit-form-group']}>
                    <div className={styles['reports-edit-form-control']}>
                        <label htmlFor="">data: </label>
                        <input type="date" name="date" value={date} onChange={(event)=>{ setDate(event.target.value) }} required disabled/>
                    </div>
                </div>
                <div className={styles['reports-edit-form-group']}>
                    <div className={styles['reports-edit-form-control']}>
                        <label htmlFor="">info: </label>
                        <textarea type="text" name="description" value={description} onChange={(event)=>{ setDescription(event.target.value) }} required/>
                    </div>
                </div>
                <div className={styles['reports-edit-form-group']}>
                    <div className={styles['reports-edit-form-control']}>
                        <label htmlFor="">Marian godz: </label>
                        <input type="number" min="0" name="Marian" value={Marian} onChange={(event)=>{ setMarian(event.target.value) }} required/>
                    </div>
                </div>
                <div className={styles['reports-edit-form-group']}>
                    <div className={styles['reports-edit-form-control']}>
                        <label htmlFor="">Piotrek godz: </label>
                        <input type="number" min="0" name="Piotrek" value={Piotrek} onChange={(event)=>{ setPiotrek(event.target.value) }} required/>
                    </div>
                </div>
                <div className={styles['reports-edit-form-button']}>
                    <button onClick={updateHandler}>Zapisz</button>
                </div>
            </form>
        </div>
    )
}
export default ReportsEditForm;