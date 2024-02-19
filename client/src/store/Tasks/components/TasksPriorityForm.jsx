import React from 'react';

import classes from '../styles/TasksPriorityForm.module.css';

const TasksPriorityForm = ({priorityFilter,status}) => {
    return (
        <div className={classes['priority-form-box']}>
            <form action="">
                <div className={classes['form-group']}>
                    <label htmlFor="">Filtruj:</label>
                    <select name="" id="" className='form-control' onChange={priorityFilter} value={status}>
                        <option value="Wszystkie">Wszystkie</option>
                        <option value="Do wykonania">Do wykonania</option>
                        <option value="W trakcie">W trakcie</option>
                        <option value="Do akceptacji">Do akceptacji</option>
                        <option value="Wykonane">Wykonane</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default TasksPriorityForm;