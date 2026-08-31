## Why

React と TypeScript、および OpenSpec による仕様駆動開発を学ぶため、状態管理と永続化の基本を小さな題材で確認できる Todo アプリが必要です。外部ライブラリやバックエンドを使わない最小構成にします。

## What Changes

- Todo を追加できる単一画面の React アプリを提供する。
- Todo の完了状態を切り替え、不要な Todo を削除できるようにする。
- Todo 一覧をブラウザの localStorage に保存し、再読み込み後に復元する。
- アプリの状態管理は React の `useState` のみを使用する。

## Capabilities

### New Capabilities

- `todo-management`: Todo の追加、完了状態の切り替え、削除、および localStorage を使った一覧の永続化を提供する。

### Modified Capabilities

- なし。

## Impact

- React と TypeScript のフロントエンドコードを追加する。
- ブラウザの localStorage を利用する。
- 外部 API、バックエンド、追加の状態管理ライブラリは使用しない。
