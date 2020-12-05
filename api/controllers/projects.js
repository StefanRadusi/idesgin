const projectDB = require("../models/project");
const images = require("../models/images");
const { v4: uId } = require("uuid");

const updateProject = async (req, res) => {
  const { id, title, type, description, tags, imgData, imgType } =
    req.body || {};

  if (id) {
    const projectInDb = await projectDB.getProjectById(id);
    if (projectInDb) {
      const coverImageUrl = await images.updateCoverImg(id, imgData, imgType);

      await projectDB.updateProject(
        id,
        title,
        type,
        description,
        tags,
        coverImageUrl
      );

      return res.json({ msg: "project successfully updated" });
    }
  }

  const projectId = uId();
  const coverImageUrl = await images.updateCoverImg(
    projectId,
    imgData,
    imgType
  );
  const item = await projectDB.addProject(
    projectId,
    title,
    type,
    description,
    tags,
    coverImageUrl
  );

  item.id = projectId;
  delete item.pk;

  return res.json({
    msg: "project successfully added",
    item,
  });
};

const getByType = async (req, res) => {
  console.log(req.params);

  const { type } = req.params || {};

  if (type) {
    const projects = await projectDB.getByType(type);
    return res.json({
      projects: projects
        ? projects.map((project) => {
            project.id = project.pk;
            delete project.pk;

            return project;
          })
        : [],
    });
  }

  return res.json({
    projects: [],
  });
};

const deleteProject = async (req, res) => {
  console.log(req.params);

  const { id } = req.params || {};

  console.log(id);

  if (id) {
    try {
      await projectDB.deleteById(id);
      return res.json({
        msg: "Project deleted successfully",
      });
    } catch (err) {
      return res.json({
        msg: "Error in deleting the project",
      });
    }
  }

  return res.json({
    projects: [],
  });
};

module.exports = {
  updateProject,
  getByType,
  deleteProject,
};
