import { lazy } from "react";

export function lazyLoad(path,namedExport) {
  return lazy(() => {
    const promise = import(path);
    if (namedExport == null) {
      return promise;
    } else {
      return promise.then(module => ({ default: module[namedExport] }))
    }
  });
}

// example usage:
// import { lazyLoad } from "./lazyLoad.js";
// const About = lazyLoad("./components/About", "About");


// Reference:
// this is "code splitting" - see https://www.youtube.com/watch?v=JU6sl_yyZqs