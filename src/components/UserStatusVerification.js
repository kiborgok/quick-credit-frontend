import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/actions/userActions';

const mapStateToProps = ({ errors }) => ({ errors });

const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(userActions, dispatch) }
);

const UserStatusVerification = ({ actions, history }) => {
    const verify = JSON.parse(localStorage.getItem('verify'));
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        actions.verifyUser({ email: verify.email, token: verify.token })
        history.push('/login')
        setLoading(false)
        localStorage.removeItem('verify');
    }, [actions, history, verify])
    return (
        <>
            {loading ? <h3>loading....</h3> : null}
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserStatusVerification);