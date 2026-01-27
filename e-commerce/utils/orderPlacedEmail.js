export const orderPlacedEmailTemplate = (data) => {


  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Order Placed</title>
</head>
<body style="margin:0; padding:0; background:#f6f6f6; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:20px;">

<table width="600" style="background:#fff; border-radius:8px; overflow:hidden;">
  
  <!-- Header -->
  <tr>
    <td align="center" style="background:#2e7d32; padding:20px;">
      <img src="https://res.cloudinary.com/dnhofqam5/image/upload/v1769509829/fruits_k2eps0.png" width="70"/>
      <h2 style="color:#fff; margin:10px 0;">Fresh Fruits</h2>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:30px;">
      <h3 style="color:#2e7d32;">Order Confirmed 🍎</h3>

      <p>Hi <b>${data?.name}</b>,</p>
      <p>Thank you for your order! Your fresh fruits are being prepared.</p>

      <p><b>Order ID:</b> ${data?.orderId}</p>

     
  <h3>🛒 Order Items</h3>
  <table border="1" cellpadding="8" cellspacing="0">
    <tr>
      <th>Product</th>
      <th>Qty</th>
      <th>Price</th>
      <th>Total</th>
    </tr>
    ${data.items.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>₹${item.price}</td>
        <td>₹${item.total}</td>
      </tr>
    `).join("")}
  </table>

<h3>💰 Total Amount: ₹${data.totalAmount}</h3>
      <p style="margin-top:20px;">
        <b>Delivery Address:</b>
 <p>${data.address}</p>
      </p>
       

      <p>🚚 Expected delivery within 24 hours.</p>

      <p>Stay healthy & eat fresh 🍓</p>
      <p><b>Fresh Fruits Team</b></p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="background:#f1f1f1; padding:15px; font-size:12px; color:#777;">
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





