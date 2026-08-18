import Course from "../../model/courseModel.js";

export const getCoursesController = async (req, res) => {
  try {
    const {
      search,
      grade,
      subject,
      minPrice,
      maxPrice,
      minRating,
      sort,
      page = 1,
      limit = 6,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    if (grade) {
      query.grade = Number(grade);
    }

    if (subject) {
      query.subject = subject;
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    if (minRating) {
      query["teacher.rating"] = {
        $gte: Number(minRating),
      };
    }

    let sortOption = {};

    if (sort === "price_asc") {
      sortOption.price = 1;
    }

    if (sort === "price_desc") {
      sortOption.price = -1;
    }

    if (sort === "rating_desc") {
      sortOption["teacher.rating"] = -1;
    }

    if (sort === "rating_asc") {
      sortOption["teacher.rating"] = 1;
    }

    const currentPage = Number(page);
    const itemsPerPage = Number(limit);
    const skip = (currentPage - 1) * itemsPerPage;

    const [courses, totalCourses] = await Promise.all([
      Course.find(query).sort(sortOption).skip(skip).limit(itemsPerPage),

      Course.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalCourses / itemsPerPage);

    res.status(200).json({
      courses,
      pagination: {
        currentPage,
        totalPages,
        totalCourses,
        limit: itemsPerPage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
