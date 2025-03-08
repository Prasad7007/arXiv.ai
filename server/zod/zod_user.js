const zod = require("zod");

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
    first_name: zod.string().min(1, "First name is required"),
    last_name: zod.string().min(1, "Last name is required"),
    is_active: zod.boolean()
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6, "Password must be at least 6 characters long")
})

const searchHistorySchema = zod.object({
    user_id: zod.number(),
    query: zod.string(),
    date: zod.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }), // Ensures it's a valid date string
    time: zod.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: "Invalid time format (expected HH:mm:ss)",
    }), // Ensures time format is HH:mm:ss
    filters: zod.string().optional(), 
    results_count: zod.number(),
});

const userBookmarksSchema = zod.object({
    user_id: zod.number(),
    paper_id: zod.string(),
})

const deleteUserBookmarksSchema = zod.object({
    bookmark_id: zod.number()
})

module.exports = {
    signinSchema, 
    signupSchema,
    searchHistorySchema,
    userBookmarksSchema,
    deleteUserBookmarksSchema
}