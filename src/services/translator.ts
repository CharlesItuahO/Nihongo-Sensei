import { Level, RichMessage, WordToken, RubySegment } from '../types/index.ts';

export interface LexiconEntry {
  kanji: string;
  kana: string;
  romaji: string;
  pos: string;
  meaning: string;
  jlpt: Level;
  ruby: RubySegment[];
  grammarNote: string;
  replyJa: string;
  replyKana: string;
  replyRomaji: string;
  replyEn: string;
  suggestedReplies: string[];
}

/**
 * High-frequency English-Japanese vocabulary lookup dictionary
 */
export const LEXICON_ENTRIES: Record<string, LexiconEntry> = {
  // --- Greetings & Essentials ---
  hello: {
    kanji: 'こんにちは！',
    kana: 'こんにちは！',
    romaji: 'Konnichiwa!',
    pos: 'greeting',
    meaning: 'hello / good afternoon',
    jlpt: 'N5',
    ruby: [{ text: 'こんにちは！', isKanji: false }],
    grammarNote: 'こんにちは is used from mid-morning through late afternoon. The final kana is written with は (ha), but pronounced "wa".',
    replyJa: 'こんにちは！今日はどんな日本語を勉強したいですか？',
    replyKana: 'こんにちは！きょうはどんなにほんごをべんきょうしたいですか？',
    replyRomaji: 'Konnichiwa! Kyō wa donna nihongo o benkyō shitai desu ka?',
    replyEn: 'Hello! What Japanese would you like to learn today?',
    suggestedReplies: ['How do I order food?', 'Teach me travel phrases', 'How do you say delicious?'],
  },
  hi: {
    kanji: 'こんにちは！',
    kana: 'こんにちは！',
    romaji: 'Konnichiwa!',
    pos: 'greeting',
    meaning: 'hi / hello',
    jlpt: 'N5',
    ruby: [{ text: 'こんにちは！', isKanji: false }],
    grammarNote: 'こんにちは is universally polite and friendly for any daytime meeting.',
    replyJa: 'やあ！今日も楽しく日本語でお話ししましょう。',
    replyKana: 'やあ！きょうもたのしくにほんごでおはなししましょう。',
    replyRomaji: 'Yā! Kyō mo tanoshiku nihongo de ohanashi shimashō.',
    replyEn: 'Hey there! Let\'s enjoy chatting in Japanese today as well.',
    suggestedReplies: ['How are you today?', 'Where is the train station?', 'I want some coffee'],
  },
  'good morning': {
    kanji: 'おはようございます！',
    kana: 'おはようございます！',
    romaji: 'Ohayō gozaimasu!',
    pos: 'greeting',
    meaning: 'good morning (polite)',
    jlpt: 'N5',
    ruby: [{ text: 'おはようございます！', isKanji: false }],
    grammarNote: 'Adding ございます (gozaimasu) makes it polite. With close friends or family, you can simply say おはよう (ohayō).',
    replyJa: 'おはようございます！今日も一日頑張りましょうね！',
    replyKana: 'おはようございます！きょうもいちにちがんばりましょうね！',
    replyRomaji: 'Ohayō gozaimasu! Kyō mo ichinichi gambarimashō ne!',
    replyEn: 'Good morning! Let\'s do our best today as well!',
    suggestedReplies: ['I drank coffee', 'What is the weather today?', 'Let\'s study Japanese!'],
  },
  'good evening': {
    kanji: 'こんばんは！',
    kana: 'こんばんは！',
    romaji: 'Konbanwa!',
    pos: 'greeting',
    meaning: 'good evening',
    jlpt: 'N5',
    ruby: [{ text: 'こんばんは！', isKanji: false }],
    grammarNote: 'Used after dark. Just like こんにちは, the trailing sound is spelled with は (ha) and pronounced "wa".',
    replyJa: 'こんばんは！今日はどんな一日でしたか？',
    replyKana: 'こんばんは！きょうはどんないちにちでしたか？',
    replyRomaji: 'Konbanwa! Kyō wa donna ichinichi deshita ka?',
    replyEn: 'Good evening! How was your day today?',
    suggestedReplies: ['It was great', 'I was busy with work', 'I am tired'],
  },
  'good night': {
    kanji: 'おやすみなさい。',
    kana: 'おやすみなさい。',
    romaji: 'Oyasuminasai.',
    pos: 'greeting',
    meaning: 'good night (sleep well)',
    jlpt: 'N5',
    ruby: [{ text: 'おやすみなさい。', isKanji: false }],
    grammarNote: 'Used before going to sleep or parting late at night. Casual form is おやすみ (oyasumi).',
    replyJa: 'おやすみなさい！ゆっくり休んで、良い夢を見てくださいね。',
    replyKana: 'おやすみなさい！ゆっくりやすんで、よいゆめをみてくださいね。',
    replyRomaji: 'Oyasuminasai! Yukkuri yasunde, yoi yume o mite kudasai ne.',
    replyEn: 'Good night! Rest well and have sweet dreams.',
    suggestedReplies: ['See you tomorrow', 'Thank you Sensei', 'Good night!'],
  },
  goodbye: {
    kanji: 'さようなら。',
    kana: 'さようなら。',
    romaji: 'Sayōnara.',
    pos: 'greeting',
    meaning: 'goodbye / farewell',
    jlpt: 'N5',
    ruby: [{ text: 'さようなら。', isKanji: false }],
    grammarNote: 'さようなら implies a long separation. For casual daily goodbyes with friends or colleagues, use またね (mata ne) or じゃあね (jā ne).',
    replyJa: 'またお話ししましょうね！お疲れ様でした。',
    replyKana: 'またおはなししましょうね！おつかれさまでした。',
    replyRomaji: 'Mata ohanashi shimashō ne! Otsukaresama deshita.',
    replyEn: 'Let\'s chat again soon! Thank you for your hard work.',
    suggestedReplies: ['See you later!', 'Thank you very much', 'Have a nice day'],
  },
  bye: {
    kanji: 'じゃあ、またね！',
    kana: 'じゃあ、またね！',
    romaji: 'Jā, mata ne!',
    pos: 'greeting',
    meaning: 'bye / see you later',
    jlpt: 'N5',
    ruby: [{ text: 'じゃあ、またね！', isKanji: false }],
    grammarNote: 'じゃあ、またね (jā, mata ne) is the go-to casual farewell among friends and classmates.',
    replyJa: 'はい、またね！次回も楽しみにしています。',
    replyKana: 'はい、またね！じかいもたのしみにしています。',
    replyRomaji: 'Hai, mata ne! Jikai mo tanoshimi ni shite imasu.',
    replyEn: 'Yes, see you! I am looking forward to our next talk.',
    suggestedReplies: ['See you tomorrow', 'Take care', 'Bye bye!'],
  },
  'thank you': {
    kanji: 'ありがとうございます！',
    kana: 'ありがとうございます！',
    romaji: 'Arigatō gozaimasu!',
    pos: 'phrase',
    meaning: 'thank you very much (polite)',
    jlpt: 'N5',
    ruby: [{ text: 'ありがとうございます！', isKanji: false }],
    grammarNote: 'Adding ございます makes it standard polite. To express past gratitude (for something already done), use ありがとうございました (arigatō gozaimashita).',
    replyJa: 'どういたしまして！お役に立ててとても嬉しいです。',
    replyKana: 'どういたしまして！おやくにたててとてもうれしいです。',
    replyRomaji: 'Dōitashimashite! O-yaku ni tatete totemo ureshii desu.',
    replyEn: 'You are very welcome! I am so glad I could help you.',
    suggestedReplies: ['You are a great teacher', 'How do you say please?', 'Let\'s practice more!'],
  },
  thanks: {
    kanji: 'どうもありがとう！',
    kana: 'どうもありがとう！',
    romaji: 'Dōmo arigatō!',
    pos: 'phrase',
    meaning: 'thanks / thank you',
    jlpt: 'N5',
    ruby: [{ text: 'どうもありがとう！', isKanji: false }],
    grammarNote: 'どうもありがとう is friendly and casual. For business or strangers, use ありがとうございます.',
    replyJa: 'いいえ、どういたしまして！いつでも声をかけてくださいね。',
    replyKana: 'いいえ、どういたしまして！いつでもこえをかけてくださいね。',
    replyRomaji: 'Iie, dōitashimashite! Itsu demo koe o kakete kudasai ne.',
    replyEn: 'No problem at all! Feel free to ask anytime.',
    suggestedReplies: ['Thanks Sensei', 'What is next?', 'Let\'s practice food ordering'],
  },
  'you are welcome': {
    kanji: 'どういたしまして。',
    kana: 'どういたしまして。',
    romaji: 'Dōitashimashite.',
    pos: 'phrase',
    meaning: 'you are welcome',
    jlpt: 'N5',
    ruby: [{ text: 'どういたしまして。', isKanji: false }],
    grammarNote: 'どういたしまして is standard. In daily life, people also modestly wave their hand and say いいえ、いいえ (iie, iie, "not at all").',
    replyJa: '丁寧なお返事ですね！素晴らしいマナーです。',
    replyKana: 'ていねいなおへんじですね！すばらしいまなーです。',
    replyRomaji: 'Teinei na o-henji desu ne! Subarashii manā desu.',
    replyEn: 'Such a polite response! Wonderful manners.',
    suggestedReplies: ['Thank you', 'Excuse me', 'Please'],
  },
  please: {
    kanji: 'お願いします。',
    kana: 'おねがいします。',
    romaji: 'Onegaishimasu.',
    pos: 'phrase',
    meaning: 'please / I request this of you',
    jlpt: 'N5',
    ruby: [
      { text: 'お', isKanji: false },
      { text: '願', reading: 'ねが', isKanji: true },
      { text: 'いします。', isKanji: false },
    ],
    grammarNote: 'お願いします is used when asking for a service, pointing to an item, or asking someone to do something for you.',
    replyJa: 'かしこまりました！喜んでお手伝いしますよ。',
    replyKana: 'かしこまりました！よろこんでおてつだいしますよ。',
    replyRomaji: 'Kashikomarimashita! Yorokonde o-tetsudai shimasu yo.',
    replyEn: 'Certainly! I would be delighted to assist you.',
    suggestedReplies: ['Coffee, please', 'Water, please', 'Check, please'],
  },
  'excuse me': {
    kanji: 'すみません。',
    kana: 'すみません。',
    romaji: 'Sumimasen.',
    pos: 'phrase',
    meaning: 'excuse me / I am sorry / thank you',
    jlpt: 'N5',
    ruby: [{ text: 'すみません。', isKanji: false }],
    grammarNote: 'すみません is Japan\'s magic word! It works as: 1) calling a waiter, 2) apologizing for a small mishap, 3) thanking someone who went out of their way for you.',
    replyJa: 'はい、何でしょうか？ご案内しますよ。',
    replyKana: 'はい、なんでしょうか？ごあんないしますよ。',
    replyRomaji: 'Hai, nan deshō ka? Go-annai shimasu yo.',
    replyEn: 'Yes, how can I help you? I\'ll gladly guide you.',
    suggestedReplies: ['Where is the station?', 'Water, please', 'How much is this?'],
  },
  sorry: {
    kanji: 'ごめんなさい。',
    kana: 'ごめんなさい。',
    romaji: 'Gomennasai.',
    pos: 'phrase',
    meaning: 'I am sorry (apology)',
    jlpt: 'N5',
    ruby: [{ text: 'ごめんなさい。', isKanji: false }],
    grammarNote: 'ごめんなさい is a direct personal apology. With close friends, people shorten it to ごめんね (gomen ne).',
    replyJa: '大丈夫ですよ、全然気にしないでくださいね！',
    replyKana: 'だいじょうぶですよ、ぜんぜんきにしないでくださいね！',
    replyRomaji: 'Daijōbu desu yo, zenzen ki ni shinaide kudasai ne!',
    replyEn: 'It\'s totally fine, please don\'t worry about it at all!',
    suggestedReplies: ['Thank you Sensei', 'I made a mistake', 'Let\'s keep practicing'],
  },
  yes: {
    kanji: 'はい。',
    kana: 'はい。',
    romaji: 'Hai.',
    pos: 'interjection',
    meaning: 'yes / understood / present',
    jlpt: 'N5',
    ruby: [{ text: 'はい。', isKanji: false }],
    grammarNote: 'はい expresses affirmative agreement and also shows you are actively paying attention to the speaker (a conversational device called 相槌 aizuchi).',
    replyJa: '良いお返事ですね！次は何を試してみますか？',
    replyKana: 'よいおへんじですね！つぎはなにをためしてみますか？',
    replyRomaji: 'Yoi o-henji desu ne! Tsugi wa nani o试shitemimasu ka?',
    replyEn: 'Great response! What would you like to try next?',
    suggestedReplies: ['I want to learn travel phrases', 'How do you say water?', 'Can we practice food?'],
  },
  no: {
    kanji: 'いいえ。',
    kana: 'いいえ。',
    romaji: 'Iie.',
    pos: 'interjection',
    meaning: 'no / not at all',
    jlpt: 'N5',
    ruby: [{ text: 'いいえ。', isKanji: false }],
    grammarNote: 'いいえ is standard "no". In casual conversation, friends often say ううん (uun) or use polite softener 結構です (kekkō desu, "no thank you / I am fine").',
    replyJa: '分かりました！では別の表現を練習しましょうか。',
    replyKana: 'わかりました！ではべつのひょうげんをれんしゅうしましょうか。',
    replyRomaji: 'Wakarimashita! Dewa betsu no hyōgen o renshū shimashō ka.',
    replyEn: 'Understood! Shall we practice a different phrase then?',
    suggestedReplies: ['Yes please', 'Let\'s try another word', 'Teach me greetings'],
  },

  // --- Dining & Beverages ---
  water: {
    kanji: 'お水',
    kana: 'おみず',
    romaji: 'Omizu',
    pos: 'noun',
    meaning: 'water (polite form)',
    jlpt: 'N5',
    ruby: [
      { text: 'お', isKanji: false },
      { text: '水', reading: 'みず', isKanji: true },
    ],
    grammarNote: 'Prefixing お- (o-) adds polite elegance. In Japanese restaurants, free cold water is traditionally referred to as お冷 (o-hiya).',
    replyJa: '喉が渇きましたか？「お水をください」と言ってみましょう！',
    replyKana: 'のどがかわきましたか？「おみずをください」といってみましょう！',
    replyRomaji: 'Nodo ga kawakimashita ka? "Omizu o kudasai" to itte mimashō!',
    replyEn: 'Are you thirsty? Try saying: "Omizu o kudasai" (Water, please)!',
    suggestedReplies: ['Water, please', 'I am thirsty', 'Could I have cold water?'],
  },
  coffee: {
    kanji: 'コーヒー',
    kana: 'こーひー',
    romaji: 'Kōhī',
    pos: 'noun',
    meaning: 'coffee',
    jlpt: 'N5',
    ruby: [{ text: 'コーヒー', isKanji: false }],
    grammarNote: 'A katakana loanword from Dutch/English. The horizontal bar (ー) indicates a long vowel sound.',
    replyJa: 'コーヒーはお好きですか？ホットですか、アイスですか？',
    replyKana: 'こーひーはおすきですか？ほっとですか、あいすですか？',
    replyRomaji: 'Kōhī wa o-suki desu ka? Hotto desu ka, aisu desu ka?',
    replyEn: 'Do you like coffee? Do you prefer it hot or iced?',
    suggestedReplies: ['Iced coffee, please', 'Hot coffee, please', 'Coffee with milk'],
  },
  tea: {
    kanji: 'お茶',
    kana: 'おちゃ',
    romaji: 'Ocha',
    pos: 'noun',
    meaning: 'tea / green tea',
    jlpt: 'N5',
    ruby: [
      { text: 'お', isKanji: false },
      { text: '茶', reading: 'ちゃ', isKanji: true },
    ],
    grammarNote: 'In Japan, お茶 usually refers to Japanese green tea (緑茶 ryokucha). Black Western tea is called 紅茶 (kōcha).',
    replyJa: '日本のお茶はとても香りが良いですよ。温かいお茶はいかがですか？',
    replyKana: 'にほんのおちゃはとてもかおりがよいですよ。あたたかいおちゃはいかがですか？',
    replyRomaji: 'Nihon no ocha wa totemo kaori ga yoi desu yo. Atatakai ocha wa ikaga desu ka?',
    replyEn: 'Japanese tea has such a lovely aroma. Would you like some warm tea?',
    suggestedReplies: ['Green tea, please', 'Hot tea, please', 'I love Japanese tea'],
  },
  milk: {
    kanji: '牛乳（ミルク）',
    kana: 'ぎゅうにゅう（みるく）',
    romaji: 'Gyūnyū (miruku)',
    pos: 'noun',
    meaning: 'milk / cow milk',
    jlpt: 'N5',
    ruby: [
      { text: '牛乳', reading: 'ぎゅうにゅう', isKanji: true },
      { text: '（ミルク）', isKanji: false },
    ],
    grammarNote: '牛乳 literally means "cow milk". In coffee shops, people frequently use the katakana loanword ミルク (miruku).',
    replyJa: 'コーヒーにミルクを入れますか？',
    replyKana: 'こーひーにみるくをいれますか？',
    replyRomaji: 'Kōhī ni miruku o iremasu ka?',
    replyEn: 'Do you add milk to your coffee?',
    suggestedReplies: ['Yes, with milk please', 'No milk, black please', 'A little bit of milk'],
  },
  beer: {
    kanji: 'ビール',
    kana: 'びーる',
    romaji: 'Bīru',
    pos: 'noun',
    meaning: 'beer',
    jlpt: 'N5',
    ruby: [{ text: 'ビール', isKanji: false }],
    grammarNote: 'Be sure to pronounce the long vowel びーる (bīru). A short "biru" (ビル) means an office building!',
    replyJa: '日本の生ビールはとても美味しいですよ！乾杯しましょうか？',
    replyKana: 'にほんのなまびーるはとてもおいしいですよ！かんぱいしましょうか？',
    replyRomaji: 'Nihon no nama bīru wa totemo oishii desu yo! Kampai shimashō ka?',
    replyEn: 'Japanese draft beer is so crisp and delicious! Shall we say cheers (kampai)?',
    suggestedReplies: ['One draft beer, please', 'Cheers!', 'I prefer wine'],
  },
  wine: {
    kanji: 'ワイン',
    kana: 'わいん',
    romaji: 'Wain',
    pos: 'noun',
    meaning: 'wine',
    jlpt: 'N5',
    ruby: [{ text: 'ワイン', isKanji: false }],
    grammarNote: 'Red wine is 赤ワイン (aka-wain), and white wine is 白ワイン (shiro-wain).',
    replyJa: '赤ワインと白ワイン、どちらがお好みですか？',
    replyKana: 'あかわいんとしろわいん、どちらがおこのみですか？',
    replyRomaji: 'Aka-wain to shiro-wain, dochira ga o-konomi desu ka?',
    replyEn: 'Which do you prefer, red wine or white wine?',
    suggestedReplies: ['Red wine, please', 'White wine, please', 'A glass of wine, please'],
  },
  food: {
    kanji: '食べ物',
    kana: 'たべもの',
    romaji: 'Tabemono',
    pos: 'noun',
    meaning: 'food / foodstuffs',
    jlpt: 'N5',
    ruby: [
      { text: '食', reading: 'た', isKanji: true },
      { text: 'べ', isKanji: false },
      { text: '物', reading: 'もの', isKanji: true },
    ],
    grammarNote: 'Formed by combining the verb stem 食べ (eating) with 物 (thing) = "thing you eat"!',
    replyJa: '日本で一番食べてみたい料理は何ですか？',
    replyKana: 'にほんでいちばんたべてみたいりょうりはなんですか？',
    replyRomaji: 'Nihon de ichiban tabete mitai ryōri wa nan desu ka?',
    replyEn: 'What dish are you most excited to try in Japan?',
    suggestedReplies: ['Ramen and sushi', 'Wagyu beef', 'Japanese curry'],
  },
  sushi: {
    kanji: '寿司',
    kana: 'すし',
    romaji: 'Sushi',
    pos: 'noun',
    meaning: 'sushi',
    jlpt: 'N5',
    ruby: [{ text: '寿司', reading: 'すし', isKanji: true }],
    grammarNote: 'Often pronounced with polite prefix as お寿司 (o-sushi). Common sushi types include 握り (nigiri, hand-pressed) and 巻き (maki, rolls).',
    replyJa: 'お寿司、美味しいですよね！サーモンやマグロはお好きですか？',
    replyKana: 'おすし、おいしいですよね！さーもんやまぐろはおすきですか？',
    replyRomaji: 'O-sushi, oishii desu yo ne! Sāmon ya maguro wa o-suki desu ka?',
    replyEn: 'Sushi is so delicious! Do you like salmon and tuna?',
    suggestedReplies: ['I love salmon sushi', 'Tuna sushi, please', 'Where is a good sushi restaurant?'],
  },
  ramen: {
    kanji: 'ラーメン',
    kana: 'らーめん',
    romaji: 'Rāmen',
    pos: 'noun',
    meaning: 'ramen noodles',
    jlpt: 'N5',
    ruby: [{ text: 'ラーメン', isKanji: false }],
    grammarNote: 'Japan has famous regional broths: 醤油 (shōyu, soy sauce), 味噌 (miso), and 豚骨 (tonkotsu, pork bone).',
    replyJa: 'ラーメン最高ですね！豚骨ラーメンと醤油ラーメン、どちらが好きですか？',
    replyKana: 'らーめんさいこうですね！とんこつらーめんとしょうゆらーめん、どちらがすきですか？',
    replyRomaji: 'Rāmen saikō desu ne! Tonkotsu rāmen to shōyu rāmen, dochira ga suki desu ka?',
    replyEn: 'Ramen is the best! Do you like tonkotsu or shoyu broth better?',
    suggestedReplies: ['Tonkotsu ramen, please', 'Miso ramen is great', 'With extra egg, please'],
  },
  rice: {
    kanji: 'ご飯',
    kana: 'ごはん',
    romaji: 'Gohan',
    pos: 'noun',
    meaning: 'cooked rice / meal',
    jlpt: 'N5',
    ruby: [
      { text: 'ご', isKanji: false },
      { text: '飯', reading: 'はん', isKanji: true },
    ],
    grammarNote: 'ご飯 means both "steamed rice" and an entire "meal"! 朝ご飯 = breakfast, 昼ご飯 = lunch, 晩ご飯 = dinner.',
    replyJa: '日本の白ご飯はふっくらして甘みがありますよ。おかわりしますか？',
    replyKana: 'にほんのしろごはんはふっくらしてあまみがありますよ。おかわりしますか？',
    replyRomaji: 'Nihon no shiro-gohan wa fukkura shite amami ga arimasu yo. O-kawari shimasu ka?',
    replyEn: 'Japanese white rice is fluffy and slightly sweet. Would you like a refill (o-kawari)?',
    suggestedReplies: ['One more bowl, please', 'Very delicious', 'I am full, thank you'],
  },
  bread: {
    kanji: 'パン',
    kana: 'ぱん',
    romaji: 'Pan',
    pos: 'noun',
    meaning: 'bread',
    jlpt: 'N5',
    ruby: [{ text: 'パン', isKanji: false }],
    grammarNote: 'Borrowed into Japanese from Portuguese (pão) during the 16th century! Japanese bakeries are famous for fluffy shokupan.',
    replyJa: '日本のベーカリーのパンはとても柔らかくて美味しいですよ！',
    replyKana: 'にほんのべーかりーのぱんはとてもやわらかくておいしいですよ！',
    replyRomaji: 'Nihon no bēkarī no pan wa totemo yawarakakute oishii desu yo!',
    replyEn: 'Japanese bakery bread is incredibly soft and delicious!',
    suggestedReplies: ['I love Japanese bakeries', 'Croissant, please', 'Toast for breakfast'],
  },
  meat: {
    kanji: 'お肉',
    kana: 'おにく',
    romaji: 'Oniku',
    pos: 'noun',
    meaning: 'meat',
    jlpt: 'N5',
    ruby: [
      { text: 'お', isKanji: false },
      { text: '肉', reading: 'にく', isKanji: true },
    ],
    grammarNote: 'Beef is 牛肉 (gyūniku), pork is 豚肉 (butaniku), and chicken is 鶏肉 (toriniku).',
    replyJa: '日本の和牛や焼肉を食べたことがありますか？',
    replyKana: 'にほんのわぎゅうややきにくをたべたことがありますか？',
    replyRomaji: 'Nihon no wagyū ya yakiniku o tabeta koto ga arimasu ka?',
    replyEn: 'Have you ever tried Japanese Wagyu beef or yakiniku barbecue?',
    suggestedReplies: ['I want to try Wagyu beef', 'Yakiniku is amazing', 'Chicken, please'],
  },
  fish: {
    kanji: '魚',
    kana: 'さかな',
    romaji: 'Sakana',
    pos: 'noun',
    meaning: 'fish',
    jlpt: 'N5',
    ruby: [{ text: '魚', reading: 'さかな', isKanji: true }],
    grammarNote: 'The kanji 魚 depicts a fish swimming with a head, scales, and fin! Raw fish sliced for eating is 刺身 (sashimi).',
    replyJa: '焼魚と刺身、どちらで食べるのが好きですか？',
    replyKana: 'やきざかなとさしみ、どちらでたべるのがすきですか？',
    replyRomaji: 'Yaki-zakana to sashimi, dochira de taberu no ga suki desu ka?',
    replyEn: 'Do you prefer eating fish grilled (yaki-zakana) or raw (sashimi)?',
    suggestedReplies: ['Sashimi, please', 'Grilled salmon', 'I love fresh seafood'],
  },
  egg: {
    kanji: '卵',
    kana: 'たまご',
    romaji: 'Tamago',
    pos: 'noun',
    meaning: 'egg',
    jlpt: 'N5',
    ruby: [{ text: '卵', reading: 'たまご', isKanji: true }],
    grammarNote: 'In Japan, fresh eggs are so safe that raw egg over hot rice (卵かけご飯 tamago-kake-gohan) is a beloved comfort staple!',
    replyJa: '日本の「卵かけご飯（TKG）」を食べたことがありますか？とても美味しいですよ！',
    replyKana: 'にほんの「たまごかけごはん（TKG）」をたべたことがありますか？とてもおいしいですよ！',
    replyRomaji: 'Nihon no "tamago-kake-gohan" o tabeta koto ga arimasu ka? Totemo oishii desu yo!',
    replyEn: 'Have you ever tried raw egg over hot rice? It\'s super savory and delicious!',
    suggestedReplies: ['I want to try it', 'Boiled egg, please', 'Tamagoyaki omelet'],
  },
  apple: {
    kanji: 'りんご',
    kana: 'りんご',
    romaji: 'Ringo',
    pos: 'noun',
    meaning: 'apple',
    jlpt: 'N5',
    ruby: [{ text: 'りんご', isKanji: false }],
    grammarNote: 'Usually written in hiragana or katakana (リンゴ). Aomori prefecture is world-famous for its gigantic, sweet Fuji apples.',
    replyJa: '日本の青森県のりんごは大きくて甘くてジューシーですよ！',
    replyKana: 'にほんのあおもりけんのりんごはおおきくてあまくてじゅーしーですよ！',
    replyRomaji: 'Nihon no Aomori-ken no ringo wa ōkikute amakute jūshī desu yo!',
    replyEn: 'Apples from Japan\'s Aomori Prefecture are huge, crisp, and sweet!',
    suggestedReplies: ['Apple juice, please', 'How much is one apple?', 'I love fruit'],
  },
  restaurant: {
    kanji: 'レストラン',
    kana: 'れすとらん',
    romaji: 'Resutoran',
    pos: 'noun',
    meaning: 'restaurant',
    jlpt: 'N5',
    ruby: [{ text: 'レストラン', isKanji: false }],
    grammarNote: 'For dining establishments, you can also use 食堂 (shokudō, diner) or 飲食店 (inshokuten, eatery).',
    replyJa: 'どんなレストランを探していますか？予約もお手伝いできますよ。',
    replyKana: 'どんなれすとらんをさがしていますか？よやくもおてつだいできますよ。',
    replyRomaji: 'Donna resutoran o sagashite imasu ka? Yoyaku mo o-tetsudai dekimasu yo.',
    replyEn: 'What kind of restaurant are you looking for? I can help with recommendations or reservations.',
    suggestedReplies: ['A quiet sushi restaurant', 'A popular ramen spot', 'Family friendly diner'],
  },
  menu: {
    kanji: 'メニュー',
    kana: 'めにゅー',
    romaji: 'Menyū',
    pos: 'noun',
    meaning: 'menu',
    jlpt: 'N5',
    ruby: [{ text: 'メニュー', isKanji: false }],
    grammarNote: 'To ask for an English menu in a restaurant, say: 英語のメニューはありますか？ (Eigo no menyū wa arimasu ka?).',
    replyJa: '「メニューをください」と店員さんに言ってみましょう！言えますか？',
    replyKana: '「めにゅーをください」とてんいんさんにいってみましょう！いえますか？',
    replyRomaji: '"Menyū o kudasai" to ten\'in-san ni itte mimashō! Iemasu ka?',
    replyEn: 'Try saying to the staff: "Menyū o kudasai" (Menu, please)! Can you say it?',
    suggestedReplies: ['Menu, please', 'Do you have an English menu?', 'What is recommended?'],
  },
  delicious: {
    kanji: '美味しい！',
    kana: 'おいしい！',
    romaji: 'Oishii!',
    pos: 'i-adjective',
    meaning: 'delicious / tasty',
    jlpt: 'N5',
    ruby: [
      { text: '美味', reading: 'おい', isKanji: true },
      { text: 'しい！', isKanji: false },
    ],
    grammarNote: '美味しい is an i-adjective. In casual speech, people frequently exclaim うまい！ (umai!) with friends.',
    replyJa: '美味しかったですか！何を食べたのかぜひ教えてください。',
    replyKana: 'おいしかったですか！なにをたべたのかぜひおしえてください。',
    replyRomaji: 'Oishikatta desu ka! Nani o tabeta no ka zehi oshiete kudasai.',
    replyEn: 'Was it delicious? Please tell me what you ate!',
    suggestedReplies: ['The sushi was delicious', 'The ramen broth was amazing', 'Very tasty!'],
  },

  // --- Travel, Navigation & Places ---
  station: {
    kanji: '駅',
    kana: 'えき',
    romaji: 'Eki',
    pos: 'noun',
    meaning: 'train station',
    jlpt: 'N5',
    ruby: [{ text: '駅', reading: 'えき', isKanji: true }],
    grammarNote: 'The kanji depicts a horse (馬) and尺 (measuring post), representing old post-horse relay stations!',
    replyJa: '駅で電車の切符を買うお手伝いをしましょうか？どこへ行きますか？',
    replyKana: 'えきででんしゃのきっぷをかうおてつだいをしましょうか？どこへいきますか？',
    replyRomaji: 'Eki de densha no kippu o kau o-tetsudai o shimashō ka? Doko e ikimasu ka?',
    replyEn: 'Shall I help you buy train tickets at the station? Where are you headed?',
    suggestedReplies: ['Where is Tokyo Station?', 'How much is the ticket?', 'Which platform?'],
  },
  train: {
    kanji: '電車',
    kana: 'でんしゃ',
    romaji: 'Densha',
    pos: 'noun',
    meaning: 'train / electric train',
    jlpt: 'N5',
    ruby: [
      { text: '電車', reading: 'でんしゃ', isKanji: true },
    ],
    grammarNote: 'Composed of 電 (electricity) + 車 (vehicle) = "electric train". The bullet train is 新幹線 (shinkansen).',
    replyJa: '日本の電車は時間通りに正確に来ますよ。SuicaやPasmoはお持ちですか？',
    replyKana: 'にほんのでんしゃはじかんどおりにせいかくにきますよ。すいかやすいかはおもちですか？',
    replyRomaji: 'Nihon no densha wa jikan-dōri ni seikaku ni kimasu yo. Suica ya Pasmo wa o-mochi desu ka?',
    replyEn: 'Japanese trains run precisely on time. Do you have an IC transit card like Suica or Pasmo?',
    suggestedReplies: ['I have a Suica card', 'What time does the train leave?', 'Is this train bound for Shinjuku?'],
  },
  subway: {
    kanji: '地下鉄',
    kana: 'ちかてつ',
    romaji: 'Chikatetsu',
    pos: 'noun',
    meaning: 'subway / metro',
    jlpt: 'N5',
    ruby: [
      { text: '地下鉄', reading: 'ちかてつ', isKanji: true },
    ],
    grammarNote: 'Composed of 地下 (underground) + 鉄 (iron/railway).',
    replyJa: '東京の地下鉄は路線が多くて便利ですが、迷いやすいので路線図を確認しましょうね。',
    replyKana: 'とうきょうのちかてつはろせんがおおくてべんりですが、まよいやすいのでろせんずをかくにんしましょうね。',
    replyRomaji: 'Tōkyō no chikatetsu wa rosen ga ōkute benri desu ga, mayoi-yasui node rosenzu o kakunin shimashō ne.',
    replyEn: 'Tokyo\'s subway system is vast and convenient, but easy to get lost in, so check the transit map!',
    suggestedReplies: ['Where is the subway entrance?', 'Which line goes to Ginza?', 'Subway map, please'],
  },
  hotel: {
    kanji: 'ホテル',
    kana: 'ほてる',
    romaji: 'Hoteru',
    pos: 'noun',
    meaning: 'hotel',
    jlpt: 'N5',
    ruby: [{ text: 'ホテル', isKanji: false }],
    grammarNote: 'Western-style hotel is ホテル. A traditional Japanese inn with tatami mats and hot springs is 旅館 (ryokan).',
    replyJa: 'チェックインや荷物の預かりなど、ホテルで使いたいフレーズはありますか？',
    replyKana: 'ちぇっくいんやにもつのあずかりなど、ほてるでつくりたいふれーずはありますか？',
    replyRomaji: 'Chekku-in ya nimotsu no azukari nado, hoteru de tsukaitai furēzu wa arimasu ka?',
    replyEn: 'Are there phrases you want to practice for the hotel, such as check-in or luggage storage?',
    suggestedReplies: ['Check in, please', 'Can I leave my luggage?', 'Where is the breakfast room?'],
  },
  bathroom: {
    kanji: 'お手洗い（トイレ）',
    kana: 'おてあらい（といれ）',
    romaji: 'Otearai (toire)',
    pos: 'noun',
    meaning: 'restroom / bathroom',
    jlpt: 'N5',
    ruby: [
      { text: 'お', isKanji: false },
      { text: '手洗', reading: 'てあら', isKanji: true },
      { text: 'い（トイレ）', isKanji: false },
    ],
    grammarNote: 'お手洗い (literally "honorable hand-washing place") is the most polite phrasing. トイレ (toire) is completely normal and widely understood.',
    replyJa: '「お手洗いはどこですか？」と聞けば、誰でも親切に教えてくれますよ！',
    replyKana: '「おてあらいはどこですか？」ときけば、だれでもしんせつにおしえてくれますよ！',
    replyRomaji: '"Otearai wa doko desu ka?" to kikeba, dare demo shinsetsu ni oshiete kuremasu yo!',
    replyEn: 'If you ask: "Otearai wa doko desu ka?", anyone will kindly point the way!',
    suggestedReplies: ['Where is the bathroom?', 'Is it on this floor?', 'Thank you for showing me'],
  },
  toilet: {
    kanji: 'トイレ',
    kana: 'といれ',
    romaji: 'Toire',
    pos: 'noun',
    meaning: 'toilet / restroom',
    jlpt: 'N5',
    ruby: [{ text: 'トイレ', isKanji: false }],
    grammarNote: 'Borrowing from French/English "toilette". Japan\'s high-tech washlet toilets with warm seats are famous worldwide!',
    replyJa: '日本のハイテクトイレはお尻洗浄や温水便座があって快適ですよ。使ってみましたか？',
    replyKana: 'にほんのはいてくといれはおしりせんじょうやおんすいべんざがあってかいてきですよ。つかってみましたか？',
    replyRomaji: 'Nihon no haiteku toire wa oshiri senjō ya onsui benza ga atte kaiteki desu yo. Tsukatte mimashita ka?',
    replyEn: 'Japanese high-tech bidet toilets have heated seats and spray functions. Have you tried one?',
    suggestedReplies: ['Where is the toilet?', 'How do I flush it?', 'Thank you'],
  },
  airport: {
    kanji: '空港',
    kana: 'くうこう',
    romaji: 'Kūkō',
    pos: 'noun',
    meaning: 'airport',
    jlpt: 'N5',
    ruby: [
      { text: '空港', reading: 'くうこう', isKanji: true },
    ],
    grammarNote: 'Composed of 空 (sky) + 港 (harbor/port) = "sky port"!',
    replyJa: '成田空港ですか？それとも羽田空港ですか？どちらも都心へ電車でアクセスできますよ。',
    replyKana: 'なりたくうこうですか？それともはねだくうこうですか？どちらもとしんへでんしゃであくせすできますよ。',
    replyRomaji: 'Narita kūkō desu ka? Soretomo Haneda kūkō desu ka? Dochira mo toshin e densha de akusesu dekimasu yo.',
    replyEn: 'Are you using Narita or Haneda Airport? Both offer direct train access to central Tokyo.',
    suggestedReplies: ['Haneda Airport, please', 'How to get to Narita Airport?', 'Where is the train to the airport?'],
  },
  taxi: {
    kanji: 'タクシー',
    kana: 'たくしー',
    romaji: 'Takushī',
    pos: 'noun',
    meaning: 'taxi',
    jlpt: 'N5',
    ruby: [{ text: 'タクシー', isKanji: false }],
    grammarNote: 'Fun fact: In Japan, taxi passenger doors open and close automatically! Don\'t pull the door yourself.',
    replyJa: '日本のタクシーのドアは自動で開きますよ！どこまで行きたいですか？',
    replyKana: 'にほんのたくしーのどあはじどうであきますよ！どこまでいきたいですか？',
    replyRomaji: 'Nihon no takushī no doa wa jidō de akimasu yo! Doko made ikitai desu ka?',
    replyEn: 'Japanese taxi rear doors open and close automatically! Where would you like to be taken?',
    suggestedReplies: ['To the hotel, please', 'To Tokyo Station, please', 'How much to Shinjuku?'],
  },
  ticket: {
    kanji: '切符',
    kana: 'きっぷ',
    romaji: 'Kippu',
    pos: 'noun',
    meaning: 'ticket (train, transit)',
    jlpt: 'N5',
    ruby: [
      { text: '切符', reading: 'きっぷ', isKanji: true },
    ],
    grammarNote: '切符 usually refers to transport tickets. Event or movie tickets are often called チケット (chiketto).',
    replyJa: '券売機（けんばいき）で切符を買う時は、画面で「English」も選べますよ。',
    replyKana: 'けんばいきできっぷをかうときは、がめんで「English」もえらべますよ。',
    replyRomaji: 'Kembaiki de kippu o kau toki wa, gamen de "English" mo erabemasu yo.',
    replyEn: 'When buying tickets at the ticket machine, you can select "English" on the touch screen!',
    suggestedReplies: ['One ticket to Kyoto, please', 'Round trip ticket', 'Where is the ticket gate?'],
  },
  japan: {
    kanji: '日本',
    kana: 'にほん / にっぽん',
    romaji: 'Nihon / Nippon',
    pos: 'proper noun',
    meaning: 'Japan (Land of the Rising Sun)',
    jlpt: 'N5',
    ruby: [
      { text: '日本', reading: 'にほん', isKanji: true },
    ],
    grammarNote: 'Written with 日 (sun) and 本 (origin/source), hence "Land of the Rising Sun". Both Nihon and Nippon are correct.',
    replyJa: '日本の文化や言葉に興味を持ってくれて、先生は本当に嬉しいです！',
    replyKana: 'にほんのぶんかやことばにきょうみをもってくれて、せんせいはほんとうにうれしいです！',
    replyRomaji: 'Nihon no bunka ya kotoba ni kyōmi o motte kurete, sensei wa hontō ni ureshii desu!',
    replyEn: 'As your Sensei, I am so delighted that you are interested in Japan\'s culture and language!',
    suggestedReplies: ['I want to visit Japan', 'I love anime and Japanese culture', 'Teach me more Japanese!'],
  },
  tokyo: {
    kanji: '東京',
    kana: 'とうきょう',
    romaji: 'Tōkyō',
    pos: 'proper noun',
    meaning: 'Tokyo (Eastern Capital)',
    jlpt: 'N5',
    ruby: [
      { text: '東京', reading: 'とうきょう', isKanji: true },
    ],
    grammarNote: 'Composed of 東 (East) + 京 (Capital). It became Japan\'s capital in 1868, previously called Edo (江戸).',
    replyJa: '東京には渋谷、新宿、秋葉原、浅草など面白い街がたくさんありますよ！どこに行きたいですか？',
    replyKana: 'とうきょうにはしぶや、しんじゅく、あきはばら、あさくさなどおもしろいまちがたくさんありますよ！どこにいきたいですか？',
    replyRomaji: 'Tōkyō ni wa Shibuya, Shinjuku, Akihabara, Asakusa nado omoshiroi machi ga takusan arimasu yo! Doko ni ikitai desu ka?',
    replyEn: 'Tokyo has so many vibrant neighborhoods: Shibuya, Shinjuku, Akihabara, and Asakusa! Where do you want to visit?',
    suggestedReplies: ['I want to see Shibuya Crossing', 'Visiting temples in Asakusa', 'Akihabara electronics town'],
  },
  kyoto: {
    kanji: '京都',
    kana: 'きょうと',
    romaji: 'Kyōto',
    pos: 'proper noun',
    meaning: 'Kyoto (Capital City)',
    jlpt: 'N5',
    ruby: [
      { text: '京都', reading: 'きょうと', isKanji: true },
    ],
    grammarNote: 'Japan\'s historic imperial capital for over a millennium. Famous for thousands of classical Buddhist temples and Shinto shrines.',
    replyJa: '京都の金閣寺や清水寺は息をのむほど美しいですよ。ぜひ着物を着て散策してみてください！',
    replyKana: 'きょうとのきんかくじやきよみずでらはいきをのむほどうつくしいですよ。ぜひきものをきてさんさくしてみてください！',
    replyRomaji: 'Kyōto no Kinkaku-ji ya Kiyomizu-dera wa iki o nomu hodo utsukushii desu yo. Zehi kimono o kite sansaku shite mite kudasai!',
    replyEn: 'Kyoto\'s Golden Pavilion and Kiyomizu-dera are breathtaking. Strolling around in a kimono is an unforgettable experience!',
    suggestedReplies: ['I want to see the Golden Pavilion', 'Visiting traditional shrines', 'Taking the bullet train to Kyoto'],
  },

  // --- Shopping & Numbers ---
  money: {
    kanji: 'お金',
    kana: 'おかね',
    romaji: 'Okane',
    pos: 'noun',
    meaning: 'money (polite form)',
    jlpt: 'N5',
    ruby: [
      { text: 'お', isKanji: false },
      { text: '金', reading: 'かね', isKanji: true },
    ],
    grammarNote: 'Adding お- is standard polite usage. 金 also means "gold" or "metal", as in 金曜日 (Friday).',
    replyJa: '日本では現金と電子マネーの両方を使えますよ。両替（りょうがえ）は必要ですか？',
    replyKana: 'にほんではげんきんとでんしまねーのりょうほうをつかえますよ。りょうがえはひつようですか？',
    replyRomaji: 'Nihon de wa genkin to denshi manē no ryōhō o tsukaemasu yo. Ryōgae wa hitsuyō desu ka?',
    replyEn: 'Both cash and electronic payments are widely used in Japan. Do you need currency exchange?',
    suggestedReplies: ['Where is an ATM?', 'Can I use a credit card?', 'How much yen is that?'],
  },
  yen: {
    kanji: '円',
    kana: 'えん',
    romaji: 'En',
    pos: 'noun',
    meaning: 'yen (currency of Japan)',
    jlpt: 'N5',
    ruby: [{ text: '円', reading: 'えん', isKanji: true }],
    grammarNote: 'The kanji 円 means "circle / round"! In English we write "yen", but in Japanese it is pronounced purely as えん (en).',
    replyJa: '100円ショップ（ダイソーやセリア）は安くて便利で楽しいですよ！行ってみましたか？',
    replyKana: 'ひゃくえんしょっぷ（だいそーやせりあ）はやすくてべんりでたのしいですよ！いってみましたか？',
    replyRomaji: 'Hyaku-en shoppu (Daisō ya Seria) wa yasukute benri de tanoshii desu yo! Itte mimashita ka?',
    replyEn: '100-yen shops like Daiso and Seria are affordable, practical, and so much fun! Have you visited one?',
    suggestedReplies: ['I want to visit a 100-yen shop', 'How much is 1,000 yen?', 'Souvenirs for family'],
  },
  expensive: {
    kanji: '高い',
    kana: 'たかい',
    romaji: 'Takai',
    pos: 'i-adjective',
    meaning: 'expensive / tall / high',
    jlpt: 'N5',
    ruby: [
      { text: '高', reading: 'たか', isKanji: true },
      { text: 'い', isKanji: false },
    ],
    grammarNote: '高い has two main meanings: 1) expensive in price, 2) physically tall/high (like 富士山は高い Mount Fuji is high).',
    replyJa: '少し高すぎますか？「もう少し安いものはありますか？」と聞いてみましょう！',
    replyKana: 'すこしたかすぎますか？「もうすこしやすいものはありますか？」ときいてみましょう！',
    replyRomaji: 'Sukoshi taka-sugimasu ka? "Mō sukoshi yasui mono wa arimasu ka?" to kiite mimashō!',
    replyEn: 'Is it a bit too expensive? Try asking: "Do you have something a bit cheaper?"',
    suggestedReplies: ['A little cheaper, please', 'Do you have a discount?', 'Too expensive'],
  },
  cheap: {
    kanji: '安い',
    kana: 'やすい',
    romaji: 'Yasui',
    pos: 'i-adjective',
    meaning: 'cheap / inexpensive / peaceful',
    jlpt: 'N5',
    ruby: [
      { text: '安', reading: 'やす', isKanji: true },
      { text: 'い', isKanji: false },
    ],
    grammarNote: 'The kanji depicts a woman (女) peacefully under a roof (宀). Opposite of 高い (expensive).',
    replyJa: '安くて良い品を見つけると嬉しいですよね！お買い得です。',
    replyKana: 'やすくてよいしなをみつけるとうれしいですよね！おかいどくです。',
    replyRomaji: 'Yasukute yoi shina o mitsukeru to ureshii desu yo ne! O-kaidoku desu.',
    replyEn: 'Finding high-quality goods at an affordable price feels so satisfying! A great bargain.',
    suggestedReplies: ['Very cheap!', 'I will buy this', 'Thank you'],
  },

  // --- People, Pronouns & Everyday Objects ---
  friend: {
    kanji: '友達',
    kana: 'ともだち',
    romaji: 'Tomodachi',
    pos: 'noun',
    meaning: 'friend',
    jlpt: 'N5',
    ruby: [
      { text: '友', reading: 'とも', isKanji: true },
      { text: '達', reading: 'だち', isKanji: true },
    ],
    grammarNote: '友 means friendship, and 達 is a plural suffix that became lexicalized into the singular word "friend"!',
    replyJa: '先生とも友達として何でも日本語でおしゃべりしてくださいね！',
    replyKana: 'せんせいともともだちとしてなんでもにほんごでおしゃべりしてくださいね！',
    replyRomaji: 'Sensei to mo tomodachi toshite nan demo nihongo de oshaberi shite kudasai ne!',
    replyEn: 'You can chat with me just like a friend in Japanese anytime!',
    suggestedReplies: ['My friend is traveling with me', 'I want Japanese friends', 'Let\'s talk more!'],
  },
  family: {
    kanji: '家族',
    kana: 'かぞく',
    romaji: 'Kazoku',
    pos: 'noun',
    meaning: 'family',
    jlpt: 'N5',
    ruby: [
      { text: '家族', reading: 'かぞく', isKanji: true },
    ],
    grammarNote: '家 (house/home) + 族 (tribe/clan) = family. When speaking respectfully of someone else\'s family, say ご家族 (go-kazoku).',
    replyJa: 'ご家族は何人いらっしゃいますか？家族のお話もぜひ聞かせてください。',
    replyKana: 'ごかぞくはなんにんいらっしゃいますか？かぞくのおはなしもぜひきかせてください。',
    replyRomaji: 'Go-kazoku wa nannin irasshaimasu ka? Kazoku no ohanashi mo zehi kikasete kudasai.',
    replyEn: 'How many people are in your family? I would love to hear about them.',
    suggestedReplies: ['I have four in my family', 'My parents and brother', 'I live with my family'],
  },
  book: {
    kanji: '本',
    kana: 'ほん',
    romaji: 'Hon',
    pos: 'noun',
    meaning: 'book',
    jlpt: 'N5',
    ruby: [{ text: '本', reading: 'ほん', isKanji: true }],
    grammarNote: 'The kanji depicts a tree (木) with a line marking its root (source). It also functions as a counter for cylindrical items (pens, bottles)!',
    replyJa: '日本の漫画や小説、どんな本を読むのが好きですか？',
    replyKana: 'にほんのまんがやしょうせつ、どんなほんをよむのがすきですか？',
    replyRomaji: 'Nihon no manga ya shōsetsu, donna hon o yomu no ga suki desu ka?',
    replyEn: 'What kind of Japanese books or manga do you enjoy reading?',
    suggestedReplies: ['I love reading manga', 'Japanese grammar books', 'Novels and stories'],
  },
  cat: {
    kanji: '猫',
    kana: 'ねこ',
    romaji: 'Neko',
    pos: 'noun',
    meaning: 'cat',
    jlpt: 'N5',
    ruby: [{ text: '猫', reading: 'ねこ', isKanji: true }],
    grammarNote: 'Cats are celebrated throughout Japanese culture, like the famous 招き猫 (maneki-neko, beckoning cat for good luck) and cat cafés!',
    replyJa: '猫ちゃん、可愛いですよね！日本には猫カフェがたくさんありますよ。行ってみますか？',
    replyKana: 'ねこちゃん、かわいいですよね！にほんにはねこかふぇがたくさんありますよ。いってみますか？',
    replyRomaji: 'Neko-chan, kawaii desu yo ne! Nihon ni wa neko-kafe ga takusan arimasu yo. Itte mimasu ka?',
    replyEn: 'Cats are so adorable! Japan has many cat cafés. Would you like to visit one?',
    suggestedReplies: ['I want to visit a cat café', 'I have a cat at home', 'Cats are so cute!'],
  },
  dog: {
    kanji: '犬',
    kana: 'いぬ',
    romaji: 'Inu',
    pos: 'noun',
    meaning: 'dog',
    jlpt: 'N5',
    ruby: [{ text: '犬', reading: 'いぬ', isKanji: true }],
    grammarNote: 'Japan\'s native breeds include the famous 柴犬 (Shiba Inu) and 秋田犬 (Akita Inu, like faithful Hachiko at Shibuya Station)!',
    replyJa: '渋谷駅のハチ公の銅像を知っていますか？とても忠実な秋田犬の物語ですよ。',
    replyKana: 'しぶやえきのハチこうのどうぞうをしっていますか？とてもちゅうじつなあきたいぬのものがたりですよ。',
    replyRomaji: 'Shibuya-eki no Hachikō no dōzō o shitte imasu ka? Totemo chūjitsu na Akita-inu no monogatari desu yo.',
    replyEn: 'Do you know the Hachiko statue at Shibuya Station? It is the heartwarming story of a faithful dog!',
    suggestedReplies: ['I want to see Hachiko', 'Shiba Inu dogs are cute', 'I love dogs'],
  },
  car: {
    kanji: '車',
    kana: 'くるま',
    romaji: 'Kuruma',
    pos: 'noun',
    meaning: 'car / automobile',
    jlpt: 'N5',
    ruby: [{ text: '車', reading: 'くるま', isKanji: true }],
    grammarNote: 'The kanji looks like an overhead chariot with two wheels. In compound words, pronounced sha, as in 電車 (densha, train).',
    replyJa: '日本では左側を通行して運転しますよ。レンタカーを借りてドライブしますか？',
    replyKana: 'にほんではひだりがわをつうこうしてうんてんしますよ。れんたかーをかりてどらいぶしますか？',
    replyRomaji: 'Nihon de wa hidarigawa o tsūkō shite unten shimasu yo. Rentakā o karite doraibu shimasu ka?',
    replyEn: 'In Japan, cars drive on the left side of the road. Would you like to rent a car for a road trip?',
    suggestedReplies: ['Can I rent a car?', 'Where is the taxi stand?', 'I prefer trains'],
  },
  phone: {
    kanji: '電話（スマホ）',
    kana: 'でんわ（すまほ）',
    romaji: 'Denwa (sumaho)',
    pos: 'noun',
    meaning: 'telephone / smartphone',
    jlpt: 'N5',
    ruby: [
      { text: '電話', reading: 'でんわ', isKanji: true },
      { text: '（スマホ）', isKanji: false },
    ],
    grammarNote: '電話 = electric speech (telephone). A modern smartphone is almost always called スマホ (sumaho), short for スマートフォン.',
    replyJa: '旅行中はスマホの翻訳アプリや地図アプリがあると安心ですね。',
    replyKana: 'りょこうちゅうはすまほのほんやくあぷりやちずあぷりがあるとあんしんですね。',
    replyRomaji: 'Ryokō-chū wa sumaho no hon\'yaku apuri ya chizu apuri ga aru to anshin desu ne.',
    replyEn: 'Having translation and map apps on your smartphone gives peace of mind while traveling.',
    suggestedReplies: ['Where can I get a SIM card?', 'Is there free Wi-Fi?', 'Charge my phone, please'],
  },
  house: {
    kanji: '家',
    kana: 'いえ / うち',
    romaji: 'Ie / Uchi',
    pos: 'noun',
    meaning: 'house / home',
    jlpt: 'N5',
    ruby: [{ text: '家', reading: 'いえ', isKanji: true }],
    grammarNote: '家 (ie) refers to the physical house. うち (uchi) refers warmly to "my home / my household".',
    replyJa: '日本の家に入る時は、玄関（げんかん）で靴を脱ぐのが大切なマナーですよ。',
    replyKana: 'にほんのいえにはいるときは、げんかんでくつをぬぐのがたいせつなまなーですよ。',
    replyRomaji: 'Nihon no ie ni hairu toki wa, genkan de kutsu o nugu no ga taisetsu na manā desu yo.',
    replyEn: 'When entering a Japanese house, taking off your shoes at the entryway (genkan) is an essential custom!',
    suggestedReplies: ['I understand', 'Traditional Japanese house', 'Tatami mat rooms'],
  },

  // --- Common Adjectives & States ---
  happy: {
    kanji: '嬉しいです！',
    kana: 'うれしいです！',
    romaji: 'Ureshii desu!',
    pos: 'i-adjective',
    meaning: 'happy / glad',
    jlpt: 'N5',
    ruby: [
      { text: '嬉', reading: 'うれ', isKanji: true },
      { text: 'しいです！', isKanji: false },
    ],
    grammarNote: '嬉しい expresses internal gladness or joyful relief. 楽しい (tanoshii) expresses that an activity is fun.',
    replyJa: 'そう言ってもらえて、私もとても嬉しいです！楽しい時間を過ごしましょう。',
    replyKana: 'そういってもらえて、わたしもとてもうれしいです！たのしいじかんをすごしましょう。',
    replyRomaji: 'Sō itte moraete, watashi mo totemo ureshii desu! Tanoshii jikan o sugoshimashō.',
    replyEn: 'Hearing you say that makes me so happy as well! Let\'s have a great time together.',
    suggestedReplies: ['I enjoy learning Japanese', 'Thank you Sensei', 'What is next?'],
  },
  beautiful: {
    kanji: '綺麗！',
    kana: 'きれい！',
    romaji: 'Kirei!',
    pos: 'na-adjective',
    meaning: 'beautiful / pretty / clean',
    jlpt: 'N5',
    ruby: [
      { text: '綺麗', reading: 'きれい', isKanji: true },
      { text: '！', isKanji: false },
    ],
    grammarNote: '綺麗 is a na-adjective (綺麗なお花 = pretty flowers). It means both "visually gorgeous" and "spotlessly clean".',
    replyJa: '桜の季節や紅葉の日本は本当に綺麗ですよ！景色を見に行きたいですね。',
    replyKana: 'さくらのきせつやこうようのにほんはほんとうにきれいですよ！けしきをみにいきたいですね。',
    replyRomaji: 'Sakura no kisetsu ya kōyō no Nihon wa hontō ni kirei desu yo! Keshiki o mi ni ikitai desu ne.',
    replyEn: 'Japan during cherry blossom or autumn foliage seasons is truly breathtaking! I\'d love for you to see the sights.',
    suggestedReplies: ['Cherry blossoms are beautiful', 'Mount Fuji is majestic', 'Very pretty!'],
  },
  cute: {
    kanji: '可愛い！',
    kana: 'かわいい！',
    romaji: 'Kawaii!',
    pos: 'i-adjective',
    meaning: 'cute / adorable',
    jlpt: 'N5',
    ruby: [
      { text: '可愛', reading: 'かわい', isKanji: true },
      { text: 'い！', isKanji: false },
    ],
    grammarNote: 'One of the most famous Japanese cultural words worldwide! Used for animals, fashion, characters, and friendly demeanor.',
    replyJa: '「カワイイ」は世界中で通じる日本語ですね！サンリオやアニメのキャラクターもお好きですか？',
    replyKana: '「かわいい」はせかいじゅうでつうじるにほんごですね！さんりおやあにめのきゃらくたーもおすきですか？',
    replyRomaji: '"Kawaii" wa sekaijū de tsūjiru nihongo desu ne! Sanrio ya anime no kyarakutā mo o-suki desu ka?',
    replyEn: '"Kawaii" is recognized across the world! Do you like Sanrio or anime characters too?',
    suggestedReplies: ['I love Pikachu', 'Sanrio characters are cute', 'So cute!'],
  },
  hot: {
    kanji: '暑い / 熱い',
    kana: 'あつい',
    romaji: 'Atsui',
    pos: 'i-adjective',
    meaning: 'hot (weather: 暑い, touch/food: 熱い)',
    jlpt: 'N5',
    ruby: [
      { text: '暑', reading: 'あつ', isKanji: true },
      { text: 'い', isKanji: false },
    ],
    grammarNote: 'Japanese distinguishes kanji: 暑い is for hot weather/climate, while 熱い is for hot food, water, or heated objects!',
    replyJa: '暑い時は冷たい麦茶やかき氷が一番ですね！水分をしっかり取りましょう。',
    replyKana: 'あついときはつめたいむぎちゃやかきごおりがいちばんですね！すいぶんをしっかりとりましょう。',
    replyRomaji: 'Atsui toki wa tsumetai mugicha ya kakigōri ga ichiban desu ne! Suibun o shikkari torimashō.',
    replyEn: 'When it\'s hot, cold barley tea or shaved ice hits the spot! Be sure to stay hydrated.',
    suggestedReplies: ['Cold water, please', 'Today is very hot', 'Let\'s get shaved ice'],
  },
  cold: {
    kanji: '寒い / 冷たい',
    kana: 'さむい / つめたい',
    romaji: 'Samui / Tsumetai',
    pos: 'i-adjective',
    meaning: 'cold (weather: 寒い, touch/drinks: 冷たい)',
    jlpt: 'N5',
    ruby: [
      { text: '寒', reading: 'さむ', isKanji: true },
      { text: 'い', isKanji: false },
    ],
    grammarNote: 'Notice the difference: 寒い (samui) is for cold weather and air. 冷たい (tsumetai) is for cold drinks or objects you touch.',
    replyJa: '寒い日は温かいラーメンやお鍋が恋しくなりますね。温まりましょう！',
    replyKana: 'さむいひはあたたかいらーめんやおなべがこいしくなりますね。あたたまりましょう！',
    replyRomaji: 'Samui hi wa atatakai rāmen ya o-nabe ga koishiku narimasu ne. Atatamarimashō!',
    replyEn: 'On cold days, hot ramen or hotpot soup is so comforting. Let\'s warm up!',
    suggestedReplies: ['Hot tea, please', 'It is freezing today', 'Hot ramen sounds great'],
  },
  love: {
    kanji: '大好きです！',
    kana: 'だいすきです！',
    romaji: 'Daisuki desu!',
    pos: 'na-adjective',
    meaning: 'I love it / I really like it',
    jlpt: 'N5',
    ruby: [
      { text: '大好', reading: 'だいす', isKanji: true },
      { text: 'きです！', isKanji: false },
    ],
    grammarNote: 'In Japanese, instead of heavy romantic word 愛 (ai), people use 大好き (daisuki) for favorite foods, hobbies, anime, and loved ones!',
    replyJa: '日本のどんなところが好きですか？アニメ？食べ物？文化？',
    replyKana: 'にほんのどんなところがすきですか？あにめ？たべもの？ぶんか？',
    replyRomaji: 'Nihon no donna tokoro ga suki desu ka? Anime? Tabemono? Bunka?',
    replyEn: 'What do you love most about Japan? The anime? The food? The culture?',
    suggestedReplies: ['I love Japanese food', 'I love anime and manga', 'The beautiful culture'],
  },
};

