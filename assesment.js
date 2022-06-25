'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
    const userName=userNameInput.value;
    if(userName.length===0){
        //名前がからの時は処理を終了する
        return;
    }

    //診断結果表示エリアの作成
    resultDivided.innerText='';
    const header=document.createElement('h3');
    header.innerText='診断結果';
resultDivided.appendChild(header);

const paragraph=document.createElement('p')
const result=assesment(userName);
paragraph.innerText=result;
resultDivided.appendChild(paragraph);

// ツイートエリアの作成
tweetDivided.innerText = "";
const anchor = document.createElement('a');
const hrefValue =
  'https://twitter.com/intent/tweet?button_hashtag='+
  encodeURIComponent('あなたのいいところ')+
  '&ref_src=twsrc%5Etfw';
anchor.setAttribute('href', hrefValue);
anchor.className = 'twitter-hashtag-button';
anchor.setAttribute('data-text',result);
anchor.innerText = 'Tweet #あなたのいいところ';
tweetDivided.appendChild(anchor);

//widgets.jsの設定
const script=document.createElement('script');
script.setAttribute('src','https://platform.twitter.com/widgets.js');
tweetDivided.appendChild(script);

};

  const answers=[
    '{userName} のいいところは声です.あなたの特徴的な声は皆を惹きつけます',
    '{userName} のいいところは眼差しです。あなたに見つめられた人は、気になって仕方がないでしょう。',
    '{userName} のいいところは情熱です。あなたの情熱に周りは感化されています。',
    '{userName} のいいところは厳しさです。あなたの厳しさが物事をいつも成功に導きます',
    '{userName} のいいところは知識です。博識なあなたを多くの人が頼りにしています',
    '{userName} のいいところはユニークさです。あなただけのその特徴が皆を楽しくさせられます。',
    '{userName} のいいところは用心深さです。あなたの洞察に多くの人が助けられます。',
    '{userName} のいいところは見た目です。内側から溢れ出るあなたの良さに皆が気を惹かれます。',
    '{userName} のいいところは決断力です。あなたがする決断にいつも助けられる人がいます',
    '{userName} のいいところは思いやりです。あなたに気をかけてもらった多くの人が感謝いています',
    '{userName} のいいところは感受性です。強引すぎないあなたの考えに皆が感謝しています',
    '{userName} のいいところは好奇心です。新しいことに向かって行くあなたの心構えが多くの人に魅力的に見えます。',
    '{userName} のいいところは気配りです。あなたの配慮が多くの人を救っています。',
    '{userName} のいいところはその全てです。ありのままのあなた自身がいいところなのです',
    '{userName} のいいところは自制心です。やばいと思った時にしっかりと衝動を抑えられるあなたが、皆から評価されています',

];
/** 
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
*/
function assesment(userName){
//全文字のコード番号を取得してそれを足し合わせる
let sumOfCharCode=0;
for(let i=0; i<userName.length; i++){
 sumOfCharCode=sumOfCharCode+userName.charCodeAt(i);

}
//文字列のコード番号のh合計を回答の数で割って添字の数値を求める
const index=sumOfCharCode%answers.length;
let result=answers[index];
result=result.replaceAll('{userName}',userName);
return result;

}
console.assert(
    assesment('太郎')===assesment('太郎'),
    '入力が同じなら同じ診断結果を出力する処理が正しくありません。'
);


userNameInput.onkeydown=event=>{
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    
    }
};