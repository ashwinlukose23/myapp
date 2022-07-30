import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";
import "./App.css";

const Button = styled.button`
  background-color: #3f51b5;
  color: white;
  padding: 5px 15px;
  margin: 20px;
  border-radius: 5px;
  text-transform: uppercase;
  box-shadow: 1px 2px 2px lightgray;
  cursor: pointer;
  transition: ease background-color 500ms;
  &:hover {
    background-color: #28359;
  }
`;

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
        <Button onClick={() => this.onClickMe()}>Button</Button>
        {items.map((item) => (
          <div>
            <ol key={item.id}>
              First Name: {item.first_name}, Last Name: {item.last_name}, User Email:{item.email} ,
            </ol>
            <img src={item.avatar} alt="new" />
          </div>
        ))}
      </div>
    );
  }
}

export default App;