import { Link } from "react-router-dom";
function MysteryCard({mystery}) {
    console.log("Mystery:", mystery);
    
  return (
    <div>
        <p>{mystery.category}</p>
        <p>{mystery.title}</p>
        <p>{mystery.subtitle}</p>
        <Link to={`/mysteries/${mystery.id}`}>
        Explore Case
        </Link>
    </div>
  )
}
export default MysteryCard