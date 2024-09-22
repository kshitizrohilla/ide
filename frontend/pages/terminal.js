// import { Terminal as XTerminal } from '@xterm/xterm';
// import '@xterm/xterm/css/xterm.css';

// import { useEffect, useRef } from 'react';
// const { io } = require('socket.io-client');

// const socket = io('http://localhost:5000');

// import { WebLinksAddon } from '@xterm/addon-web-links';

// function Terminal() {
//   const terminalRef = useRef();
//   const isRendered = useRef(false);

//   useEffect(() => {
//     if (isRendered.current) {
//       return;
//     } else {
//       isRendered.current = true;
//     }

//     const term = new XTerminal({
//       rows: 20,
//     });

//     term.open(terminalRef.current);
//     term.loadAddon(new WebLinksAddon());

//     term.onData((data) => {
//       console.log(data);
//       term.write(data);
//       socket.emit('terminal:write', data);
//     });

//     // socket.on('terminal:data', (data) => {
//     //   console.log(data);
//     //   term.write(data);
//     // });

//     socket.emit('connectToContainer', '6a799973c36ab9c585fcb3799cb21a2aef791937fd009dbf18da9a3c27bc605f');
//   }, []);

//   return (
//     <div ref={terminalRef} id="terminalContainer" />
//   );
// };

// export default Terminal;

import { Terminal as XTerminal } from '@xterm/xterm';
import { io } from 'socket.io-client';

import { useEffect, useRef } from 'react';
import '@xterm/xterm/css/xterm.css';

function Terminal() {
  const terminalRef = useRef();
  const isRendered = useRef(false);

  const socket = io('http://localhost:5000');

  useEffect(() => {
    if (isRendered.current) {
      return;
    } else {
      isRendered.current = true;
    }

    const term = new XTerminal({
      rows: 20,
      cols: 80,
    });

    term.open(terminalRef.current);
    term.write('$ ');

    let local = '';
    console.log(local);

    term.onData((data) => {
      if (data.charCodeAt(0) === 127 && local !== '') {
        local = local.substring(0, local.length - 1);
        term.write('\b \b');
        socket.emit('terminal:write', 'BACKSPACE');
        console.log(local);
      } else if (data.charCodeAt(0) === 127 && local === '') {
        console.log('Not allowed');
      } else if (data.charCodeAt(0) === 27 || data.charCodeAt(0) === 8) {
        console.log('Not allowed');
    console.log(local);

      } else if (data.charCodeAt(0) === 13) {
        socket.emit('terminal:execute', 'EXECUTE');
        term.write('\r\n');
        term.write('$ ');
        local = '';
    console.log(local);

        console.log('Command submitted');
      } else {
        local += data;
    console.log(local);

        socket.emit('terminal:write', data);
      }
    });

    socket.on('terminal:data', (data) => {
      // term.write(data);
      term.write(data.replace(/\r?\n/g, '\r\n'));
    });
  }, []);

  return (
    <div ref={terminalRef} id="terminalContainer"></div>
  );
};

export default Terminal;