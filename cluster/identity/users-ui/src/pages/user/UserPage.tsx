import { useParams, useNavigate } from 'react-router-dom';
import './PasswordPage.css';



function App() {
  let { id } = useParams();

  if (id === "me"){
    console.log("self");
  }
  return (
    <div>
      User ID: ${id}
    </div>
  );
}

export default App;
