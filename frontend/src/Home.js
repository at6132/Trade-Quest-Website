import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to TradeQuest</h1>
      <p>Join the exclusive trading competition on launch day!</p>
      <Link to="/signup">
        <button className="yellow-button">Sign Up Now</button>
      </Link>
    </div>
  );
};

export default Home;
