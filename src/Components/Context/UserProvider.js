import React from "react";
import UserContext from "./UserContext";
import apiHandler from "../../API/apiHandler";

class UserProvider extends React.Component {
  state = {
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    apiHandler
      .getUser()
      .then((data) => {
        this.setState({ user: data, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  }


  render() {

    const contextValue = {
      user: this.state.user,
      isLoading: this.state.isLoading,
    };


    return (
      <UserContext.Provider value={contextValue}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}


export default UserProvider;
