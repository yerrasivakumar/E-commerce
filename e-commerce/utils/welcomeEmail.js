export const welcomeEmailTemplate = (name) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Welcome to Fresh Fruits</title>
</head>
<body style="margin:0; padding:0; background-color:#f6f6f6; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:20px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px;">
          
          <tr>
            <td align="center" style="background:#2e7d32; padding:20px;">
              <img src="https://res.cloudinary.com/dnhofqam5/image/upload/v1769509829/fruits_k2eps0.png" width="80" />
              <h1 style="color:#fff;">Fresh Fruits</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:30px;">
              <h2 style="color:#2e7d32;">Welcome ${name}! 🍎</h2>
              <p>Thank you for registering with <b>Fresh Fruits</b>.</p>
              <p>Fresh, hand-picked fruits delivered to your doorstep.</p>

              <p>🥭 Fresh Fruits<br/>🚚 Fast Delivery<br/>💳 Secure Payments</p>

              <div style="text-align:center; margin:30px 0;">
                <a href="#" style="background:#2e7d32; color:#fff; padding:12px 25px; border-radius:5px; text-decoration:none;">
                  Start Shopping
                </a>
              </div>

              <p>Stay healthy. Eat fresh 🍓</p>
              <p><b>Fresh Fruits Team</b></p>
            </td>
          </tr>

          <tr>
            <td align="center" style="background:#f1f1f1; padding:15px; font-size:12px;">
              © 2026 Fresh Fruits
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;
};
