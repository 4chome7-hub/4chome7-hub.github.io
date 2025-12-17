// ひらがなとヒントのペアデータ
const hiraganaData = [
    { char: 'あ', hint: 'アリ' },
    { char: 'い', hint: 'イヌ' },
    { char: 'う', hint: 'ウシ' },
    { char: 'え', hint: 'エビ' },
    { char: 'お', hint: 'オニ' },
    { char: 'か', hint: 'カメ' },
    { char: 'き', hint: 'キリン' },
    { char: 'く', hint: 'クマ' },
    { char: 'け', hint: 'ケムシ' },
    { char: 'こ', hint: 'コアラ' },
    { char: 'さ', hint: 'サル' },
    { char: 'し', hint: 'シカ' },
    { char: 'す', hint: 'スズメ' },
    { char: 'せ', hint: 'セミ' },
    { char: 'そ', hint: 'ゾウ' },
    { char: 'た', hint: 'タコ' },
    { char: 'ち', hint: 'チョウ' },
    { char: 'つ', hint: 'ツル' },
    { char: 'て', hint: 'テントウムシ' },
    { char: 'と', hint: 'トラ' },
    { char: 'な', hint: 'ナマケモノ' },
    { char: 'に', hint: 'ニワトリ' },
    { char: 'ぬ', hint: 'ヌイグルミ' },
    { char: 'ね', hint: 'ネコ' },
    { char: 'の', hint: 'ノコギリ' },
    { char: 'は', hint: 'ハチ' },
    { char: 'ひ', hint: 'ヒツジ' },
    { char: 'ふ', hint: 'フクロウ' },
    { char: 'へ', hint: 'ヘビ' },
    { char: 'ほ', hint: 'ホタル' },
    { char: 'ま', hint: 'マメ' },
    { char: 'み', hint: 'ミミズ' },
    { char: 'む', hint: 'ムカデ' },
    { char: 'め', hint: 'メダカ' },
    { char: 'も', hint: 'モグラ' },
    { char: 'や', hint: 'ヤギ' },
    { char: 'ゆ', hint: 'ユリ' },
    { char: 'よ', hint: 'ヨット' },
    { char: 'ら', hint: 'ライオン' },
    { char: 'り', hint: 'リス' },
    { char: 'る', hint: 'ルリ' },
    { char: 'れ', hint: 'レッサーパンダ' },
    { char: 'ろ', hint: 'ロウソク' },
    { char: 'わ', hint: 'ワニ' },
    { char: 'を', hint: 'を' }, 
    { char: 'ん', hint: 'ん' }  
];

const hiraganaChar = document.getElementById('hiragana-char');
const hintText = document.getElementById('hint-text');
const timerText = document.getElementById('timer-text');
const nextButton = document.getElementById('next-button');

let currentHiragana = null;
let hintTimeout = null;
let autoNextTimeout = null; // 自動遷移用のタイマー管理
let timerInterval = null;

/**
 * 新しいひらがなを選んで表示し、タイマーを開始する
 */
