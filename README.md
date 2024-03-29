# Sticky Notes

This application provides a real-time notes board where you'll be able to:

- Add text notes of a specified size and position;
- Move any note by dragging;
- Remove any note by dragging it over a predefined "trash" zone;
- Update the note as desired, changing the content, size, position and color of it.

I avoided using any readymade solutions for the UI and general functionalities.

All notes data (content, position, size and color) are stored in a global state and saved on an API when any note is added, updated or deleted.

There is a local API for testing using [json-server](https://www.npmjs.com/package/json-server) to simulate a real life API, which basically would work the same way. All the data stored on this API are added to a local file at `./db.json`.

It's also possible to save the notes on the `localStorage` of the browser rather than on the API. The application uses the API as default, but it's ready to use `localStorage` as well if preferable.

## Architechture

- React + TypeScript + Vite
- JSON Server for local API
- Axios
- Zustand - This library is used for state menagement and uses flux architecture, similar to Redux, but much more simple and lightweright.
- Lucide React - Icons library
- CSS modules and SCSS
- Vitest - Testing framework powered by Vite which uses Jest under the hood

## Build

Install all dependencies of the application:

```
npm install
```

Run the command below to start the application:

```
npm run dev
```

Run the command below to start the local API server:

```
npm run server
```

Run the command below to execute the tests:

```
npm run test
```
