const projectDB = require("../models/project");
const images = require("../models/images");
const { v4: uId } = require("uuid");

const updateProject = async (req, res, next) => {
  const { id, title, type, description, tags, imgData, imgType } =
    req.body || {};

  if (id) {
    const projectInDb = await projectDB.getProjectById(id);
    if (projectInDb) {
      await images.updateProjectCoverImg(id, imgData, imgType);
      await projectDB.updateProject(id, title, type, description, tags);

      return res.json({ msg: "project successfully updated" });
    }
  }

  const projectId = uId();
  const coverImageUrl = await images.updateProjectCoverImg(
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

module.exports = {
  updateProject,
};
