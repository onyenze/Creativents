// emailTemplates.js

// This function generates the email template with a dynamic link
function generatePasswordEmail(link) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body style="margin: 0px; height: 0px; font-family: sans-serif; box-sizing: border-box;">
      <div style="width: 100%; height: 100vh; background-color: white; display: flex; justify-content: center; align-items: center;">
  
          <div style="width: 33%; height: 95%; background-color: white; border-radius: 5px; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; display: flex; justify-content: center;flex-direction: column; align-items: center; gap: 10%;">
  
              <div style="width: 100%; height: 15%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div style="width: 20%; height: 100%;background-color: white;"><img src="../../uploads/darkmode_logo.png" alt="" style="width: 100%; max-width: 100%; height: auto; margin: auto; display: block;"></div>
              </div>
  
            <div style="width: 90%; height: 20%;">
          <h2>Did you forget your password?, No worries you can click on the button to reset your password</h2>
          
          </div><a style="width: 90%; height: 20%;text-decoration:none;" href=${link}>
            <div style="width: 100%; height: 100%; background-color: #FCA702; font-size: 30px; display: flex; justify-content: center; align-items: center; border-radius: 10px; color: white; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;" >Reset Password</div></a> 
  
            <div style="width: 90%; height: 20%;">
              <p>NOTE: The link will expire in 5 minutes</p>
          </div>
  
  
          </div>
      
      </div>
  </body>
  </html>`;
}

module.exports = {
  generatePasswordEmail
};