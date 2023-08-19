

// This function generates the bar code  with the encoded data as parameter
function createTicketEmail(EventName, EventDescription,EventDate,EventTime,EventVenue,eventImages,organizersEmail) {return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: sans-serif; box-sizing: border-box; background-color: white; display: flex; justify-content: center; align-items: center; flex-direction: column; height: 100vh;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="80%" style="max-width: 400px; background-color: white; border-radius: 15px; margin: auto;">
    <tr>
      <td style="padding: 20px; background-color: #303482; color: white; font-size: 18px; border-radius: 15px 15px 0 0; text-align: center;">
        <h2>Ticket Purchase Confirmation</h2>
      </td>
    </tr>
    <tc>
      <td style="padding: 20px; background-color: red; border-radius: 0 0 15px 15px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; display: flex;flex-direction: column;justify-content: center; gap: 20px;">
        <h3 style="text-align: center;">Congratulations! You've successfully purchased a ticket. Here are the details:</h3>

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="text-align: left;">
          <tr>
            <td>
              <h4>Event Name: ${EventName}</h4>
              <h4>Description: ${EventDescription}</h4>
              <h4>Date and Time: ${EventDate} at ${EventTime}</h4>
              <h4>Venue: ${EventVenue}</h4>
            </td>
          </tr>
        </table>

        <div style="width: 100%; max-width: 400px; height: auto; background-color: rgb(233, 229, 229); border-radius: 10px; display: flex; justify-content: center; align-items: center; overflow: hidden;">
          <img src="${eventImages}" alt="Event Image" style="width: 100%; max-height: 100%; object-fit: cover;">
        </div>

        <p style="text-align: left;">We're looking forward to seeing you at the event. If you have any questions or need assistance, don't hesitate to reach out to our event organizers at <span style="color: rgb(7, 7, 145);">${organizersEmail}</span> or call: <span style="color: rgb(7, 7, 145);">08067654231</span>.</p>

        <div style="background-color: #303482; border-radius: 0 0 15px 15px; text-align: center; padding: 10px;">
          <p style="color: white; margin: 0;">Thank you for choosing to attend this exciting event. We're excited to have you!</p>
        </div>
      </td>
      <tc>
  </table>

</body>
</html>


`}

module.exports = {
  createTicketEmail
};