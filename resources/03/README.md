第三回目講座追加資料
=================

隣接セレクタ、擬似要素の実用的な使用例と jQuery

Files
-----
* index.html ... 隣接セレクタ、擬似要素の実用的な使用例
* style.css ... 隣接セレクタ、擬似要素の実用的な使用例
* script.html ... jQuery の使い方
* ui.js ... jQuery の使い方

Note
----
jQuery とは、 HTML の操作を簡単に記述することを可能にする JavaScript のライブラリです。

具体的には…

```js
window.addEventListener("load", function () {/* 処理 */});
```
↑ に相当するものを ↓ のように書けます。
```js
$(function () {/* 処理 */});
```
また、
```js
document.getElementById("display").innerHTML = "hello";
```
↑ に相当するものを ↓ のように書けます。
```
$("#display").html("hello");
```
