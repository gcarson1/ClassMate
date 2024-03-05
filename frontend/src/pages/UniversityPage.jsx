import { useParams } from "react-router-dom"
import "./UniversityPage.css"



export default function UniversityPage() {
const { id } = useParams();

  return (

    <div className="container">
        <h1 className="university-header">{ id }</h1>
        </div>
  )
}
