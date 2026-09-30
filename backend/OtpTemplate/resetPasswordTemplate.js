const resetPasswordTemplate = (otp) => {
  return `
   <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Signup OTP</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#09090f;
  font-family:Arial, Helvetica, sans-serif;
">

  <div style="
    max-width:600px;
    margin:35px auto;
    background:#11111b;
    border-radius:24px;
    overflow:hidden;
    border:1px solid #292943;
    box-shadow:0 20px 60px rgba(0,0,0,0.45);
  ">

    <!-- TOP GLOW -->
    <div style="
      height:6px;
      background:linear-gradient(
        90deg,
        #7c3aed,
        #06b6d4,
        #ec4899,
        #7c3aed
      );
    "></div>

    <!-- HEADER -->
    <div style="
      padding:38px 30px;
      text-align:center;
      background:
        radial-gradient(circle at 20% 20%, #7c3aed55 0, transparent 35%),
        radial-gradient(circle at 80% 30%, #06b6d455 0, transparent 35%),
        #11111b;
    ">

      <div style="
        display:inline-block;
        padding:10px 18px;
        border-radius:50px;
        background:#ffffff0d;
        border:1px solid #ffffff18;
        color:#a78bfa;
        font-size:12px;
        font-weight:bold;
        letter-spacing:2px;
        text-transform:uppercase;
      ">
        Ideal Creation
      </div>

      <h1 style="
        margin:22px 0 8px;
        color:#ffffff;
        font-size:30px;
        line-height:1.2;
      ">
        Welcome to the
        <span style="color:#a78bfa;">
          Future.
        </span>
      </h1>

      <p style="
        margin:0;
        color:#8b8ba7;
        font-size:14px;
      ">
        One small step to unlock your account.
      </p>

    </div>

    <!-- CONTENT -->
    <div style="padding:35px 30px;">

      <h2 style="
        margin:0 0 15px;
        color:#ffffff;
        font-size:22px;
      ">
        Verify Your Email ⚡
      </h2>

      <p style="
        color:#a1a1b5;
        font-size:15px;
        line-height:1.7;
      ">
        Hey there 👋
      </p>

      <p style="
        color:#a1a1b5;
        font-size:15px;
        line-height:1.7;
      ">
        We received a request to create an account using this
        email address. Enter the verification code below to
        continue your journey with <strong style="color:#c4b5fd;">
        Ideal Creation</strong>.
      </p>

      <!-- OTP CARD -->
      <div style="
        margin:35px 0;
        padding:30px 20px;
        text-align:center;
        border-radius:20px;

        background:
          linear-gradient(135deg, #7c3aed22, #06b6d422),
          #171725;

        border:1px solid #8b5cf655;

        box-shadow:
          0 0 35px #7c3aed22,
          inset 0 0 30px #ffffff05;
      ">

        <p style="
          margin:0 0 15px;
          color:#a78bfa;
          font-size:11px;
          font-weight:bold;
          letter-spacing:3px;
        ">
          YOUR VERIFICATION CODE
        </p>

        <div style="
          color:#ffffff;
          font-size:42px;
          font-weight:800;
          letter-spacing:12px;
          text-shadow:
            0 0 10px #8b5cf6,
            0 0 25px #8b5cf644;
        ">
          ${otp}
        </div>

        <div style="
          margin-top:18px;
          color:#71717f;
          font-size:12px;
        ">
          🔐 Keep this code private
        </div>

      </div>

      <!-- TIMER -->
      <div style="
        padding:15px;
        border-radius:12px;
        background:#ec489911;
        border:1px solid #ec489933;
        text-align:center;
      ">

        <span style="
          color:#f472b6;
          font-size:13px;
          font-weight:bold;
        ">
          ⏱ This code expires in 5 minutes
        </span>

      </div>

      <p style="
        margin-top:25px;
        color:#77778c;
        font-size:13px;
        line-height:1.7;
      ">
        If you didn't request this verification code, you can
        safely ignore this email. For your security, never share
        your OTP with anyone.
      </p>

      <!-- CTA STYLE -->
      <div style="
        margin-top:30px;
        padding:20px;
        border-radius:15px;
        background:#ffffff06;
        border:1px solid #ffffff0d;
        text-align:center;
      ">

        <p style="
          margin:0;
          color:#a1a1b5;
          font-size:13px;
        ">
          Your account is almost ready.
        </p>

        <p style="
          margin:8px 0 0;
          color:#c4b5fd;
          font-size:14px;
          font-weight:bold;
        ">
          Let's make something incredible. 🚀
        </p>

      </div>

    </div>

    <!-- FOOTER -->
    <div style="
      padding:25px;
      text-align:center;
      background:#0d0d15;
      border-top:1px solid #ffffff08;
    ">

      <div style="
        margin-bottom:8px;
        color:#8b5cf6;
        font-size:15px;
        font-weight:bold;
      ">
        ✦ IDEAL CREATION ✦
      </div>

      <p style="
        margin:0;
        color:#555568;
        font-size:11px;
      ">
        © 2026 Ideal Creation. All rights reserved.
      </p>

      <p style="
        margin:8px 0 0;
        color:#444456;
        font-size:10px;
      ">
        This is an automated security email. Please do not reply.
      </p>

    </div>

  </div>

</body>
</html>
  `;
};

export default resetPasswordTemplate;
