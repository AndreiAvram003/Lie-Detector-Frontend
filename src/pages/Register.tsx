import React, { useState } from "react";
import { IonPage, IonContent, IonInput, IonButton, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import './Register.css';  // Importa fișierul CSS pentru Register
import Header from "../components/Header";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  const handleRegister = async () => {
    const response = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      alert("Înregistrare cu succes! Te poți loga acum.");
      history.push("/login");
    } else {
      const errorData = await response.json();
      alert(errorData.detail); // Afișează detaliile erorii
    }
  };

  return (
    <IonPage className="register-page">
      <Header />
      <IonContent className="ion-padding">
        <h2 className="register-title">Register</h2>
        <IonInput
          type="text"
          placeholder="Username"
          onIonChange={(e) => setUsername(e.detail.value!)}
        />
        <IonInput
          type="email"
          placeholder="Email"
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
        <IonInput
          type="password"
          placeholder="Parolă"
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonButton expand="block" onClick={handleRegister}>Înregistrează-te</IonButton>
        <IonButton expand="block" fill="clear" onClick={() => history.push("/login")}>
          Ai deja cont? Loghează-te
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
