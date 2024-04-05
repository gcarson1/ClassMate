import { useEffect, useState } from "react";
import "./classPage.css"
import { useLocation} from "react-router-dom";
import axios from 'axios';
import ReviewList from "../components/reviewList/reviewList";
import { ReviewForm } from "../components/reviewForm/ReviewForm";


  

  export default function ClassPage() {
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const classID = location.state && location.state.result && location.state.result.ClassID;
  const uni = location.state && location.state.uni;

  const fetchReviews = async () => {
    try {
      if (uni && classID) { 
        const response = await axios.get(`http://localhost:7071/uni/${uni}/class/${classID}`);
        setReviews(response.data); //set review list 
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
    useEffect(() => {
        fetchReviews();
    }, [])

    useEffect(() => {
      console.log(reviews); // Log reviews after it has been updated
  }, [reviews]); // Run this effect whenever reviews changes


  return (

    <div className="class-container">
      <div className="meta-data">
        <ReviewForm uniID={uni}/>
      </div>
      <div className="review-container">
        <ReviewList reviews={reviews} />
      </div>
    </div>
  )
}
