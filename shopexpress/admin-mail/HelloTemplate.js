const Hello=(data)=>{
    //  console.log(data);
      return( 
      `<!DOCTYPE html>
          <html>
              <head>
                  <title>Hello</title>
                  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
              </head>
              <body style="margin:0; padding:0;">
                <div className='container'>
                    <div className='card'>
                        <button className="btn btn-info">Click to verify</button>
                        <h6>${data}</h6>
                    </div>              
                   
                </div>
                
              </body>
          </html>
      
      `);
      
  }
  
  module.exports={Hello};
  
  