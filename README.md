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

This projects needs Jquery to run.

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
<div class="controls-container">
    <span data-key="z">
        Z
    </span>
   <span data-key="q">
        Q
   </span>
  <span data-key="s">
        S
   </span>
  <span data-key="d">
        D
   </span>
</div>
```
or as a complete version
```HTML
<div class="controls-container">
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
<script src="./js/jquery-3.5.1.slim.min.js"></script>
<script src="./js/snake.js"></script>
```

- and that's all !

## Demo

A demo is available [here](https://snakejs.onrender.com/). 