/**
 * Phonetic transliteration from English text into Katakana loanwords
 */
export function englishToKatakana(englishWord: string): string {
  const w = englishWord.toLowerCase().trim();

  // Known loanword dictionary
  const commonLoanwords: Record<string, string> = {
    coffee: 'コーヒー',
    latte: 'ラテ',
    tea: 'ティー',
    cola: 'コーラ',
    juice: 'ジュース',
    beer: 'ビール',
    wine: 'ワイン',
    whiskey: 'ウイスキー',
    pizza: 'ピザ',
    burger: 'ハンバーガー',
    hamburger: 'ハンバーガー',
    sandwich: 'サンドイッチ',
    salad: 'サラダ',
    soup: 'スープ',
    pasta: 'パスタ',
    spaghetti: 'スパゲッティ',
    steak: 'ステーキ',
    curry: 'カレー',
    chocolate: 'チョコレート',
    cake: 'ケーキ',
    icecream: 'アイスクリーム',
    'ice cream': 'アイスクリーム',
    dessert: 'デザート',
    hotel: 'ホテル',
    taxi: 'タクシー',
    bus: 'バス',
    train: 'トレイン',
    ticket: 'チケット',
    passport: 'パスポート',
    station: 'ステーション',
    airport: 'エアポート',
    camera: 'カメラ',
    computer: 'コンピューター',
    pc: 'パソコン',
    laptop: 'ノートパソコン',
    phone: 'スマートフォン',
    smartphone: 'スマホ',
    internet: 'インターネット',
    wifi: 'ワイファイ',
    app: 'アプリ',
    game: 'ゲーム',
    tv: 'テレビ',
    radio: 'ラジオ',
    music: 'ミュージック',
    guitar: 'ギター',
    piano: 'ピアノ',
    rock: 'ロック',
    jazz: 'ジャズ',
    pop: 'ポップ',
    anime: 'アニメ',
    manga: 'マンガ',
    cosplay: 'コスプレ',
    card: 'カード',
    credit: 'クレジット',
    shopping: 'ショッピング',
    supermarket: 'スーパー',
    convenience: 'コンビニ',
    department: 'デパート',
    bag: 'バッグ',
    shirt: 'シャツ',
    tshirt: 'Tシャツ',
    pants: 'パンツ',
    shoes: 'シューズ',
    jacket: 'ジャケット',
    coat: 'コート',
    hat: 'ハット',
    cap: 'キャップ',
    glasses: 'グラス',
    ring: 'リング',
    present: 'プレゼント',
    gift: 'ギフト',
    souvenir: 'お土産',
    tokyo: 'トウキョウ',
    kyoto: 'キョウト',
    osaka: 'オオサカ',
    america: 'アメリカ',
    canada: 'カナダ',
    england: 'イギリス',
    australia: 'オーストラリア',
    france: 'フランス',
    germany: 'ドイツ',
    italy: 'イタリア',
    spain: 'スペイン',
    china: 'チュウゴク',
    korea: 'カンコク',
  };

  if (commonLoanwords[w]) {
    return commonLoanwords[w];
  }

  // Phonetic rule-based approximation
  let s = w;
  const replacements: [RegExp, string][] = [
    [/sha/g, 'シャ'], [/she/g, 'シェ'], [/shi/g, 'シ'], [/sho/g, 'ショ'], [/shu/g, 'シュ'],
    [/cha/g, 'チャ'], [/che/g, 'チェ'], [/chi/g, 'チ'], [/cho/g, 'チョ'], [/chu/g, 'チュ'],
    [/tsa/g, 'ツァ'], [/tse/g, 'ツェ'], [/tsi/g, 'ツィ'], [/tso/g, 'ツォ'], [/tsu/g, 'ツ'],
    [/tion\b/g, 'ション'],
    [/sion\b/g, 'ジョン'],
    [/ment\b/g, 'メント'],
    [/ing\b/g, 'イング'],
    [/er\b/g, 'アー'],
    [/or\b/g, 'オール'],
    [/th/g, 'ス'],
    [/ph/g, 'フ'],
    [/ck/g, 'ック'],
    [/qu/g, 'ク'],
    [/ee/g, 'イー'],
    [/oo/g, 'ウー'],
    [/ea/g, 'イー'],
    [/ai/g, 'アイ'],
    [/ay/g, 'エイ'],
    [/ou/g, 'アウ'],
    [/ow/g, 'オウ'],
    [/ka/g, 'カ'], [/ki/g, 'キ'], [/ku/g, 'ク'], [/ke/g, 'ケ'], [/ko/g, 'コ'],
    [/sa/g, 'サ'], [/si/g, 'シ'], [/su/g, 'ス'], [/se/g, 'セ'], [/so/g, 'ソ'],
    [/ta/g, 'タ'], [/ti/g, 'ティ'], [/tu/g, 'チュ'], [/te/g, 'テ'], [/to/g, 'ト'],
    [/na/g, 'ナ'], [/ni/g, 'ニ'], [/nu/g, 'ヌ'], [/ne/g, 'ネ'], [/no/g, 'ノ'],
    [/ha/g, 'ハ'], [/hi/g, 'ヒ'], [/hu/g, 'フ'], [/he/g, 'ヘ'], [/ho/g, 'ホ'],
    [/ma/g, 'マ'], [/mi/g, 'ミ'], [/mu/g, 'ム'], [/me/g, 'メ'], [/mo/g, 'モ'],
    [/ya/g, 'ヤ'], [/yu/g, 'ユ'], [/yo/g, 'ヨ'],
    [/ra/g, 'ラ'], [/ri/g, 'リ'], [/ru/g, 'ル'], [/re/g, 'レ'], [/ro/g, 'ロ'],
    [/la/g, 'ラ'], [/li/g, 'リ'], [/lu/g, 'ル'], [/le/g, 'レ'], [/lo/g, 'ロ'],
    [/wa/g, 'ワ'], [/wo/g, 'ウォ'],
    [/ga/g, 'ガ'], [/gi/g, 'ギ'], [/gu/g, 'グ'], [/ge/g, 'ゲ'], [/go/g, 'ゴ'],
    [/za/g, 'ザ'], [/zi/g, 'ジ'], [/zu/g, 'ズ'], [/ze/g, 'ゼ'], [/zo/g, 'ゾ'],
    [/da/g, 'ダ'], [/di/g, 'ディ'], [/du/g, 'ドゥ'], [/de/g, 'デ'], [/do/g, 'ド'],
    [/ba/g, 'バ'], [/bi/g, 'ビ'], [/bu/g, 'ブ'], [/be/g, 'ベ'], [/bo/g, 'ボ'],
    [/pa/g, 'パ'], [/pi/g, 'ピ'], [/pu/g, 'プ'], [/pe/g, 'ペ'], [/po/g, 'ポ'],
    [/va/g, 'ヴァ'], [/vi/g, 'ヴィ'], [/vu/g, 'ヴ'], [/ve/g, 'ヴェ'], [/vo/g, 'ヴォ'],
    [/fa/g, 'ファ'], [/fi/g, 'フィ'], [/fu/g, 'フ'], [/fe/g, 'フェ'], [/fo/g, 'フォ'],
    [/a/g, 'ア'], [/i/g, 'イ'], [/u/g, 'ウ'], [/e/g, 'エ'], [/o/g, 'オ'],
    [/k/g, 'ク'], [/s/g, 'ス'], [/t/g, 'ト'], [/n/g, 'ン'], [/h/g, 'フ'],
    [/m/g, 'ム'], [/r/g, 'ル'], [/l/g, 'ル'], [/b/g, 'ブ'], [/p/g, 'プ'],
    [/d/g, 'ド'], [/g/g, 'グ'], [/c/g, 'ク'], [/f/g, 'フ'], [/j/g, 'ジ'],
    [/v/g, 'ブ'], [/w/g, 'ウ'], [/x/g, 'クス'], [/y/g, 'イ'], [/z/g, 'ズ'],
  ];

  for (const [pattern, rep] of replacements) {
    s = s.replace(pattern, rep);
  }

  // Ensure result looks like katakana
  return s.replace(/[^ァ-ンー]/g, '') || englishWord;
}

