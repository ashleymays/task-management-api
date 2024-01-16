/**
 * A wrapper for common database operations with Prisma.
 * @example
 * const userId = req.user.id;
 * const userModel = prismaWrapper(prisma.user);
 * const user = await userModel.getOne(userId);
 * @param { object } model - generated from a Prisma client
 * @return { object }
 */
const prismaWrapper = (model) => {
  const _model = model;

  return {

    /**
     * Adds a new resource to the database.
     * @param { number } userId
     * @param { object } data
     * @return { Promise<object> }
     */
    addOne: (userId, data) => {
      return _model.create({
        where: { userId },
        data,
      });
    },


    /**
     * Gets a resource by its ID.
     * @param { string } id
     * @return { Promise<object | null> }
     */
    getOne: (id) => {
      return _model.findUnique({
        where: {
          id: Number(id),
        },
      });
    },

    
    /**
     * Gets a list of resources by the user's ID.
     * @param { string } userId
     * @return { Promise<object | null> }
     */
    getMany: (userId) => {
      return _model.findMany({
        where: {
          userId: Number(userId),
        },
      });
    },
  };
};


module.exports = { prismaWrapper };
