import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  InputChangeEventDetail,
  IonToast,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
} from "@ionic/react";
import InstructionsModal from "./instructions";
import { database } from "../config/firebase";
import {
  ref,
  push,
  onValue,
  set,
  remove,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";
import { User } from "../types/user";

const configDevice: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [userRecived, setUserRecived] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState<string>("");
  const [usersList, setUsersList] = useState<User[]>([]);
  const [showInstructionsModal, setShowInstructionsModal] =
    useState<boolean>(false);

  /**
   * Obtiene el valor del ingresado en el input
   * @param event evento del input
   */
  const handleWifiChange = (event: CustomEvent<InputChangeEventDetail>) => {
    setUserName(event.detail.value!);
  };

  /**
   * Muestra ek modal que contiene el tutorial
   */
  const handleOpenInstructionsModal = () => {
    setShowInstructionsModal(true);
  };

  /**
   * Actualiza enl a base de datos en el nodo 'user'
   * el usuario que va a recibir la notificación y llamada
   * @param username nombre del usuario seleccionado
   */
  const setUserNotification = (username: string) => {
    const cartRef = ref(database, "user");
    set(cartRef, username)
      .then(() => {})
      .catch((error) => console.log(error));
  };

  /**
   * Quita el usuario de las notificaciones siempre y cuando el usuario que se elimina es
   * quien esta seleccionado para ello
   * @param username usuario que se desea quitar del no 'user'
   * @returns 
   */
  const cleanUserNotification = async (username: string) => {
    const cartRef = ref(database, "user");
    const snapshot = await get(cartRef);
    if (!snapshot.exists()) return;
    const user = snapshot.val();
    if (user === username) setUserNotification("");
  };

  /**
   * Agrega usuarios a la base de datos al nodo 'userlist'
   * @returns
   */
  const handleSave = () => {
    if (userName === "") return;
    const cartRef = ref(database, "userlist");
    push(cartRef, { username: userName })
      .then(() => {
        setMessageToast("Se ha registrado exitosamente");
        setShowToast(true);
      })
      .catch((error) => console.log(error));

    setUserName("");
  };

  /**
   * Obtiene los usuarios registrados en el nodo 'userlist'
   */
  const readUsers = () => {
    const cartRef = ref(database, "userlist");
    onValue(cartRef, (snapshot) => {
      if (!snapshot.exists()) return;
      const data = snapshot.val();
      const users = Object.values(data) as User[];
      setUsersList(users);
    });
  };

  /**
   * Obtiene el usuario del nodo 'user' que recibirá la notiicación y llamada
   */
  const readUserNotification = () => {
    const cartRef = ref(database, "user");
    onValue(cartRef, (snapshot) => {
      if (!snapshot.exists()) return;
      const user = snapshot.val();
      setUserRecived(user);
    });
  };

  /**
   * Elimina un usuario de la base de datos
   * @param username usuario al que se desea eliminar
   */
  const deletedUser = async (username: string) => {
    const cartRef = ref(database, "userlist");

    // Realizar una consulta para obtener la clave del usuario con el nombre de usuario
    const userQuery = query(
      cartRef,
      orderByChild("username"),
      equalTo(username)
    );
    const snapshot = await get(userQuery);

    if (!snapshot.exists()) return;
    // Obtener la clave del usuario
    const userKey = Object.keys(snapshot.val())[0];

    const userRef = ref(database, `userlist/${userKey}`);
    remove(userRef)
      .then(() => {
        cleanUserNotification(username);
        setMessageToast(`${username} eliminado`);
        setShowToast(true);
      })
      .catch((error) => {
        setMessageToast("Error al tratar de eliminar este usuario");
        setShowToast(true);
        console.log(error);
      });
  };

  useEffect(() => {
    // se llaman las funciones con oyentes de escucha
    readUsers();
    readUserNotification();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="flex h-[2.5rem]"></IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="h-[8rem] rounded-b-[4rem] drop-shadow-xl bg-gradient-to-r from-blue-600 to-blue-400 w-full ">
          <IonTitle className="text-center font-bold pt-[3rem]" color="light">
            Configuraciones
          </IonTitle>
        </div>
        <IonList className="ion-margin-vertical">
          <IonItem>
            <IonLabel>Notificaciones a:</IonLabel>
            <p>{userRecived}</p>
          </IonItem>
        </IonList>
        <IonInput
          label="Usuario de Telegram"
          labelPlacement="floating"
          fill="outline"
          placeholder="Inserte el nombre de usuario"
          value={userName}
          onIonChange={handleWifiChange}
          className="w-[17rem] mx-auto mt-[2rem]"
        ></IonInput>
        <IonButton
          expand="full"
          onClick={handleOpenInstructionsModal}
          className="w-[6rem] h-[2rem] mx-auto mt-[1rem] text-[11px]"
          shape="round"
          fill="outline"
          color="dark"
        >
          Tutorial
        </IonButton>
        <IonButton
          expand="full"
          onClick={handleSave}
          className="w-[9rem] mx-auto mt-[2rem]"
          shape="round"
        >
          Guardar
        </IonButton>
        <InstructionsModal
          showModal={showInstructionsModal}
          onDismiss={() => setShowInstructionsModal(false)}
        />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          duration={4000}
          message={messageToast}
          buttons={[
            {
              text: "Ok",
              role: "cancel",
            },
          ]}
        ></IonToast>
        <IonList>
          <IonListHeader>
            <h4 className="text-blue-600 font-bold">
              Usuario para las notificaciones
            </h4>
          </IonListHeader>
          {usersList.map((user, index) => (
            <IonItem key={index}>
              <IonLabel>{user.username}</IonLabel>
              <IonButton onClick={() => setUserNotification(user.username)}>
                Escoger
              </IonButton>
              <IonButton
                color="danger"
                onClick={() => deletedUser(user.username)}
              >
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default configDevice;
