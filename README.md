# Aplicación Móvil para el control de un dispositivo de alarma

### Instrucciones

* **Descarga y clonación del proyecto**: Para clonar el proyecto copie su enlace, abra su terminal y realice

    ```bash
        git clone https://github.com/ElKingBruh/WingSis.git
    ```
    Esto clonara el repositorio del proyecto en cuestión.

* **Acceso al proyecto**:
    ```bash
        cd WingSis/
    ```

* **Instalación de dependencias:**
    ```bash
        npm install
    ```

* **Ejecución:**
    ```bash
        ionic serve
    ```

* **Crear build del proyecto:** Es importante realizar esto antes de generar el APK android.
    ```bash
        ionic cap sync
    ```

* **Generar APK:** Es importante tener instalado Android Studio para realizar este paso, el siguiente comando abrira su aplicación **IONIC** en el editor de android para poder generar el APK.
    ```bash
        ionic cap open android
    ```
    Lugo de haber abierto el proyecto, dirijase a la barra de menú supeior de Android Studio en opción **Build** y luego en opción **Build Bundle(s) / APK(s) y luego en Build APK(S), esto generara su APK.