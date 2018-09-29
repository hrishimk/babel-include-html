# babel-include-html
Babel plugin to include HTML files as string

    //index.js
    let a = include_html('./test.html');

    //test.html
    <div class="cont">
        <h1>Hello, world!</h1>
    </div>

    //output
    let a = "<div class=cont><h1>Hello, world!</h1></div>";
