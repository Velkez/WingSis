import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToggle, IonToolbar, useIonActionSheet, } from '@ionic/react';
import { notificationsCircle, notificationsOffCircle } from 'ionicons/icons';
import React from 'react';

const Home: React.FC = () => {
  const [] = useIonActionSheet();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='flex h-[2.5rem]'></IonToolbar>
      </IonHeader>

      <IonContent fullscreen >
        <div className='h-[13rem] rounded-b-[4rem] drop-shadow-xl bg-gradient-to-r from-blue-600 to-blue-400 w-full'>
          <IonTitle className='ion-text-center font-bold pt-[3rem] pb-[1rem]' color="light">El dispositivo esta</IonTitle>
          <div className='mb-[2rem] mx-auto w-[16rem] bg-white rounded-full'>
            <IonSegment color="dark" value="dark" className='rounded-full'>
              <IonSegmentButton value="encendido">
                <IonIcon icon={notificationsCircle}></IonIcon>
                <IonLabel className='text-[11px]'>Encendido</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="apagado">
                <IonIcon icon={notificationsOffCircle}></IonIcon>
                <IonLabel className='text-[11px]'>Apagado</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
