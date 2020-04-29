const Hello=(data)=>{
    //  console.log(data);
      return( 
      `<!DOCTYPE html>
          <html>
              <head>
                  <title>Hello</title>
              </head>
              <body style="margin:0; padding:0;">
                  <br/>
                  <br/>
                  <div>${data}</div>
                  <br/>
                  <br/>
              </body>
          </html>
      
      `);
      
  }
  
  module.exports={Hello};
  
  