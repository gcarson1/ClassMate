import { useState } from "react";
import "./ReviewForm.css";

export const ReviewForm = () => {
  const [isOpen, setIsOpen] = useState(false);


// const submit = () => { will submit data to db

// }


  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const numbers = [1, 2, 3, 4, 5];
  const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];
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
               <select className="dropdown">
                {numbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              
            </div>
           
            <div className="ratingswrapper">
              <div style={{marginRight: '30px'}}>Utility*</div>
               <select className="dropdown">
                {numbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              
            </div>
            <div className="ratingswrapper">
              <div style={{marginRight: '25px'}}>Grade*</div>
               <select className="dropdown">
                {grades.map((grades) => (
                  <option key={grades} value={grades}>
                    {grades}
                  </option>
                ))}
              </select>
              
              
            </div>

            <div className="ratingswrapper">
              <div style={{marginRight: '2px'}}>Semester*</div>
               <select className="dropdown">
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>

              <div style={{marginRight: '5px', marginLeft: '10px'}}>Year*</div>
               <select className="dropdown">
                {lastTenYears.map((grades) => (
                  <option key={grades} value={grades}>
                    {grades}
                  </option>
                ))}
              </select>
            </div>
            <div className="ratingswrapper">
              <div style={{marginRight: '13px'}}>Professor</div>
               <select className="dropdown">
                {numbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
              <input className="commentBox" type="text" placeholder="Comment..."></input> 
            </div>
            
            <button className="addReview-button">
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
