import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/LandingPage/Members.css";
import Nimrah from "../../Images/EC/Nimra.jpeg";
import Akbar from "../../Images/EC/Akbar.jpg";
import Ahmad from "../../Images/EC/Ahmad.JPG";

const Members = () => {
  return (
    <div
      style={{ backgroundColor: "#F8F9FA", padding: "2rem", boxShadow: "none" }}
    >
      <h1 style={{ textAlign: "center" }}>Organizing Committee</h1>
      <br></br>
      <div className="container" style={{backgroundColor: "none"}}>
        <div class="row" style={{ justifyContent: "center" }}>
          <div class="column">
            <div class="card">
              <img src={Akbar} alt="Mike" style={{ width: "100%" }} />
              <div class="container">
                <h2>Akbar Khan Zada</h2>
                <p class="title">VP Resources</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                {/*<p>example@example.com</p>
            <p>
              <button class="button">Contact</button>
            </p> */}
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <img src={Nimrah} alt="Jane" style={{ width: "100%" }} />
              <div class="container">
                <h2>Nimrah Abaidullah</h2>
                <p class="title">VP Coord</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                {/*<p>example@example.com</p>
            <p>
              <button class="button">Contact</button>
            </p> */}
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <img src={Ahmad} alt="Mike" style={{ width: "100%" }} />
              <div class="container">
                <h2>Ahmed Ayub</h2>
                <p class="title">VP Outreach</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                {/*<p>example@example.com</p>
            <p>
              <button class="button">Contact</button>
            </p> */}
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <img
                src="https://images.unsplash.com/photo-1640952131659-49a06dd90ad2?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Mike"
                style={{ width: "100%" }}
              />
              <div class="container">
                <h2>Mike Ross</h2>
                <p class="title">Art Director</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                {/*<p>example@example.com</p>
            <p>
              <button class="button">Contact</button>
            </p> */}
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <img
                src="https://images.unsplash.com/photo-1640952131659-49a06dd90ad2?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="John"
                style={{ width: "100%" }}
              />
              <div class="container">
                <h2>John Doe</h2>
                <p class="title">Designer</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                {/*<p>example@example.com</p>
            <p>
              <button class="button">Contact</button>
            </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
