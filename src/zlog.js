
//
//  zlog(type,message,extra messages)
//  example:  zlog('debug',"here's the value of x:", x);
//
// use zlog(userwarning);
// to send a console message indicating dev tools are a browser feature - built in testing ignores for command terminal if test running
//
export default function zlog(...args) {
  if(!window.console) return;  // TODO - deal with this - if we're in regular console still allow message to passs thru but w/o style

  const zlogStyle = {
    error:  'color: white; background: #c92424; border-radius: 4px',
    warn:   'color: white; background: #db9216; border-radius: 4px',
    info:   'color: white; background: #07910b; border-radius: 4px',
    debug:  'color: white; background: #c816db; border-radius: 4px',
  };

  let zmessage = `%c ${args[0]} `;
  let finmessage = '';
  for (let x = 1; x <= args.length - 1; x ++) {
    finmessage += JSON.stringify(args[x]);
    finmessage += ' ';
  }
  finmessage = finmessage.replace(/['"]+/g, ''); // strip "'s
  switch (args[0]) {
    case 'userwarning':
      let warnmessage = '%cCAUTION: This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature, it is a likely a scam and could give them access to your private information!';
      let warnstyle = `color: white; background: #c92424; border-radius: 8px; border: 0.2rem solid; border-color: white; font-size: 1.2rem; padding: 5px;`;

      // skip showing this message if we're running console in a terminal for testing (JEST for example)
      if(process.env.JEST_WORKER_ID === undefined || process.env.NODE_ENV !== 'test') {
        console.log(warnmessage,warnstyle);
      }
      
      break;
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

