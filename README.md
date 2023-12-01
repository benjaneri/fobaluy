# Obligatorio IHC - 2023

## Integrantes
- Vittorio Caiafa 252295
- Benjamín Neri 253128
- Mateo Saravia 255917

## Propósito del sistema
El propósito del sistema es crear una plataforma que facilite la organización de partidos de fútbol amateur, uniendo a jugadores interesados en participar y evitando que las cancelaciones a último momento interfieran en el desarrollo del juego. El sistema final busca fomentar una comunidad activa, permitiendo a los usuarios crear partidos, unirse a ellos y calificar la experiencia, abriendo oportunidades para quienes desean jugar sin un equipo establecido.

## Herramientas principales utilizadas
Frontend:
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [NativeBase](https://nativebase.io/)
- [React Navigation](https://reactnavigation.org/)

Backend:
- [Node.js](https://nodejs.org/es/)
- [Express](https://expressjs.com/es/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)

## Ejemplo en funcionamiento
<video src="https://github.com/ORTISP/252295_253128_255917/assets/89653970/6e76d73b-ec52-4819-8cf8-c4ce83a93467" alt="video-demo"></video>

## Guía para la ejecución

### Ejecución backend
1. Clonar el repositorio
```
git clone https://github.com/ORTISP/252295_253128_255917.git
```
2. Ubicarse en la carpeta `backend`
```
cd backend
```
3. Crear y ejecutar los distintos servicios
```
docker-compose up --build
```
4. La API estará disponible para la comunicación con la aplicación en el puerto `http://<DirecciónIPv4Local>:3000/api/` o `http://localhost:3000/api/`

### Ejecución frontend / aplicación
1. Ubicarse en la carpeta `frontend`
```
cd frontend
```
2. Instalar dependencias
```
npm install
```
3. Modificar en el archivo .env la variable `EXPO_PUBLIC_API_URL` con la dirección de la API
```env
EXPO_PUBLIC_API_URL=http://<DirecciónIPv4Local>:3000/api
```
4. Ejecutar la aplicación con un dispositivo conectado o un emulador
`npm run android` o `npm run ios`
5. La aplicación se ejecutará en el dispositivo o emulador

## Documentación
- [Documentación de la API](https://documenter.getpostman.com/view/27663287/2s9YeBfa1b)
