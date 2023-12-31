const prisma = require('../db');
const { catchAsync } = require('../utils');

const getAllTasks = catchAsync(async (req, res) => {
    const { projectId } = req.query;
    const where = {};

    if (projectId) {
        where.project_id = Number(projectId);
    }

    const tasks = await prisma.task.findMany({
        where,
        orderBy: {
            modification_date: 'desc'
        }
    })

    res.status(200).json(tasks);
})

module.exports = { getAllTasks };