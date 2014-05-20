第二回目講座追加資料
=================

HTML 上で script 要素の配置する位置についてと、CSS の演習。

Files
-----
* script1.html ... script を内容より前に書いた場合
* script2.html ... script を内容より後に書いた場合
* list.html
* style.css ... list.html で読み込む CSS ファイル

Note
----
script 要素は内容より前に書いてしまうと、万が一 JavaScript のエラーで処理が止まった場合に内容が表示されない問題があるので、 body 要素の閉じタグの直前に書くと良い。

また、 JavaScript を先に読み込むと、内容が描画されるまでの待ち時間が長くなる場合があるので、良くない。
