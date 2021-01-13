# SnakeJS

<table>
    <tr>
        <td>
            <img src="https://github.com/ronaldcarucci/SnakeJS/blob/master/logo.png">
        </td>
    </tr>
</table>

## Introduction

This is a tiny version of Snake in simple JS version.

## Requirements

This projectshas no requirement to run. It is written in Vanilla JS.

## Use

The repository is an example which use snake.js in a simple HTML application.
To use it several things are required :

- a table with "grid" as id :
```HTML
<table id="grid">
</table>
```
- a div with "controls-container" as id with containing control keys (if you want to use it on mobile) such as :

```HTML
<div id="controls-container">
        <span data-key="z">
            UP
        </span>
       <span data-key="q">
            LEFT
       </span>
      <span data-key="s">
            DOWN
       </span>
      <span data-key="d">
            RIGHT
       </span>
    </div>
```
or as a complete version
```HTML
<div id="controls-container">
    <table id="controls">
        <tr>
            <td></td>
            <td>
                <span class="icon is-large" data-key="z">
                    <i class="fas fa-arrow-alt-circle-up fa-3x"></i>
                </span> 
            </td>
            <td></td>
        </tr>
        <tr>
            <td>
                <span class="icon is-large" data-key="q">
                    <i class="fas fa-arrow-alt-circle-left fa-3x"></i>
                </span>
            </td>
            <td>
                <span class="icon is-large" data-key="s">
                    <i class="fas fa-arrow-alt-circle-down fa-3x"></i>
                </span>
            </td>
            <td>
                <span class="icon is-large" data-key="d">
                    <i class="fas fa-arrow-alt-circle-right fa-3x"></i>
                </span>
            </td>
        </tr>
    </table>
</div>
```
- load css and js files :

```HTML
<link rel="stylesheet" href="./css/snake.css" />
<script src="./js/snake.js"></script>
```

- write script into your HTML file or external JS file those lines :
```Javascript
let rows = 30; // My number of rows
let columns = 20; // My number or columns
let speed = 100; // My speed. Decrease for faster !
let game = new SnakeGame(new Snake(rows, columns, speed));
game.prepareGrid();
game.executeGame();
```

- and that's all !

## Demo

A demo is available [here](https://snakejs.onrender.com/). 

<table>
    <tr>
        <td>
            <img src="https://github.com/ronaldcarucci/SnakeJS/blob/master/demo.png">
        </td>
    </tr>
</table>
