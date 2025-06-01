// Exemplu header.tsx
import React from 'react';
import { IonHeader, IonToolbar, IonImg } from '@ionic/react';
import ld_logo from '../assets/ld_logo.png';

const Header: React.FC = () => (
  <IonHeader>
    <IonToolbar>
      <IonImg src={ld_logo} style={{ width: '120px', margin: 'auto' }} />
    </IonToolbar>
  </IonHeader>
);

export default Header;
