import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonText, IonButton } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import "./History.css";
import Header from "../components/Header";

interface Video {
  id: number;
  prediction: string;
  confidence: number;
  url: string;
}

const History: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const fetchVideos = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/history/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      } else {
        console.error("Eroare la preluarea videoclipurilor");
      }
    };

    fetchVideos();
  }, [location.key]); // Refă fetch la fiecare accesare

  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className="upload-page">
          <div className="upload-title">Istoric Videoclipuri</div>

          <div className="upload-container">
            {videos.length === 0 ? (
              <IonText>Nu ai încărcat niciun videoclip.</IonText>
            ) : (
              videos.map((video) => (
                <div className="upload-box" key={video.id}>
                  <video controls>
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <IonText>
                    <p>Predicție: {video.prediction}</p>
                    <p>Încredere: {video.confidence}%</p>
                  </IonText>
                </div>
              ))
            )}

            <IonButton onClick={() => history.push("/upload")} expand="block">
              Înapoi la Upload
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default History;
