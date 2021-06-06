import React from "react";

const Loading = (Component) => {
  return class extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  };
};

export default Loading;
