
import  React  from 'react';
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton } from "react-social-login-buttons";
import { Button , Modal } from "react-bootstrap"
import { Link,BrowserRouter } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
 

class Login extends React.Component {

    constructor(props) {
        //alert("hello");
        super(props);
        this.stats={
            redirect:false
        }
        this.signup = this.signup.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.state = {
                show: true
        };
        // preserve the initial state in a new object
        //this.baseState = this.state 
    }

    signup(res,type){
     //    alert("hello1");
    }
    handleShow() {
       // alert("hello1");
        this.setState({ show: true });
    }
    
    handleHide() {
        //alert("hello2");
        this.setState({ show: false });
        //this.setState(this.baseState);
    }

    render() {
        //const { match } = this.props;
        /**
         *             <Modal
             {...this.props}
             show={this.state.show}
             onHide={this.handleHide}
             keyboard="true"
             dialogClassName="custom-modal"
            >
                <Modal.Header closeButton="true">
                      <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body align="center">
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleHide}>Close</Button>
                </Modal.Footer>
            </Modal> 
            <FacebookLoginButton onClick={this.handleHide}/>

         */

        const responseFacebook = (response) => {
            console.log(response);
            this.signup(response,'facebook');
        }
          
          const responseGoogle = (response) => {
              console.log(response);
              this.signup(response,'google');
            }
          

        return(
        
        <BrowserRouter>
        <div>       
            <Link to = '/facebook'>
                <FacebookLogin
                appId="323255971807024"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"/>
            </Link>
            <br/>
            <Link to = '/google'>
                <GoogleLogin
                clientId="570581306604-o11iupug9qbc77t3tafjnbm7eclrsgu9.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}>    
                <span> Login with Google</span>
                </GoogleLogin>
            </Link>
            <br/>
            <Link to = '/twitter'>
                <TwitterLoginButton onClick={this.handleHide}/>
            </Link>
            <br/>
            <Link to = '/email'>
                <Button bsStyle="primary" className="bp3-minimal" onClick={this.handleHide}>Register with Email
                </Button> 
            </Link>
            <br/>
            <Link to = '/home'>
                <Button bsStyle="primary" className="bp3-minimal">Back
                </Button> 
            </Link>
        <br/>            
       </div>
        </BrowserRouter>
        );
    }//end of render
}//end of class
export default Login    