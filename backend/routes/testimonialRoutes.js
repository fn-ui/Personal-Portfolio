const express = require("express");
const router = express.Router();

const Testimonial = require("../models/Testimonial");

/* =========================
   GET ALL TESTIMONIALS
========================= */
router.get("/", async (req, res) => {
  try {

    const testimonials =
      await Testimonial.find().sort({
        createdAt: -1,
      });

    res.json(testimonials);

  } catch (error) {

    console.log(
      "GET TESTIMONIALS ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   GET APPROVED TESTIMONIALS
   (FOR PUBLIC WEBSITE)
========================= */
router.get("/approved", async (req, res) => {

  try {

    const testimonials =
      await Testimonial.find({
        status: "approved",
      }).sort({
        createdAt: -1,
      });

    res.json(testimonials);

  } catch (error) {

    console.log(
      "GET APPROVED TESTIMONIALS ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   CREATE TESTIMONIAL
   (PUBLIC SUBMISSION)
========================= */
router.post("/", async (req, res) => {

  try {

    const newTestimonial =
      new Testimonial({
        name: req.body.name,
        role: req.body.role,
        message: req.body.message,

        // OPTIONAL IMAGE
        image: req.body.image || "",

        // DEFAULT STATUS
        status: "pending",
      });

    const savedTestimonial =
      await newTestimonial.save();

    res.status(201).json(
      savedTestimonial
    );

  } catch (error) {

    console.log(
      "CREATE TESTIMONIAL ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   APPROVE TESTIMONIAL
========================= */
router.put("/:id/approve", async (req, res) => {

  try {

    const testimonial =
      await Testimonial.findByIdAndUpdate(
        req.params.id,
        {
          status: "approved",
        },
        { new: true }
      );

    if (!testimonial) {

      return res.status(404).json({
        message: "Testimonial not found",
      });
    }

    res.json(testimonial);

  } catch (error) {

    console.log(
      "APPROVE TESTIMONIAL ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   UPDATE TESTIMONIAL
========================= */
router.put("/:id", async (req, res) => {

  try {

    const updatedTestimonial =
      await Testimonial.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          role: req.body.role,
          message: req.body.message,
          image: req.body.image || "",
        },
        { new: true }
      );

    if (!updatedTestimonial) {

      return res.status(404).json({
        message: "Testimonial not found",
      });
    }

    res.json(updatedTestimonial);

  } catch (error) {

    console.log(
      "UPDATE TESTIMONIAL ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   DELETE TESTIMONIAL
========================= */
router.delete("/:id", async (req, res) => {

  try {

    const deletedTestimonial =
      await Testimonial.findByIdAndDelete(
        req.params.id
      );

    if (!deletedTestimonial) {

      return res.status(404).json({
        message: "Testimonial not found",
      });
    }

    res.json({
      message:
        "Testimonial deleted successfully",
    });

  } catch (error) {

    console.log(
      "DELETE TESTIMONIAL ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;