import Review from "../models/Review.js";


// Create Review
export const createReview = async (req, res) => {
  try {

    const review = new Review(req.body);

    const savedReview = await review.save();

    res.status(201).json(savedReview);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All Reviews
export const getReviews = async (req, res) => {
  try {

    const reviews = await Review.find()
      .populate("product")
      .populate("user");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Review by ID
export const getReviewById = async (req, res) => {
  try {

    const review = await Review.findById(req.params.id)
      .populate("product")
      .populate("user");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Review
export const updateReview = async (req, res) => {
  try {

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete Review
export const deleteReview = async (req, res) => {
  try {

    await Review.findByIdAndDelete(req.params.id);

    res.json({ message: "Review deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};