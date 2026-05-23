const { test, expect } = require('@playwright/test');

const URL = 'https://4chome7-hub.github.io/magic.html';

test('ページが表示される', async ({ page }) => {
    await page.goto(URL);
    await expect(page).toHaveTitle('魔法のひらがな');
    await expect(page.locator('h1')).toHaveText('魔法のひらがな');
});

test('ロード時にひらがなが表示されている', async ({ page }) => {
    await page.goto(URL);
    const display = page.locator('#display');
    const text = await display.innerText();
    expect(text.length).toBeGreaterThan(0);
});

test('つぎへボタンで文字が変わる', async ({ page }) => {
    await page.goto(URL);
    const display = page.locator('#display');
    const before = await display.innerText();
    // 10回押して少なくとも1回は変わることを確認
    let changed = false;
    for (let i = 0; i < 10; i++) {
        await page.locator('.next-btn').click();
        const after = await display.innerText();
        if (after !== before) { changed = true; break; }
    }
    expect(changed).toBe(true);
});

test('そのまま・てんてん・まるボタンが動作する', async ({ page }) => {
    await page.goto(URL);
    // は行が出るまでつぎへを押す
    let isHaRow = false;
    for (let i = 0; i < 50; i++) {
        await page.locator('.next-btn').click();
        const char = await page.locator('#display').innerText();
        if ('はひふへほばびぶべぼぱぴぷぺぽ'.includes(char)) { isHaRow = true; break; }
    }

    if (isHaRow) {
        // は行では゜まるボタンが有効
        const handakutenBtn = page.locator('#btn-handakuten');
        await expect(handakutenBtn).not.toBeDisabled();
        await handakutenBtn.click();
        const char = await page.locator('#display').innerText();
        expect('ぱぴぷぺぽ'.includes(char)).toBe(true);
    }

    // そのままボタンでbaseに戻る
    await page.locator('#btn-base').click();
    await expect(page.locator('#btn-base')).toHaveClass(/active/);
});

test('か〜と行では゜まるボタンが無効', async ({ page }) => {
    await page.goto(URL);
    // か行が出るまでつぎへを押す
    for (let i = 0; i < 50; i++) {
        await page.locator('#btn-base').click();
        const char = await page.locator('#display').innerText();
        if ('かきくけこさしすせそたちつてと'.includes(char)) {
            await expect(page.locator('#btn-handakuten')).toBeDisabled();
            break;
        }
        await page.locator('.next-btn').click();
    }
});

test('てんてんボタンで濁音になる', async ({ page }) => {
    await page.goto(URL);
    // baseの文字を記録してから濁音に変換
    await page.locator('#btn-base').click();
    const base = await page.locator('#display').innerText();
    await page.locator('#btn-dakuten').click();
    const dakuten = await page.locator('#display').innerText();
    expect(base).not.toBe(dakuten);
    await expect(page.locator('#btn-dakuten')).toHaveClass(/active/);
});
