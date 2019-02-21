const Buttons = props => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {" "}
      {props.number}{" "}
    </button>
  );
};

class Calculator extends React.Component {
  state = {
    input: "",
    operator: "",
    memory: "",
    dot: false,
    result: "",
    showResult: ""
  };

  buttons = [
    {
      id: 0,
      number: "C"
    },
    {
      id: 1,
      number: "%"
    },
    {
      id: 2,
      number: "/"
    },
    {
      id: 3,
      number: "7"
    },
    {
      id: 4,
      number: "8"
    },
    {
      id: 5,
      number: "9"
    },
    {
      id: 6,
      number: "*"
    },
    {
      id: 7,
      number: "4"
    },
    {
      id: 8,
      number: "5"
    },
    {
      id: 9,
      number: "6"
    },
    {
      id: 10,
      number: "-"
    },
    {
      id: 11,
      number: "1"
    },
    {
      id: 12,
      number: "2"
    },
    {
      id: 13,
      number: "3"
    },
    {
      id: 14,
      number: "+"
    },

    {
      id: 15,
      number: "0"
    },
    {
      id: 16,
      number: "."
    },
    {
      id: 17,
      number: "="
    }
  ];

  handleClickNumber(button) {
    // Operators: plus, minus, increse, downcrease
    if (
      button.id === 14 ||
      button.id === 10 ||
      button.id === 6 ||
      button.id === 2
    ) {
      if (this.state.result) {
        this.setState(prevState => ({
          showResult: prevState.result,
          operator: button.number,
          memory: prevState.result,
          dot: false,
          input: "",
          result: ""
        }));
      } else {
        this.setState(prevState => ({
          showResult: prevState.input,
          memory: prevState.input,
          input: "",
          operator: button.number,
          dot: false
        }));
      }
    }
    //Button dott.
    else if (button.id === 16) {
      if (this.state.dot === true) return null;
      else {
        this.setState(prevState => ({
          dot: true,
          input: prevState.input + button.number,
          showResult: prevState.input + button.number
        }));
      }
    }
    //Button Cancel 'C'
    else if (button.id === 0) {
      this.setState({
        dot: false,
        operator: "",
        memory: "",
        input: "",
        result: "",
        showResult: 0
      });
    }
    //Button %
    else if (button.id === 1) {
      this.setState(prevState => ({
        input: prevState.showResult / 100,
        showResult: prevState.showResult / 100,
        dot: true,
        result: prevState.result / 100
      }));
    }
    // Button '=' show results
    else if (button.id === 17) {
      const input = Number(this.state.input);
      const memory = Number(this.state.memory);
      if (this.state.operator === "+") {
        this.setState({
          result: memory + input,
          showResult: memory + input,
          memory: memory + input,
          dot: false,
          input: "",
          operator: ""
        });
      } else if (this.state.operator === "-") {
        this.setState({
          result: memory - input,
          showResult: memory - input,
          memory: memory - input,
          dot: false,
          input: "",
          operator: ""
        });
      } else if (this.state.operator === "*") {
        this.setState({
          result: memory * input,
          showResult: memory * input,
          memory: memory * input,
          dot: false,
          input: "",
          operator: ""
        });
      } else if (this.state.operator === "/") {
        this.setState({
          result: memory / input,
          showResult: memory / input,
          memory: memory / input,
          dot: false,
          input: "",
          operator: ""
        });
      }
    }
    // First Zero dont have permission
    else if (button.id === 15) {
      if (
        this.state.input === "0" ||
        this.state.input == "" ||
        this.state.result
      )
        return null;
      else {
        this.setState(prevState => ({
          input: prevState.input + button.number,
          showResult: prevState.input + button.number
        }));
      }
    }
    //Buttons number
    else {
      if (
        this.state.result &&
        this.state.showResult &&
        this.state.showResult[0] !== "."
      ) {
        this.setState({
          result: "",
          input: button.number,
          showResult: button.number
        });
      } else {
        this.setState(prevState => ({
          input: prevState.input + button.number,
          showResult: prevState.input + button.number
        }));
      }
    }
  }

  render() {
    const button = this.buttons.map(button => {
      return (
        <Buttons
          id={button.id}
          number={button.number}
          className={
            button.id === 0 || button.id === 15
              ? "btn btnZero"
              : button.id === 17 ||
                button.id === 14 ||
                button.id === 10 ||
                button.id === 6 ||
                button.id === 2
              ? "btn colorfullButton"
              : "btn"
          }
          onClick={this.handleClickNumber.bind(this, button)}
        />
      );
    });
    return (
      <>
        <div className="inputCalculator"> {this.state.showResult} </div>{" "}
        {button}{" "}
      </>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));
