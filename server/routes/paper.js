const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { storeQuerySchema, filterSchema, getPaperByIds, getPaperByPaperId } = require("../zod/zod_paper.js");

const prisma = new PrismaClient();

router.use(express.json())

router.get("/weekly", async (req, res) => {
    try {
        const weeklyPaper = await prisma.weekly_Paper.findMany({});
        if(weeklyPaper) {
            return res.status(200).json({
                message: "Weekly papers retrived!",
                data: weeklyPaper
            })
        }
    }
    catch(error) {
        console.error("Database retrival Error:", error);
        return res.status(500).json({
            message: "Error while retriving value from database!"
        });
    }
})

router.post("/storeQuery", async(req, res) => {
    const body = req.body;
    const validationResult = storeQuerySchema.safeParse(body);

    if(!validationResult.success) {
        return res.status(400).json({
            message: "Bad Request / Invalid input!",
            errors: validationResult.error.errors 
        });
    }

    try {
        const query = await prisma.summary.create({
            data: {
                query: body.query,
                summary: body.summary
            }
        })

        if(data) {
            return res.status(200).json({
                message: "Successfully inserted query and summary!",
                data: query.query
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

router.post("/filter", async (req, res) => {
    const body = req.body;
    const validationResult = filterSchema.safeParse(body);
    
    if (!validationResult.success) {
        return res.status(400).json({
            message: "Bad Request / Invalid input!",
            errors: validationResult.error.errors
        });
    }

    try {
        // Find categories with partial name matching (case insensitive)
        const categoryRecords = await prisma.categories.findMany({
            where: {
                name: {
                    contains: body.filter,
                    mode: "insensitive"
                }
            }
        });

        // Extract category IDs from the result
        const categoryIds = categoryRecords.map(category => category.category_id);

        // If no matching categories found, return an empty response
        if (categoryIds.length === 0) {
            return res.status(200).json({
                message: "No matching categories found!",
                data: []
            });
        }

        // Find papers that match the category IDs
        const categoryData = await prisma.arxiv_Paper.findMany({
            where: {
                category_id: {
                    in: categoryIds  // Filtering using multiple category IDs
                }
            }
        });

        return res.status(200).json({
            message: "Successfully retrieved filtered data!",
            data: categoryData
        });

    } catch (error) {
        console.error("Database retrieval error:", error);
        return res.status(500).json({
            message: "Error while retrieving value from database!"
        });
    }
});


router.get("/categories", async (req, res) => {
    try {
        const categories = await prisma.categories.findMany({});
        if(categories) {
            return res.status(200).json({
                message: "Categories are retrived!",
                data: categories
            })
        }
    }
    catch(error) {
        console.error("Database retrival Error:", error);
        return res.status(500).json({
            message: "Error while retriving value from database!"
        });
    }
})


router.get("/getallpapers", async (req, res) => {
    try {
        const papers = await prisma.arxiv_Paper.findMany({take:25});
        if(papers) {
            return res.status(200).json({
                message: "Papers are retrived!",
                data: papers
            })
        }
    }
    catch(error) {
        console.error("Database retrival Error:", error);
        return res.status(500).json({
            message: "Error while retriving value from database!"
        });
    }
    
})


router.post("/getPaperByIds", async (req, res) => {
    const { ids } = req.body; // ids should be an array of indices

    console.log("Received indices:", ids);

    if (!Array.isArray(ids) || !ids.every(num => Number.isInteger(num))) {
        return res.status(400).json({ message: "Invalid input: ids must be an array of integers!" });
    }

    try {
        const papers = await prisma.arxiv_Paper.findMany(); // Fetch all papers

        // Select only papers at the given indices
        const selectedPapers = ids.map(index => papers[index]).filter(paper => paper !== undefined);

        return res.status(200).json({
            message: "Successfully retrieved papers at specified indices!",
            data: selectedPapers
        });

    } catch (error) {
        console.error("Database retrieval error:", error);
        return res.status(500).json({
            message: "Error while retrieving papers from the database!"
        });
    }
});

router.post("/getPaperByPaperId", async (req, res) => {
    const body = req.body;
    const validationResult = getPaperByPaperId.safeParse(body);
    
    if (!validationResult.success) {
        return res.status(400).json({
            message: "Bad Request / Invalid input!",
            errors: validationResult.error.errors
        });
    }

    try {
        // Fetch only papers that match the given IDs
        const selectedPapers = await prisma.arxiv_Paper.findMany({
            where: {
                paper_id: { in: body.ids } // Efficient filtering
            }
        });

        return res.status(200).json({
            message: "Successfully retrieved papers at specified paper id!",
            data: selectedPapers
        });

    } catch (error) {
        console.error("Database retrieval error:", error);
        return res.status(500).json({
            message: "Error while retrieving papers from the database!"
        });
    }
});


router.get("/fetchtrend", async (req, res) => {
    try {
        const result = await prisma.$queryRaw`
          SELECT 
            DATE_TRUNC('month', "published_date") AS month,
            "category_id",
            COUNT(*) AS paper_count
          FROM public."Arxiv_Paper"
          GROUP BY month, "category_id"
          ORDER BY month DESC, "category_id";
        `;

        // Convert BigInt values to Number
        const formattedResult = result.map(row => ({
            month: new Date(row.month).toLocaleDateString("en-CA"),
            category_id: row.category_id,
            paper_count: Number(row.paper_count)  // Convert BigInt to Number
        }));

        res.status(200).json(formattedResult);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports =  router ;