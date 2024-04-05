import { useEffect, useState } from "react";
import axios from "axios";
import "./ReviewForm.css";

export const ReviewForm = ( {uni, setAlert, classID} ) => {
  const [difficultyValue, setDifficulty] = useState(1);
  const [utilityValue, setUtility] = useState(1);
  const [grade, setGrade] = useState("A+");
  const [termTaken, setTermTaken] = useState("Fall");
  const [year, setYear] = useState(new Date().getFullYear());
  const [professorID, setProfessorID] = useState("");
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userID, setUserID] = useState("");
   const [professors, setProfessors] = useState([]);
   const [uniID, setUniID] = useState("");
  


  useEffect(() => { //gets list of professors
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:7071/class/${classID}/allprofessors`);
        setProfessors(result.data);
        setUniID(uni); //sets uniID
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
  if (localStorage.getItem("userID") !== null) {
    setUserID(localStorage.getItem("userID"));
    console.log("set UserID to", userID);
  } else {
    console.log("user ID " + localStorage.getItem("userID"))
    console.log("user is not logged in, won't be able to make a post")
  }
  }, [])
  
  const handleSubmit = () => {
    const data = {
      difficultyValue,
      utilityValue,
      grade,
      termTaken,
      year,
      professorID,
      comment,
      uniID,
      userID
    };

    axios.post("http://localhost:7071/addcomment", data) //post request for review
      .then(response => {
        console.log("Post request successful", response.data);
      })
      .catch(error => {
        console.error("Error in post request", error);
      });
    console.log( "difficultyValue: " + difficultyValue);
    console.log( "utilityValue: " + utilityValue);
    console.log( "grade: " + grade);
    console.log( "termTaken: " + termTaken);
    console.log( "year: " + year);
    console.log( "professorID: " + professorID);
    console.log( "comment: " + comment);
    console.log( "uniID: " + uniID);
    console.log( "userID: " + userID);
  };


  const togglePopup = () => {
    if (localStorage.getItem("loggedIn") === "true") {
      setIsOpen(!isOpen);
    } else {
      setAlert(true); // Set the alert state if the user is not logged in
    }
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
               <select className="dropdown" onChange={(e) => setTermTaken(e.target.value)}>
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
              <div style={{marginRight: '13px'}}>Professor</div>
               <select className="dropdown" onChange={(e) => setProfessorID(e.target.value)}>
                {professors.map((professor) => (
                  <option key={professor.Name} value={professor.ID}>
                    {professor.Name}
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
