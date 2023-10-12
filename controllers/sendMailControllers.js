import nodemailer from "nodemailer";

const sendEmail = async (req, res) => {
    const { Fullname, phoneNumber, emailAddress } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.PASS_ID,
            },
        });

        let info = await transporter.sendMail({
            from: "'NTechs Việt Nam'<aum.vanha@gmail.com>",
            to: "namnhi.uet@gmail.com",
            subject: "Gọi Tư Vấn Khách",
            text: "Gọi Tư Vấn",
            html: `<h2 style="color:#084183">Gọi Tư Vấn Khách Hàng</h2> 
                    <h3>Họ tên: <span style="font-weight:300">${Fullname}</span> </h3>
                    <h3>Số điện thoại: <span style="font-weight:300">${phoneNumber}</span></h3>
                    <h3>Email: <span style="font-weight:300">${emailAddress}</span></h3>`,
        });

        res.json({ message: "Gửi Thành Công" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({
            error: "An error occurred while sending the email.",
        });
    }
};

export default sendEmail;
