import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/Home.component";
import Navigation from "./routes/navigation/Navigation.component";
import SignIn from "./routes/sign_in/SignIn.components";

const Shop = () => {
  return (
    <div>Shop</div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <Navigation /> } >
        <Route index element={ <Home /> } />
        <Route path="shop" element={ <Shop /> } />
        <Route path="signIn" element={ <SignIn />} />
      </Route>
    </Routes>
  )
}

export default App;
