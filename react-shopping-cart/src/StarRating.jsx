import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating, totalStars = 5 }) => {
  const filledStars = Array.from({ length: Math.floor(rating) }, (_, index) => (
    <FaStar key={index} color="#ffc107" />
  ));

  const emptyStars = Array.from({ length: totalStars - Math.floor(rating) }, (_, index) => (
    <FaRegStar key={index} color="#ffc107" />
  ));

  return (
    <div>
      {filledStars}
      {emptyStars}
    </div>
  );
};

export default StarRating;
