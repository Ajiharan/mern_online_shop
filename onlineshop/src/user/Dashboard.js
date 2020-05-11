import React from 'react';
import Profile_configuration from '../user-profile-components/Profile_configuration';
import Profile_password_confg from '../user-profile-components/profile_password';
const Dashboard = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-7 col-xs-12 col-sm-12 col-lg-6">
                    <Profile_configuration/>
                </div>
                <div className="col-md-5 col-xs-12 col-sm-12 col-lg-6">
                    <Profile_password_confg/>
                </div>
            </div>
          
        </div>
    );
};

export default Dashboard;