import * as React from "react";

export interface AppProps { message: string;}

export default class App extends React.Component<AppProps, {}> {

    public render() {
        return (
            <h1>{this.props.message}</h1>
        )
    }
}