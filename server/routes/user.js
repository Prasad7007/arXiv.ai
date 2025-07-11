const express = require("express");
const router = express.Router();
const { userBookmarksSchema, signinSchema, signupSchema, searchHistorySchema, deleteUserBookmarksSchema } = require("../zod/zod_user.js");
const prisma = require("../prisma/client.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");
const authMiddleware = require("../middleware/middleware.js");


router.use(["/storeHistory", "/fetchHistory", "/userBookmarks", "/fetchBookmark"], authMiddleware);


router.post("/signup", async (req, res) => {
    const body = req.body;

    // Validate input
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
        return res.status(400).json({
            message: "Bad Request / Invalid input!",
            errors: validationResult.error.errors // Provide detailed validation errors
        });
    }

    try {
        // Check if user already exists
        const isUserExists = await prisma.users.findUnique({
            where: { username: body.username }
        });

        if (isUserExists) {
            return res.status(409).json({
                message: "User already exists!"
            });
        }

        // Insert user into the database
        const newUser = await prisma.users.create({
            data: {
                username: body.username,
                password: body.password,
                first_name: body.first_name,
                last_name: body.last_name,
                is_active: body.is_active
            }
        });

        const token = jwt.sign({user_id: newUser.user_id}, JWT_SECRET, {expiresIn: '1h'});

        return res.status(201).json({
            message: "User created successfully!",
            user: { id: newUser.user_id, username: newUser.username },
            token: token
        });

    } catch (error) {
        console.error("Database Insertion Error:", error);
        return res.status(500).json({
            message: "Error while inserting value in database!"
        });
    }
});


router.post("/signin", async (req, res) => {
    const body = req.body;

    const validationResult = signinSchema.safeParse(body);
    if(!validationResult.success) {
        return res.status(400).json({
            message: "Bad Request / Invalid input!",
            errors: validationResult.error.errors
        })
    }

    try{
        // Find user by username
        const user = await prisma.users.findUnique({
            where: { username: body.username },
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = body.password == user.password ? true : false;
        if (!isPasswordValid) {
            console.log(isPasswordValid);
            return res.status(401).json({ message: "Invalid username or password" });
        }
        

        const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET);
        return res.json({
            message: "User signed in successfully!",
            token: token,
            user: {id:user.user_id}
        });
    }
    catch(error) {
        console.error("Database fetching Error:", error);
        return res.status(500).json({
            message: "Error while fetching value in database!"
        });
    }
})

router.post("/storeHistory", async (req, res) => {
    const body = req.body;

    const validationResult = searchHistorySchema.safeParse(body);
    if(!validationResult.success) {
        return res.status(400).json({
            message: "Bad Request / Invalid input!",
            errors: validationResult.error.errors
        })
    }

    try {
        const createHistory = await prisma.search_History.create({
            data: {
                user_id: body.user_id,
                query: body.query,
                date: new Date(body.date),
                time: body.time,
                filters: body.filters,
                results_count: body.results_count
            }
        });

        if(createHistory) {
            return res.status(200).json({
                message: "Created user history successfully!",
                data: createHistory
            })
        }
        
    }
    catch(error) {
        console.error("Database Insertion Error:", error);
        return res.status(500).json({
            message: "Error while inserting value in database!"
        });
    }
})

router.get("/fetchHistory/:user_id", async (req, res) => {
    const id = parseInt(req.params.user_id);
    try {

        const user = await prisma.users.findUnique({
            where: {user_id: id}
        })
        
        if(!user) {
            return res.status(400).json({
                message: "User not found!",
                data: []
            })
        }

        const history = await prisma.search_History.findMany({
            where: {user_id: id}
        })

    
        return res.status(200).json({
            message: "Fetched user history successfully!",
            data: history
        })

    }
    catch(error) {
        console.error("Database Retrival Error:", error);
        return res.status(500).json({
            message: "Error while retriving value from database!"
        });
    }
})

router.post("/userBookmarks", async (req,res) => {
    const body = req.body;

    const validationResult = userBookmarksSchema.safeParse(body);
    if(!validationResult.success) {
        return res.status(400).json({
            message: "Bad Request / Invalid input!",
            errors: validationResult.error.errors
        })
    }

    try {
        const createBookmarks = await prisma.bookmarks.create({
            data: {
                user_id: body.user_id,
                paper_id: body.paper_id
            }
        })

        if(createBookmarks) {
            return res.status(200).json({
                message: "User bookmarks created!",
                data: createBookmarks
            })
        }
    }
    catch(error) {
        console.error("Database Insertion Error:", error);
        return res.status(500).json({
            message: "Error while inserting value in database!"
        });
    }
})

router.get("/fetchBookmark", async (req, res) => {
    const id = req.params.user_id;
    try {
        const bookmark = await prisma.bookmarks.findMany({
            where: {user_id: id}
        })

    
        return res.status(200).json({
            message: "Fetched user bookmark successfully!",
            data: bookmark
        })

    }
    catch(error) {
        console.error("Database Retrival Error:", error);
        return res.status(500).json({
            message: "Error while retriving value from database!"
        });
    }
})

router.delete("/deleteUserBookmarks", async (req,res) => {
    const body = req.body;

    const validationResult = deleteUserBookmarksSchema.safeParse(body);
    if(!validationResult.success) {
        return res.status(400).json({
            message: "Bad Request / Invalid input!",
            errors: validationResult.error.errors
        })
    }

    try {
        const deleteBookmarks = await prisma.bookmarks.delete({
            where: {
                bookmark_id: body.bookmark_id
            } 
        })

        if(deleteBookmarks) {
            return res.status(200).json({
                message: "User bookmarks deleted!",
                data: deleteBookmarks
            })
        }
    }
    catch(error) {
        console.error("Database deletion Error:", error);
        return res.status(500).json({
            message: "Error while deleting value from database!"
        });
    }
})

module.exports = router;
