import { useRef } from 'react';
import styles from '../styles/form.module.css';

const ReportsAddForm = ({ submitHandler }) => {
    const date = useRef();
    const description = useRef();
    const Marian = useRef();
    const Piotrek = useRef();

    return (
        <div className={styles['form-box']}>
            <h1>Dodaj do raportu:</h1>
            <form action="" className={styles.form}>
                <div className={styles['form-group']}>
                    <div className={styles['form-control']}>
                        <label htmlFor="">wpisz datę: </label>
                        <input type="date" ref={date}/>
                    </div>
                </div>
                <div className={styles['form-group']}>
                    <div className={styles['form-control']}>
                        <label htmlFor="">wpisz wiadomość: </label>
                        <textarea type="text" ref={description}/>
                    </div>
                </div>
                <div className={styles['form-group']}>
                    <div className={styles['form-control']}>
                        <label htmlFor="">Marian l/g: </label>
                        <input type="text" ref={Marian}/>
                    </div>
                </div>
                <div className={styles['form-group']}>
                    <div className={styles['form-control']}>
                        <label htmlFor="">Piotrek l/g: </label>
                        <input type="text" ref={Piotrek}/>
                    </div>
                </div>
                <div className={styles['form-group']}>
                    <div className={styles['form-control']}>
                        <button onClick={(event) => submitHandler(event,{date:date.current.value,description:description.current.value,Marian:Marian.current.value,Piotrek:Piotrek.current.value})}>Dodaj</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ReportsAddForm;