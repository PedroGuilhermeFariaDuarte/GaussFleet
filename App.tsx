import React from 'react';

// Config
import Reactotron from "./src/config/reactotron"

Reactotron.connect()

// Router
import Router from "./src/routers"

export default function App() {
  return <Router />
}

