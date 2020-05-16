import React from 'react';

const policy = () => {
    return (
        <div className="modal fade" id="myModal">
          <div className="modal-dialog" id="policy-model">
             <div className="modal-content">  
                <div className="modal-header">
                    <h4 className="modal-title">Store-manager Policy</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
           
                <div className="modal-body">
                A store Manager account policy is a document which outlines the requirements for requesting and maintaining 
                an account on computer systems or networks, typically within an organization.
                 It is very important for large sites where users typically have accounts on many systems.
                </div>
              
                <div className="modal-footer" >
                   <button type="button" className="btn btn-success" data-dismiss="modal">Agree with Policy</button>
                </div>
        
             </div>
           </div>
        </div>
    );
};

export default React.memo(policy);