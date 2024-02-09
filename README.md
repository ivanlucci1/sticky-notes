# Sticky Notes

This application provides a dashboard where you'll be able to:

- Add text notes of a specified size and position;
- Move any note by dragging;
- Remove any note by dragging it over a predefined "trash" zone;
- Update the note as desired, changing the content, size, position and color of it.

I avoided using any readymade solutions for the UI and general functionalities.

All this information is stored in a global state and also saved on an API when any note is added, updated or deleted.

There is a local API created using [json-server](https://www.npmjs.com/package/json-server) just to simulate a real life API, which basically would work the same way. All the data saved on this API are saved on a local file at `./db.json`

It's also possible to save the notes on the `localStorage` of the browser rather than on the API. The application uses the API as default, but it's ready to use `localStorage` as well and you would just need to update a few commented lines of code.

## Architechture

- React + TypeScript + Vite
- JSON Server for local API
- Axios
- Zustand - This library is used for state menagement and uses flux architecture, similar to Redux, but much more simple and lightweright.
- Lucide React - Icons library
- CSS modules and SCSS

## Build

Install all dependencies of the application:

```
npm install
```

Run the comment below to start the application:

```
npm run dev
```

Run the comment below to start the local API server:

```
npm run server
```
