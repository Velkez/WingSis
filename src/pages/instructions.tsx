import React, { } from 'react';
import { IonModal, IonButton, IonContent, IonFooter, IonToolbar, IonTitle, IonHeader, IonList, IonCard, IonCardContent } from '@ionic/react';

const Instructions: React.FC<{
  showModal: boolean;
  onDismiss: () => void;
}> = ({ showModal, onDismiss }) => {

  return (
    <IonModal isOpen={showModal}>
      <IonHeader className='shadow-none'>
        <div className='h-[8rem] rounded-b-[4rem] drop-shadow-xl bg-gradient-to-r from-blue-600 to-blue-400 w-full '>
          <IonTitle className='text-center font-bold pt-[2rem]' color='light'>
            Obtener nombre de usuario de
          </IonTitle>
          <IonTitle className='text-center font-bold' color='light'>
            Telegram
          </IonTitle>
        </div>
      </IonHeader>
      <IonContent>
        <IonList>
          <div className='mt-[2rem] mx-auto text-center w-[20rem]'>
            <p>
              Para poder recibir un aviso en cuanto la alarma de su puerta sea activada, se necesitará que tenga <a href='https://play.google.com/store/apps/details?id=org.telegram.messenger' target='_blank' className='text-blue-500'>Telegram</a> instalado en su dispositivo móvil. Por este medio se le avisará a usted de cualquier forcejeo.
            </p>
            <br />
            <p>A continuación se le explicará cómo usted puede conseguir un nombre de usuario en <a href='https://play.google.com/store/apps/details?id=org.telegram.messenger' target='_blank' className='text-blue-500'>Telegram</a> y cómo vincularlo a un bot de llamadas.</p>
          </div>

          <IonCard className='mt-[2rem] mx-auto text-center w-[20rem]'>
            <img alt='Telegram Menú' src='https://i.imgur.com/a7uur5R.jpg' />
            <IonCardContent>
              Al abrir Telegram, usted deberá dirigirse a las tres rayitas de menú, al lado del título de la aplicación "Telegram"
            </IonCardContent>
          </IonCard>

          <IonCard className='mt-[2rem] mx-auto text-center w-[20rem]'>
            <img alt="Telegram Ajustes" src="https://i.imgur.com/jiLe4a4.jpg" />
            <IonCardContent>Cuando abra el menú, usted debe dirigirse a la opción "Ajustes", esta se encuentra de bajo de "Mensajes guardados"</IonCardContent>
          </IonCard>

          <IonCard className='mt-[2rem] mx-auto text-center w-[20rem]'>
            <img alt="Telegram opciones" src="https://i.imgur.com/Td35oCh.jpg" />
            <IonCardContent>Ya en esta pantalla, deberá tocar la opción de "Nombre de usuario"</IonCardContent>
          </IonCard>

          <IonCard className='mt-[2rem] mx-auto text-center w-[20rem]'>
            <img alt="Telegram nombre de usuario" src="https://i.imgur.com/IOBnrWE.jpg" />
            <IonCardContent>Asigne en la casilla "Poner nombre de usuario" el nombre de usuario de que usted guste</IonCardContent>
          </IonCard>

          <div className='mt-[2rem] mx-auto text-center w-[20rem]'>
            <p>Ahora siga las siguientes instrucciones para conectar su Telegram con el Bot</p>
            <IonButton className='mt-[1rem]' href='https://api2.callmebot.com/txt/login.php' target="_blank">redireccionar</IonButton>
          </div>

          <IonCard className='mt-[2rem] mx-auto text-center w-[20rem]'>
            <img alt="Telegram Menú" src="https://i.imgur.com/POeCkp9.jpg" />
            <IonCardContent>Usted será redireccionado a esta pagina, debe oprimir en "Iniciar sesión con Telegram"</IonCardContent>
          </IonCard>

          <IonCard className='mt-[2rem] mx-auto text-center w-[20rem]'>
            <img alt="Telegram Menú" src="https://i.imgur.com/o9aQljV.jpg" />
            <IonCardContent>Aquí tendra que digitar su numero de telefono. Mantenga el prefijo en +57</IonCardContent>
          </IonCard>

          <IonCard className='mt-[2rem] mx-auto text-center w-[20rem]'>
            <img alt="Telegram Menú" src="https://i.imgur.com/cINo6tE.jpg" />
            <IonCardContent>Le llegara este mensaje a su Telegram; confirme para continuar</IonCardContent>
          </IonCard>

          <IonCard className='mt-[2rem] mx-auto text-center w-[20rem]'>
            <img alt="Telegram Menú" src="https://i.imgur.com/DbQzemL.jpg" />
            <IonCardContent>Si hizo todos los pasos descritos anteriormente, deberá llegar a esta pagina, la cual indica que su conexíon del Telegram y el bot fue un exito.</IonCardContent>
          </IonCard>

          <div className='mt-[3rem] mx-auto mb-[6rem] text-center w-[20rem]'>
            <p>Por último, introduzca, en la casilla del menu de configuraciones, su nombre de usuario de Telegram y oprima al boton de guardar, para así almacenarlo en el dispositivo.</p>
          </div>
        </IonList>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <div className='flex justify-around'>
            <IonButton onClick={onDismiss} shape='round'>
              Cerrar
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default Instructions;