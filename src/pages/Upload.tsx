import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import VideoPreview from "../components/VideoPreview";
import "./Upload.css";
import Header from "../components/Header";

interface PredictionResult {
  filename: string;
  prediction: string;
  confidence: number;
  url: string;
}

const Upload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setVideoURL(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Selectează un videoclip!");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("video", selectedFile);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Nu ești autentificat!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Eroare la încărcarea videoclipului");
      }

      const data: PredictionResult = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Nu ești autentificat!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        history.push("/login");
      } else {
        console.error("Eroare la logout");
      }
    } catch (error) {
      console.error("Eroare la logout:", error);
    }
  };

  const goToHistory = () => {
    history.push({
      pathname: "/history",
      state: { refresh: true },
    });
  };

  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className="upload-page">
          <div className="upload-title">LIE DETECTOR</div>

          <div className="upload-container">
            <div className="upload-box">
              <h3>Upload Video</h3>
              <input type="file" accept="video/*" onChange={handleFileChange} />
              <IonButton onClick={handleUpload} expand="block" className="ion-margin-top">
                Procesează Video
              </IonButton>
            </div>

            <div className="upload-box">
              <h3>Preview</h3>
              {selectedFile ? <VideoPreview file={selectedFile} /> : <IonText>Nu ai selectat niciun video</IonText>}
            </div>

            <div className="upload-box">
              <h3>Rezultat</h3>
              {isLoading ? (
                <div className="spinner-container">
                  <div className="loading-spinner"></div>
                </div>
              ) : result ? (
                <IonText
                  color={
                    result.prediction === "Adevărat" ? "success" : result.prediction === "Fals" ? "danger" : "warning"
                  }
                >
                  <p>Rezultat: {result.prediction}</p>
                  <p>Încredere: {result.confidence}%</p>
                </IonText>
              ) : (
                <IonText>Rezultatul va apărea aici.</IonText>
              )}
            </div>

            <div className="upload-box">
              <IonButton onClick={goToHistory} expand="block">
                Vizualizează Istoricul Videoclipurilor
              </IonButton>
            </div>

            <div className="upload-box">
              <IonButton onClick={handleLogout} expand="block" color="danger">
                Ieși din cont
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Upload;