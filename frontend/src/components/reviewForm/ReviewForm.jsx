import { useEffect, useState } from "react";
import axios from "axios";
import "./ReviewForm.css";

export const ReviewForm = ( {uni, setAlert} ) => {
  const [difficulty, setDifficulty] = useState(1);
  const [utility, setUtility] = useState(1);
  const [grade, setGrade] = useState("A+");
  const [semester, setSemester] = useState("Fall");
  const [year, setYear] = useState(new Date().getFullYear());
  const [professor, setProfessor] = useState(1);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userID, setUserID] = useState("");
  const uniID = uni;


  useEffect(() => {
  if (localStorage.getItem("userID") !== null) {
    setUserID(localStorage.getItem("userID"));
    console.log("set UserID to", userID);
  } else {
    console.log("user is not logged in, won't be able to make a post")
  }
  }, [])
  
  const handleSubmit = () => {
    const data = {
      difficulty,
      utility,
      grade,
      semester,
      year,
      professor,
      comment,
      uniID,
      userID
    };

    axios.post("/addcomment", data)
      .then(response => {
        console.log("Post request successful", response.data);
      })
      .catch(error => {
        console.error("Error in post request", error);
      });
  };


  const togglePopup = () => {
    if (localStorage.getItem("loggedIn") === "true") {
      setIsOpen(!isOpen);
    } else {
      setAlert(true); // Set the alert state if the user is not logged in
    }
  };


  const numbers = [1, 2, 3, 4, 5];
  const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "F"];
  const semesters = ["Fall", "Spring", "Summer", "Winter"];

  const getLastTenYears = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index);
    return years;
  };

  // Call the function to get the array of last 10 years
  const lastTenYears = getLastTenYears();

  return (
    <div className="popup-container">
      {!isOpen && (
        <div className="addReview-button" onClick={togglePopup}>
          Add A Review
        </div>
      )}
      {isOpen && (
        <div className="popup">
          <div className="popup-inner">
            <div className="goBackBox">
              <p className="goBack" onClick={togglePopup}>go back</p>  
            </div>
            <h2>Review Form</h2>
          
            <div className="review-inputs">  
            <div className="ratingswrapper">
              <div style={{marginRight: '10px'}}>Difficulty*</div>
               <select className="dropdown" onChange={(e) => setDifficulty(e.target.value)}>
                {numbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              
            </div>
           
            <div className="ratingswrapper">
              <div style={{marginRight: '30px'}}>Utility*</div>
               <select className="dropdown" onChange={(e) => setUtility(e.target.value)}>
                {numbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              
            </div>
            <div className="ratingswrapper">
              <div style={{marginRight: '25px'}}>Grade*</div>
               <select className="dropdown"  onChange={(e) => setGrade(e.target.value)}>
                {grades.map((grades) => (
                  <option key={grades} value={grades}>
                    {grades}
                  </option>
                ))}
              </select>
              
              
            </div>

            <div className="ratingswrapper">
              <div style={{marginRight: '2px'}}>Semester*</div>
               <select className="dropdown" onChange={(e) => setSemester(e.target.value)}>
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>

              <div style={{marginRight: '5px', marginLeft: '10px'}}>Year*</div>
               <select className="dropdown" onChange={(e) => setYear(e.target.value)}>
                {lastTenYears.map((grades) => (
                  <option key={grades} value={grades}>
                    {grades}
                  </option>
                ))}
              </select>
            </div>
            <div className="ratingswrapper">
              <div style={{marginRight: '13px'}}>Proffesor</div>
               <select className="dropdown" onChange={(e) => setProfessor(e.target.value)}>
                {numbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
              <input className="commentBox" type="text" placeholder="Comment..."
              onChange={(e) => setComment(e.target.value)}></input> 
            </div>
            
            <button className="addReview-button" onClick={handleSubmit}>
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
