
import "./review.css";

export default function Review({ review }) {


  return (
    <div className="review-wrapper">
     
        <div className="under-date">
          <div className="ratings-column">
            <div className="diff-header">Difficulty</div>
            <p className="diff-rating">{review.DifficultyValue}</p>
            <p className="qual-header">Utility</p>
            <p className="qual-rating">{review.QualityValue}</p>
          </div>
          <div className="content-right">
            <div className="class-metadata">
             <div>Professor: {review.ProfessorName}</div> 
             <div>Term Taken: {review.TermTaken}</div>
            </div>
            <p className="review-content">{review.Comment}</p>
            <div className="postdate-wrapper">
              Posted:
         <p className="postdate">{review.PostDate.substring(0,10)}</p> 
        </div>
          </div>
        </div>
      
    </div>
  );
}
