const projectDB = require("../models/project");
const images = require("../models/images");
const { v4: uId } = require("uuid");
const { getImgKey } = require("../utils");

const updateProject = async (req, res) => {
  const { id, title, type, description, tags, imgData, imgType } =
    req.body || {};

  if (id) {
    const projectInDb = await projectDB.getProjectById(id);
    if (projectInDb) {
      const coverImageUrl = await images.updateCoverImg(
        getImgKey(projectInDb.coverImageUrl),
        imgData,
        imgType
      );

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

const getById = async (req, res) => {
  const { id } = req.params || {};

  if (id) {
    const project = await projectDB.getProjectById(id);
    return res.json({
      project,
    });
  }

  return res.json({
    project: {},
  });
};

const getByType = async (req, res) => {
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
  const { id } = req.params || {};

  if (id) {
    try {
      const project = await projectDB.getProjectById(id);

      if (project && (project.coverImageUrl || project.imgs.length)) {
        let imgsList = [];
        if (project.coverImageUrl)
          imgsList.push(getImgKey(project.coverImageUrl));
        if (project.imgs.length) {
          for (const url of project.imgs) {
            imgsList.push(getImgKey(url));
          }
        }

        await images.deleteImgs(imgsList);
      }
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

const addImgToProject = async (req, res) => {
  const { projectId, imgData, imgType } = req.body || {};

  if (projectId && imgData && imgType) {
    const project = await projectDB.getProjectById(projectId);
    if (project) {
      const imgId = uId();

      const imgUrl = await images.updateCoverImg(imgId, imgData, imgType);
      const imgs = await projectDB.addImgToProject(project, imgUrl);

      return res.json({
        imgs,
      });
    }
  }

  return res.json({
    imgs: [],
  });
};

const removeImgFromProject = async (req, res) => {
  const { projectId, imgUrl } = req.body || {};

  if (projectId && imgUrl) {
    const project = await projectDB.getProjectById(projectId);
    if (project) {
      await images.deleteImgs([getImgKey(imgUrl)]);
      await projectDB.removeImgToProject(project, imgUrl);

      return res.json({
        msg: "img deleted successfully deleted",
      });
    }
  }

  return res.json({
    msg: "something went wrong when deleting img",
  });
};

module.exports = {
  updateProject,
  getById,
  getByType,
  deleteProject,
  addImgToProject,
  removeImgFromProject,
};
