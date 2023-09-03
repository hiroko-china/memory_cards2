
let frontImages = [];
let backgroundImage;
let backImage;

// カードがめくられた数を保存
let flippedCount = 0;

// めくった１枚目と２枚目をスプライト保存
let firstCard;
let secondCard;

let timer = 0;
// ２枚がそろった回数
let pairCount = 0;
// ゴール時に使用
let heartImage;

function preload() {
    backgroundImage = loadImage('./starbg.png');
    frontImages['kuma'] = loadImage('./kumaPuzzle200.png');
    frontImages['tokage'] = loadImage('./tokagePuzzle200.png');
    frontImages['neko'] = loadImage('./nekoPuzzle200.png');
    frontImages['pen'] = loadImage('./penPuzzle200.png');
    frontImages['ton'] = loadImage('./tonPuzzle200.png');
    frontImages['puzzle1'] = loadImage('./puzzle1_200.png');
    frontImages['puzzle2'] = loadImage('./puzzle2_200.png');
    frontImages['puzzle3'] = loadImage('./puzzle3_200.png');
    frontImages['puzzle4'] = loadImage('./puzzle4_200.png');
    frontImages['puzzle5'] = loadImage('./puzzle5_200.png');
    backImage = loadImage('./backCard200.jpg');
    heartImage = loadImage('./heart150.png')
}

function setup() {
    createCanvas(1600, 1000);


    let cardType = [
        'kuma',
        'kuma',
        'tokage',
        'tokage',
        'neko',
        'neko',
        'pen',
        'pen',
        'ton',
        'ton',
        'puzzle1',
        'puzzle1',
        'puzzle2',
        'puzzle2',
        'puzzle3',
        'puzzle3',
        'puzzle4',
        'puzzle4'
    ]

    cardType = shuffleCards(cardType);

    let cardNumber = 0;
    for (let y = 0; y < 3; y++){
        for (let x = 0; x < 6; x++){
            let card = createSprite (280 + 210 * x, 280 + 210 * y);
            
            card.addImage('back', backImage);
            
            // カードのタイプを配列から持ってくる
            let type = cardType[cardNumber];

            card.addImage('front', frontImages[type]);
            // card.scale = 0.8;

            // typeをcardの中に保存
            card.type = type;

            //  スプライトがクリックされた時に呼ばれる関数をセット
            card.onMousePressed = clicked;

            cardNumber++;
        }
    }
}

function draw() {
    background(backgroundImage);
    drawSprites();

    if(pairCount == 9){
    fill(255,0,0);
    textSize(150);
    textFont('Georgia');
    text('Completed!', width/2 - 300, height/2 + 50);

    }


    timer--;
    if(timer == 0){
        // タイマーが０になったら裏面に戻す
        firstCard.changeImage('back');
        secondCard.changeImage('back');

        flippedCount = 0;
    }


}

function clicked(card) {
    if(card.getAnimationLabel() == 'front') {
        return;
    }
    
    if(flippedCount == 2){
        return;
    }
    
    flippedCount++;

    card.changeImage('front');

    if(flippedCount == 1) {
        firstCard = card;
    }

    if(flippedCount == 2) {
        secondCard = card;

        if(firstCard.type == secondCard.type) {
            pairCount++;
            if(pairCount == 9){
                        // ペアが全てそろったらゲーム終了
                for(let i = 0; i < 15; i++){
                    heart = createSprite(random(width), random(height));
                    heart.addImage(heartImage);
                    heart.velocity.y = -5;
                    heart.velocity.x = random(-5,5);
                }
            }
        // 2枚めくったら0に戻す
        flippedCount = 0;
        
        }
        else {
            timer = 120;
        }
    }

}

function shuffleCards(cardType) {
    // 100回シャッフル
    for(let i = 0; i <100; i++){
        let random1 = floor(random(18));
        let random2 = floor(random(18));
        // random1で決めたカードのタイプを一時的に保存
        var savedType = cardType[random1];
        // random1で決めたカードのタイプをramdom2で決めたカードのタイプに変える
        cardType[random1] = cardType[random2];
        // random2で決めたカードのタイプを一時的に保存していたカードのタイプに変える
        cardType[random2] = savedType;
    }

    return cardType;
}

