import { useState } from "react";
import "./ReviewForm.css";

export const ReviewForm = ( {uni} ) => {
  const [difficulty, setDifficulty] = useState(1);
  const [utility, setUtility] = useState(1);
  const [grade, setGrade] = useState("A+");
  const [semester, setSemester] = useState("Fall");
  const [year, setYear] = useState(new Date().getFullYear());
  const [professor, setProfessor] = useState(1);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const userID = localStorage.getItem("userEmail"); //needs to be userID when configured and only get it if its not null
  const uniID = uni;


  const handleSubmit = () => {
    // Include all state data in the post request
    const data = {
      difficulty,
      utility,
      grade,
      semester,
      year,
      professor,
      comment
    };

    // Perform your post request here using fetch or any other library
    fetch("http://localhost:7071/addcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  };


  const togglePopup = () => {
    setIsOpen(!isOpen);
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
