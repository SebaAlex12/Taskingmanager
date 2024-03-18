import { createPortal } from 'react-dom';
import styles from './modalbox.module.css';

const ModalBox = ({ title, children, closeHandler }) => {

    // console.log('modal box render...');

    const close = () => {
        closeHandler();
    };

    return createPortal(
        <div className={styles['modal-box']}>
            <div className={styles.overlay}></div>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>{ title }</h1>
                        <button className={styles.close} onClick={close}>zamknj</button>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.text}>{ children }</div>
                    </div>
                </div>
            </div>
        </div>, 
        document.getElementById('modal')
    );
};

export default ModalBox;