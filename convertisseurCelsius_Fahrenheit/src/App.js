import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// function BoilingVedict({temperature}){
//     let message = "";
//     if(temperature >= 100){
//         message = "l'eau bout";
//     }else{
//         message = "l'eau ne bout pas";
//     }

//     return <div className={`alert ${(temperature >= 100) ? 'alert-success':'alert-info'}`}>{message}</div>
// }


// class Calculator extends React.Component{
//     constructor(props){
//        super(props);
//        this.state = {
//            temperature: ''
//        }
//     }

//     celsius(e){
//         this.setState({
//             temperature: e.target.value
//         });
//     }

//     render(){
//          let message = '';
//          if(this.state.temperature === ''){
//              message = '';
//          }else if(this.state.temperature >= 100){
//              message = <div className="alert alert-success">L'eau bout</div>
//          }else{
//              message = <div className="alert alert-info">L'eau ne bout pas</div>
//          }

//         return <div>
//             <label htmlFor="temperature">Temperature : </label>
//             <input type="text" name="temperature" onBlur={this.celsius.bind(this)} /><br /><br />
//             {message}
//         </div>
//     }
// }

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}
/**
T(°F) = T(°F) * 9/5 + 32
T(°C) = (T(°F) - 32) * 5/9
**/

function toCelsius (fahrenheit){
  return (fahrenheit - 32) * 5/9;
}

function toFahrenheit (celsius){
  return (celsius * 9/5) + 32;
}

function BoilingVerdict({celsius}){
  if(celsius >= 100){
      return <div className="alert alert-success">L'eau bout</div>
  }
  return <div className="alert alert-info">L'eau ne bout pas</div>
}

function tryConvert (temperature, convert) {
  const value = parseFloat(temperature);
  if (Number.isNaN(value)){
      return '';
  }
  return (Math.round(convert(value) * 100) / 100).toString();
}

class TemperatureInput extends React.Component{
  constructor(props){
      super(props);
      // this.state = {
      //     temperature: ''
      // }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
     // this.setState({temperature: e.target.value})
     this.props.onTemperatureChange(e.target.value);
  }

  render(){
      const name = 'scale' + this.props.scale;
      const scaleName = scaleNames[this.props.scale];
      //const {temperature} = this.state;
      const {temperature} = this.props;

      return <div className="form-group">
          <label htmlFor={name}>Température (en {scaleName})</label>
          <input type="text" id={name} value={temperature} className="form-control" onChange={this.handleChange} />
      </div> 
  }
}

class App extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          scale: 'c',
          temperature: 20
      }
      //this.handleTemperatureChange = this.handleTemperatureChange.bind(this)
      this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
      this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  // handleTemperatureChange (temperature){
  //     this.setState({temperature})
  // }

  handleCelsiusChange (temperature){
      this.setState({
          scale: 'c',
          temperature
      });
  }

  handleFahrenheitChange (temperature){
      this.setState({
          scale: 'f',
          temperature
      });
  }

  // tryConvert (temperature, convert){

  // }

  render(){
      const {temperature, scale} = this.state;
      //const celsius = temperature;
      //const celsius = scale === 'c' ? temperature : toCelsius(temperature);
      const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius)
      //const fahrenheit = toFahrenheit(celsius);
      //const fahrenheit = scale === 'f' ? temperature : toFahrenheit(celsius);
      const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit)


      return <div className="container mt-5">
              <div className="row justify-content-center">
                <div className="col-6">
                  {/* <div className="form-group">
                      <label htmlFor="celsius">Température (en Celsius)</label>
                      <input type="text" id="celsius" value={temperature} className="form-control" onChange={this.handleChange} />
                  </div> */}
                  <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
                  <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
                  {/* <BoilingVerdict celsius={parseFloat(temperature)}></BoilingVerdict> */}
                  <BoilingVerdict celsius={parseFloat(celsius)}></BoilingVerdict>
            </div>
          </div>
      </div>
  }
}

export default App;

