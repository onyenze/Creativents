// emailTemplates.js

// This function generates the email template with a dynamic link
function generateDynamicEmail(link, user) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/dc3e51f33a.js" crossorigin="anonymous"></script>
        <title>Document</title>
    </head>
    <body style="margin: 0; padding: 0;">
        <div style= "width: 100%; height: 100vh; background: white; display: flex; justify-content: center; align-items: center;">
            <div style="width: 40%; height: 100%; background-color: white; font-family: sans-serif; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">
                <div style="width: 100%; height: 15%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <div style="width: 20%; height: 100%; background-color: pink;">add logo</div>
                </div>
                <div style="width: 100%; height: 40%; display: flex; flex-direction: column; align-items: center;">
                    <h2 style="width: 60%; text-align: center;">Thank you for Signing up. ${user}!</h2>
                    <h5 style="width: 73%; text-align: center;">in order to use your creativent you need to confirm your email <span style="color: #FCA702;">Thank you!</span></h5>
                    <button style="width: 35%; height: 60px; border-radius: 8px; border: none; background-color: #FCA702; color: white; font-size: 15px; margin-bottom: 10px; cursor: pointer;">Verify Email Address</button>
                </div>
    
                <div style="width: 100%; height: 40%; display: flex; flex-direction: column; align-items: center; background-color: rgb(243, 242, 242); justify-content: space-around;">
                    <h2 style="border-bottom: 2px solid rgb(49, 48, 48); margin-top: 10%; ">Get in Touch</h2>
    
                <div style="width: 100%; height: 30%; gap: 3%; display: flex; justify-content: center; cursor: pointer;">
                    <i class="fa-brands fa-facebook-f" style="font-size: 20px;"></i>
                    <i class="fa-brands fa-twitter" style="font-size: 20px;"></i>
                    <i class="fa-brands fa-instagram" style="font-size: 20px;"></i>
                </div>
                <h5 style="width: 75%; height: 20%; text-align: center;">If you encounter any issues or have questions, feel free to reach out to our support team at <span style="color: blue; cursor: pointer;">Creativent@email.com.</span></h5>
                </div>
    
                <div style="width: 100%; height: 5%; background-color: #303482; display: flex; justify-content: center; color: white;">
                <p style="font-size: 10px;">© 2023 Creativent.ng. All Rights Reserved.</p>
            </div>
            </div>
    
           
        </div>
    </body>
    </html>`;
  }
  
  module.exports = {
    generateDynamicEmail,
  };