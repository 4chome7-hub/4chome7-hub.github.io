# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

ひらがな学習アプリ（にがてこくふくモード）— GitHub Pages にデプロイされたシングルページのひらがな学習アプリ。

- `index.html` — メインアプリ（ひらがな47文字のフラッシュカード）
- `magic.html` — 補助ページ（濁点・半濁点変換のデモ。か/さ/た/は行のみ対応）

## 開発方法

ビルドツールは不要。`index.html` をブラウザで直接開くか、静的ファイルサーバーで配信してください：

```bash
python3 -m http.server 8000
```

lint・テスト・ビルドの手順はありません。デプロイは `main` ブランチへの直接プッシュで完了し、GitHub Pages が自動的に配信します。

## アーキテクチャ

**単一ファイル（`index.html`）** に HTML・CSS・JavaScript がすべて含まれています。外部依存・npm パッケージ・別途アセットファイルは一切ありません。

### 状態管理

すべての状態は `<script>` ブロック先頭のグローバル変数で管理されます：

- `hiraganaData` — 47文字分のオブジェクト配列 `{ char, word, emoji, group }`。一部の文字（す・せ・つ・の・ほ・む・る・ぺ）は `emoji` の代わりに `imageUrl` フィールドを使用。
- `masteryWeights` — 各文字の重み（1〜15、初期値5）を保持するオブジェクト。重み付きランダム選択に使用。ページリロードで消える（永続化なし）。
- `selectedGroups` — 現在有効なグループ名（`"あ行"` 等）の配列。初期値は `['あ行']`。URL パラメータで上書き可能。
- `currentData` — 現在表示中の文字オブジェクト。

### タイマーとフロー

1. `startNewRound()` — `masteryWeights` と選択中グループを使って文字をランダム選択し、3つのタイマーをリセットする。
2. 5秒後（`hintTimeout`）、ヒントパネル（絵文字または画像＋例示語）が CSS トランジションでフェードイン。
3. ヒント表示から さらに5秒後（`autoNextTimeout`）、自動で次の問題へ進む。
4. フィードバックボタン（`👍` / `🤔`）が `handleFeedback(adjustment)` を呼び出し、重みを調整（👍: `−1`、🤔: `+2`、1〜15でクランプ）してすぐに `startNewRound()` を呼ぶ（自動進行をキャンセル）。

### グループフィルタリング

グループ（`あ行`〜`わ行`）は1文字のキーに対応。URL パラメータ `?g=a,k,s` でロード時にグループを事前選択できます。

```
a=あ行, k=か行, s=さ行, t=た行, n=な行, h=は行, b=ば行, p=ぱ行, m=ま行, y=や行, r=ら行, w=わ行
```

チェックボックスは `updateGroups()` を呼び、`selectedGroups` を更新してカードを再スタートします。

### ヒント画像

`imageUrl` を持つ文字は `<img>` タグで描画し、それ以外は `emoji` 文字列をそのまま表示します。どちらも同じ `#hint-content` コンテナに表示され、カウントダウン後にフェードインします。画像はすべて外部 URL（blogger.googleusercontent.com）です。
