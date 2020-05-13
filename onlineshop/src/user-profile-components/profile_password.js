import React from 'react';

const profile_password = () => {
    return (
        <div className="container card mt-5 pt-1" id="profile-pass-container">
              <h3 className="text-center text-info">Reset Password</h3>
           <form>
                <div className="form-group">
                    <label htmlFor="password">Old password</label>
                    <input type="password" className="form-control" placeholder="Enter Your old Password" id="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">conform password</label>
                    <input type="password" className="form-control" placeholder="Enter Your Password" id="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">New password</label>
                    <input type="password" className="form-control" placeholder="Enter Your New Password" id="name"/>
                </div>
                <button type="submit" className="btn btn-info text-light">Update Password</button>
           </form>
        </div>
    );
};

export default profile_password;