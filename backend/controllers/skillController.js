const Skill = require("../models/Skill");

const fields = ["title", "description", "items", "icon", "order", "active"];

function normalizeItems(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function sanitize(body) {
  return fields.reduce((payload, field) => {
    if (body[field] !== undefined) {
      payload[field] =
        field === "items"
          ? normalizeItems(body[field])
          : typeof body[field] === "string"
            ? body[field].trim()
            : body[field];
    }
    return payload;
  }, {});
}

exports.getSkills = async (req, res, next) => {
  try {
    const query = req.query.all === "true" ? {} : { active: true };
    const skills = await Skill.find(query).sort({ order: 1, createdAt: -1 });

    res.json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    next(error);
  }
};

exports.createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(sanitize(req.body));
    res.status(201).json({ success: true, message: "Skill created", data: skill });
  } catch (error) {
    next(error);
  }
};

exports.updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, sanitize(req.body), {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    res.json({ success: true, message: "Skill updated", data: skill });
  } catch (error) {
    next(error);
  }
};

exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    res.json({ success: true, message: "Skill deleted" });
  } catch (error) {
    next(error);
  }
};
