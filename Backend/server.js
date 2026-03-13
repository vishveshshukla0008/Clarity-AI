import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/Database.js";




async function startServer() {
    try {
        await connectDB();
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log("Error on starting the server...", error);
    }
}


startServer();
