'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click',
  () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
      // 名前が空の時は処理を終了する
      resultDivision.innerText = '名前を入力してください';
      return;
    }

    // 診断結果表示エリアの作成
    resultDivision.innerText = '';
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivision.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph);

    // ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue = 
    'https://twitter.com/intent/tweet?button_hashtag=' + 
    encodeURIComponent('あなたのいいところ') + 
    '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
);

// Enter キーで診断する処理を追加
userNameInput.addEventListener(
  'keydown',
  () => {
    if (event.code === 'Enter') {
      // Enter が押された時に実行する関数
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)

const answers = [
  '###userName###さんの良いところは声です。###userName###さんの甘美な声は皆を惹きつけ、心に残ります。',
  '###userName###さんの良いところはまなざしです。###userName###さんに見つめられた人は、恋に落ちてしまうでしょう。',
  '###userName###さんの良いところは情熱です。###userName###さんの情熱に周りの人は感化されます。ですが、あなたが無能なら意味がありませんわ、無能な働き者ほど害悪なものはありませんから。',
  '###userName###さんの良いところは厳しさです。###userName###さんの厳しさがものごとをいつも成功に導きます。でも厳しいだけではダメですわよ。適度に飴を与えないと壊れてしまいますから。',
  '###userName###さんの良いところは知識です。博識な###userName###さんを多くの人が頼りにしています。知識ばかりひけらかす頭でっかちになってはダメですわよ。',
  '###userName###さんの良いところはユニークさです。###userName###さんだけのその特徴が皆を楽しくさせます。個性的な人ですこと。',
  '###userName###さんの良いところは用心深さです。###userName###さんの洞察に、多くの人が助けられます。時には大胆に行動することも大切ですわ。',
  '###userName###さんの良いところは見た目です。内側から溢れ出る###userName###さんの良さに皆が気を惹かれます。これまで何匹の豚を堕としてきましたの？',
  '###userName###さんの良いところは決断力です。###userName###さんがする決断にいつも助けられる人がいます。優柔不断なお人は嫌いですわ。',
  '###userName###さんの良いところは思いやりです。###userName###さんに気をかけてもらった多くの人が感謝しています。下等生物に配慮するのは当たり前のことですわ。',
  '###userName###さんの良いところは感受性です。###userName###さんが感じたことに皆が共感し、わかりあうことができます。下等生物と付き合うのも疲れるでしょう？たまにはストレス発散することも大切でしてよ。',
  '###userName###さんの良いところは節度です。強引すぎない###userName###さんの考えに皆が感謝しています。いわゆる良い人ですね。ですが時には強引に行かないとNTRれてしまいますわよ。',
  '###userName###さんの良いところは好奇心です。新しいことに向かっていく###userName###さんの心構えが多くの人に魅力的に映ります。好奇心は時に身を滅ぼしますわよ、お気をつけてくださいまし。',
  '###userName###さんの良いところは気配りです。###userName###さんの配慮が多くの人を救っています。',
  '###userName###さんの良いところはその全てです。ありのままの###userName###さん自身がいいところなのです。果たして本当に全てが良いのでしょうか？少なくとも私はあなたのことが嫌いでしてよ。',
  '###userName###さんの良いところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###さんが皆から評価されています。',
  '###userName###のいいところは優しさです。###userName###の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字コード番号の合計を回数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('###userName###', userName);
  return result;
}

// テスト関数
function test() {
  console.log('診断結果の文章のテスト');

  // 太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') ===
    '太郎さんの良いところは決断力です。太郎さんがする決断にいつも助けられる人がいます。優柔不断なお人は嫌いですわ。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  // 次郎
  console.log('次郎')
  console.assert(
    assessment('次郎') ===
    '次郎さんの良いところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎さんが皆から評価されています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  // 花子
  console.log('花子');
  console.assert(
    assessment('花子') ===
    '花子さんの良いところはまなざしです。花子さんに見つめられた人は、恋に落ちてしまうでしょう。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.log('診断結果の文書のテスト終了');

  // 太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

  console.log('次郎');
  console.assert(
    assessment('次郎') === assessment('次郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

  console.log('花子');
  console.assert(
    assessment('花子') === assessment('花子'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

  console.log('同じ名前なら、同じ結果を出力することのテスト終了');
}

// test();
