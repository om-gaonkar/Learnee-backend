export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
