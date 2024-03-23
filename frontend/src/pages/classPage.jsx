import { useEffect } from "react";
import "./UniversityPage.css"
import { useLocation } from "react-router-dom";

export default function ClassPage() {
    const location = useLocation();

  
    const result  = location.state.result;

    useEffect(() => {
        console.log(result);
    })


  return (
    <div>classPage</div>
  )
}
