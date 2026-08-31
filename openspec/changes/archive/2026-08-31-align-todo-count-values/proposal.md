## Why

Todo 件数のラベルと数値のベースラインがそろっておらず、数値がやや上にずれて見えます。既存フォントを維持したまま、読みやすい並びに修正します。

## What Changes

- 「すべて」「完了済み」「未完了」の各ラベルと右側の数値を、同じ縦位置にそろえて表示する。
- 現在のフォント指定と件数の色は変更しない。

## Capabilities

### New Capabilities

- なし。

### Modified Capabilities

- `todo-management`: Todo 件数表示におけるラベルと数値の縦方向の配置要件を追加する。

## Impact

- 件数表示の CSS レイアウトのみを調整する。
- Todo のデータ、件数の算出、localStorage の保存形式は変更しない。
