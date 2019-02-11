import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
 
const responseFacebook = (response) => {
  console.log(response);
}
 
class FacebookSignUp extends React.Component {

    constructor(props) {
        super(props);
      }//end of constructor
    
    render(){
        return(
            <div>
            <div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" 
            data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false">
            </div>
            <FacebookLogin
            appId="323255971807024"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"/>
            </div>
        );//end of return
    }//end of render
}//end of class

export default FacebookSignUp
