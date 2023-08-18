// emailTemplates.js

// This function generates the email template with a dynamic link
function updateEventEmail(EventName, EventDescription,EventDate,EventTime,EventVenue,eventImages) {
    return (`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="margin: 0; padding: 0;font-family: sans-serif;">
    <div style= "width: 100%; height: 100vh;">
        <div style="width: 20%;padding-inline: 10px; height: 30%; background-color: #303482; color: white; font-size: 12px; display: flex; border-radius: 90px; justify-content: center; border-bottom-right-radius: 0%;align-items: center;">
            <h2> Congratulations! Your Event has been Updated</h2>
        </div>

        <div style="width: 100%; height: 120%; display: flex; flex-direction: column; align-items: center;">
           <h3 style="width: 60%; text-align: center;">Congratulations! Your event has been successfully Updated. We're excited to have you host this event and bring your ideas to life. Here are the details:
        </h3>

        <div style="width: 40%; height: 100%; background-color: white; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;">
        <h4 style="color: rgb(73, 72, 72); padding-left: 10px;">Event Name: ${EventName} </h4>
          <h4 style="color: rgb(73, 72, 72); padding-left: 10px;">Description: ${EventDescription}</h4>
          <h4 style="color: rgb(73, 72, 72); padding-left: 10px;">Date and Time: ${EventDate} at ${EventTime}</h4>
          <h4 style="color: rgb(73, 72, 72); padding-left: 10px;">Venue: ${EventVenue}</h4>

          <p style="width: 100%; padding-left: 10px;">We can't wait to see you and your guests at the event. If you have any questions or need assistance, don't hesitate to reach out to our event organizers at <span style="color: rgb(7, 7, 145);">dikajahf@gmail.com</span> or call: <spanb style="color: rgb(7, 7, 145);">08067654231</span>.</p>

          <div style="width: 60%; height: 50%; background-color: rgb(233, 229, 229); border-radius: 10px; margin-left: 10px; font-size: 200px; display: flex; justify-content: center; align-items: center;object-fit: cover;">
        <img src=${eventImages} alt="eventImage">
        </div>

          <div style="width: 100%; height: 13%; background-color: #303482; margin-top: 10px; display: flex; justify-content: center;">
            <p style="color: white; width: 80%; text-align: center;">Thank you for choosing to be a part of this exciting event. We look forward to seeing you there!</p>
        </div>
        </div>
        </div>
    </div>
</body>
</html> `);
  }
  
  module.exports = {
    updateEventEmail
  };