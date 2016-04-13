
import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/App";

function render() {
    ReactDOM.render(<App message="enjoy typescript-react!" />, document.getElementsByClassName('myapp')[0]);
}

render();
