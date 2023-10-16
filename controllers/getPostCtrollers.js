import axios from "axios";

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const perPage = 10;
const apiUrl = process.env.API_URL;
const getPosts = async (req, res) => {
    const page = req.query.page || 1;
    const axiosInstance = axios.create({
        baseURL: apiUrl,
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${username}:${password}`
            ).toString("base64")}`,
        },
    });

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
};

const getPostsDetail = async (req, res) => {
    const { slug } = req.params;
    try {
        const axiosInstance = axios.create({
            baseURL: apiUrl,
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${username}:${password}`
                ).toString("base64")}`,
            },
        });
        const urlWithSlug = `${apiUrl}?slug=${slug}`;

        const response = await axiosInstance.get(urlWithSlug);
        const post = response.data[0]; // Lấy bài viết đầu tiên từ kết quả
        console.log(post);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: "Không tìm thấy bài viết." });
        }
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ API." });
    }
};
export { getPostsDetail };
export default getPosts;
