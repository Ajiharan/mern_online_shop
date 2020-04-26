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
                  policy
                </div>
              
                <div className="modal-footer" >
                   <button type="button" className="btn btn-success" data-dismiss="modal">Accept Policy</button>
                </div>
        
             </div>
           </div>
        </div>
    );
};

export default policy;