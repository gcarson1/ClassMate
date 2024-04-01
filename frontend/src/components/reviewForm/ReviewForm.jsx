import { useState } from "react";
import "./ReviewForm.css";

export const ReviewForm = () => {
  const [isOpen, setIsOpen] = useState(false);
//   const [diffNum, setDiffNum] = useState("");
//   const [utility, setUtility] = useState("");
//   const [proffesor, setProffesor] = useState("");
//   const [userName, setUserName] = useState("");
//   const [comment, setComment] = useState("");


  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const numbers = [1, 2, 3, 4, 5];

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
            <div className="ratingswrapper">
              Difficulty
              <select className="dropdown">
                {numbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              Utility
              <select className="dropdown">
                {numbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputs">
              <input className="input" type="text" placeholder="username..."></input>  
              <input className="input" type="text" placeholder="Proffesor Name..."></input> 
              <input className="input" type="text" placeholder="Semester + Year..."></input> 
              <input className="commentBox" type="text" placeholder="Comment..."></input> 
              
            </div>
            
            <div className="addReview-button">
              submit Review
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
