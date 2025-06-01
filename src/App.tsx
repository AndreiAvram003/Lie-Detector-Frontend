import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import History from './pages/History';


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/upload" component={Upload} exact />
        <Route path="/history" component={History} exact />
        <Route exact path="/" component={Upload} />
        <Redirect exact from="/" to="/login" />
        
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
