import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h3>Home</h3>
      <div>
        <Link to="/Login">Log in</Link>
      </div>
      <div>
        <Link to="/Register">Register</Link>
      </div>
    </>
  );
};

export default Home;