function startNewRound() {
    // すべてのタイマーをクリア（連打防止）
    clearTimeout(hintTimeout);
    clearTimeout(autoNextTimeout);
    clearInterval(timerInterval);
    
    hintText.textContent = '';
    timerText.textContent = '';
    
    const randomIndex = Math.floor(Math.random() * hiraganaData.length);
    currentHiragana = hiraganaData[randomIndex];
    
    hiraganaChar.textContent = currentHiragana.char;
    
    let timeRemaining = 5;
    timerText.textContent = `ヒントまで ${timeRemaining} 秒`;
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        if (timeRemaining > 0) {
            timerText.textContent = `ヒントまで ${timeRemaining} 秒`;
        } else {
            clearInterval(timerInterval);
            timerText.textContent = 'ヒント！';
        }
    }, 1000);
    
    // 5秒後にヒントを表示
    hintTimeout = setTimeout(() => {
        let hintDisplay = '';
        switch(currentHiragana.hint) {
            case 'アリ': hintDisplay = '🐜 アリ'; break;
            case 'イヌ': hintDisplay = '🐕 イヌ'; break;
            case 'ウシ': hintDisplay = '🐄 ウシ'; break;
            case 'エビ': hintDisplay = '🍤 エビ'; break;
            case 'オニ': hintDisplay = '👹 オニ'; break;
            case 'カメ': hintDisplay = '🐢 カメ'; break;
            case 'キリン': hintDisplay = '🦒 キリン'; break;
            case 'クマ': hintDisplay = '🐻 クマ'; break;
            case 'ケムシ': hintDisplay = '🐛 ケムシ'; break;
            case 'コアラ': hintDisplay = '🐨 コアラ'; break;
            case 'サル': hintDisplay = '🐒 サル'; break;
            case 'シカ': hintDisplay = '🦌 シカ'; break;
            case 'スズメ': hintDisplay = '🐦 スズメ'; break;
            case 'セミ': hintDisplay = '🦗 セミ'; break;
            case 'ゾウ': hintDisplay = '🐘 ゾウ'; break;
            case 'タコ': hintDisplay = '🐙 タコ'; break;
            case 'チョウ': hintDisplay = '🦋 チョウ'; break;
            case 'ツル': hintDisplay = '🦢 ツル'; break;
            case 'テントウムシ': hintDisplay = '🐞 テントウ'; break;
            case 'トラ': hintDisplay = '🐅 トラ'; break;
            case 'ナマケモノ': hintDisplay = '🦥 ナマケ'; break;
            case 'ニワトリ': hintDisplay = '🐔 ニワトリ'; break;
            case 'ヌイグルミ': hintDisplay = '🧸 ヌイグルミ'; break;
            case 'ネコ': hintDisplay = '🐈 ネコ'; break;
            case 'ノコギリ': hintDisplay = '⚙️ ノコギリ'; break;
            case 'ハチ': hintDisplay = '🐝 ハチ'; break;
            case 'ヒツジ': hintDisplay = '🐑 ヒツジ'; break;
            case 'フクロウ': hintDisplay = '🦉 フクロウ'; break;
            case 'ヘビ': hintDisplay = '🐍 ヘビ'; break;
            case 'ホタル': hintDisplay = '✨ ホタル'; break;
            case 'マメ': hintDisplay = '🫘 マメ'; break;
            case 'ミミズ': hintDisplay = '🪱 ミミズ'; break;
            case 'ムカデ': hintDisplay = '🐛 ムカデ'; break;
            case 'メダカ': hintDisplay = '🐟 メダカ'; break;
            case 'モグラ': hintDisplay = '🕳️ モグラ'; break;
            case 'ヤギ': hintDisplay = '🐐 ヤギ'; break;
            case 'ユリ': hintDisplay = '🌸 ユリ'; break;
            case 'ヨット': hintDisplay = '⛵ ヨット'; break;
            case 'ライオン': hintDisplay = '🦁 ライオン'; break;
            case 'リス': hintDisplay = '🐿️ リス'; break;
            case 'ルリ': hintDisplay = '🦜 ルリ'; break;
            case 'レッサーパンダ': hintDisplay = '🐼 レッサー'; break;
            case 'ロウソク': hintDisplay = '🕯️ ロウソク'; break;
            case 'ワニ': hintDisplay = '🐊 ワニ'; break;
            default: hintDisplay = currentHiragana.hint;
        }
        
        hintText.textContent = `${currentHiragana.char} は... ${hintDisplay}！`;

        // 【追加】ヒント表示の5秒後に自動で次へ
        autoNextTimeout = setTimeout(() => {
            startNewRound();
        }, 5000);

    }, 5000);
}

// 手動で次へ進むことも可能
nextButton.addEventListener('click', startNewRound);

// アプリ開始
startNewRound();
