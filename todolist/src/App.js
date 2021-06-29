import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      inputUser : '',
      todo : [],
      index : ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  handleChange(e){
    this.setState({
      inputUser : e.target.value
    });
  }

  //add todo
  add(e){
    e.preventDefault();
    this.setState({
      inputUser:'',
      todo : [...this.state.todo, this.state.inputUser]
    });
  }

  //list todo
  list(){
    return this.state.todo.map((currentValue) => {
      return <tr key={currentValue}>
          <td>{currentValue}</td>
          <td><button className="btn btn-success" onClick={this.updateTodo.bind(this, currentValue)}>Modifier</button></td>
          <td><button className="btn btn-danger" onClick={this.deleteTodo.bind(this, currentValue)}>Supprimer</button></td>
      </tr>
    });
  }

  //delete todo
  deleteTodo(item){
    const _array = this.state.todo;
    const index = _array.indexOf(item);
    _array.splice(index, 1);

    this.setState({
      todo : _array
    });
  }

  //update todo
  updateTodo(item){
    const _array = this.state.todo;
    const index = _array.indexOf(item);

    this.setState({
      inputUser: item,
      index
    });
  }

  update(){
    const _array = this.state.todo;
    _array.splice(this.state.index, 1, this.state.inputUser)
    this.setState({
      inputUser : '',
      todo : _array,
      index : ''
    });
  }



  render(){
    //console.log(this.state.todo)

    let table, inputHidden, button;
    if(this.state.todo.length != 0){
      table =<table className="table">
              <thead>
                <tr>
                  <th colSpan="3">Todo</th>
                </tr>
              </thead>
              <tbody>
                  {this.list()}
              </tbody>
            </table>
    }
    if(this.state.index !== ''){
      inputHidden = <input type="hidden" value={parseInt(this.state.index)} />
      button = button = <button className="btn btn-primary" onClick={this.update}>Update</button>
    }else{
      button = <button className="btn btn-primary" onClick={this.add}>Add</button>
    }

    return <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="form-group">
            {inputHidden}
            <input type="text" value={this.state.inputUser} onChange={this.handleChange} className="form-control" placeholder="Add a new todo" />
          </div>
          <div className="form-group">
            {button}
          </div>
          {table}
        </div>
      </div>
    </div>
  }
}

export default App;