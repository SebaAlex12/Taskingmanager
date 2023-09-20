import { useDispatch } from 'react-redux';

import { fetchUsers } from '../store/Users/actions';

const RequestTest = () => {
    const dispatch = useDispatch();
    const fetchUsersHandle = () => {
        console.log('fetch users handler');
            dispatch(fetchUsers({ company: "Blumoseo"}));
    }
    return(
        <button onClick={fetchUsersHandle}>fetch data</button>
    );
}

export default RequestTest;