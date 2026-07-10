const Service = require("../models/Service");

const fields = ["title", "desc", "detail", "icon", "order", "active"];

function sanitize(body) {
  return fields.reduce((payload, field) => {
    if (body[field] !== undefined) {
      payload[field] = typeof body[field] === "string" ? body[field].trim() : body[field];
    }
    return payload;
  }, {});
}

exports.getServices = async (req, res, next) => {
  try {
    const query = req.query.all === "true" ? {} : { active: true };
    const services = await Service.find(query).sort({ order: 1, createdAt: -1 });

    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
};

exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(sanitize(req.body));
    res.status(201).json({ success: true, message: "Service created", data: service });
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, sanitize(req.body), {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.json({ success: true, message: "Service updated", data: service });
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.json({ success: true, message: "Service deleted" });
  } catch (error) {
    next(error);
  }
};