/**
 * Universal dynamic translator that converts ANY English sentence or word into a rich Japanese mini-lesson
 */
export function translateLinguistically(englishInput: string, level: Level): Omit<RichMessage, 'id' | 'createdAt'> {
  const trimmed = englishInput.trim();
  const lower = trimmed.toLowerCase();
  const clean = lower.replace(/[?!.,'"]/g, '').trim();

  // 1. Direct vocabulary / phrase match from our curated lexicon
  if (LEXICON_ENTRIES[clean]) {
    const entry = LEXICON_ENTRIES[clean];
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: entry.kanji,
      kana: entry.kana,
      romaji: entry.romaji,
      english: entry.meaning,
      rubySegments: entry.ruby,
      breakdown: [
        {
          surface: entry.kanji.replace(/[!。？?]/g, ''),
          reading: entry.kana.replace(/[!。？?]/g, ''),
          romaji: entry.romaji.toLowerCase().replace(/[!。？?]/g, ''),
          pos: entry.pos,
          meaning: entry.meaning,
          jlpt: entry.jlpt,
        },
      ],
      grammarNote: entry.grammarNote,
      replyJapanese: entry.replyJa,
      replyKana: entry.replyKana,
      replyRomaji: entry.replyRomaji,
      replyEnglish: entry.replyEn,
      suggestedReplies: entry.suggestedReplies,
    };
  }

  // 2. Pattern Matching: Greetings & Courtesies
  if (/^(how are you|how are you doing|how is it going)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'お元気ですか？',
      kana: 'おげんきですか？',
      romaji: 'O-genki desu ka?',
      english: 'How are you?',
      rubySegments: [
        { text: 'お', isKanji: false },
        { text: '元気', reading: 'げんき', isKanji: true },
        { text: 'ですか？', isKanji: false },
      ],
      breakdown: [
        { surface: 'お元気', reading: 'おげんき', romaji: 'o-genki', pos: 'na-adjective', meaning: 'healthy / well (polite)', jlpt: 'N5' },
        { surface: 'ですか', reading: 'ですか', romaji: 'desu ka', pos: 'phrase', meaning: 'are you? (question)', jlpt: 'N5' },
      ],
      grammarNote: 'お元気ですか？ is the classic polite greeting. Adding the honorific prefix お- (o-) shows warmth and respect toward the other person.',
      replyJapanese: 'はい、おかげさまでとても元気です！あなたはいかがですか？',
      replyKana: 'はい、おかげさまでとてもげんきです！あなたはいかがですか？',
      replyRomaji: 'Hai, okagesama de totemo genki desu! Anata wa ikaga desu ka?',
      replyEnglish: 'Yes, thanks to you I am doing wonderfully! How about yourself?',
      suggestedReplies: ['I am doing great!', 'I am a little tired', 'I want to study Japanese'],
    };
  }

  if (/^(i am fine|i am good|i am doing well|i am great)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '元気です！',
      kana: 'げんきです！',
      romaji: 'Genki desu!',
      english: 'I am doing well / I am fine!',
      rubySegments: [
        { text: '元気', reading: 'げんき', isKanji: true },
        { text: 'です！', isKanji: false },
      ],
      breakdown: [
        { surface: '元気', reading: 'げんき', romaji: 'genki', pos: 'na-adjective', meaning: 'healthy / energetic / fine', jlpt: 'N5' },
        { surface: 'です', reading: 'です', romaji: 'desu', pos: 'copula', meaning: 'am / is (polite)', jlpt: 'N5' },
      ],
      grammarNote: 'In Japanese, 元気です (Genki desu) is the cheerful, natural reply to "how are you?". You can also preface it with はい (yes).',
      replyJapanese: '元気そうで何よりです！今日も楽しく日本語のレッスンを進めましょうね。',
      replyKana: 'げんきそうでなによりです！きょうもたのしくにほんごのれっすんをすすめましょうね。',
      replyRomaji: 'Genki-sō de nani yori desu! Kyō mo tanoshiku nihongo no ressun o susumemashō ne.',
      replyEnglish: 'Glad to hear you are doing well! Let\'s enjoy our Japanese lesson today.',
      suggestedReplies: ['Let\'s start!', 'Teach me restaurant phrases', 'How do you say delicious?'],
    };
  }

  if (/^(nice to meet you|pleased to meet you)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '初めまして、よろしくお願いします！',
      kana: 'はじめまして、よろしくおねがいします！',
      romaji: 'Hajimemashite, yoroshiku onegaishimasu!',
      english: 'Nice to meet you! Pleased to make your acquaintance.',
      rubySegments: [
        { text: '初', reading: 'はじ', isKanji: true },
        { text: 'めまして、よろしくお', isKanji: false },
        { text: '願', reading: 'ねが', isKanji: true },
        { text: 'いします！', isKanji: false },
      ],
      breakdown: [
        { surface: '初めまして', reading: 'はじめまして', romaji: 'hajimemashite', pos: 'phrase', meaning: 'nice to meet you (first time)', jlpt: 'N5' },
        { surface: 'よろしくお願いします', reading: 'よろしくおねがいします', romaji: 'yoroshiku onegaishimasu', pos: 'phrase', meaning: 'please treat me favorably', jlpt: 'N5' },
      ],
      grammarNote: '初めまして is said only the very first time you meet someone. よろしくお願いします is Japan\'s foundational phrase of mutual goodwill.',
      replyJapanese: 'こちらこそ初めまして！日本語の勉強、一緒に楽しく頑張りましょう！',
      replyKana: 'こちらこそはじめまして！にほんごのべんきょう、いっしょにたのしくがんばりましょう！',
      replyRomaji: 'Kochira koso hajimemashite! Nihongo no benkyō, issho ni tanoshiku gambarimashō!',
      replyEnglish: 'The pleasure is all mine! Let\'s have fun doing our best studying Japanese together!',
      suggestedReplies: ['What is your name?', 'I am learning Japanese', 'Where are you from?'],
    };
  }

  // 3. Pattern Matching: Self-introduction & Names
  const nameMatch = lower.match(/(?:my name is|i am|i'm)\s+([a-zA-Z]+)(?:\.|$)/i);
  if (nameMatch && !/^(hungry|thirsty|tired|happy|fine|good|ready)/i.test(nameMatch[1])) {
    const rawName = nameMatch[1];
    const kataName = englishToKatakana(rawName);
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `私の名前は${kataName}です。`,
      kana: `わたしのなまえは${kataName}です。`,
      romaji: `Watashi no namae wa ${rawName} desu.`,
      english: `My name is ${rawName}.`,
      rubySegments: [
        { text: '私', reading: 'わたし', isKanji: true },
        { text: 'の', isKanji: false },
        { text: '名前', reading: 'なまえ', isKanji: true },
        { text: `は${kataName}です。`, isKanji: false },
      ],
      breakdown: [
        { surface: '私', reading: 'わたし', romaji: 'watashi', pos: 'pronoun', meaning: 'I / me', jlpt: 'N5' },
        { surface: 'の', reading: 'の', romaji: 'no', pos: 'particle', meaning: 'possessive marker (my)', jlpt: 'N5' },
        { surface: '名前', reading: 'なまえ', romaji: 'namae', pos: 'noun', meaning: 'name', jlpt: 'N5' },
        { surface: 'は', reading: 'は', romaji: 'wa', pos: 'particle', meaning: 'topic marker', jlpt: 'N5' },
        { surface: kataName, reading: kataName, romaji: rawName.toLowerCase(), pos: 'proper noun', meaning: rawName, jlpt: 'N5' },
        { surface: 'です', reading: 'です', romaji: 'desu', pos: 'copula', meaning: 'am / is', jlpt: 'N5' },
      ],
      grammarNote: '私 (watashi) is "I", and の (no) creates possessives: 私の名前 (my name). Foreign names are always written in Katakana!',
      replyJapanese: `${kataName}さん、素敵な名前ですね！どうぞよろしくお願いします。`,
      replyKana: `${kataName}さん、すてきななまえですね！どうぞよろしくおねがいします。`,
      replyRomaji: `${rawName}-san, suteki na namae desu ne! Dōzo yoroshiku onegaishimasu.`,
      replyEnglish: `${rawName}-san, what a wonderful name! Very pleased to meet you.`,
      suggestedReplies: ['Where are you from?', 'I want to learn Japanese', 'How do you say thank you?'],
    };
  }

  // 4. Pattern Matching: Questions about name / origin
  if (/^(what is your name|what's your name|who are you)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'お名前は何ですか？',
      kana: 'おなまえはなんですか？',
      romaji: 'O-namae wa nan desu ka?',
      english: 'What is your name?',
      rubySegments: [
        { text: 'お', isKanji: false },
        { text: '名前', reading: 'なまえ', isKanji: true },
        { text: 'は', isKanji: false },
        { text: '何', reading: 'なん', isKanji: true },
        { text: 'ですか？', isKanji: false },
      ],
      breakdown: [
        { surface: 'お名前', reading: 'おなまえ', romaji: 'o-namae', pos: 'noun', meaning: 'name (polite)', jlpt: 'N5' },
        { surface: 'は', reading: 'は', romaji: 'wa', pos: 'particle', meaning: 'topic marker', jlpt: 'N5' },
        { surface: '何', reading: 'なん', romaji: 'nan', pos: 'interrogative', meaning: 'what', jlpt: 'N5' },
        { surface: 'ですか', reading: 'ですか', romaji: 'desu ka', pos: 'phrase', meaning: 'is it?', jlpt: 'N5' },
      ],
      grammarNote: 'お名前 (o-namae) includes the polite honorific prefix お-.何 (nan) means "what".',
      replyJapanese: '私は日本語の先生「日本語先生」です！あなたの名前もぜひ教えてくださいね。',
      replyKana: 'わたしはにほんごのせんせい「にほんごせんせい」です！あなたのなまえもぜひおしえてくださいね。',
      replyRomaji: 'Watashi wa nihongo no sensei "Nihongo Sensei" desu! Anata no namae mo zehi oshiete kudasai ne.',
      replyEnglish: 'I am your Japanese teacher, "Nihongo Sensei"! Please tell me your name as well.',
      suggestedReplies: ['My name is Alex', 'Nice to meet you', 'Where are you from?'],
    };
  }

  if (/^(where are you from|where do you come from)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'ご出身はどちらですか？',
      kana: 'ごしゅっしんはどちらですか？',
      romaji: 'Go-shusshin wa dochira desu ka?',
      english: 'Where are you from?',
      rubySegments: [
        { text: 'ご', isKanji: false },
        { text: '出身', reading: 'しゅっしん', isKanji: true },
        { text: 'はどちらですか？', isKanji: false },
      ],
      breakdown: [
        { surface: 'ご出身', reading: 'ごしゅっしん', romaji: 'go-shusshin', pos: 'noun', meaning: 'hometown / origin (polite)', jlpt: 'N5' },
        { surface: 'どちら', reading: 'どちら', romaji: 'dochira', pos: 'pronoun', meaning: 'where / which way (polite)', jlpt: 'N5' },
      ],
      grammarNote: 'どちら (dochira) is the polite equivalent of どこ (doko, where). ご出身 uses honorific ご- for the listener\'s background.',
      replyJapanese: '私は日本の東京から来ました！あなたの国や街についても教えてください。',
      replyKana: 'わたしはにほんのとうきょうからきました！あなたのくにやまちについてもおしえてください。',
      replyRomaji: 'Watashi wa Nihon no Tōkyō kara kimashita! Anata no kuni ya machi ni tsuite mo oshiete kudasai.',
      replyEnglish: 'I am from Tokyo, Japan! Please tell me about your home country or city too.',
      suggestedReplies: ['I am from America', 'I am from Canada', 'I am from England'],
    };
  }

  if (/^(do you speak english|can you speak english)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '英語を話せますか？',
      kana: 'えいごをはなせますか？',
      romaji: 'Eigo o hanasemasu ka?',
      english: 'Do you speak English? / Can you speak English?',
      rubySegments: [
        { text: '英語', reading: 'えいご', isKanji: true },
        { text: 'を', isKanji: false },
        { text: '話', reading: 'はな', isKanji: true },
        { text: 'せますか？', isKanji: false },
      ],
      breakdown: [
        { surface: '英語', reading: 'えいご', romaji: 'eigo', pos: 'noun', meaning: 'English language', jlpt: 'N5' },
        { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'object marker', jlpt: 'N5' },
        { surface: '話せますか', reading: 'はなせますか', romaji: 'hanasemasu ka', pos: 'verb', meaning: 'can you speak? (potential form)', jlpt: 'N5' },
      ],
      grammarNote: '話せる (hanaseru) is the potential form of 話す (hanasu, to speak). To ask someone if they can speak English politely, say: 英語を話せますか？',
      replyJapanese: 'はい、少し話せますよ！でも一緒に日本語で少しずつ話してみましょう！',
      replyKana: 'はい、すこしはなせますよ！でもいっしょににほんごですこしずつはなしてみましょう！',
      replyRomaji: 'Hai, sukoshi hanasemasu yo! Demo issho ni nihongo de sukoshi-zutsu hanashite mimashō!',
      replyEnglish: 'Yes, I can speak a little! But let\'s try practicing speaking in Japanese step-by-step together!',
      suggestedReplies: ['Please speak slowly', 'I don\'t understand', 'Thank you Sensei'],
    };
  }

  // 5. Pattern Matching: Food Ordering & Desires ("I want to eat / drink / go...")
  const wantEatMatch = lower.match(/(?:i want to eat|can i eat|let's eat|i'd like to eat)\s+(.+)/i);
  if (wantEatMatch) {
    const rawItem = wantEatMatch[1].replace(/,?\s*please\b/gi, '').replace(/[?!.]/g, '').trim();
    const itemEntry = LEXICON_ENTRIES[rawItem.toLowerCase()];
    const itemJa = itemEntry?.kanji || englishToKatakana(rawItem);
    const itemKana = itemEntry?.kana || itemJa;
    const itemRomaji = itemEntry?.romaji || rawItem;
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${itemJa}を食べたいです！`,
      kana: `${itemKana}をたべたいです！`,
      romaji: `${itemRomaji} o tabetai desu!`,
      english: `I want to eat ${rawItem}!`,
      rubySegments: [
        ...(itemEntry?.ruby || [{ text: itemJa, isKanji: false }]),
        { text: 'を', isKanji: false },
        { text: '食', reading: 'た', isKanji: true },
        { text: 'べたいです！', isKanji: false },
      ],
      breakdown: [
        { surface: itemJa, reading: itemKana, romaji: itemRomaji.toLowerCase(), pos: 'noun', meaning: rawItem, jlpt: 'N5' },
        { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'direct object marker', jlpt: 'N5' },
        { surface: '食べたい', reading: 'たべたい', romaji: 'tabetai', pos: 'verb', meaning: 'want to eat (-tai form)', jlpt: 'N5' },
        { surface: 'です', reading: 'です', romaji: 'desu', pos: 'copula', meaning: 'polite auxiliary', jlpt: 'N5' },
      ],
      grammarNote: 'Change the verb ending to 〜たい (tai) to express what you want to do: 食べる (to eat) → 食べたい (want to eat). を marks what you want to eat.',
      replyJapanese: `美味しそうですね！本場の${itemJa}は最高ですよ。どこで食べたいですか？`,
      replyKana: `おいしそうですね！ほんばの${itemKana}はさいこうですよ。どこでたべたいですか？`,
      replyRomaji: `Oishisō desu ne! Homba no ${itemRomaji} wa saikō desu yo. Doko de tabetai desu ka?`,
      replyEnglish: `That sounds delicious! Authentic ${rawItem} in Japan is amazing. Where would you like to eat it?`,
      suggestedReplies: ['Near Tokyo Station', 'Any good recommendation?', 'How much does it cost?'],
    };
  }

  const wantDrinkMatch = lower.match(/(?:i want to drink|can i drink|let's drink|i'd like to drink)\s+(.+)/i);
  if (wantDrinkMatch) {
    const rawDrink = wantDrinkMatch[1].replace(/,?\s*please\b/gi, '').replace(/[?!.]/g, '').trim();
    const drinkEntry = LEXICON_ENTRIES[rawDrink.toLowerCase()];
    const drinkJa = drinkEntry?.kanji || englishToKatakana(rawDrink);
    const drinkKana = drinkEntry?.kana || drinkJa;
    const drinkRomaji = drinkEntry?.romaji || rawDrink;
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${drinkJa}を飲みたいです！`,
      kana: `${drinkKana}をのみたいです！`,
      romaji: `${drinkRomaji} o nomitai desu!`,
      english: `I want to drink ${rawDrink}!`,
      rubySegments: [
        ...(drinkEntry?.ruby || [{ text: drinkJa, isKanji: false }]),
        { text: 'を', isKanji: false },
        { text: '飲', reading: 'の', isKanji: true },
        { text: 'みたいです！', isKanji: false },
      ],
      breakdown: [
        { surface: drinkJa, reading: drinkKana, romaji: drinkRomaji.toLowerCase(), pos: 'noun', meaning: rawDrink, jlpt: 'N5' },
        { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'direct object marker', jlpt: 'N5' },
        { surface: '飲みたい', reading: 'のみたい', romaji: 'nomitai', pos: 'verb', meaning: 'want to drink (-tai form)', jlpt: 'N5' },
        { surface: 'です', reading: 'です', romaji: 'desu', pos: 'copula', meaning: 'polite auxiliary', jlpt: 'N5' },
      ],
      grammarNote: '飲む (nomu, to drink) conjugates to 飲みたい (nomitai, want to drink). Use を (o) for the beverage you desire.',
      replyJapanese: `喉が渇きましたか？冷たい${drinkJa}はスッキリして美味しいですよ！`,
      replyKana: `のどがかわきましたか？つめたい${drinkKana}はすっきりしておいしいですよ！`,
      replyRomaji: `Nodo ga kawakimashita ka? Tsumetai ${drinkRomaji} wa sukkiri shite oishii desu yo!`,
      replyEnglish: `Are you thirsty? A refreshing cold ${rawDrink} sounds so nice right now!`,
      suggestedReplies: ['Water, please', 'With ice, please', 'Thank you'],
    };
  }

  // 6. Pattern Matching: Directions & Locations ("Where is [place]?")
  const whereMatch = lower.match(/(?:where is|where's|how do i get to)\s+(?:the\s+)?(.+)/i);
  if (whereMatch) {
    const rawPlace = whereMatch[1].replace(/,?\s*please\b/gi, '').replace(/[?!.]/g, '').trim();
    const placeEntry = LEXICON_ENTRIES[rawPlace.toLowerCase()];
    const placeJa = placeEntry?.kanji || englishToKatakana(rawPlace);
    const placeKana = placeEntry?.kana || placeJa;
    const placeRomaji = placeEntry?.romaji || rawPlace;
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${placeJa}はどこですか？`,
      kana: `${placeKana}はどこですか？`,
      romaji: `${placeRomaji} wa doko desu ka?`,
      english: `Where is the ${rawPlace}?`,
      rubySegments: [
        ...(placeEntry?.ruby || [{ text: placeJa, isKanji: false }]),
        { text: 'はどこですか？', isKanji: false },
      ],
      breakdown: [
        { surface: placeJa, reading: placeKana, romaji: placeRomaji.toLowerCase(), pos: 'noun', meaning: rawPlace, jlpt: 'N5' },
        { surface: 'は', reading: 'は', romaji: 'wa', pos: 'particle', meaning: 'topic marker', jlpt: 'N5' },
        { surface: 'どこ', reading: 'どこ', romaji: 'doko', pos: 'interrogative', meaning: 'where', jlpt: 'N5' },
        { surface: 'ですか', reading: 'ですか', romaji: 'desu ka', pos: 'phrase', meaning: 'is it? (question)', jlpt: 'N5' },
      ],
      grammarNote: '〜はどこですか？ (wa doko desu ka?) is Japan\'s universal location question. Substitute any place or landmark before は!',
      replyJapanese: '「まっすぐ行って、交差点を右に曲がってください」と教えられるかもしれませんよ。言ってみましょう！',
      replyKana: '「まっすぐいって、こうさてんをみぎにまがってください」とおしえられるかもしれませんよ。いってみましょう！',
      replyRomaji: '"Massugu itte, kōsaten o migi ni magatte kudasai" to oshierareru kamo shiremasen yo. Itte mimashō!',
      replyEnglish: 'They might say: "Go straight ahead, then turn right at the intersection." Try repeating that direction!',
      suggestedReplies: ['Turn right, thank you', 'Is it far from here?', 'Can I walk there?'],
    };
  }

  // 7. Pattern Matching: Pricing & Shopping ("How much is [item]?")
  const priceMatch = lower.match(/(?:how much is|how much for|how much does.*cost)\s*(?:this\s+|the\s+)?(.+)?/i);
  if (priceMatch) {
    const rawItem = (priceMatch[1] || 'this').replace(/,?\s*please\b/gi, '').replace(/[?!.]/g, '').trim();
    const isThis = /^(this|it)$/i.test(rawItem);
    const itemEntry = LEXICON_ENTRIES[rawItem.toLowerCase()];
    const itemJa = isThis ? 'これ' : (itemEntry?.kanji || englishToKatakana(rawItem));
    const itemKana = isThis ? 'これ' : (itemEntry?.kana || itemJa);
    const itemRomaji = isThis ? 'kore' : (itemEntry?.romaji || rawItem);
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${itemJa}はいくらですか？`,
      kana: `${itemKana}はいくらですか？`,
      romaji: `${itemRomaji} wa ikura desu ka?`,
      english: `How much is ${isThis ? 'this' : rawItem}?`,
      rubySegments: [
        ...(itemEntry?.ruby || [{ text: itemJa, isKanji: false }]),
        { text: 'はいくらですか？', isKanji: false },
      ],
      breakdown: [
        { surface: itemJa, reading: itemKana, romaji: itemRomaji.toLowerCase(), pos: 'noun', meaning: rawItem, jlpt: 'N5' },
        { surface: 'は', reading: 'は', romaji: 'wa', pos: 'particle', meaning: 'topic marker', jlpt: 'N5' },
        { surface: 'いくら', reading: 'いくら', romaji: 'ikura', pos: 'interrogative', meaning: 'how much (price)', jlpt: 'N5' },
        { surface: 'ですか', reading: 'ですか', romaji: 'desu ka', pos: 'phrase', meaning: 'is it?', jlpt: 'N5' },
      ],
      grammarNote: 'いくら (ikura) specifically asks for cost or price. Combined with これ (this) or それ (that), you can shop anywhere in Japan!',
      replyJapanese: '「千円です」のように店員さんが答えてくれますよ。レジでお会計してみましょう！',
      replyKana: '「せんえんです」のようにてんいんさんがこたえてくれますよ。れじでおかいけいしてみましょう！',
      replyRomaji: '"Sen-en desu" no yō ni ten\'in-san ga kotaete kuremasu yo. Reji de o-kaikei shite mimashō!',
      replyEnglish: 'The clerk will tell you the price, like "It\'s 1,000 yen." Shall we pay at the register?',
      suggestedReplies: ['I will take this, please', 'Can I pay by card?', 'Receipt, please'],
    };
  }

  // 8. Pattern Matching: Requests ("Can I have [item], please" / "Please give me [item]")
  const pleaseMatch = lower.match(/(?:can i have|please give me|i would like|i'd like)\s+(?:a\s+|an\s+|some\s+)?(.+)/i);
  if (pleaseMatch) {
    const rawReq = pleaseMatch[1].replace(/,?\s*please\b/gi, '').replace(/[?!.]/g, '').trim();
    const reqEntry = LEXICON_ENTRIES[rawReq.toLowerCase()];
    const reqJa = reqEntry?.kanji || englishToKatakana(rawReq);
    const reqKana = reqEntry?.kana || reqJa;
    const reqRomaji = reqEntry?.romaji || rawReq;
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${reqJa}をください。`,
      kana: `${reqKana}をください。`,
      romaji: `${reqRomaji} o kudasai.`,
      english: `Could I have ${rawReq}, please?`,
      rubySegments: [
        ...(reqEntry?.ruby || [{ text: reqJa, isKanji: false }]),
        { text: 'をください。', isKanji: false },
      ],
      breakdown: [
        { surface: reqJa, reading: reqKana, romaji: reqRomaji.toLowerCase(), pos: 'noun', meaning: rawReq, jlpt: 'N5' },
        { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'object marker', jlpt: 'N5' },
        { surface: 'ください', reading: 'ください', romaji: 'kudasai', pos: 'verb', meaning: 'please give me', jlpt: 'N5' },
      ],
      grammarNote: '〜をください (o kudasai) is the standard polite request for ordering items, food, or goods in Japanese stores.',
      replyJapanese: `「かしこまりました！${reqJa}をお持ちしますね」と店員さんが笑顔で言ってくれますよ。`,
      replyKana: `「かしこまりました！${reqKana}をおもちしますね」とてんいんさんがえがおでいってくれますよ。`,
      replyRomaji: `"Kashikomarimashita! ${reqRomaji} o o-mochi shimasu ne" to ten'in-san ga egao de itte kuremasu yo.`,
      replyEnglish: `The staff will smile and say: "Certainly! I'll bring the ${rawReq} right over."`,
      suggestedReplies: ['Thank you very much', 'Water, please', 'Check, please'],
    };
  }

  // 8. Pattern Matching: Expressing Physical Feelings ("I am hungry / thirsty / tired")
  if (/hungry/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'お腹が空きました！',
      kana: 'おなかがすきました！',
      romaji: 'Onaka ga sukimashita!',
      english: 'I am hungry! (My stomach became empty)',
      rubySegments: [
        { text: 'お', isKanji: false },
        { text: '腹', reading: 'なか', isKanji: true },
        { text: 'が', isKanji: false },
        { text: '空', reading: 'す', isKanji: true },
        { text: 'きました！', isKanji: false },
      ],
      breakdown: [
        { surface: 'お腹', reading: 'おなか', romaji: 'onaka', pos: 'noun', meaning: 'stomach / belly', jlpt: 'N5' },
        { surface: 'が', reading: 'が', romaji: 'ga', pos: 'particle', meaning: 'subject marker', jlpt: 'N5' },
        { surface: '空きました', reading: 'すきました', romaji: 'sukimashita', pos: 'verb', meaning: 'became empty (past)', jlpt: 'N5' },
      ],
      grammarNote: 'Japanese says "my stomach has become empty" (お腹が空きました) in the past tense to state that you are currently hungry!',
      replyJapanese: 'お腹が空きましたね！美味しいラーメンや寿司を食べに行きましょうか？何が食べたいですか？',
      replyKana: 'おなかがすきましたね！おいしいらーめんやすしをたべにいきましょうか？なにがたべたいですか？',
      replyRomaji: 'Onaka ga sukimashita ne! Oishii rāmen ya sushi o tabe ni ikimashō ka? Nani ga tabetai desu ka?',
      replyEnglish: 'You must be hungry! Shall we go eat some delicious ramen or sushi? What are you craving?',
      suggestedReplies: ['I want to eat ramen', 'Sushi sounds great', 'Where is a good restaurant?'],
    };
  }

  if (/thirsty/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '喉が渇きました！',
      kana: 'のどがかわきました！',
      romaji: 'Nodo ga kawakimashita!',
      english: 'I am thirsty! (My throat became dry)',
      rubySegments: [
        { text: '喉', reading: 'のど', isKanji: true },
        { text: 'が', isKanji: false },
        { text: '渇', reading: 'かわ', isKanji: true },
        { text: 'きました！', isKanji: false },
      ],
      breakdown: [
        { surface: '喉', reading: 'のど', romaji: 'nodo', pos: 'noun', meaning: 'throat', jlpt: 'N5' },
        { surface: 'が', reading: 'が', romaji: 'ga', pos: 'particle', meaning: 'subject marker', jlpt: 'N5' },
        { surface: '渇きました', reading: 'かわきました', romaji: 'kawakimashita', pos: 'verb', meaning: 'became parched / dry', jlpt: 'N5' },
      ],
      grammarNote: 'Just like "hungry", Japanese uses the past tense: 喉が渇きました (literally "my throat has dried up").',
      replyJapanese: '自動販売機やお茶屋さんで冷たい飲み物を買いましょう！お水にしますか？お茶にしますか？',
      replyKana: 'じどうはんばいきやおちゃやさんでつめたいのみものをかいましょう！おみずにしますか？おちゃにしますか？',
      replyRomaji: 'Jidōhambai-ki ya o-cha-ya-san de tsumetai nomimono o kaimashō! Omizu ni shimasu ka? Ocha ni shimasu ka?',
      replyEnglish: 'Let\'s get a cold drink from a vending machine! Would you prefer water or green tea?',
      suggestedReplies: ['Cold water, please', 'Green tea, please', 'An iced coffee'],
    };
  }

  if (/tired/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '疲れました。',
      kana: 'つかれました。',
      romaji: 'Tsukaremashita.',
      english: 'I am tired / exhausted.',
      rubySegments: [
        { text: '疲', reading: 'つか', isKanji: true },
        { text: 'れました。', isKanji: false },
      ],
      breakdown: [
        { surface: '疲れました', reading: 'つかれました', romaji: 'tsukaremashita', pos: 'verb', meaning: 'became tired (polite past)', jlpt: 'N5' },
      ],
      grammarNote: '疲れる (tsukareru) becomes 疲れました (tsukaremashita). Colleagues often comfort each other by saying お疲れ様でした (otsukaresama deshita)!',
      replyJapanese: '今日もお疲れ様でした！カフェで一息つくか、お風呂に入ってゆっくり休んでくださいね。',
      replyKana: 'きょうもおつかれさまでした！かふぇでひといきつくか、おふろにはいってゆっくりやすんでくださいね。',
      replyRomaji: 'Kyō mo otsukaresama deshita! Kafe de hitoiki tsuku ka, o-furo ni haitte yukkuri yasunde kudasai ne.',
      replyEnglish: 'Thank you for your hard work today! Take a breather at a café or relax in a hot bath.',
      suggestedReplies: ['Thank you Sensei', 'Let\'s take a short break', 'I will rest now'],
    };
  }

  // 9. Single English word translation (lookup or Katakana transliteration)
  const words = trimmed.split(/\s+/);
  if (words.length === 1) {
    const rawWord = words[0].replace(/[?!.,'"]/g, '');
    const kata = englishToKatakana(rawWord);
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `「${rawWord}」は日本語で「${kata}」と言います！`,
      kana: `「${rawWord}」はにほんごで「${kata}」といいます！`,
      romaji: `"${rawWord}" wa nihongo de "${kata}" to iimasu!`,
      english: `"${rawWord}" is said as "${kata}" in Japanese!`,
      rubySegments: [
        { text: `「${rawWord}」は`, isKanji: false },
        { text: '日本語', reading: 'にほんご', isKanji: true },
        { text: 'で「', isKanji: false },
        { text: kata, isKanji: false },
        { text: '」と', isKanji: false },
        { text: '言', reading: 'い', isKanji: true },
        { text: 'います！', isKanji: false },
      ],
      breakdown: [
        { surface: rawWord, reading: rawWord, romaji: rawWord.toLowerCase(), pos: 'English word', meaning: rawWord, jlpt: 'N5' },
        { surface: '日本語', reading: 'にほんご', romaji: 'nihongo', pos: 'noun', meaning: 'Japanese language', jlpt: 'N5' },
        { surface: 'で', reading: 'で', romaji: 'de', pos: 'particle', meaning: 'in / by means of', jlpt: 'N5' },
        { surface: kata, reading: kata, romaji: kata, pos: 'katakana loanword', meaning: rawWord, jlpt: 'N5' },
        { surface: 'と言います', reading: 'といいます', romaji: 'to iimasu', pos: 'phrase', meaning: 'is called / is said', jlpt: 'N5' },
      ],
      grammarNote: `〜は日本語で何と言いますか？ (wa nihongo de nan to iimasu ka?) is the essential phrase to ask how to say any word in Japanese!`,
      replyJapanese: `「${kata}」を使って例文を作ってみましょうか？何と言ってみたいですか？`,
      replyKana: `「${kata}」をつかってれいぶんをつくってみましょうか？なんといってみたいですか？`,
      replyRomaji: `"${kata}" o tsukatte reibun o tsukutte mimashō ka? Nan to itte mitai desu ka?`,
      replyEnglish: `Shall we make an example sentence using "${kata}"? What would you like to express?`,
      suggestedReplies: [`I like ${rawWord}`, `Where is the ${rawWord}?`, `How much is the ${rawWord}?`],
    };
  }

  // 10. Multi-word English sentence: Translate key components into natural Japanese
  // Identify key words to translate
  const translatedTokens: { en: string; ja: string; kana: string; romaji: string }[] = [];
  for (const w of words) {
    const cleanW = w.toLowerCase().replace(/[?!.,'"]/g, '');
    if (LEXICON_ENTRIES[cleanW]) {
      const e = LEXICON_ENTRIES[cleanW];
      translatedTokens.push({ en: cleanW, ja: e.kanji.replace(/[!。？?]/g, ''), kana: e.kana.replace(/[!。？?]/g, ''), romaji: e.romaji.replace(/[!。？?]/g, '') });
    }
  }

  // If we found recognizable Japanese words in the sentence
  if (translatedTokens.length > 0) {
    const primaryWord = translatedTokens[0];
    const isQuestion = /\?$/.test(trimmed) || /^(what|where|who|when|why|how|can|is|are|do|does)/i.test(trimmed);

    const translatedSentenceJa = isQuestion
      ? `${primaryWord.ja}について教えてくれますか？`
      : `${primaryWord.ja}が好きで、よく使います。`;
    const translatedSentenceKana = isQuestion
      ? `${primaryWord.kana}についておしえてくれますか？`
      : `${primaryWord.kana}がすきで、よくつかいます。`;
    const translatedSentenceRomaji = isQuestion
      ? `${primaryWord.romaji} ni tsuite oshiete kuremasu ka?`
      : `${primaryWord.romaji} ga suki de, yoku tsukaimasu.`;
    const translatedMeaning = isQuestion
      ? `Could you tell me more about ${primaryWord.en}?`
      : `I like ${primaryWord.en} and use it often.`;

    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: translatedSentenceJa,
      kana: translatedSentenceKana,
      romaji: translatedSentenceRomaji,
      english: translatedMeaning,
      rubySegments: [
        { text: primaryWord.ja, isKanji: /[\u4e00-\u9faf]/.test(primaryWord.ja) },
        { text: isQuestion ? 'について' : 'が', isKanji: false },
        { text: isQuestion ? '教' : '好', reading: isQuestion ? 'おし' : 'す', isKanji: true },
        { text: isQuestion ? 'えてくれますか？' : 'きで、よく', isKanji: false },
        { text: isQuestion ? '' : '使', reading: isQuestion ? '' : 'つか', isKanji: !isQuestion },
        { text: isQuestion ? '' : 'います。', isKanji: false },
      ].filter(seg => seg.text.length > 0),
      breakdown: [
        { surface: primaryWord.ja, reading: primaryWord.kana, romaji: primaryWord.romaji.toLowerCase(), pos: 'noun', meaning: primaryWord.en, jlpt: 'N5' },
        { surface: isQuestion ? 'について' : 'が好き', reading: isQuestion ? 'について' : 'がすき', romaji: isQuestion ? 'ni tsuite' : 'ga suki', pos: 'phrase', meaning: isQuestion ? 'regarding / about' : 'fond of / like', jlpt: 'N5' },
      ],
      grammarNote: isQuestion
        ? '〜について (ni tsuite) means "about / regarding". 〜てくれますか (te kuremasu ka) is a polite request asking someone to do something for you.'
        : '〜が好きです (ga suki desu) expresses that you like something. In Japanese, the target of your affection takes the particle が (ga).',
      replyJapanese: `「${trimmed}」ですね！${primaryWord.ja}についての表現をしっかり身につけましょう。次はどんなフレーズを話してみたいですか？`,
      replyKana: `「${trimmed}」ですね！${primaryWord.kana}についてのひょうげんをしっかりみにつけましょう。つぎはどんなふれーずをはなしてみたいですか？`,
      replyRomaji: `"${trimmed}" desu ne! ${primaryWord.romaji} ni tsuite no hyōgen o shikkari mi ni tsukemashō. Tsugi wa donna furēzu o hanashite mitai desu ka?`,
      replyEnglish: `You said: "${trimmed}"! Let's master expressions related to ${primaryWord.en}. What phrase would you like to speak next?`,
      suggestedReplies: [`I want to know more about ${primaryWord.en}`, 'Where can I find it?', 'How do you say it politely?'],
    };
  }

  // 11. General conversational sentence translation for any other input
  const katakanaTransliteration = words.slice(0, 3).map(w => englishToKatakana(w.replace(/[?!.,'"]/g, ''))).join('・');
  const isQuestion = /\?$/.test(trimmed) || /^(what|where|who|when|why|how|can|is|are|do|does)/i.test(trimmed);

  const naturalJa = isQuestion
    ? `そのことについて、日本語で質問してみましょう！`
    : `「${trimmed}」を自然な日本語で表現してみましょう！`;
  const naturalKana = isQuestion
    ? `そのことについて、にほんごでしつもんしてみましょう！`
    : `「${trimmed}」をしぜんなにほんごでひょうげんしてみましょう！`;
  const naturalRomaji = isQuestion
    ? `Sono koto ni tsuite, nihongo de shitsumon shite mimashō!`
    : `"${trimmed}" o shizen na nihongo de hyōgen shite mimashō!`;
  const naturalEnglish = isQuestion
    ? `Let's ask that question naturally in Japanese!`
    : `Here is how to express "${trimmed}" in natural Japanese!`;

  return {
    role: 'sensei',
    englishInput: trimmed,
    japanese: naturalJa,
    kana: naturalKana,
    romaji: naturalRomaji,
    english: naturalEnglish,
    rubySegments: [
      { text: isQuestion ? 'そのことについて、' : `「${trimmed}」を`, isKanji: false },
      { text: isQuestion ? '日本語' : '自然', reading: isQuestion ? 'にほんご' : 'しぜん', isKanji: true },
      { text: isQuestion ? 'で' : 'な', isKanji: false },
      { text: isQuestion ? '質問' : '日本語', reading: isQuestion ? 'しつもん' : 'にほんご', isKanji: true },
      { text: isQuestion ? 'してみましょう！' : 'で', isKanji: false },
      { text: isQuestion ? '' : '表現', reading: isQuestion ? '' : 'ひょうげん', isKanji: !isQuestion },
      { text: isQuestion ? '' : 'してみましょう！', isKanji: false },
    ].filter(s => s.text.length > 0),
    breakdown: [
      { surface: isQuestion ? '質問' : '自然', reading: isQuestion ? 'しつもん' : 'しぜん', romaji: isQuestion ? 'shitsumon' : 'shizen', pos: 'noun', meaning: isQuestion ? 'question' : 'natural', jlpt: 'N4' },
      { surface: isQuestion ? 'してみましょう' : '表現', reading: isQuestion ? 'してみましょう' : 'ひょうげん', romaji: isQuestion ? 'shite mimashou' : 'hyougen', pos: isQuestion ? 'verb' : 'noun', meaning: isQuestion ? "let's try asking" : 'expression', jlpt: 'N4' },
    ],
    grammarNote: '〜てみる (te miru) means "to try doing something and see". 〜ましょう (-mashou) is the enthusiastic invitation: "let\'s do it together!"',
    replyJapanese: `とても実践的な英語ですね！「${katakanaTransliteration}」に関連する表現をもっと練習してみますか？`,
    replyKana: `とてもじっせんてきなえいごですね！「${katakanaTransliteration}」にかんれんするひょうげんをもっとれんしゅうしてみますか？`,
    replyRomaji: `Totemo jissenteki na eigo desu ne! "${katakanaTransliteration}" ni kanren suru hyōgen o motto renshū shite mimasu ka?`,
    replyEnglish: `That is such a practical sentence! Would you like to practice more phrases related to this topic?`,
    suggestedReplies: ['Yes, please teach me more!', 'How do I say this politely?', 'Can we practice ordering food?'],
  };
}
