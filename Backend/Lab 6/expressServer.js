import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import student from "./models/student.js";


dotenv.config();
connectDB();

const port=process.env.PORT || 3000;
const app=express();
// const userData=[
//     {
//         "id":1,
//         "name":"Abhi",
//         "class":"Btech"
//     }
// ];
// const registerData=[];

app.use(express.json());
app.use(cors());

app.post("/test-db", async (req, res) => {
    try {
        const student = await Student.create({
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            course: "MERN Stack",
        });

        res.status(201).json({
            message: "Data inserted successfully!",
            data: student,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

app.get("/test-db",async (req,res)=>{
    try {
        const students=await Student.find();
        res.status(200).json(students);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Welcome user",
    });
});

app.get("/user",(req,res)=>{
    try {
        res.status(200).json({
            users: userData
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.get("/msg",(req,res)=>{
    res.status(200).json({
        message: "Hello from server"
    });
});

app.get("/user/:id", (req, res) => {
    try {
        const id = req.params.id;

        const user = userData.find((u) => u.id == id);

        if (user) {
            return res.status(200).json({
                message: "Data received",
                user
            });
        }

        return res.status(404).json({
            message: "User not found"
        });

    } catch (err) { vd
        console.error("Error:", err.message);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


app.post("/create",(req,res)=>{
    const {id,name,class:className}=req.body;
    const newUser={
        id,
        name,
        class:className,
    };
    userData.push(newUser);
    res.status(201).json({  
        message: "User created successfully",
        user: newUser
    });
});

app.put("/edit/:id",(req,res)=>{
    const userId=parseInt(req.params.id);
    const index=userData.findIndex(user=>user.id===userId);
    if (index !== -1) {
        const {name,class:className}=req.body;
        userData[index]={
            ...userData[index],
            name,
            class:className
        };
        res.status(200).json({
            message: "User updated successfully",
            user: userData[index]
        });
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});

app.delete("/delete/:id",(req,res)=>{
    const userId=parseInt(req.params.id);
    const index=userData.findIndex(user=>user.id===userId);
    if (index !== -1) {
        userData.splice(index,1);
        res.status(200).json({
            message: "User deleted successfully"
        });
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});

app.post("/register",(req,res)=>{
    const {username,password}=req.body;
    const newUser={
        username,
        password
    };
    registerData.push(newUser);
    res.status(201).json({
        message: "User registered successfully",
        user: newUser
    });
});

app.post("/login",(req,res)=>{
    const {username,password}=req.body;
    const user=registerData.find(user=>user.username===username && user.password===password);
    if (user) {
        res.status(200).json({
            message: "Login successful",
            user: user
        });
    } else {
        res.status(401).json({
            message: "Invalid credentials"
        });
    }
});

const startServer = async () => {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
    }
};

startServer();