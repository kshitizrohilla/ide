import { Terminal as XTerminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

import React, { useState, useRef, useEffect } from 'react';

import { io } from 'socket.io-client';
const socket = io('http://localhost:5002');

const Terminal = () => {
  const termRef = useRef();
  const isRendered = useRef(false);

  useEffect(() => {
    if (isRendered.current) return;
    isRendered.current = true;

    const term = new XTerminal({
      rows: 20,
      cols: 80,
    });

    term.options = {
      fontSize: 15,
      fontFamily: 'Consolas'
    };

    term.options.theme = {
      "black": "#000000",
      "red": "#cd3131",
      "green": "#0dbc79",
      "yellow": "#e5e510",
      "blue": "#2472c8",
      "purple": "#bc3fbc",
      "cyan": "#11a8cd",
      "white": "#e5e5e5",
      "brightBlack": "#666666",
      "brightRed": "#f14c4c",
      "brightGreen": "#23d18b",
      "brightYellow": "#f5f543",
      "brightBlue": "#3b8eea",
      "brightPurple": "#d670d6",
      "brightCyan": "#29b8db",
      "brightWhite": "#e5e5e5",
      "background": "#1e1e1e",
      "foreground": "#cccccc",
      "selectionBackground": "#3a3d41",
      "cursor": "#ffffff"
    }

    term.open(termRef.current);

    term.onData((data) => {
      socket.emit('terminal:write', data);
    });

    socket.on('terminal:data', (data) => {
      term.write(data);
      console.log(data);
    });
  }, []);

  return (
    <div ref={termRef} id="terminal"></div>
  );
};

export default Terminal;
