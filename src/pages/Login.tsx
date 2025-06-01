import React, { useState } from "react";
import { IonPage, IonContent, IonInput, IonButton, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import './Login.css';
import Header from "../components/Header";

const Login: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email_or_username: emailOrUsername, password }),
    });

    if (response.ok) {
      const data = await response.json();
      history.push("/upload");
      localStorage.setItem("token", data.access_token);
    } else {
      alert("Autentificare eșuată!");
    }
  };

  return (
    <IonPage className="login-page">
      <Header />
      <IonContent fullscreen className="ion-padding">
        <div className="login-wrapper">
          <div className="login-box">
            <h2 className="login-title">Login</h2>
            <IonInput
              type="text"
              placeholder="Email sau Username"
              fill="outline"
              onIonChange={(e) => setEmailOrUsername(e.detail.value!)}
            />
            <IonInput
              type="password"
              placeholder="Parolă"
              fill="outline"
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
            <IonButton expand="block" onClick={handleLogin}>Autentificare</IonButton>
            <IonText 
              onClick={() => history.push("/register")} 
              style={{ marginTop: "1rem", display: "block"  }}
            >
              Nu ai cont?
            </IonText>
            <IonButton expand="block" fill="clear" onClick={() => history.push("/register")}>
              Înregistrează-te
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
