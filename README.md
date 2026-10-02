# 筋トレ記録アプリ

スマホでも使えるシンプルな筋トレ記録用Webアプリ。

## 機能

- 種目・重量・回数・セット数の記録
- トレーニングメニュー(ルーティン)の管理
- 記録の履歴・グラフ表示(種目ごとの最大重量の推移)
- 体重・体脂肪率の記録とグラフ表示
- 種目ごとに鍛える部位を3D人体モデルでハイライト表示(360度回転可)

データはブラウザのlocalStorageに保存されます(ログイン不要)。

## サードパーティ素材

`public/anatomy.glb`(3D人体解剖モデル)は以下のCC BY-SAライセンス素材を含みます。本リポジトリのソースコード自体はMITライセンスですが、このアセットは元のライセンス条件(表示・継承)が適用されます。

- BodyParts3D © The Database Center for Life Science (CC BY-SA 2.1 Japan)
- Z-Anatomy (CC BY-SA 4.0)
- 配布元: [25qi/muscle-3d-site](https://github.com/25qi/muscle-3d-site)(MIT、gltf-transformで圧縮済みのglbをそのまま利用)

## 開発

```bash
npm install
npm run dev      # 開発サーバー起動
npm run lint     # Lint
npm run build    # 本番ビルド
```
