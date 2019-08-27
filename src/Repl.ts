import { Scene } from "three";
import { createHash, Hash } from "crypto";
import context from "./functions";

import livescript from "livescript";

// console.log(LiveScript);

class Repl {
  lastScriptID: string;
  port: { scene: Scene };
  constructor(port: { scene: Scene }) {
    this.lastScriptID = this.updateHash();

    //make context
    Object.keys(context).map(k => {
      window[k] = context[k];
    });
    // var LiveScript = require("livecript");
    // LiveScript.go();

    let livescript_ = livescript.go();
    console.log(livescript_);
  }

  updateHash(): string {
    return (this.lastScriptID = createHash("md5")
      .update(Math.random() + "")
      .digest("hex"));
  }

  // livesdcriptCompile(input: string): string {
  //   let code = undefined;
  //   try {
  //     code = livesdcript.compile(
  //       input,
  //       {},
  //       {},
  //       {
  //         modules: {
  //           dom:
  //             "document: {documentURI: String, getElementById: Function(String,{getAttribute: Function(String,String), innerHTML: String, innerText: String, tagName: String})}\n"
  //         }
  //       }
  //     ).output;
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   return code;
  // }

  execInScriptTag(code) {
    this.removeScript(this.lastScriptID);
    const script = document.createElement("script");
    this.lastScriptID = this.updateHash();

    script.id = this.lastScriptID;
    script.type = "text/ls";
    script.text =
      // "(function(context) { try {" +
      code;
    // "\n } catch (e) { postError(e) } })(window.context)";
    document.body.appendChild(script);
  }

  removeScript(hash: string) {
    const target = document.getElementById(hash);
    if (target) {
      document.body.removeChild(target);
    }
  }
}

export default Repl;
