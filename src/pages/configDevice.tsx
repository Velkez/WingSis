import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, InputChangeEventDetail } from '@ionic/react';
import InstructionsModal from './instructions';

const configDevice: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [showInstructionsModal, setShowInstructionsModal] = useState<boolean>(false);


  const handleWifiChange = (event: CustomEvent<InputChangeEventDetail>) => {
    setUserName(event.detail.value || '');
  };

  const handleOpenInstructionsModal = () => {
    setShowInstructionsModal(true);
  };

  const handleSave = () => {
    console.log('Red WiFi:', userName);

    setUserName('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='flex h-[2.5rem]'>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='h-[8rem] rounded-b-[4rem] drop-shadow-xl bg-gradient-to-r from-blue-600 to-blue-400 w-full '>
          <IonTitle className='text-center font-bold pt-[3rem]' color="light">Configuraciones</IonTitle>
        </div>
        <IonInput label="Usuario de Telegram" labelPlacement="floating" fill="outline" placeholder="Inserte el nombre de usuario" value={userName} onIonChange={handleWifiChange} className='w-[17rem] mx-auto mt-[2rem]'></IonInput>
        <IonButton expand="full" onClick={handleOpenInstructionsModal} className='w-[6rem] h-[2rem] mx-auto mt-[1rem] text-[11px]' shape="round" fill="outline" color="dark">Tutorial</IonButton>
        <IonButton expand="full" onClick={handleSave} className='w-[9rem] mx-auto mt-[2rem]' shape="round">Guardar</IonButton>
        <InstructionsModal showModal={showInstructionsModal} onDismiss={() => setShowInstructionsModal(false)} />
      </IonContent>
    </IonPage>
  );
};

export default configDevice;
