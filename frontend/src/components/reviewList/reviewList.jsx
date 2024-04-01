import Review from "./review"
import "./reviewList.css"

export default function ReviewList( {reviews}) {
  return (
    <div className="review-list">
         {reviews.map((review, id) => {
        return (
          <div
            key={id}
            className="review-element"
          >
            <Review review={review}/>
          </div>
        );
      })}
    </div>
  )
}
