import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonDatetime,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import { database } from "../config/firebase";
import { onValue, push, ref } from "firebase/database";
import { Record } from "../types/record";
import { formatDate } from "../config/format.date";

const HistoryPage: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>();

  /**
   * Obtiene la fecha y hora actual de colombia en formato YYY-MM-DD 
   * @returns la fecha actual formateada en formato YYY-MMM-DD
   */
  const currentDate = () => {
    const current = new Date().toLocaleDateString("es-CO");
    const a = current.split("/").reverse();
    return `${a[0]}-${a[1].toString().padStart(2, "0")}-${a[2]
      .toString()
      .padStart(2, "0")}`;
  };

  /**
   * Divide la fecha y hora por medio del separador T para quedar solo con la fecha
   * @param dateValue fecha y hora que se desea dividir
   * @returns la fecha dividida
   */
  const splitDate = (dateValue: string) => {
    return dateValue.split("T")[0];
  };

  /**
   * Filtra los registros de la lista respecto a la fecha seleccionada
   * @param dateValue fecha por la cual se desea filtrar
   * @param array lista de los registros obtenidos
   * @returns una nueva lista con las fechas correspondientes
   */
  const filterRecords = (dateValue: string, array: Record[]) => {
    return array.filter(
      (record) => splitDate(record.date) === splitDate(dateValue)
    );
  };

  /**
   * Obtiene los registros del historial desde la base de datos a partir del nodo 'records'
   */
  const readRecords = () => {
    const cartRef = ref(database, "records");
    let current = currentDate();
    onValue(cartRef, (snapshot) => {
      if (!snapshot.exists) return;
      const data = snapshot.val();
      const recordsData = Object.values(data) as Record[];
      let newRecords: Record[] = [];
      // Se muestran los registros de la fecha actual cuando no se ha seleccionado fecha
      if (!selectedDate) { 
        newRecords = filterRecords(current, recordsData);
        setRecords(newRecords);
        return;
      }
      // Se muestran los registros de la fecha seleccionada
      newRecords = filterRecords(selectedDate, recordsData);
      setRecords(newRecords);
    });
  };

  /**
   * Se obtiene la fecha y se asigna al estado respectivo
   * @param event evento del datetime
   */
  const handleDateChange = (event: CustomEvent) => {
    const dateValue = event.detail.value;
    setSelectedDate(dateValue);
  };

  useEffect(() => { // se llama la función que lee los registros
    readRecords();
  }, [selectedDate]);

  return (
    <IonPage>
      <IonHeader className="flex h-[2.5rem]">
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="h-[8rem] rounded-b-[4rem] drop-shadow-xl bg-gradient-to-r from-blue-600 to-blue-400 w-full ">
          <IonTitle className="text-center font-bold pt-[3rem]" color="light">
            Historial
          </IonTitle>
        </div>
        <div className="mt-[2rem] w-full">
          <IonToolbar className="w-[21rem] mx-auto">
            <IonDatetime
              presentation="date"
              display-format="DD MMM YYYY"
              placeholder="Seleccione una fecha"
              value={selectedDate}
              showDefaultTitle
              onIonChange={handleDateChange}
            >
              <span slot="title">Seleccionar fecha</span>
            </IonDatetime>
          </IonToolbar>
        </div>

        <IonList className="">
          {records.map((record, index) => (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardTitle>{index + 1}</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <p>
                  <strong>fecha:</strong> {formatDate(record.date)}
                </p>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HistoryPage;
