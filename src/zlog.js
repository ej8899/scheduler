
export default function zlog(...args) {
  const zlogStyle = {
    error:  'color: white; background: #c92424; border-radius: 4px',
    warn:   'color: white; background: #db9216; border-radius: 4px',
    info:   'color: white; background: #07910b; border-radius: 4px',
    debug:  'color: white; background: #c816db; border-radius: 4px',
  };

  let zmessage = `%c ${args[0]} `;
  let finmessage = '';
  for (let x=1; x<=args.length-1;x++) {
    finmessage += JSON.stringify(args[x]);
    finmessage += ' ';
  }
  finmessage = finmessage.replace(/['"]+/g, ''); // strip "'s
  switch (args[0]) {
    case 'error':
      console.error(zmessage,zlogStyle.error,finmessage);
      break;
    case 'warn':
      console.warn(zmessage,zlogStyle.warn,finmessage);
      break;
    case 'debug':
      console.log(zmessage,zlogStyle.debug,finmessage);
      break;
    default:
      console.log(zmessage,zlogStyle.info,finmessage);
  }
}

// TODO - capture file and line numbers:
// https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number
//
