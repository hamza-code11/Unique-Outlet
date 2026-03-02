import React, { useState } from "react";
import { FiStar } from "react-icons/fi";

const ReviewsTab = ({ isDarkMode }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  
  const allReviews = [
    { author: "John D.", rating: 5, comment: "Great Strawberry flavor! Very smooth and authentic taste. Will definitely buy again.", date: "2024-02-15", helpful: 24 },
    { author: "Sarah M.", rating: 4, comment: "Good quality product, fast shipping. Would recommend.", date: "2024-02-10", helpful: 12 },
    { author: "Mike R.", rating: 5, comment: "Best e-liquid I've tried. The flavor is consistent and long-lasting.", date: "2024-02-05", helpful: 31 },
    { author: "Emily W.", rating: 4, comment: "Nice flavor, good vapor production. Will order again.", date: "2024-02-01", helpful: 8 },
    { author: "Tom S.", rating: 5, comment: "Amazing taste and great customer service!", date: "2024-01-28", helpful: 19 },
  ];

  const displayedReviews = showAllReviews ? allReviews : allReviews.slice(0, 3);
  const averageRating = 4.2;
  const totalRatings = 992;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Here you would typically send the review to your backend
    alert("Thank you for your review!");
    setShowReviewForm(false);
    setReviewText("");
    setReviewRating(5);
    setReviewName("");
  };

  return (
    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      {/* Rating Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="text-4xl font-bold text-blue-600">{averageRating}</span>
            <p className="text-xs opacity-75">out of 5</p>
          </div>
          <div>
            <div className="flex items-center gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={`text-lg ${
                  i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`} />
              ))}
            </div>
            <p className="text-xs opacity-75">Based on {totalRatings} ratings</p>
          </div>
        </div>
        
        {/* Write Review Button */}
        <button 
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 
                   text-white text-sm rounded-lg hover:from-blue-700 
                   hover:to-cyan-700 transition-all duration-300"
        >
          {showReviewForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>
      
      {/* Review Form */}
      {showReviewForm && (
        <div className={`mb-6 p-4 rounded-lg border ${
          isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
        }`}>
          <h5 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Write Your Review
          </h5>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-3">
              <label className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Name
              </label>
              <input
                type="text"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                required
                className={`w-full px-3 py-2 rounded-lg border text-sm
                  ${isDarkMode 
                    ? 'bg-gray-600 border-gray-500 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Your name"
              />
            </div>
            
            <div className="mb-3">
              <label className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setReviewRating(rating)}
                    className="focus:outline-none"
                  >
                    <FiStar className={`text-xl ${
                      rating <= reviewRating 
                        ? 'text-yellow-400 fill-current' 
                        : isDarkMode ? 'text-gray-500' : 'text-gray-300'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-3">
              <label className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                rows="3"
                className={`w-full px-3 py-2 rounded-lg border text-sm
                  ${isDarkMode 
                    ? 'bg-gray-600 border-gray-500 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Write your review here..."
              />
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 
                       text-white text-sm rounded-lg hover:from-blue-700 
                       hover:to-cyan-700 transition-all duration-300"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
      
      {/* Rating Bars */}
      <div className="mb-6 space-y-2 max-w-md">
        {[5, 4, 3, 2, 1].map((rating) => {
          const percentage = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2;
          return (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-xs w-8">{rating} star</span>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs w-8">{percentage}%</span>
            </div>
          );
        })}
      </div>
      
      {/* Reviews List */}
      <div className="space-y-4">
        <h5 className={`font-semibold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Customer Reviews
        </h5>
        
        {displayedReviews.map((review, i) => (
          <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 
                                flex items-center justify-center text-white text-sm font-bold`}>
                  {review.author.charAt(0)}
                </div>
                <div>
                  <span className="font-semibold">{review.author}</span>
                  <span className="text-xs ml-2 opacity-60">{review.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <FiStar key={j} className={`text-xs ${
                    j < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-10">
              {review.comment}
            </p>
            <div className="flex items-center gap-4 mt-2 ml-10">
              <button className={`text-xs flex items-center gap-1 
                ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                Helpful ({review.helpful})
              </button>
              <button className={`text-xs 
                ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Load More Button */}
      {!showAllReviews && allReviews.length > 3 && (
        <button 
          onClick={() => setShowAllReviews(true)}
          className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Load more reviews ({allReviews.length - 3} remaining) →
        </button>
      )}
    </div>
  );
};

export default ReviewsTab;