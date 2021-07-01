import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'; 
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';
// import Particles from "react-tsparticles";
import './App.css';


// Reset to this default state when signed out
const initialState = {
  input: '',
  imageUrl: '',
  box:{},
  route: 'signin',
  isSignedIn: false,
  user: {       // to show the user profile
    id: '',
    name:'',
    email:'',
    entries: 0,
    joined: ''
  }
};

// the main app
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user: {       // to show the user profile
        id: '',
        name:'',
        email:'',
        entries: 0,
        joined: ''
      }
    };
  }

  loadUser = (data) => {
    this.setState( {user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  // For demonstration, deleted by the instructor
  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log('calculateFaceLocation', width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log('displayFaceBox', box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // Takes in the url input as a state -> pass it to the Clarifai API
  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    
    // fetch the backend and call the Clarifai API there (for security concern, so process the API key in the backend)
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())  // Remember to .json() the response when we use FETCH!
    .then(response => {
      if (response) {     // if face is detected
        fetch('http://localhost:3000/image', {  // send the user.id to the server, and get his/her entries as response -> setState
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
            // this is the way to update just one value of the user object, instead of overwrite it entirely
          })
          .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))})
    .catch(err => console.log(err)
    )
  }

  onRouteChange = (route) => {
    // if (route === 'signout'){
    //   this.setState(initialState)
    // } else if (route === 'home'){
    //   this.setState({isSignedIn: true})
    // }
    // this.setState({route: route})

    if (route === 'signin'){
      // this.setState(initialState)
      this.setState(initialState)
      console.log('if route === signin')
    } else if (route === 'register'){
      this.setState(initialState)
      console.log('elif route === register')
    } else {
      this.setState({isSignedIn: true})
      console.log('else')
    }
    this.setState({route: route});

    console.log('route: ', route);
    console.log('this.state.route: ', this.state.route);
    console.log('this.state: ', this.state);
    
  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'  // if statement
        ? <div>                         {/* then */}
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onPictureSubmit={this.onPictureSubmit} 
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        : (                              // else if
          route === 'signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          ) 
        }
        </div>
    );
}

}

export default App;
