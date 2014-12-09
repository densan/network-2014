Express + MongoDB のデモ
=======================

設定方法
-------
`npm i` で依存モジュールの導入。

起動方法
-------
プロジェクトディレクトリ直下で次の 1 行を実行して DB サーバを起動。

```
mongod -f db/mongod.conf
```

同じくプロジェクトディレクトリ直下で次の 1 行を実行して Web サーバを起動。

```
node server.js
```

ここまで順調に進んだら、ブラウザで [http://localhost:3000/register](http://localhost:3000/register) を開く。


[参考](http://qiita.com/zaru/items/77eb53cf37c4ea842f32)
