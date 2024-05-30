import { useRef } from 'react';
import styles from '../styles/basic.module.css';

const ReportsAddForm = ({ submitHandler }) => {
    const date = useRef();
    const description = useRef();
    const Marian = useRef();
    const Piotrek = useRef();

    return (
        <div className={styles['reports-add-form-box']}>
            <form action="" className={styles['reports-add-form']}>
                <div className={styles['reports-add-form-group']}>
                    <div className={styles['reports-add-form-control']}>
                        <label htmlFor="">data: </label>
                        <input type="date" ref={date} required/>
                    </div>
                </div>
                <div className={styles['reports-add-form-group']}>
                    <div className={styles['reports-add-form-control']}>
                        <label htmlFor="">info: </label>
                        <textarea type="text" ref={description} required/>
                    </div>
                </div>
                <div className={styles['reports-add-form-group']}>
                    <div className={styles['reports-add-form-control']}>
                        <label htmlFor="">Marian godz: </label>
                        <input type="number" min="0" ref={Marian} defaultValue={9} required/>
                    </div>
                </div>
                <div className={styles['reports-add-form-group']}>
                    <div className={styles['reports-add-form-control']}>
                        <label htmlFor="">Piotrek godz: </label>
                        <input type="number" min="0" ref={Piotrek} defaultValue={0} required/>
                    </div>
                </div>
                <div className={styles['reports-add-form-button']}>
                    <button onClick={(event) => submitHandler(event,{date:date.current.value,description:description.current.value,Marian:Marian.current.value,Piotrek:Piotrek.current.value})}>Dodaj</button>
                </div>
            </form>
        </div>
    )
}

export default ReportsAddForm;