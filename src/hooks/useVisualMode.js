import { useState } from "react";
import "config";


// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w18/activities/947?journey_step=55&workbook=23

export default function useVisualMode(initialMode) {
  const [mode,setMode] = useState(initialMode);
  const [modeHistory, setHistory] = useState([initialMode])
  if(global.config.debug) console.log("HOOKS:initialMode",initialMode)

  const transition = function(newMode, replaceMode = false) {
    if(global.config.debug) console.log("HOOKS: transition() to:",newMode)
    if (replaceMode) {
      modeHistory.pop();
    }
    modeHistory.push(newMode);
    return setMode(newMode);
  }

  const back = function() {
    if(global.config.debug) console.log("HOOKS: - back() function")
    const lastMode = modeHistory.pop()
    return modeHistory.length ? setMode(modeHistory[modeHistory.length -1]) : setHistory(lastMode) ; 
  }

  return {
    mode,
    transition,
    back,
  }
}