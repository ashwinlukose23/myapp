import React from "react";
import ReactLoading from "react-loading";
import "./App.css";

class App extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: true,
    };
  }
  componentDidMount() {}

  onClickMe() {
    console.log("You clicked me!");
    this.setState({ DataisLoaded: false });
    fetch("https://reqres.in/api/users?page=1")
      .then((res) => res.json())
      .then((json) => {
        console.log("data=========");
        console.log(json.data);
        this.setState({
          items: json.data,
        });
        setTimeout(() => {
          this.setState({ DataisLoaded: true });
        }, 3000);
      });
  }

  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded)
      return (
        <div className="fetch-details">
          <h2>Fetching data</h2>
          <ReactLoading type="balls" color="#0000FF" height={100} width={50} />
        </div>
      );

    return (
      <div className="App">
        <button className="button" onClick={() => this.onClickMe()}>
          Get Users
        </button>
        {items.map((item) => (
          <div className="details">
            <ol key={item.id}>
              <div className="details1">
              <div>
              First Name: {item.first_name}, 
              </div>
              <div>
              Last Name: {item.last_name}, 
              </div>
              <div>
              Email: {item.email}, 
              </div>
              </div>
            </ol>
            <img src={item.avatar} alt="new" />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
