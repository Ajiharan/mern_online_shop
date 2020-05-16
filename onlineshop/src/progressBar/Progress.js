import React from 'react';
import PropTypes from 'prop-types';

const Progress =({percentage})=> {
    return (
        <div className="container mt-4">
            <div className="progress">
                <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width:`${percentage}%`}} >
                    {percentage}%
                </div>
            </div>
        </div>
    );
};

Progress.propTypes = {
    percentage:PropTypes.number.isRequired
};

export default React.memo(Progress);