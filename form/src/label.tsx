import React from "react";

interface IProps {
  message: string;
}


class Label extends React.Component<IProps> {
  render() {
    const { message } = this.props;

    return (
        <div>
            <h4>{message}</h4>
        </div>    
    )
}
}

export default Label;