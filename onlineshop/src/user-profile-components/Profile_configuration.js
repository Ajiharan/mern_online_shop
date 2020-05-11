import React from 'react';

const Profile_configuration = () => {
    return (
        <div className="container mt-5 pt-2" id="profile-user-container">
            <h3 className="text-center text-info">My Profile</h3>
            <img src={require('../images/3451446.jpg')}
             style={{widht:'200px',height:'200px',margin:'15px'}} className=" rounded-circle" alt="Cinque Terre"></img>
            <form >
               
                <div className="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter Your Name" id="name"/>
                </div>
                <div className="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" className="form-control" placeholder="Enter email" id="email"/>
                </div>
               
                <button type="submit" className="btn btn-info">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile_configuration;