const zod = require("zod");

const storeQuerySchema = zod.object({
    query: zod.string(),
    summary: zod.string()
})

const filterSchema = zod.object({
    filter: zod.string()
})

const getPaperByIds = zod.object({
    ids: zod.array(zod.union([zod.string(), zod.number()]))
})

const getPaperByPaperId = zod.object({
    ids: zod.array(zod.union([zod.string(), zod.number()]))
})

module.exports = {
    storeQuerySchema,
    filterSchema,
    getPaperByIds,
    getPaperByPaperId
}