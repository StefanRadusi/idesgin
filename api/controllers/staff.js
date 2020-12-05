const staffDB = require("../models/staff");
const images = require("../models/images");
const { v4: uId } = require("uuid");

const update = async (req, res) => {
  const { id, name, description, author, imgData, imgType } = req.body || {};

  if (id) {
    const memberInDb = await staffDB.getMemberById(id);
    if (memberInDb) {
      const coverImageUrl = await images.updateCoverImg(id, imgData, imgType);

      await staffDB.updateMember(id, name, description, author, coverImageUrl);

      return res.json({ msg: "staff member successfully updated" });
    }
  }

  const memberId = uId();
  const coverImageUrl = await images.updateCoverImg(memberId, imgData, imgType);

  const item = await staffDB.addMember(
    memberId,
    name,
    description,
    author,
    coverImageUrl
  );

  item.id = memberId;
  delete item.pk;

  return res.json({
    msg: "staff member successfully added",
    item,
  });
};

const getAll = async (_, res) => {
  const staffMembers = await staffDB.getAll();
  return res.json({
    staffMembers: staffMembers
      ? staffMembers.map((member) => {
          member.id = member.pk;
          delete member.pk;

          return member;
        })
      : [],
  });
};

const deleteMember = async (req, res) => {
  console.log(req.params);

  const { id } = req.params || {};

  console.log(id);

  if (id) {
    try {
      await staffDB.deleteById(id);
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
    msg: "please provide id",
  });
};

module.exports = {
  update,
  getAll,
  deleteMember,
};
