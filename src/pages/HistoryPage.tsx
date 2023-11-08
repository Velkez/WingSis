import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonDatetime,
} from '@ionic/react';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString());
  const [showFullHistory, setShowFullHistory] = useState<boolean>(false);

  useEffect(() => {
    // Simulación de carga del historial de registros
    const fetchHistory = async () => {
      // Aquí puedes realizar una llamada a la API para obtener el historial de registros
      // según la fecha seleccionada y la opción de mostrar historial completo.
      // Puedes almacenar los registros en el estado 'history' utilizando setHistory(registros).
      // Por ahora, se muestra un ejemplo con registros ficticios.

      const fakeHistory = [
        'Dispositivo activado a las 9:00 am',
        'Dispositivo apagado a las 10:30 am',
        'Dispositivo prendido a las 11:45 am',
        'Dispositivo apagado a las 1:15 pm',
      ];

      setHistory(fakeHistory);
    };

    fetchHistory();
  }, [selectedDate, showFullHistory]);

  const handleDateChange = (event: CustomEvent) => {
    setSelectedDate(event.detail.value);
  };

  const handleViewFullHistory = () => {
    setShowFullHistory(true);
  };

  return (
    <IonPage>
      <IonHeader className='flex h-[2.5rem]'>
        <IonToolbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='h-[8rem] rounded-b-[4rem] drop-shadow-xl bg-gradient-to-r from-blue-600 to-blue-400 w-full '>
          <IonTitle className='text-center font-bold pt-[3rem]' color="light">Historial</IonTitle>
        </div>
        <div className='mt-[2rem] w-full'>
          <IonToolbar className='w-[21rem] mx-auto'>
            <IonDatetime
              presentation="date"
              display-format="DD MMM YYYY"
              placeholder="Seleccione una fecha"
              value={selectedDate}
              onIonChange={handleDateChange}
            ></IonDatetime>
          </IonToolbar>
        </div>

        <IonList className='w-[22rem] mx-auto mt-[2rem]'>
          {history.map((record, index) => (
            <IonItem key={index}>
              <IonLabel className='ion-text-center'>{record}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        {!showFullHistory && (
          <IonButton expand="full" onClick={handleViewFullHistory} className='mb-[6rem] mt-[2rem] w-[15rem] mx-auto' shape='round'>
            Ver historial completo
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default HistoryPage;
