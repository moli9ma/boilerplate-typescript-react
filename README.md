
# 0. OVERVIEW
typescriptでreactを使うための最小構成です。

以下に、作成するまでの手順を記述しましたのでこれからやる人は参考にしてください。
typescriptで記述したreactコンポーネントをes5にコンパイルし、browserifyでbundle.jsを作成/表示をゴールとします。
(gulpとかwebpackとかは含みません)

# 1. ENVIRONMENT
```
npm -v 3.3.4
tsc -v Version 1.8.9
```

# 2. INIT PROJECT

## 2.1. make directory
typescriptで書いたreactコンポーネントをsrc/componentsに保存し、typescriptでコンパイルした成果物をdistをに保存するものとして進めます。

```
mkdir boilerplate-typescript-react
mkdir -p boilerplate-typescript-react/src/components
mkdir boilerplate-typescript-react/dist
cd boilerplate-typescript-react/
```

## 2.2. init package manager

```
npm init
```

## 2.3. install typescript compiler & definition file manager

typescriptのコンパイラ(tsc)と、typescriptの型定義ファイル(.d.ts)を管理するためのtypingsをインストールします。

```
npm install -g typescript typings
```

## 2.4. install react react-dom

```
npm install --save react react-dom
```

```
cat package.json 
```

```
{
	"name": "boilerplate-typescript-react",
	"version": "1.0.0",
	"description": "",
	"main": "index.tsx",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "",
	"license": "ISC",
	"dependencies": {
		"react": "^15.0.1",
		"react-dom": "^15.0.1"
	}
}
```

## 2.5. install react react-dom definition file

```
typings install --ambient --save react
typings install --ambient --save react-dom
```

```
tree -I node_modules;
.
├── dist
├── package.json
├── src
│   └── components
├── typings
│   ├── browser
│   │   └── ambient
│   │       ├── react
│   │       │   └── index.d.ts
│   │       └── react-dom
│   │           └── index.d.ts
│   ├── browser.d.ts
│   ├── main
│   │   └── ambient
│   │       ├── react
│   │       │   └── index.d.ts
│   │       └── react-dom
│   │           └── index.d.ts
│   └── main.d.ts
└── typings.json
```

```
{
  "ambientDependencies": {
    "react": "registry:dt/react#0.14.0+20160412154040",
    "react-dom": "registry:dt/react-dom#0.14.0+20160412154040"
  }
}
```


# 3. Add entrypoint & components

## 3.1. add index.html

依存ライブラリ(react,react-dom)と、アプリケーション(dist/bundle.js)をindex.htmlに記述し保存します。

```
cat > index.html
```

```
<!doctype html>
<html lang="en" data-framework="typescript">
        <head>
                <meta charset="utf-8">
                <title>ts-react-redux-webpack-sampel</title>
                <script type="text/javascript" src="node_modules/react/dist/react-with-addons.js"></script>
                <script type="text/javascript" src="node_modules/react-dom/dist/react-dom.js"></script>
        </head>
        <body>
                <section class="myapp"></section>
                <script type="text/javascript" src="dist/bundle.js"></script>
        </body>
</html>
```

## 3.2. add index.tsx

```
cat src/index.tsx 
```

```
import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/App";

function render() {
    ReactDOM.render(<App message="enjoy typescript-react!" />, document.getElementsByClassName('myapp')[0]);
}

render();
```


## 3.3. add App.tsx

```
cat > src/components/App.tsx
```


```
import * as React from "react";

export interface AppProps { message: string;}

export default class App extends React.Component<AppProps, {}> {

    public render() {
        return (
            <h1>{this.props.message}</h1>
        )
    }
}
```

# 4. COMPILE

## 4.1. add configuration for typescript compiler
今回は、モジュール管理をbrowserifyやwebpackで扱えるようにしたいのでcommmonjsをmoduleとして設定しています。
また、jsxでreactを指定するとコンパイル時にreactの記述に変換することもできるようです。

```
cat > tsconfig.json
```

```
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "files": [
        "./typings/main.d.ts",
        "./src/components/App.tsx",
        "./src/index.tsx"
    ]
}
```

以下のコマンドによって、前述の設定に従いtsxファイルのコンパイルを行います。
ここでオプションを加えると、tsconfig.jsonは無視されるので注意してください。
```
tsc
```

## 4.2. build bundle.js with dependencies

```
browserify dist/index.js -o ./dist/bundle.js      
```

最終的なディレクトリ構成は以下のようになります。

```
.
├── dist
│   ├── bundle.js
│   ├── components
│   │   ├── App.js
│   │   └── App.js.map
│   ├── index.js
│   └── index.js.map
├── index.html
├── package.json
├── src
│   ├── components
│   │   ├── App.js
│   │   └── App.tsx
│   ├── index.js
│   └── index.tsx
├── tsconfig.json
├── typings
│   ├── browser
│   │   └── ambient
│   │       ├── react
│   │       │   └── index.d.ts
│   │       └── react-dom
│   │           └── index.d.ts
│   ├── browser.d.ts
│   ├── main
│   │   └── ambient
│   │       ├── react
│   │       │   └── index.d.ts
│   │       └── react-dom
│   │           └── index.d.ts
│   └── main.d.ts
└── typings.json
```


# 5. TRY RUN

```
python -m SimpleHTTPServer
```


