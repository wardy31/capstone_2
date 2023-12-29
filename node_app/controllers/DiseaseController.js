const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const schema = require("../validations/DiseaseValidation");

const getDisease = async (req, res) => {
  const { search = "" } = req.query;
  let queries = {};
  if (search.trim().length) {
    queries = {
      name: {
        contains: search,
      },
    };
  }
  try {
    const result = await prisma.disease.findMany({
      where: {
        ...queries,
      },
    });
    return res.json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const createDisease = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const result = await prisma.disease.create({
      data: {
        ...req.body,
      },
    });

    return res.json(result);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(400).send({
          details: [
            {
              message: "disease name has been taken",
              path: ["name"],
            },
          ],
        });
      }
    }
    return res.status(400).send(error);
  }
};

const updateDisease = async (req, res) => {
  try {
    const result = await prisma.disease.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        ...req.body,
      },
    });

    return res.json(result);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(400).send({
          details: [
            {
              message: "disease name has been taken",
              path: ["name"],
            },
          ],
        });
      }
    }
    return res.status(400).send(error);
  }
};

const deleteDisease = async (req, res) => {
  try {
    const result = await prisma.disease.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    return res.json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { getDisease, updateDisease, deleteDisease, createDisease };
