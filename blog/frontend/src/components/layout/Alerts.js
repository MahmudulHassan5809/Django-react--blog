import React,{Fragment,useEffect} from 'react';
import { withAlert } from 'react-alert';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alerts = ({errors,alert,messages}) => {
    useEffect(() => {

        if(Object.keys(errors.msg).length > 0){
            if(errors.msg.title){
                alert.error(`Title : ${errors.msg.title.join()}`);
            }
            if(errors.msg.content){
                alert.error(`Content : ${errors.msg.content.join()}`);
            }
            if(errors.msg.non_field_errors){
                alert.error(`Error : ${errors.msg.non_field_errors.join()}`);
            }
            if(errors.msg.username){
                alert.error(`Error : ${errors.msg.username.join()}`);
            }
        }

        if(messages.articleAdded){
            alert.success(messages.articleAdded);
        }

        if(messages.articleDeleted){
            alert.success(messages.articleDeleted);
        }

        if(messages.passwordNotMatch){
            alert.error(messages.passwordNotMatch);
        }



        // eslint-disable-next-line
    },[errors,messages])

    return (
        <Fragment />
    )
}

Alerts.propTypes = {
    errors : PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
    errors : state.error,
    messages : state.message
});


export default connect(mapStateToProps)(withAlert()(Alerts));

