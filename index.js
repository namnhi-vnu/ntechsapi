import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const perPage = 20;
const apiUrl = process.env.API_URL;

app.get("/get-posts", async (req, res) => {
    // Lấy tham số "page" từ query string (mặc định là trang 1 nếu không có)
    const page = req.query.page || 1;

    const axiosInstance = axios.create({
        baseURL: apiUrl,
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${username}:${password}`
            ).toString("base64")}`,
        },
    });

    // Thêm tham số "page" vào URL để lấy trang tương ứng
    const urlWithPage = `${apiUrl}?per_page=${perPage}&page=${page}`;

    axiosInstance
        .get(urlWithPage)
        .then((response) => {
            const posts = response.data;
            res.json(posts);
        })
        .catch((error) => {
            console.error("Lỗi khi gọi API:", error);
            res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ API." });
        });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
