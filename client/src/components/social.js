
import  React  from 'react';
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton } from "react-social-login-buttons";
import {Button} from "react-bootstrap"

function handleFacebookLogin (){
  alert("hello facebook");
  //console.log(user);
}

function handleGoogleLogin (){
  alert("hello google");
  //console.log(user);
}

function handleTwitterLogin () {
  alert("hello twitter");
  //console.log(user);
}

//const handleSocialLoginFailure = (err) => {
  //console.error(err)
//}

const Social = () => (
        <div>
                <Button>
                  <FacebookLoginButton size="35px" onClick={handleFacebookLogin}/>
                  </Button>
                <Button>
                  <GoogleLoginButton  size="35px" onClick={handleGoogleLogin}/>
                  </Button>
                <Button>
                  <TwitterLoginButton  size="35px" onClick={handleTwitterLogin}/>
                  </Button>
        </div>
)
export default Social    