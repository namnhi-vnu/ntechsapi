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
const apiUrl = process.env.API_URL;
const base64Credentials = Buffer.from(`${username}:${password}`).toString(
    "base64"
);
app.get("/get-posts", async (req, res) => {
    const axiosInstance = axios.create({
        baseURL: apiUrl,
        headers: {
            Authorization: `Basic ${base64Credentials}`,
        },
    });

    axiosInstance
        .get("/")
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
