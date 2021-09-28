import { Switch, Route, Redirect } from "react-router-dom";
import HomePageCard from '../home-page-card/HomePageCard';
import SignupForm from "../signup/SignupForm";
import LoginForm from "../login/LoginForm";

const Routes = ({ login, signup }) =>{
    return(
    <div>
      <Switch>
        <Route exact path="/">
          <HomePageCard />
        </Route>
        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
    )
}

export default Routes;