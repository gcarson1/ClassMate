import { useEffect, useState } from "react";
import "./classPage.css"
import { useLocation} from "react-router-dom";
import ReviewList from "../components/reviewList/reviewList";
import { ReviewForm } from "../components/reviewForm/ReviewForm";
import { FetchReviews } from "../API/reviewsAPI";

  export default function ClassPage() {
  const [reviews, setReviews] = useState([]);
  const [alert, setAlert] = useState(false);
  const location = useLocation();
  const classID = location.state && location.state.result && location.state.result.ClassID;
  const uni = location.state && location.state.uni;


  useEffect(() => {
    const fetchData = async () => {
      const reviewsData = await FetchReviews(uni, classID);
      setReviews(reviewsData);
    };
    fetchData();
  }, [uni, classID]);


  
  const setAlertState = (value) => {
    setAlert(value);
  };
  
    useEffect(() => {
        FetchReviews();
    }, [])

    useEffect(() => {
      console.log(reviews); // Log reviews after it has been updated
  }, [reviews]); // Run this effect whenever reviews changes


  return (

    <div className="class-container">
      <div className="meta-data">
        <ReviewForm uni={uni} setAlert={setAlertState} classID={classID}/>
        {alert && <p>You must be logged in to make a review</p>}
      </div>
    
          
        
      <div className="review-container">
        <ReviewList reviews={reviews} />
        
      </div>
    </div>
  )
}
