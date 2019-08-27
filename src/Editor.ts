require("ace-min-noconflict");
require("ace-min-noconflict/mode-javascript");

import Repl from "./Repl";
import { Scene } from "three";

class Editor {
  editor = ace.edit("editor");
  repl: Repl;
  port: { scene: Scene };

  constructor(port: { scene: Scene }) {
    this.repl = new Repl(port);
    this.init();
  }

  init() {
    this.editor.getSession().setMode("ace/mode/javascript");
    this.editor.$blockScrolling = Infinity;
    this.editor.container.classList.add("editor");
    this.editor.commands.addCommand({
      name: "showKeyboardShortcuts",
      bindKey: { win: "Ctrl-r", mac: "Ctrl-r" },
      exec: this.execCompile.bind(this)
    });

    window.postError = error => {
      const post = document.querySelector("#post form .text-area");
      post.innerHTML += "\n\n" + error;
      post.scrollTop = post.scrollHeight;
    };
  }

  execCompile() {
    if (!this.editor || !this.editor.session) {
      return;
    }
    // console.log(
    //   this.editor.session.getRowLength(),
    //   this.editor.session.getLines()
    // );
    if (0 < this.editor.session.getRowLength()) {
      var currline = this.editor.getSelectionRange().start.row;
      var wholelinetxt = this.editor.session.getLine(currline);
      // console.log("input", wholelinetxt);
      // const compile = this.repl.livesdcriptCompile(wholelinetxt);

      const res = this.repl.execInScriptTag(wholelinetxt);
      console.log("res....", wholelinetxt, res);
    }
  }

  postWindow(msg: string) {
    const post = document.querySelector("#post form .text-area");
    post.innerHTML += "\n\n" + msg;
    post.scrollTop = post.scrollHeight;
  }

  concat(lines: Array<string>): string {
    let arr: string = "";
    for (let line in lines) {
      arr.concat(line);
    }
    return arr;
  }

  openFile(file) {
    require("fs").readFile(file, "utf8", function(err, data) {
      this.editor.setValue(data, -1);
    });
  }
}

export default Editor;
