import {
  IonButton,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from "@ionic/react";
import { notificationsCircle, notificationsOffCircle } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { database } from "../config/firebase";
import { SegmentPower } from "../types/segments";
import { onValue, ref, set } from "firebase/database";
import { formatDate } from "../config/format.date";

const Home: React.FC = () => {
  const [] = useIonActionSheet();
  const [segmentValue, setSegmentValue] = useState<string>("");
  const [activationValue, setActivationValue] = useState<number>();
  const [activationText, setActivationText] = useState<string>("");
  const [activeDate, setActiveDate] = useState<string>("");
  const [desactiveDate, setDesactiveDate] = useState<string>("");
  const [activeDateText, setactiveDateText] = useState<string>("");
  const [desactiveDateText, setDesactiveDateText] = useState<string>("");

  /**
   * Actiaiza el valor del estado del dispositivo en la base de datos
   * @param powerValue valor del estado del dispositivo (encendido: 1, apagado: 0)
   */
  const setValuePowerDevice = (powerValue: number) => {
    const cartRef = ref(database, "power");
    set(cartRef, powerValue)
      .then(() => {})
      .catch((error) => console.log(error));
  };

  /**
   * Captura el evento del segmento y da valores de 0 y 1 dependiendo del segmento escogido
   * @param event evento del segmento para el estado del dispositivo
   */
  const powerDevice = (event: Event) => {
    const valueSegment = (event as CustomEvent).detail.value;
    if (valueSegment === SegmentPower.ON) setValuePowerDevice(1);
    if (valueSegment === SegmentPower.OFF) setValuePowerDevice(0);
  };

  const disableAlarm = (value: number) => {
    if (activationValue === 0) return;
    const cartRef = ref(database, "activation");
    set(cartRef, value)
      .then(() => {})
      .catch((error) => console.log(error));
  };

  /**
   * Lee el valor del estado del dispositivo en la base de datos, con un oyente de escucha,
   * para dar valor y mostrar el estado en que se encuentra eo dispositivo en tiempo real
   */
  const readPowerValue = () => {
    const cartRef = ref(database, "power");
    onValue(cartRef, (snapshot) => {
      if (!snapshot.exists) return;
      const value = snapshot.val();
      if (value === 1) setSegmentValue(SegmentPower.ON);
      if (value === 0) setSegmentValue(SegmentPower.OFF);
    });
  };

  const readActivationValue = () => {
    const cartRef = ref(database, "activation");
    onValue(cartRef, (snapshot) => {
      if (!snapshot.exists) return;
      const value = snapshot.val();
      if (value === 1) {
        setActivationValue(1);
        setActivationText("Alarma sonando (Activada)");
      }
      if (value === 0) {
        setActivationValue(0);
        setActivationText("Alarma sin sonido (Desactivada)");
      }
    });
  };

  /**
   * Establece fecha y hora de activacin
   * @param event evento para capturar fecha y hora
   */
  const activateHoursDate = (event: CustomEvent) => {
    const value = event.detail.value;
    setActiveDate(value);
  };

  /**
   * Establece fecha y hora de desactivacin
   * @param event evento para capturar fecha y hora
   */
  const desactivateHoursDate = (event: CustomEvent) => {
    const value = event.detail.value;
    setDesactiveDate(value);
  };

  /**
   * Registra las fecha y hora de activación
   */
  const registerDatesHours = () => {
    const cartRefActivate = ref(database, "activate");
    const cartRefDesactivate = ref(database, "desactivate");

    set(cartRefActivate, activeDate)
      .then(() => {})
      .catch((error) => console.log(error));

    set(cartRefDesactivate, desactiveDate)
      .then(() => {})
      .catch((error) => console.log(error));
  };

  /**
   * Obtiene el valor de la fecha de activación desde el nodo 'activate'
   */
  const readActivateDateHours = () => {
    const cartRef = ref(database, "activate");
    onValue(cartRef, (snapshot) => {
      if (!snapshot.exists()) return;
      const data = snapshot.val();
      setactiveDateText(data)
    });
  };

  /**
   * Obtiene el valor de la fecha de desactivación desde el nodo 'desactivate'
   */
  const readDesactivateDateHours = () => {
    const cartRef = ref(database, "desactivate");
    onValue(cartRef, (snapshot) => {
      if (!snapshot.exists()) return;
      const data = snapshot.val();
      setDesactiveDateText(data);
    });
  };

  useEffect(() => {
    readPowerValue(); // se llama la funcion del oyente de escucha
    readActivationValue();
    readActivateDateHours();
    readDesactivateDateHours();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="flex h-[2.5rem]"></IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="h-[13rem] rounded-b-[4rem] drop-shadow-xl bg-gradient-to-r from-blue-600 to-blue-400 w-full">
          <IonTitle
            className="ion-text-center font-bold pt-[3rem] pb-[1rem]"
            color="light"
          >
            El dispositivo esta
          </IonTitle>
          <div className="mb-[2rem] mx-auto w-[16rem] bg-white rounded-full">
            <IonSegment
              color="dark"
              value={segmentValue}
              className="rounded-full"
              onIonChange={powerDevice}
            >
              <IonSegmentButton value="on">
                <IonIcon icon={notificationsCircle}></IonIcon>
                <IonLabel className="text-[11px]">Encendido</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="off">
                <IonIcon icon={notificationsOffCircle}></IonIcon>
                <IonLabel className="text-[11px]">Apagado</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>
        </div>
        <div className="w-full flex justify-center items-center"></div>
        <IonList className="ion-margin-vertical">
          <IonItem>
            <IonLabel>Estado:</IonLabel>
            <p>{activationText}</p>
          </IonItem>
          <IonItem>
            <IonButton
              slot="end"
              disabled={activationValue === 0}
              onClick={() => disableAlarm(0)}
            >
              Desactivar
            </IonButton>
          </IonItem>
        </IonList>

        <IonList className="ion-margin-vertical">
          <IonListHeader>
            <h4 className="text-blue-600 font-bold">
              Establecer horario de activación
            </h4>
          </IonListHeader>
          <IonItem>
            <IonLabel>Activar:</IonLabel>
            <IonDatetimeButton datetime="datetimeActive"></IonDatetimeButton>

            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="datetimeActive"
                showDefaultTitle={true}
                showDefaultButtons
                doneText="Ok"
                cancelText="Cancelar"
                onIonChange={activateHoursDate}
              >
                {" "}
                <span slot="title">Seleccionar Horario</span>
              </IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel>Desactivar:</IonLabel>
            <IonDatetimeButton datetime="datetimeDesactive"></IonDatetimeButton>

            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="datetimeDesactive"
                showDefaultTitle={true}
                showDefaultButtons
                doneText="Ok"
                cancelText="Cancelar"
                onIonChange={desactivateHoursDate}
              >
                {" "}
                <span slot="title">Seleccionar Horario</span>
              </IonDatetime>
            </IonModal>
          </IonItem>

          <IonItem>
            <IonButton slot="end" color="primary" onClick={registerDatesHours}>
              Registrar
            </IonButton>
          </IonItem>
        </IonList>

        <IonList className="ion-margin-vertical">
          <IonItem>
            <IonLabel>Se activa:</IonLabel>
            <p>{formatDate(activeDateText)}</p>
          </IonItem>
          <IonItem>
            <IonLabel>Se desactiva:</IonLabel>
            <p>{formatDate(desactiveDateText)}</p>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
