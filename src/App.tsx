import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonRouterOutlet, IonTabBar, IonTabButton, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { hammer, home, newspaper } from 'ionicons/icons';
import ModalComponent from './pages/instructions';
import React, { useEffect, useState } from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/tailwind.css';
import Home from './pages/Home';
import ConfigDevice from './pages/configDevice'
import HistoryPage from './pages/HistoryPage';

setupIonicReact();

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu contentId="menu">
          <IonHeader>
            <IonToolbar className='bg-gradient-to-r from-blue-600 to-blue-400'>
              <IonTitle className='ion-text-center'>Menú</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonMenuToggle>
                <IonItem routerLink="/home" routerDirection="none" lines="none">
                  <IonIcon color="medium" slot="start" icon={home} />
                  <IonLabel>Inicio</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/HistoryPage" routerDirection="forward" lines="none">
                  <IonIcon color="medium" slot="start" icon={newspaper} />
                  <IonLabel>Historial</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/configDevice" routerDirection="none" lines="none">
                  <IonIcon color="medium" slot="start" icon={hammer} />
                  <IonLabel>Configuraciones</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
          <IonFooter>
            <IonToolbar>
              <div className='w-[13rem] mx-auto'>
                <p className='text-slate-400 text-center text-[10px]'>Desarrollado por Gabriel Argel, Maria Díaz & Elkin Vasquez</p>
                <p className='text-slate-400 text-center text-[10px]'> Todos los derechos reservados ©</p>
              </div>
            </IonToolbar>
          </IonFooter>
        </IonMenu>

        <IonToolbar color="light" className='flex h-[2.5rem] items-center'>
          <IonButtons slot="start">
            <IonMenuButton color="medium" autoHide={false}></IonMenuButton>
          </IonButtons>
          <IonTitle className="ion-text-center mr-11">Alarma</IonTitle>
        </IonToolbar>

       

        <IonRouterOutlet id="menu">
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/configDevice">
            <ConfigDevice />
          </Route>
          <Route exact path="/HistoryPage">
            <HistoryPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
