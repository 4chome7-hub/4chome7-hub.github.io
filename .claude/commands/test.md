Run Playwright tests for this project.

Usage: /test [options]
- /test         → 全テストをヘッドレスで実行
- /test headed  → ブラウザを表示して実行
- /test debug   → デバッグモードで実行（ステップ実行）
- /test ui      → Playwright UI モードで実行
- /test magic   → magic.spec.js のみ実行
- /test index   → index.spec.js のみ実行（存在する場合）

Steps:
1. Parse the argument(s) from "$ARGUMENTS"
2. Run the appropriate command below:

| Argument | Command |
|---|---|
| (none) | `npm test -- --reporter=list` |
| headed | `npm run test:headed -- --reporter=list` |
| debug | `npm run test:debug` |
| ui | `npm run test:ui` |
| magic | `npm test -- tests/magic.spec.js --reporter=list` |
| index | `npm test -- tests/index.spec.js --reporter=list` |

3. Report the results: how many passed / failed, and paste any failure messages.
4. If a test fails, investigate the cause by reading the relevant spec file and the HTML source, then suggest a fix.
