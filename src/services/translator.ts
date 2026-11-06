import type { Level, RichMessage, WordToken, RubySegment } from '../types/index.ts';

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
  'cold water': {
    kanji: '冷たいお水（お冷）',
    kana: 'つめたいおみず（おひや）',
    romaji: 'Tsumetai o-mizu (o-hiya)',
    pos: 'noun',
    meaning: 'cold water (served in restaurants)',
    jlpt: 'N5',
    ruby: [
      { text: '冷', reading: 'つめ', isKanji: true },
      { text: 'たいお', isKanji: false },
      { text: '水', reading: 'みず', isKanji: true },
      { text: '（お', isKanji: false },
      { text: '冷', reading: 'ひや', isKanji: true },
      { text: '）', isKanji: false },
    ],
    grammarNote: 'In Japanese casual dining and izakaya, servers often refer to complimentary iced water as お冷 (o-hiya). You can also say 冷たいお水 (tsumetai o-mizu).',
    replyJa: '「冷たいお水をどうぞ！」と店員さんが氷入りのグラスを持ってきてくれますよ。',
    replyKana: '「つめたいおみずをどうぞ！」とてんいんさんがこおりいりのぐらすをもってきてくれますよ。',
    replyRomaji: '"Tsumetai o-mizu o dōzo!" to ten\'in-san ga kōri-iri no gurasu o motte kite kuremasu yo.',
    replyEn: 'The server will bring a refreshing glass with ice: "Here is cold water for you!"',
    suggestedReplies: ['Thank you very much', 'Can I see the menu?', 'One ramen, please'],
  },
  'hot water': {
    kanji: 'お湯',
    kana: 'おゆ',
    romaji: 'O-yu',
    pos: 'noun',
    meaning: 'hot water',
    jlpt: 'N5',
    ruby: [
      { text: 'お', isKanji: false },
      { text: '湯', reading: 'ゆ', isKanji: true },
    ],
    grammarNote: 'Unlike English which uses "hot" + "water", Japanese has a distinct word for hot water: 湯 (yu) with polite prefix お湯 (o-yu).',
    replyJa: '温かいお湯で体が温まりますね。熱いので気をつけて飲んでくださいね。',
    replyKana: 'あたたかいおゆでからだがあたたまりますね。あついのできをつけてのんでくださいね。',
    replyRomaji: 'Atatakai o-yu de karada ga atatamarimasu ne. Atsui node ki o tsukete nonde kudasai ne.',
    replyEn: 'Warm hot water soothes the body! Please be careful since it is hot.',
    suggestedReplies: ['Thank you Sensei', 'Hot tea, please', 'Cold water, please'],
  },
  'delicious ramen': {
    kanji: '美味しいラーメン',
    kana: 'おいしいらーめん',
    romaji: 'Oishii rāmen',
    pos: 'phrase',
    meaning: 'delicious ramen',
    jlpt: 'N5',
    ruby: [
      { text: '美味', reading: 'おい', isKanji: true },
      { text: 'しいラーメン', isKanji: false },
    ],
    grammarNote: '美味しい (oishii, delicious) is an い-adjective directly modifying the noun ラーメン (rāmen).',
    replyJa: '日本のラーメンは豚骨、醤油、味噌など種類が豊富で最高に美味しいですよ！どんな味が好きですか？',
    replyKana: 'にほんのらーめんはとんこつ、しょうゆ、みそなどしゅるいがほうふでさいこうにおいしいですよ！どんなあじがすきですか？',
    replyRomaji: 'Nihon no rāmen wa tonkotsu, shōyu, miso nado shurui ga hōfu de saikō ni oishii desu yo! Donna aji ga suki desu ka?',
    replyEn: 'Japanese ramen is so diverse with tonkotsu, shoyu, and miso broths! Which flavor do you like best?',
    suggestedReplies: ['Tonkotsu ramen', 'Miso ramen', 'Soy sauce ramen'],
  },
  'delicious sushi': {
    kanji: '美味しい寿司',
    kana: 'おいしいすし',
    romaji: 'Oishii sushi',
    pos: 'phrase',
    meaning: 'delicious sushi',
    jlpt: 'N5',
    ruby: [
      { text: '美味', reading: 'おい', isKanji: true },
      { text: 'しい', isKanji: false },
      { text: '寿司', reading: 'すし', isKanji: true },
    ],
    grammarNote: '美味しい (oishii) modifies 寿司 (sushi). Fresh seafood in Japan makes sushi world-renowned.',
    replyJa: '築地や豊洲市場の新鮮な寿司は口の中でとろけますよ！サーモンやマグロはお好きですか？',
    replyKana: 'つきじやとよすしじょうのしんせんなすしはくちのなかでとろけますよ！さーもんやまぐろはおすきですか？',
    replyRomaji: 'Tsukiji ya Toyosu shijō no shinsen na sushi wa kuchi no naka de torokemasu yo! Sāmon ya maguro wa o-suki desu ka?',
    replyEn: 'Fresh sushi at Tsukiji and Toyosu melts in your mouth! Do you like salmon and tuna?',
    suggestedReplies: ['Salmon sushi, please', 'Tuna sushi, please', 'I love wasabi'],
  },
  'delicious food': {
    kanji: '美味しい料理',
    kana: 'おいしいりょうり',
    romaji: 'Oishii ryōri',
    pos: 'phrase',
    meaning: 'delicious food / cuisine',
    jlpt: 'N4',
    ruby: [
      { text: '美味', reading: 'おい', isKanji: true },
      { text: 'しい', isKanji: false },
      { text: '料理', reading: 'りょうり', isKanji: true },
    ],
    grammarNote: '料理 (ryōri) means cooking, food, or cuisine. 美味しい料理 means delicious food.',
    replyJa: '旅の醍醐味は美味しい料理ですね！日本で一番食べてみたい名物は何ですか？',
    replyKana: 'たびのだいごみはおいしいりょうりですね！にほんでいちばんたべてみたいめいぶつはなんですか？',
    replyRomaji: 'Tabi no daigomi wa oishii ryōri desu ne! Nihon de ichiban tabete mitai meibutsu wa nan desu ka?',
    replyEn: 'The best part of traveling is delicious food! What local specialty are you most eager to try in Japan?',
    suggestedReplies: ['Ramen and gyoza', 'Sushi and sashimi', 'Tempura and udon'],
  },
  'japanese food': {
    kanji: '日本食（和食）',
    kana: 'にほんしょく（わしょく）',
    romaji: 'Nihon-shoku (washoku)',
    pos: 'noun',
    meaning: 'Japanese food / Japanese cuisine',
    jlpt: 'N4',
    ruby: [
      { text: '日本食', reading: 'にほんしょく', isKanji: true },
      { text: '（', isKanji: false },
      { text: '和食', reading: 'わしょく', isKanji: true },
      { text: '）', isKanji: false },
    ],
    grammarNote: '和食 (washoku) is UNESCO-recognized traditional Japanese cuisine emphasizing seasonal ingredients and balance.',
    replyJa: '和食は健康的で見た目も美しいですね！どんな和食を食べたことがありますか？',
    replyKana: 'わしょくはけんこうてきでみた目もうつくしいですね！どんなわしょくをたべたことがありますか？',
    replyRomaji: 'Washoku wa kenkōteki de mitame mo utsukushii desu ne! Donna washoku o tabeta koto ga arimasu ka?',
    replyEn: 'Washoku is healthy, balanced, and aesthetically beautiful! What Japanese dishes have you tried before?',
    suggestedReplies: ['Ramen and sushi', 'Miso soup and rice', 'I want to try kaiseki'],
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
  'green tea': {
    kanji: '緑茶（お茶）',
    kana: 'りょくちゃ（おちゃ）',
    romaji: 'Ryokucha (ocha)',
    pos: 'noun',
    meaning: 'green tea',
    jlpt: 'N5',
    ruby: [
      { text: '緑茶', reading: 'りょくちゃ', isKanji: true },
      { text: '（お', isKanji: false },
      { text: '茶', reading: 'ちゃ', isKanji: true },
      { text: '）', isKanji: false },
    ],
    grammarNote: '緑茶 (ryokucha) specifically means Japanese green tea. In Japanese restaurants and homes, simply asking for お茶 (ocha) will also get you green tea!',
    replyJa: '香ばしい緑茶はとても落ち着きますね。温かい緑茶と冷たい緑茶、どちらがよろしいですか？',
    replyKana: 'こうばしいりょくちゃはとてもおちつきますね。あたたかいりょくちゃとつめたいりょくちゃ、どちらがよろしいですか？',
    replyRomaji: 'Kōbashii ryokucha wa totemo ochitsukimasu ne. Atatakai ryokucha to tsumetai ryokucha, dochira ga yoroshii desu ka?',
    replyEn: 'Fragrant green tea is so soothing! Would you prefer warm green tea or iced green tea?',
    suggestedReplies: ['Warm green tea, please', 'Iced green tea, please', 'Thank you Sensei'],
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
  culture: {
    kanji: '文化',
    kana: 'ぶんか',
    romaji: 'Bunka',
    pos: 'noun',
    meaning: 'culture',
    jlpt: 'N3',
    ruby: [{ text: '文化', reading: 'ぶんか', isKanji: true }],
    grammarNote: '文化 (bunka) means culture or civilization. 日本の文化 (Nihon no bunka) means Japanese culture.',
    replyJa: '日本の伝統文化からポップカルチャーまで、興味深いものがたくさんあります！何が一番気になりますか？',
    replyKana: 'にほんのでんとうぶんかからぽっぷかるちゃーまで、きょうみぶかいものがたくさんあります！なにがいちばんきになりますか？',
    replyRomaji: 'Nihon no dentō bunka kara poppu karuchā made, kyōmibukai mono ga takusan arimasu! Nani ga ichiban ki ni narimasu ka?',
    replyEn: 'From traditional culture to modern pop culture, Japan has so much to offer! What interests you most?',
    suggestedReplies: ['Traditional tea ceremony', 'Anime and manga', 'Japanese cuisine'],
  },
  'japanese culture': {
    kanji: '日本の文化',
    kana: 'にほんのぶんか',
    romaji: 'Nihon no bunka',
    pos: 'phrase',
    meaning: 'Japanese culture',
    jlpt: 'N4',
    ruby: [
      { text: '日本', reading: 'にほん', isKanji: true },
      { text: 'の', isKanji: false },
      { text: '文化', reading: 'ぶんか', isKanji: true },
    ],
    grammarNote: '日本の (Nihon no, of Japan) + 文化 (bunka, culture). The particle の links the country to culture.',
    replyJa: '日本の文化に興味を持っていただけて嬉しいです！茶道、着物、お祭りなど、どれも奥深いですよ。',
    replyKana: 'にほんのぶんかにきょうみをもっていただけてうれしいです！さどう、きもの、おまつりなど、どれもおくぶかいですよ。',
    replyRomaji: 'Nihon no bunka ni kyōmi o motte itadakete ureshii desu! Sadō, kimono, o-matsuri nado, dore mo okubukai desu yo.',
    replyEn: 'I am so thrilled you are interested in Japanese culture! Tea ceremony, kimono, festivals—they all have deep meaning.',
    suggestedReplies: ['Tell me about tea ceremony', 'Tell me about festivals', 'I love anime and games'],
  },
  anime: {
    kanji: 'アニメ',
    kana: 'あにめ',
    romaji: 'Anime',
    pos: 'noun',
    meaning: 'anime / animation',
    jlpt: 'N5',
    ruby: [{ text: 'アニメ', isKanji: false }],
    grammarNote: 'Short for アニメーション (animēshon). Japanese anime is known and loved worldwide!',
    replyJa: 'どんなアニメが好きですか？スタジオジブリやバトルアニメなど、名作がたくさんありますね！',
    replyKana: 'どんなあにめがすきですか？すたじおじぶりやばとるあにめなど、めいさくがたくさんありますね！',
    replyRomaji: 'Donna anime ga suki desu ka? Sutajio Jiburi ya batoru anime nado, meisaku ga takusan arimasu ne!',
    replyEn: 'What kind of anime do you like? From Studio Ghibli to shonen action, there are so many masterpieces!',
    suggestedReplies: ['I love Studio Ghibli', 'I watch anime with subtitles', 'Teach me anime phrases'],
  },
  history: {
    kanji: '歴史',
    kana: 'れきし',
    romaji: 'Rekishi',
    pos: 'noun',
    meaning: 'history',
    jlpt: 'N3',
    ruby: [{ text: '歴史', reading: 'れきし', isKanji: true }],
    grammarNote: '歴史 (rekishi) refers to history. Samurai (侍) and castle (城 shiro) eras are fascinating chapters of Japanese history.',
    replyJa: '日本の歴史は侍や城、将軍などドラマチックでとても面白いですよ！',
    replyKana: 'にほんのれきしはさむらいやしろ、しょうぐんなどどらまちっくでとてもおもしろいですよ！',
    replyRomaji: 'Nihon no rekishi wa samurai ya shiro, shōgun nado doramachikku de totemo omoshiroi desu yo!',
    replyEn: 'Japanese history is dramatic and fascinating with samurai, castles, and shoguns!',
    suggestedReplies: ['Tell me about Samurai', 'Tell me about Japanese castles', 'Kyoto history'],
  },
  temple: {
    kanji: 'お寺',
    kana: 'おてら',
    romaji: 'O-tera',
    pos: 'noun',
    meaning: 'Buddhist temple',
    jlpt: 'N5',
    ruby: [
      { text: 'お', isKanji: false },
      { text: '寺', reading: 'てら', isKanji: true },
    ],
    grammarNote: 'お寺 (o-tera) refers to Buddhist temples (marked by incense, bell towers, and Buddha statues). Shinto shrines are called 神社 (jinja).',
    replyJa: '日本のお寺は庭園も静かで美しいですよ。京都や奈良には国宝のお寺がたくさんあります。',
    replyKana: 'にほんのおてらはていえんもしずかでうつくしいですよ。きょうとやまほにはこくほうのおてらがたくさんあります。',
    replyRomaji: 'Nihon no o-tera wa teien mo shizuka de utsukushii desu yo. Kyōto ya Nara ni wa kokuhō no o-tera ga takusan arimasu.',
    replyEn: 'Japanese temples have serene, beautiful gardens. Kyoto and Nara are home to countless national treasures.',
    suggestedReplies: ['Where is Senso-ji temple?', 'How to visit a temple', 'Is photography allowed?'],
  },
  shrine: {
    kanji: '神社',
    kana: 'じんじゃ',
    romaji: 'Jinja',
    pos: 'noun',
    meaning: 'Shinto shrine',
    jlpt: 'N5',
    ruby: [{ text: '神社', reading: 'じんじゃ', isKanji: true }],
    grammarNote: '神社 (jinja) are Shinto shrines, recognized by the red torii gates (鳥居) welcoming visitors at the entrance.',
    replyJa: '神社の鳥居をくぐると神聖な気持ちになりますね。お参りの作法（二礼二拍手一礼）を練習してみましょう！',
    replyKana: 'じんじゃのとりいをくぐるとしんせいなきもちになりますね。おまいりのさほう（にれいにはくしゅいちれい）をれんしゅうしてみましょう！',
    replyRomaji: 'Jinja no torii o kuguru to shinsei na kimochi ni narimasu ne. O-mairi no sahō (ni-rei ni-hakushu ichi-rei) o renshū shite mimashō!',
    replyEn: 'Passing under a shrine\'s torii gate feels sacred and refreshing. Let\'s practice the bow-and-clap ritual!',
    suggestedReplies: ['How to pray at a shrine', 'Where is Fushimi Inari?', 'What is a torii gate?'],
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
  weather: {
    kanji: '天気',
    kana: 'てんき',
    romaji: 'Tenki',
    pos: 'noun',
    meaning: 'weather',
    jlpt: 'N5',
    ruby: [{ text: '天気', reading: 'てんき', isKanji: true }],
    grammarNote: '天気 (tenki) refers to atmospheric conditions. To say "good weather", say いい天気 (ii tenki)!',
    replyJa: 'お天気のお話ですね！今日の天気はどうですか？晴れていますか？',
    replyKana: 'おてんきのおはなしですね！きょうのてんきはどうですか？はれていますか？',
    replyRomaji: 'O-tenki no ohanashi desu ne! Kyō no tenki wa dō desu ka? Harete imasu ka?',
    replyEn: 'Talking about the weather! How is the weather where you are today? Is it sunny?',
    suggestedReplies: ['It is very sunny', 'It is raining today', 'The weather is great'],
  },
  today: {
    kanji: '今日',
    kana: 'きょう',
    romaji: 'Kyō',
    pos: 'noun',
    meaning: 'today',
    jlpt: 'N5',
    ruby: [{ text: '今日', reading: 'きょう', isKanji: true }],
    grammarNote: '今日 (kyō) is an irregular kanji reading (ateji). Notice how it is a single sound "kyō".',
    replyJa: '今日一日、どんなご予定がありますか？',
    replyKana: 'きょういちにち、どんなごよていがありますか？',
    replyRomaji: 'Kyō ichinichi, donna go-yotei ga arimasu ka?',
    replyEn: 'What plans do you have for today?',
    suggestedReplies: ['I will study Japanese', 'I am going to work', 'Just relaxing at home'],
  },
  tomorrow: {
    kanji: '明日',
    kana: 'あした',
    romaji: 'Ashita',
    pos: 'noun',
    meaning: 'tomorrow',
    jlpt: 'N5',
    ruby: [{ text: '明日', reading: 'あした', isKanji: true }],
    grammarNote: '明日 is commonly read as あした (ashita) in daily conversation, and sometimes あす (asu) in formal news.',
    replyJa: '明日はどんなことを楽しみにしていますか？',
    replyKana: 'あしたはどんなことをたのしみにしていますか？',
    replyRomaji: 'Ashita wa donna koto o tanoshimi ni shite imasu ka?',
    replyEn: 'What are you looking forward to doing tomorrow?',
    suggestedReplies: ['Meeting a friend', 'Studying more Japanese', 'Going shopping'],
  },
  yesterday: {
    kanji: '昨日',
    kana: 'きのう',
    romaji: 'Kinō',
    pos: 'noun',
    meaning: 'yesterday',
    jlpt: 'N5',
    ruby: [{ text: '昨日', reading: 'きのう', isKanji: true }],
    grammarNote: '昨日 (kinō) pairs with past tense verbs, like 食べました (ate) or 行きました (went).',
    replyJa: '昨日は楽しく過ごせましたか？',
    replyKana: 'きのうはたのしくすごせましたか？',
    replyRomaji: 'Kinō wa tanoshiku sugosemashita ka?',
    replyEn: 'Did you have a pleasant time yesterday?',
    suggestedReplies: ['Yes, it was great!', 'I was quite busy', 'I rested all day'],
  },
  time: {
    kanji: '時間',
    kana: 'じかん',
    romaji: 'Jikan',
    pos: 'noun',
    meaning: 'time / hours',
    jlpt: 'N5',
    ruby: [{ text: '時間', reading: 'じかん', isKanji: true }],
    grammarNote: '時間 (jikan) means "time" in general, and also counts hours (1時間 = 1 hour).',
    replyJa: '「今何時ですか？」と時間を尋ねる練習をしてみましょう！',
    replyKana: '「いまなんじですか？」とじかんをたずねるれんしゅうをしてみましょう！',
    replyRomaji: '"Ima nan-ji desu ka?" to jikan o tazuneru renshū o shite mimashō!',
    replyEn: 'Try practicing asking the time: "Ima nan-ji desu ka?" (What time is it right now?)!',
    suggestedReplies: ['What time is it now?', 'I do not have time', 'Time to eat lunch!'],
  },
  now: {
    kanji: '今',
    kana: 'いま',
    romaji: 'Ima',
    pos: 'noun',
    meaning: 'now / right now',
    jlpt: 'N5',
    ruby: [{ text: '今', reading: 'いま', isKanji: true }],
    grammarNote: '今 (ima) is placed at the beginning of questions or statements to emphasize the present moment.',
    replyJa: '今、日本語を一生懸命練習していて素晴らしいですよ！',
    replyKana: 'いま、にほんごをいっしょうけんめいれんしゅうしていてすばらしいですよ！',
    replyRomaji: 'Ima, nihongo o isshōkenmei renshū shite ite subarashii desu yo!',
    replyEn: 'Right now, your focused Japanese practice is wonderful!',
    suggestedReplies: ['I love learning', 'What should we practice now?', 'Let\'s keep going!'],
  },
  computer: {
    kanji: 'パソコン',
    kana: 'ぱそこん',
    romaji: 'Pasokon',
    pos: 'noun',
    meaning: 'computer / PC / laptop',
    jlpt: 'N5',
    ruby: [{ text: 'パソコン', isKanji: false }],
    grammarNote: 'Japanese often abbreviates "personal computer" into the compact word パソコン (pasokon).',
    replyJa: 'パソコンでのお仕事やお勉強、お疲れ様です！',
    replyKana: 'ぱそこんでのおしごとやおべんきょう、おつかれさまです！',
    replyRomaji: 'Pasokon de no o-shigoto ya o-benkyō, otsukaresama desu!',
    replyEn: 'Great job working and studying on your computer!',
    suggestedReplies: ['I am typing right now', 'I work on my laptop', 'I love technology'],
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

  // 2. Pattern Matching: Weather & Temperature
  if (/(?:weather|sunny|raining|rain|cloudy|snowing|windy)/i.test(lower) || (/(hot|cold)/i.test(lower) && /(today|outside|weather)/i.test(lower))) {
    if (/rain|raining/i.test(lower)) {
      return {
        role: 'sensei',
        englishInput: trimmed,
        japanese: '今日は雨が降っています。',
        kana: 'きょうはあめがふっています。',
        romaji: 'Kyō wa ame ga futte imasu.',
        english: 'It is raining today.',
        rubySegments: [
          { text: '今日', reading: 'きょう', isKanji: true },
          { text: 'は', isKanji: false },
          { text: '雨', reading: 'あめ', isKanji: true },
          { text: 'が', isKanji: false },
          { text: '降', reading: 'ふ', isKanji: true },
          { text: 'っています。', isKanji: false },
        ],
        breakdown: [
          { surface: '今日', reading: 'きょう', romaji: 'kyou', pos: 'noun', meaning: 'today', jlpt: 'N5' },
          { surface: 'は', reading: 'は', romaji: 'wa', pos: 'particle', meaning: 'topic marker', jlpt: 'N5' },
          { surface: '雨', reading: 'あめ', romaji: 'ame', pos: 'noun', meaning: 'rain', jlpt: 'N5' },
          { surface: 'が', reading: 'が', romaji: 'ga', pos: 'particle', meaning: 'subject marker', jlpt: 'N5' },
          { surface: '降っています', reading: 'ふっています', romaji: 'futte imasu', pos: 'verb', meaning: 'is falling (continuous)', jlpt: 'N5' },
        ],
        grammarNote: 'In Japanese, precipitation "falls" (降る furu). 降っています (futte imasu) is the continuous form for "it is raining right now".',
        replyJapanese: '雨の日は傘を忘れずに持ってお出かけくださいね！温かい飲み物でも飲みますか？',
        replyKana: 'あめのひはかさをわすれずにもっておでかけくださいね！あたたかいのみものでものみますか？',
        replyRomaji: 'Ame no hi wa kasa o wasurezu ni motte o-dekake kudasai ne! Atatakai nomimono demo nomimasu ka?',
        replyEnglish: 'On rainy days, remember to take an umbrella! Would you like a warm beverage?',
        suggestedReplies: ['Hot green tea, please', 'I like rainy days', 'Where can I buy an umbrella?'],
      };
    }
    if (/hot/i.test(lower)) {
      return {
        role: 'sensei',
        englishInput: trimmed,
        japanese: '今日はとても暑いですね！',
        kana: 'きょうはとてもあついですね！',
        romaji: 'Kyō wa totemo atsui desu ne!',
        english: 'It is very hot today, isn\'t it!',
        rubySegments: [
          { text: '今日', reading: 'きょう', isKanji: true },
          { text: 'はとても', isKanji: false },
          { text: '暑', reading: 'あつ', isKanji: true },
          { text: 'いですね！', isKanji: false },
        ],
        breakdown: [
          { surface: '今日', reading: 'きょう', romaji: 'kyou', pos: 'noun', meaning: 'today', jlpt: 'N5' },
          { surface: 'とても', reading: 'とても', romaji: 'totemo', pos: 'adverb', meaning: 'very / exceedingly', jlpt: 'N5' },
          { surface: '暑い', reading: 'あつい', romaji: 'atsui', pos: 'i-adjective', meaning: 'hot (weather/climate)', jlpt: 'N5' },
          { surface: 'ですね', reading: 'ですね', romaji: 'desu ne', pos: 'phrase', meaning: 'isn\'t it? (seeking agreement)', jlpt: 'N5' },
        ],
        grammarNote: 'Kanji tip: 暑い is used for hot weather and atmosphere, while 熱い is used for hot objects or boiling food!',
        replyJapanese: '本当に暑いですね！熱中症に気をつけて、冷たいお水を飲んでくださいね。',
        replyKana: 'ほんとうにあついですね！ねっちゅうしょうにきをつけて、つめたいおみずをのんでくださいね。',
        replyRomaji: 'Hontō ni atsui desu ne! Netchūshō ni ki o tsukete, tsumetai omizu o nonde kudasai ne.',
        replyEnglish: 'It really is hot! Please take care not to overheat and drink plenty of cold water.',
        suggestedReplies: ['Cold water, please', 'I need some ice cream', 'It is very hot'],
      };
    }
    if (/cold/i.test(lower)) {
      return {
        role: 'sensei',
        englishInput: trimmed,
        japanese: '今日はとても寒いですね！',
        kana: 'きょうはとてもさむいですね！',
        romaji: 'Kyō wa totemo samui desu ne!',
        english: 'It is very cold today, isn\'t it!',
        rubySegments: [
          { text: '今日', reading: 'きょう', isKanji: true },
          { text: 'はとても', isKanji: false },
          { text: '寒', reading: 'さむ', isKanji: true },
          { text: 'いですね！', isKanji: false },
        ],
        breakdown: [
          { surface: '今日', reading: 'きょう', romaji: 'kyou', pos: 'noun', meaning: 'today', jlpt: 'N5' },
          { surface: 'とても', reading: 'とても', romaji: 'totemo', pos: 'adverb', meaning: 'very', jlpt: 'N5' },
          { surface: '寒い', reading: 'さむい', romaji: 'samui', pos: 'i-adjective', meaning: 'cold (weather/climate)', jlpt: 'N5' },
          { surface: 'ですね', reading: 'ですね', romaji: 'desu ne', pos: 'phrase', meaning: 'isn\'t it?', jlpt: 'N5' },
        ],
        grammarNote: '寒い (samui) describes chilly weather. For cold drinks or ice cubes, Japanese uses 冷たい (tsumetai).',
        replyJapanese: '冷えますね！暖かくして風邪をひかないようにしてくださいね。温かいラーメンでも食べますか？',
        replyKana: 'ひえますね！あたたかくしてかぜをひかないようにしてくださいね。あたたかいらーめんでもたべますか？',
        replyRomaji: 'Hiemasu ne! Atatakaku shite kaze o hikanai yō ni shite kudasai ne. Atatakai rāmen demo tabemasu ka?',
        replyEnglish: 'It is chilly! Please bundle up warmly so you don\'t catch a cold. Shall we eat some hot ramen?',
        suggestedReplies: ['Hot ramen sounds great', 'Warm green tea, please', 'It is freezing today'],
      };
    }
    // Default sunny / pleasant weather ("The weather is very nice today")
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '今日はとてもいい天気ですね！',
      kana: 'きょうはとてもいいてんきですね！',
      romaji: 'Kyō wa totemo ii tenki desu ne!',
      english: 'The weather is very nice today, isn\'t it!',
      rubySegments: [
        { text: '今日', reading: 'きょう', isKanji: true },
        { text: 'はとてもいい', isKanji: false },
        { text: '天気', reading: 'てんき', isKanji: true },
        { text: 'ですね！', isKanji: false },
      ],
      breakdown: [
        { surface: '今日', reading: 'きょう', romaji: 'kyou', pos: 'noun', meaning: 'today', jlpt: 'N5' },
        { surface: 'は', reading: 'は', romaji: 'wa', pos: 'particle', meaning: 'topic marker', jlpt: 'N5' },
        { surface: 'とても', reading: 'とても', romaji: 'totemo', pos: 'adverb', meaning: 'very / nicely', jlpt: 'N5' },
        { surface: 'いい', reading: 'いい', romaji: 'ii', pos: 'i-adjective', meaning: 'good / pleasant', jlpt: 'N5' },
        { surface: '天気', reading: 'てんき', romaji: 'tenki', pos: 'noun', meaning: 'weather', jlpt: 'N5' },
        { surface: 'ですね', reading: 'ですね', romaji: 'desu ne', pos: 'phrase', meaning: 'isn\'t it? (friendly agreement)', jlpt: 'N5' },
      ],
      grammarNote: '今日はいい天気ですね (Kyō wa ii tenki desu ne) is Japan\'s universal polite conversation starter, just like "Lovely day today!".',
      replyJapanese: '清々しいお天気ですね！こんな日は散歩に出かけたくなりますね。どこかお出かけしますか？',
      replyKana: 'すがすがしいおてんきですね！こんなひはさんぽにでかけたくなりますね。どこかおでかけしますか？',
      replyRomaji: 'Sugasugashii o-tenki desu ne! Konna hi wa sampo ni dekaketaku narimasu ne. Doko ka o-dekake shimasu ka?',
      replyEnglish: 'Such pleasant weather! On days like this, taking a walk feels wonderful. Are you heading anywhere today?',
      suggestedReplies: ['I will go for a walk in the park', 'I am staying home', 'Going shopping downtown'],
    };
  }

  // 3. Pattern Matching: Time Questions ("What time is it?")
  if (/(?:what time is it|what is the time|tell me the time)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '今、何時ですか？',
      kana: 'いま、なんじですか？',
      romaji: 'Ima, nan-ji desu ka?',
      english: 'What time is it right now?',
      rubySegments: [
        { text: '今', reading: 'いま', isKanji: true },
        { text: '、', isKanji: false },
        { text: '何時', reading: 'なんじ', isKanji: true },
        { text: 'ですか？', isKanji: false },
      ],
      breakdown: [
        { surface: '今', reading: 'いま', romaji: 'ima', pos: 'noun', meaning: 'now / right now', jlpt: 'N5' },
        { surface: '何時', reading: 'なんじ', romaji: 'nanji', pos: 'interrogative', meaning: 'what hour / what time', jlpt: 'N5' },
        { surface: 'ですか', reading: 'ですか', romaji: 'desu ka', pos: 'phrase', meaning: 'is it? (question)', jlpt: 'N5' },
      ],
      grammarNote: '時 (ji) is the hour counter: 1時 (ichi-ji), 2時 (ni-ji), 3時 (san-ji). Combine 何 (nan) + 時 (ji) to ask "what time?".',
      replyJapanese: '時間の尋ね方はバッチリですね！例えば「午後3時です (It is 3 PM)」のように答えますよ。',
      replyKana: 'じかんのたずねかたはばっちりですね！たとえば「ごごさんじです」のようにこたえますよ。',
      replyRomaji: 'Jikan no tazunekata wa batchiri desu ne! Tatoeba "Gogo san-ji desu" no yō ni kotaemasu yo.',
      replyEnglish: 'Spot-on question for asking the time! For instance, someone might reply "Gogo san-ji desu" (It is 3:00 PM).',
      suggestedReplies: ['What time does the store open?', 'Let\'s meet at 3 o\'clock', 'Thank you!'],
    };
  }

  // 4. Pattern Matching: Restroom & Bathroom Locations
  if (/(?:bathroom|toilet|restroom|washroom)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'お手洗いはどこですか？',
      kana: 'おてあらいはどこですか？',
      romaji: 'O-tearai wa doko desu ka?',
      english: 'Where is the restroom / bathroom?',
      rubySegments: [
        { text: 'お', isKanji: false },
        { text: '手洗', reading: 'てあら', isKanji: true },
        { text: 'いはどこですか？', isKanji: false },
      ],
      breakdown: [
        { surface: 'お手洗い', reading: 'おてあらい', romaji: 'o-tearai', pos: 'noun', meaning: 'restroom / washroom (polite)', jlpt: 'N5' },
        { surface: 'は', reading: 'は', romaji: 'wa', pos: 'particle', meaning: 'topic marker', jlpt: 'N5' },
        { surface: 'どこ', reading: 'どこ', romaji: 'doko', pos: 'interrogative', meaning: 'where', jlpt: 'N5' },
        { surface: 'ですか', reading: 'ですか', romaji: 'desu ka', pos: 'phrase', meaning: 'is it? (question)', jlpt: 'N5' },
      ],
      grammarNote: 'お手洗い (o-tearai) is the most polite and natural word for restroom. トイレ (toire) is also very common and understood everywhere.',
      replyJapanese: '「あちらの突き当たりを左です」と教えてもらえることが多いですよ！言ってみましょう。',
      replyKana: '「あちらのつきあたりをひだりです」とおしえてもらえることがおおいですよ！いってみましょう。',
      replyRomaji: '"Achira no tsukiatari o hidari desu" to oshiete moraeru koto ga ooi desu yo! Itte mimashō.',
      replyEnglish: 'Staff will often reply: "It is at the end of the hall on the left (tsukiatari o hidari)". Practice saying it!',
      suggestedReplies: ['Thank you very much', 'Is it on the second floor?', 'I found it!'],
    };
  }

  // 5. Pattern Matching: Demonstrative Questions ("What is this / that?")
  if (/(?:what is this|what's this)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'これは何ですか？',
      kana: 'これはなんですか？',
      romaji: 'Kore wa nan desu ka?',
      english: 'What is this?',
      rubySegments: [
        { text: 'これは', isKanji: false },
        { text: '何', reading: 'なん', isKanji: true },
        { text: 'ですか？', isKanji: false },
      ],
      breakdown: [
        { surface: 'これ', reading: 'これ', romaji: 'kore', pos: 'demonstrative', meaning: 'this (near speaker)', jlpt: 'N5' },
        { surface: 'は', reading: 'は', romaji: 'wa', pos: 'particle', meaning: 'topic marker', jlpt: 'N5' },
        { surface: '何', reading: 'なん', romaji: 'nan', pos: 'interrogative', meaning: 'what', jlpt: 'N5' },
        { surface: 'ですか', reading: 'ですか', romaji: 'desu ka', pos: 'phrase', meaning: 'is it?', jlpt: 'N5' },
      ],
      grammarNote: 'これ (kore) = this (near you), それ (sore) = that (near listener), あれ (are) = that over there (distant from both).',
      replyJapanese: '旅先で見たことのない物や料理があったら、ぜひ「これは何ですか？」と聞いてみてくださいね！',
      replyKana: 'たびさきでみたことのないものやりょうりがあったら、ぜひ「これはなんですか？」ときいてみてくださいね！',
      replyRomaji: 'Tabisaki de mita koto no nai mono ya ryōri ga attara, zehi "Kore wa nan desu ka?" to kiite mite kudasai ne!',
      replyEnglish: 'Whenever you encounter an unfamiliar dish or souvenir while traveling, asking "Kore wa nan desu ka?" is perfect!',
      suggestedReplies: ['What is that over there?', 'Is it spicy?', 'Can I try this?'],
    };
  }

  if (/(?:what is that|what's that)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'あれは何ですか？',
      kana: 'あれはなんですか？',
      romaji: 'Are wa nan desu ka?',
      english: 'What is that (over there)?',
      rubySegments: [
        { text: 'あれは', isKanji: false },
        { text: '何', reading: 'なん', isKanji: true },
        { text: 'ですか？', isKanji: false },
      ],
      breakdown: [
        { surface: 'あれ', reading: 'あれ', romaji: 'are', pos: 'demonstrative', meaning: 'that (over there)', jlpt: 'N5' },
        { surface: 'は', reading: 'は', romaji: 'wa', pos: 'particle', meaning: 'topic marker', jlpt: 'N5' },
        { surface: '何', reading: 'なん', romaji: 'nan', pos: 'interrogative', meaning: 'what', jlpt: 'N5' },
        { surface: 'ですか', reading: 'ですか', romaji: 'desu ka', pos: 'phrase', meaning: 'is it?', jlpt: 'N5' },
      ],
      grammarNote: 'あれ (are) refers to things distant from both the speaker and the listener, e.g. a monument or distant building.',
      replyJapanese: '遠くにある物や建物を指差して「あれは何ですか？」と尋ねてみましょう！',
      replyKana: 'とおくにあるものやたてものをゆびさして「あれはなんですか？」とたずねてみましょう！',
      replyRomaji: 'Tōku ni aru mono ya tatemono o yubisashite "Are wa nan desu ka?" to tazunete mimashō!',
      replyEnglish: 'Point toward a distant landmark and ask "Are wa nan desu ka?" (What is that over there?)!',
      suggestedReplies: ['Is it a temple?', 'Is it Tokyo Tower?', 'How do we get there?'],
    };
  }

  // 6. Pattern Matching: Meta Language ("How do you say [X] in Japanese?")
  const howSayMatch = lower.match(/(?:how do you say|how to say)\s+['"]?([^'"]+?)['"]?\s+(?:in japanese)?/i);
  if (howSayMatch) {
    const rawTarget = howSayMatch[1].replace(/[?!.]/g, '').trim();
    const entry = LEXICON_ENTRIES[rawTarget.toLowerCase()] || LEXICON_ENTRIES[rawTarget.toLowerCase().replace(/s$/, '')];
    const targetJa = entry ? entry.kanji.replace(/[!。？?]/g, '') : englishToKatakana(rawTarget);
    const targetKana = entry ? entry.kana.replace(/[!。？?]/g, '') : targetJa;
    const targetRomaji = entry ? entry.romaji.replace(/[!。？?]/g, '') : rawTarget;
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `「${rawTarget}」は日本語で「${targetJa}」と言います！`,
      kana: `「${rawTarget}」はにほんごで「${targetKana}」といいます！`,
      romaji: `"${rawTarget}" wa nihongo de "${targetRomaji}" to iimasu!`,
      english: `"${rawTarget}" is said as "${targetJa}" in Japanese!`,
      rubySegments: [
        { text: `「${rawTarget}」は`, isKanji: false },
        { text: '日本語', reading: 'にほんご', isKanji: true },
        { text: 'で「', isKanji: false },
        { text: targetJa, reading: targetKana, isKanji: /[\u4e00-\u9faf]/.test(targetJa) },
        { text: '」と', isKanji: false },
        { text: '言', reading: 'い', isKanji: true },
        { text: 'います！', isKanji: false },
      ],
      breakdown: [
        { surface: rawTarget, reading: rawTarget, romaji: rawTarget.toLowerCase(), pos: 'English phrase', meaning: rawTarget, jlpt: 'N5' },
        { surface: targetJa, reading: targetKana, romaji: targetRomaji.toLowerCase(), pos: entry?.pos || 'noun', meaning: rawTarget, jlpt: 'N5' },
        { surface: 'と言います', reading: 'といいます', romaji: 'to iimasu', pos: 'verb', meaning: 'is called / is said', jlpt: 'N5' },
      ],
      grammarNote: '〜は日本語で何と言いますか？ (wa nihongo de nan to iimasu ka?) is your golden phrase for asking native speakers how to say anything!',
      replyJapanese: `「${targetJa}」を使って、声に出して練習してみましょう！言えましたか？`,
      replyKana: `「${targetKana}」をつかって、こえにだしてれんしゅうしてみましょう！いえましたか？`,
      replyRomaji: `"${targetRomaji}" o tsukatte, koe ni dashite renshū shite mimashō! Iemashita ka?`,
      replyEnglish: `Try speaking "${targetJa}" aloud right now! Were you able to pronounce it comfortably?`,
      suggestedReplies: [`Yes, I said "${targetJa}"!`, 'Can you pronounce it again?', 'Teach me another word'],
    };
  }

  // 7. Pattern Matching: Farewells & Well-wishes
  if (/see you (tomorrow|later)|see ya/i.test(lower)) {
    const isTomorrow = /tomorrow/i.test(lower);
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: isTomorrow ? 'また明日！' : 'また後で！',
      kana: isTomorrow ? 'またあした！' : 'またあとで！',
      romaji: isTomorrow ? 'Mata ashita!' : 'Mata ato de!',
      english: isTomorrow ? 'See you tomorrow!' : 'See you later!',
      rubySegments: [
        { text: 'また', isKanji: false },
        { text: isTomorrow ? '明日' : '後', reading: isTomorrow ? 'あした' : 'あと', isKanji: true },
        { text: isTomorrow ? '！' : 'で！', isKanji: false },
      ],
      breakdown: [
        { surface: 'また', reading: 'また', romaji: 'mata', pos: 'adverb', meaning: 'again', jlpt: 'N5' },
        { surface: isTomorrow ? '明日' : '後で', reading: isTomorrow ? 'あした' : 'あとで', romaji: isTomorrow ? 'ashita' : 'ato de', pos: 'noun', meaning: isTomorrow ? 'tomorrow' : 'later on', jlpt: 'N5' },
      ],
      grammarNote: 'また (mata) means "again". Combine it with time words: また明日 (see you tomorrow), また来週 (see you next week)!',
      replyJapanese: 'はい！今日も素晴らしい勉強でしたね。次回も楽しみに待っています！',
      replyKana: 'はい！きょうもすばらしいべんきょうでしたね。じかいもたのしみにまっています！',
      replyRomaji: 'Hai! Kyō mo subarashii benkyō deshita ne. Jikai mo tanoshimi ni matte imasu!',
      replyEnglish: 'Yes! Wonderful practice today. Looking forward to our next lesson together!',
      suggestedReplies: ['Thank you Sensei', 'Have a good rest', 'Bye bye!'],
    };
  }

  if (/have a (nice|good|great) day/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '良い一日を！',
      kana: 'よいいちにちを！',
      romaji: 'Yoi ichinichi o!',
      english: 'Have a nice day!',
      rubySegments: [
        { text: '良', reading: 'よ', isKanji: true },
        { text: 'い', isKanji: false },
        { text: '一日', reading: 'いちにち', isKanji: true },
        { text: 'を！', isKanji: false },
      ],
      breakdown: [
        { surface: '良い', reading: 'よい', romaji: 'yoi', pos: 'i-adjective', meaning: 'good / pleasant', jlpt: 'N5' },
        { surface: '一日', reading: 'いちにち', romaji: 'ichinichi', pos: 'noun', meaning: 'one day / whole day', jlpt: 'N5' },
        { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'object particle (wishing)', jlpt: 'N5' },
      ],
      grammarNote: '良い一日を (Yoi ichinichi o) is short for 良い一日をお過ごしください (Please spend a wonderful day).',
      replyJapanese: 'ありがとうございます！あなたも笑顔あふれる素敵な一日をお過ごしくださいね。',
      replyKana: 'ありがとうございます！あなたもえがおあふれるすてきないちにちをおすごしくださいね。',
      replyRomaji: 'Arigatō gozaimasu! Anata mo egao afureru suteki na ichinichi o o-sugoshi kudasai ne.',
      replyEnglish: 'Thank you! Wishing you a wonderful day filled with smiles as well.',
      suggestedReplies: ['Thank you Sensei', 'See you tomorrow', 'You too!'],
    };
  }

  // 8. Pattern Matching: Speaking Speed & Comprehension
  if (/(?:speak slowly|speak more slowly|slow down)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'もう少しゆっくり話していただけますか？',
      kana: 'もうすこしゆっくりはなしていただけますか？',
      romaji: 'Mō sukoshi yukkuri hanashite itadakemasu ka?',
      english: 'Could you please speak a little more slowly?',
      rubySegments: [
        { text: 'もう', isKanji: false },
        { text: '少', reading: 'すこ', isKanji: true },
        { text: 'しゆっくり', isKanji: false },
        { text: '話', reading: 'はな', isKanji: true },
        { text: 'していただけますか？', isKanji: false },
      ],
      breakdown: [
        { surface: 'もう少し', reading: 'もうすこし', romaji: 'mou sukoshi', pos: 'adverb', meaning: 'a little more', jlpt: 'N5' },
        { surface: 'ゆっくり', reading: 'ゆっくり', romaji: 'yukkuri', pos: 'adverb', meaning: 'slowly / unhurriedly', jlpt: 'N5' },
        { surface: '話す', reading: 'はなす', romaji: 'hanasu', pos: 'verb', meaning: 'to speak', jlpt: 'N5' },
        { surface: 'していただけますか', reading: 'していただけますか', romaji: 'shite itadakemasu ka', pos: 'phrase', meaning: 'could you please do for me', jlpt: 'N4' },
      ],
      grammarNote: 'ゆっくり (yukkuri) means slowly. Adding もう少し (a little more) + ていただけますか softens the request beautifully.',
      replyJapanese: 'もちろんです！ゆっくり丁寧に発音しますので、何回でも聴き直してくださいね。',
      replyKana: 'もちろんです！ゆっくりていねいにはつおんしますので、なんかいでもききなおしてくださいね。',
      replyRomaji: 'Mochiron desu! Yukkuri teinei ni hatsuon shimasu node, nankai demo kikinaoshite kudasai ne.',
      replyEnglish: 'Of course! I will pronounce clearly and slowly, so feel free to listen as many times as you like.',
      suggestedReplies: ['Thank you Sensei', 'One more time please', 'I understand now!'],
    };
  }

  if (/(?:i don't understand|i do not understand)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '分かりません。',
      kana: 'わかりません。',
      romaji: 'Wakarimasen.',
      english: 'I do not understand.',
      rubySegments: [
        { text: '分', reading: 'わ', isKanji: true },
        { text: 'かりません。', isKanji: false },
      ],
      breakdown: [
        { surface: '分かります', reading: 'わかります', romaji: 'wakarimasu', pos: 'verb', meaning: 'to understand', jlpt: 'N5' },
        { surface: 'ません', reading: 'ません', romaji: 'masen', pos: 'suffix', meaning: 'polite negative', jlpt: 'N5' },
      ],
      grammarNote: '分かりません (wakarimasen) is the polite negative of 分かります (wakarimasu). It is completely acceptable to say this honestly when learning!',
      replyJapanese: '大丈夫ですよ！焦らずに一歩ずつ練習しましょう。どの部分をもう一度説明しましょうか？',
      replyKana: 'だいじょうぶですよ！あせらずにいっぽずつれんしゅうしましょう。どのぶぶんをもういちどせつめいしましょうか？',
      replyRomaji: 'Daijōbu desu yo! Aserazu ni ippo zutsu renshū shimashō. Dono bubun o mō ichido setsumei shimashō ka?',
      replyEnglish: 'Don\'t worry at all! Step-by-step is the best way to learn. Which part would you like me to explain again?',
      suggestedReplies: ['The vocabulary words', 'The grammar particles', 'How to pronounce it'],
    };
  }

  // 9. Pattern Matching: Buying & Shopping ("I want to buy [item]")
  const buyMatch = lower.match(/(?:i want to buy|can i buy|where can i buy)\s+(?:a\s+|an\s+|some\s+)?(.+)/i);
  if (buyMatch) {
    const rawItem = buyMatch[1].replace(/,?\s*please\b/gi, '').replace(/[?!.]/g, '').trim();
    const itemEntry = LEXICON_ENTRIES[rawItem.toLowerCase()] || LEXICON_ENTRIES[rawItem.toLowerCase().replace(/s$/, '')];
    const itemJa = itemEntry?.kanji.replace(/[!。？?]/g, '') || englishToKatakana(rawItem);
    const itemKana = itemEntry?.kana.replace(/[!。？?]/g, '') || itemJa;
    const itemRomaji = itemEntry?.romaji.replace(/[!。？?]/g, '') || rawItem;
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${itemJa}を買いたいです！`,
      kana: `${itemKana}をかいたいです！`,
      romaji: `${itemRomaji} o kaitai desu!`,
      english: `I want to buy ${rawItem}!`,
      rubySegments: [
        ...(itemEntry?.ruby || [{ text: itemJa, isKanji: /[\u4e00-\u9faf]/.test(itemJa) }]),
        { text: 'を', isKanji: false },
        { text: '買', reading: 'か', isKanji: true },
        { text: 'いたいです！', isKanji: false },
      ],
      breakdown: [
        { surface: itemJa, reading: itemKana, romaji: itemRomaji.toLowerCase(), pos: 'noun', meaning: rawItem, jlpt: 'N5' },
        { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'direct object marker', jlpt: 'N5' },
        { surface: '買いたい', reading: 'かいたい', romaji: 'kaitai', pos: 'verb', meaning: 'want to buy (-tai form of 買う)', jlpt: 'N5' },
        { surface: 'です', reading: 'です', romaji: 'desu', pos: 'copula', meaning: 'polite auxiliary', jlpt: 'N5' },
      ],
      grammarNote: '買う (kau, to buy) becomes 買いたい (kaitai, want to buy). Combine with を: [Item]を買いたいです.',
      replyJapanese: `お買い物ですね！「${itemJa}はどこに売っていますか？」と店員さんに聞いてみましょうか？`,
      replyKana: `おかいものですね！「${itemKana}はどこにうっていますか？」とてんいんさんにきいてみましょうか？`,
      replyRomaji: `O-kaimono desu ne! "${itemRomaji} wa doko ni utte imasu ka?" to ten'in-san ni kiite mimashō ka?`,
      replyEnglish: `Shopping time! Shall we try asking the store clerk: "Where is ${rawItem} sold?"`,
      suggestedReplies: ['How much does it cost?', 'Can I pay by credit card?', 'Where is the cashier?'],
    };
  }

  // 10. Pattern Matching: Greetings & Courtesies
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
    let itemJa = '';
    let itemKana = '';
    let itemRomaji = '';

    // Handle compound items like "delicious sushi", "spicy ramen"
    const lowerItem = rawItem.toLowerCase();
    if (lowerItem.includes('delicious') && lowerItem.includes('sushi')) {
      itemJa = '美味しい寿司';
      itemKana = 'おいしいすし';
      itemRomaji = 'oishii sushi';
    } else if (lowerItem.includes('delicious') && lowerItem.includes('ramen')) {
      itemJa = '美味しいラーメン';
      itemKana = 'おいしいらーめん';
      itemRomaji = 'oishii rāmen';
    } else {
      const itemEntry = LEXICON_ENTRIES[lowerItem] || LEXICON_ENTRIES[lowerItem.replace(/s$/, '')];
      itemJa = itemEntry?.kanji || englishToKatakana(rawItem);
      itemKana = itemEntry?.kana || itemJa;
      itemRomaji = itemEntry?.romaji || rawItem;
    }

    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${itemJa}を食べたいです！`,
      kana: `${itemKana}をたべたいです！`,
      romaji: `${itemRomaji} o tabetai desu!`,
      english: `I want to eat ${rawItem}!`,
      rubySegments: [
        { text: itemJa, isKanji: /[\u4e00-\u9faf]/.test(itemJa) },
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
    const placeLower = rawPlace.toLowerCase();
    
    // Check known location mappings
    let placeJa = '';
    let placeKana = '';
    let placeRomaji = '';
    let placeEntry = LEXICON_ENTRIES[placeLower];

    if (placeLower === 'bus stop' || placeLower === 'bus') {
      placeJa = 'バス停'; placeKana = 'ばすてい'; placeRomaji = 'basu-tei';
    } else if (placeLower === 'taxi stand' || placeLower === 'taxi') {
      placeJa = 'タクシー乗り場'; placeKana = 'たくしーのりば'; placeRomaji = 'takushī-noriba';
    } else if (placeLower.includes('subway')) {
      placeJa = '地下鉄の駅'; placeKana = 'ちかてつのえき'; placeRomaji = 'chikatetsu no eki';
    } else if (placeLower.includes('station') || placeLower === 'train station') {
      placeJa = '駅'; placeKana = 'えき'; placeRomaji = 'eki';
    } else if (placeLower === 'exit') {
      placeJa = '出口'; placeKana = 'でぐち'; placeRomaji = 'deguchi';
    } else if (placeLower === 'entrance') {
      placeJa = '入口'; placeKana = 'いりぐち'; placeRomaji = 'iriguchi';
    } else if (placeLower.includes('bathroom') || placeLower.includes('restroom')) {
      placeJa = 'お手洗い'; placeKana = 'おてあらい'; placeRomaji = 'o-tearai';
    } else if (placeLower === 'toilet') {
      placeJa = 'トイレ'; placeKana = 'といれ'; placeRomaji = 'toire';
    } else if (placeLower.includes('hotel')) {
      placeJa = 'ホテル'; placeKana = 'ほてる'; placeRomaji = 'hoteru';
    } else if (placeLower.includes('airport')) {
      placeJa = '空港'; placeKana = 'くうこう'; placeRomaji = 'kūkō';
    } else if (placeLower.includes('convenience store') || placeLower === 'kombini') {
      placeJa = 'コンビニ'; placeKana = 'こんびに'; placeRomaji = 'kombini';
    } else {
      placeEntry = LEXICON_ENTRIES[placeLower];
      placeJa = placeEntry?.kanji || englishToKatakana(rawPlace);
      placeKana = placeEntry?.kana || placeJa;
      placeRomaji = placeEntry?.romaji || rawPlace;
    }
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${placeJa}はどこですか？`,
      kana: `${placeKana}はどこですか？`,
      romaji: `${placeRomaji} wa doko desu ka?`,
      english: `Where is the ${rawPlace}?`,
      rubySegments: [
        ...(placeEntry?.ruby || [{ text: placeJa, isKanji: /[\u4e00-\u9faf]/.test(placeJa) }]),
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

  // 8. Pattern Matching: Requests ("Can I have [item], please" / "Please give me [item]" / "[item], please")
  let rawReq: string | null = null;
  const prefixReq = lower.match(/(?:can i have|could i have|please give me|i would like|i'd like)\s+(?:a\s+|an\s+|some\s+)?(.+)/i);
  const suffixReq = lower.match(/^(.+?)[,\s]+please$/i);
  if (prefixReq) {
    rawReq = prefixReq[1].replace(/,?\s*please\b/gi, '').replace(/[?!.]/g, '').trim();
  } else if (suffixReq && !/^(yes|no|thank you|thanks|hello|hi|please)$/i.test(suffixReq[1].trim())) {
    rawReq = suffixReq[1].replace(/[?!.]/g, '').trim();
  }

  if (rawReq) {
    const reqEntry = LEXICON_ENTRIES[rawReq.toLowerCase()] || LEXICON_ENTRIES[rawReq.toLowerCase().replace(/s$/, '')];
    const reqJa = reqEntry?.kanji.replace(/[!。？?]/g, '') || englishToKatakana(rawReq);
    const reqKana = reqEntry?.kana.replace(/[!。？?]/g, '') || reqJa;
    const reqRomaji = reqEntry?.romaji.replace(/[!。？?]/g, '') || rawReq;
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${reqJa}をください。`,
      kana: `${reqKana}をください。`,
      romaji: `${reqRomaji} o kudasai.`,
      english: `Could I have ${rawReq}, please?`,
      rubySegments: [
        ...(reqEntry?.ruby || [{ text: reqJa, isKanji: /[\u4e00-\u9faf]/.test(reqJa) }]),
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

  // 10. Pattern Matching: Likes, Loves & Dislikes
  const likeMatch = lower.match(/(?:i like|i love|i really like)\s+(.+)/i);
  if (likeMatch) {
    const rawItem = likeMatch[1].replace(/,?\s*please\b/gi, '').replace(/[?!.]/g, '').trim();
    const itemEntry = LEXICON_ENTRIES[rawItem.toLowerCase()] || LEXICON_ENTRIES[rawItem.toLowerCase().replace(/s$/, '')];
    const itemJa = itemEntry?.kanji || englishToKatakana(rawItem);
    const itemKana = itemEntry?.kana || itemJa;
    const itemRomaji = itemEntry?.romaji || rawItem;
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `私は${itemJa}が好きです！`,
      kana: `わたしは${itemKana}がすきです！`,
      romaji: `Watashi wa ${itemRomaji} ga suki desu!`,
      english: `I like ${rawItem}!`,
      rubySegments: [
        { text: '私', reading: 'わたし', isKanji: true },
        { text: `は${itemJa}が`, isKanji: false },
        { text: '好', reading: 'す', isKanji: true },
        { text: 'きです！', isKanji: false },
      ],
      breakdown: [
        { surface: '私', reading: 'わたし', romaji: 'watashi', pos: 'pronoun', meaning: 'I / me', jlpt: 'N5' },
        { surface: itemJa, reading: itemKana, romaji: itemRomaji.toLowerCase(), pos: 'noun', meaning: rawItem, jlpt: 'N5' },
        { surface: 'が好き', reading: 'がすき', romaji: 'ga suki', pos: 'na-adjective', meaning: 'fond of / like', jlpt: 'N5' },
      ],
      grammarNote: 'In Japanese, the thing you like is marked with the particle が (ga), not を (o): 〜が好きです (ga suki desu).',
      replyJapanese: `${itemJa}、とても素敵ですね！どんなところが一番好きですか？`,
      replyKana: `${itemKana}、とてもすてきですね！どんなところがいちばんすきですか？`,
      replyRomaji: `${itemRomaji}, totemo suteki desu ne! Donna tokoro ga ichiban suki desu ka?`,
      replyEnglish: `${rawItem} is wonderful! What do you like most about it?`,
      suggestedReplies: [`I love everything about ${rawItem}`, 'It is very fun', 'How about you, Sensei?'],
    };
  }

  // 11. Pattern Matching: Going / Traveling Destinations
  const goMatch = lower.match(/(?:i am going to|i'm going to|i will go to|i want to go to|let's go to)\s+(?:the\s+)?(.+)/i);
  if (goMatch) {
    const rawDest = goMatch[1].replace(/,?\s*please\b/gi, '').replace(/[?!.]/g, '').trim();
    const destEntry = LEXICON_ENTRIES[rawDest.toLowerCase()];
    const destJa = destEntry?.kanji || englishToKatakana(rawDest);
    const destKana = destEntry?.kana || destJa;
    const destRomaji = destEntry?.romaji || rawDest;
    const isWant = /want to/i.test(trimmed);
    const isLet = /let's/i.test(trimmed);
    const verbJa = isWant ? '行きたいです！' : isLet ? '行きましょう！' : '行きます。';
    const verbKana = isWant ? 'いきたいです！' : isLet ? 'いきましょう！' : 'いきます。';
    const verbRomaji = isWant ? 'ikitai desu!' : isLet ? 'ikimashō!' : 'ikimasu.';

    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${destJa}へ${verbJa}`,
      kana: `${destKana}へ${verbKana}`,
      romaji: `${destRomaji} e ${verbRomaji}`,
      english: isWant ? `I want to go to ${rawDest}!` : isLet ? `Let's go to ${rawDest}!` : `I am going to ${rawDest}.`,
      rubySegments: [
        ...(destEntry?.ruby || [{ text: destJa, isKanji: false }]),
        { text: 'へ', isKanji: false },
        { text: '行', reading: 'い', isKanji: true },
        { text: isWant ? 'きたいです！' : isLet ? 'きましょう！' : 'きます。', isKanji: false },
      ],
      breakdown: [
        { surface: destJa, reading: destKana, romaji: destRomaji.toLowerCase(), pos: 'noun', meaning: rawDest, jlpt: 'N5' },
        { surface: 'へ', reading: 'え', romaji: 'e', pos: 'particle', meaning: 'direction marker (towards)', jlpt: 'N5' },
        { surface: isWant ? '行きたい' : isLet ? '行きましょう' : '行きます', reading: verbKana.replace(/[！。]/g, ''), romaji: verbRomaji.replace(/[！。]/g, ''), pos: 'verb', meaning: isWant ? 'want to go' : isLet ? "let's go" : 'go (polite)', jlpt: 'N5' },
      ],
      grammarNote: 'The destination particle へ is written with the kana "he", but pronounced "e". You can also use に (ni) to indicate destinations.',
      replyJapanese: `${destJa}に行くのはとても楽しみですね！電車で行きますか？`,
      replyKana: `${destKana}にいくのはとてもたのしみですね！でんしゃでいきますか？`,
      replyRomaji: `${destRomaji} ni iku no wa totemo tanoshimi desu ne! Densha de ikimasu ka?`,
      replyEnglish: `Going to ${rawDest} sounds so exciting! Are you going by train?`,
      suggestedReplies: ['By train, please', 'By bullet train', 'Is it far from here?'],
    };
  }

  // 12. Pattern Matching: Language Learning & Abilities
  if (/(?:learning japanese|study japanese|learn japanese|practicing japanese|practice japanese|practice conversation|studying japanese)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '日本語を勉強しています！',
      kana: 'にほんごをべんきょうしています！',
      romaji: 'Nihongo o benkyō shite imasu!',
      english: 'I am studying Japanese!',
      rubySegments: [
        { text: '日本語', reading: 'にほんご', isKanji: true },
        { text: 'を', isKanji: false },
        { text: '勉強', reading: 'べんきょう', isKanji: true },
        { text: 'しています！', isKanji: false },
      ],
      breakdown: [
        { surface: '日本語', reading: 'にほんご', romaji: 'nihongo', pos: 'noun', meaning: 'Japanese language', jlpt: 'N5' },
        { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'object marker', jlpt: 'N5' },
        { surface: '勉強しています', reading: 'べんきょうしています', romaji: 'benkyou shite imasu', pos: 'verb', meaning: 'am studying (continuous)', jlpt: 'N5' },
      ],
      grammarNote: '〜ています (te imasu) represents an ongoing state or habit: 勉強する (to study) → 勉強しています (am studying).',
      replyJapanese: '毎日コツコツ勉強していて素晴らしいですね！どの部分が一番面白いですか？',
      replyKana: 'まいにちこつこつべんきょうしていてすばらしいですね！どのぶぶんがいちばんおもしろいですか？',
      replyRomaji: 'Mainichi kotsukotsu benkyō shite ite subarashii desu ne! Dono bubun ga ichiban omoshiroi desu ka?',
      replyEnglish: 'Your steady daily practice is wonderful! What part do you find most interesting—kanji, speaking, or vocabulary?',
      suggestedReplies: ['Speaking conversationally', 'Learning Kanji characters', 'Watching anime without subtitles'],
    };
  }

  // 13. Pattern Matching: Common Inquiries & Requests
  if (/(?:can you help me|please help me|could you help)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '手伝っていただけますか？',
      kana: 'てつだっていただけますか？',
      romaji: 'Tetsudatte itadakemasu ka?',
      english: 'Could you please help me?',
      rubySegments: [
        { text: '手伝', reading: 'てつだ', isKanji: true },
        { text: 'っていただけますか？', isKanji: false },
      ],
      breakdown: [
        { surface: '手伝う', reading: 'てつだう', romaji: 'tetsudau', pos: 'verb', meaning: 'to help / assist', jlpt: 'N5' },
        { surface: 'いただけますか', reading: 'いただけますか', romaji: 'itadakemasu ka', pos: 'verb', meaning: 'could I receive (polite request)', jlpt: 'N4' },
      ],
      grammarNote: '〜ていただけますか (te itadakemasu ka) is an ultra-polite formula to ask for assistance or favors.',
      replyJapanese: 'もちろんです！何でも聞いてください。喜んでお手伝いしますよ。',
      replyKana: 'もちろんです！なんでもきいてください。よろこんでおてつだいしますよ。',
      replyRomaji: 'Mochiron desu! Nan demo kiite kudasai. Yorokonde o-tetsudai shimasu yo.',
      replyEnglish: 'Of course! Please ask me anything. I would be delighted to assist you.',
      suggestedReplies: ['Where is the train station?', 'How do I say this in Japanese?', 'Can you speak slowly?'],
    };
  }

  if (/(?:what are you doing)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '何をしていますか？',
      kana: 'なにをしていますか？',
      romaji: 'Nani o shite imasu ka?',
      english: 'What are you doing?',
      rubySegments: [
        { text: '何', reading: 'なに', isKanji: true },
        { text: 'をしていますか？', isKanji: false },
      ],
      breakdown: [
        { surface: '何', reading: 'なに', romaji: 'nani', pos: 'interrogative', meaning: 'what', jlpt: 'N5' },
        { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'object marker', jlpt: 'N5' },
        { surface: 'していますか', reading: 'していますか', romaji: 'shite imasu ka', pos: 'verb', meaning: 'are you doing? (question)', jlpt: 'N5' },
      ],
      grammarNote: 'する (suru, to do) becomes していますか (shite imasu ka, are you doing?). 何 is pronounced "nani" before を.',
      replyJapanese: '私はあなたと楽しく日本語でお話ししていますよ！あなたは何をしていますか？',
      replyKana: 'わたしはあなたとたのしくにほんごでおはなししていますよ！あなたはいまなにをしていますか？',
      replyRomaji: 'Watashi wa anata to tanoshiku nihongo de ohanashi shite imasu yo! Anata wa ima nani o shite imasu ka?',
      replyEnglish: 'I am having a fun Japanese conversation with you! What are you doing right now?',
      suggestedReplies: ['I am learning Japanese', 'I am relaxing at home', 'I am getting ready to travel'],
    };
  }

  if (/(?:where do you live|where are you living)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'どこに住んでいますか？',
      kana: 'どこにすんでいますか？',
      romaji: 'Doko ni sunde imasu ka?',
      english: 'Where do you live?',
      rubySegments: [
        { text: 'どこに', isKanji: false },
        { text: '住', reading: 'す', isKanji: true },
        { text: 'んでいますか？', isKanji: false },
      ],
      breakdown: [
        { surface: 'どこ', reading: 'どこ', romaji: 'doko', pos: 'interrogative', meaning: 'where', jlpt: 'N5' },
        { surface: 'に', reading: 'に', romaji: 'ni', pos: 'particle', meaning: 'location particle', jlpt: 'N5' },
        { surface: '住んでいますか', reading: 'すんでいますか', romaji: 'sunde imasu ka', pos: 'verb', meaning: 'are you living? (question)', jlpt: 'N5' },
      ],
      grammarNote: '住む (sumu, to reside) pairs with に (ni) to indicate the location where one lives: [Location]に住んでいます.',
      replyJapanese: '私は日本の東京に住んでいますよ！あなたはどの街にお住まいですか？',
      replyKana: 'わたしはにほんのとうきょうにすんでいますよ！あなたはどのまちにおすまいですか？',
      replyRomaji: 'Watashi wa Nihon no Tōkyō ni sunde imasu yo! Anata wa dono machi ni o-sumai desu ka?',
      replyEnglish: 'I live in Tokyo, Japan! Which city or town do you live in?',
      suggestedReplies: ['I live in New York', 'I live in London', 'I live in California'],
    };
  }

  // 14. Pattern Matching: Living in a location ("I live in [place]")
  const liveMatch = lower.match(/(?:i live in|i am living in|i'm living in)\s+(.+)/i);
  if (liveMatch) {
    const rawPlace = liveMatch[1].replace(/[?!.]/g, '').trim();
    const placeJa = englishToKatakana(rawPlace);
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `私は${placeJa}に住んでいます。`,
      kana: `わたしは${placeJa}にすんでいます。`,
      romaji: `Watashi wa ${rawPlace} ni sunde imasu.`,
      english: `I live in ${rawPlace}.`,
      rubySegments: [
        { text: '私', reading: 'わたし', isKanji: true },
        { text: `は${placeJa}に`, isKanji: false },
        { text: '住', reading: 'す', isKanji: true },
        { text: 'んでいます。', isKanji: false },
      ],
      breakdown: [
        { surface: '私', reading: 'わたし', romaji: 'watashi', pos: 'pronoun', meaning: 'I / me', jlpt: 'N5' },
        { surface: placeJa, reading: placeJa, romaji: rawPlace.toLowerCase(), pos: 'proper noun', meaning: rawPlace, jlpt: 'N5' },
        { surface: 'に住んでいます', reading: 'にすんでいます', romaji: 'ni sunde imasu', pos: 'verb', meaning: 'live in (present state)', jlpt: 'N5' },
      ],
      grammarNote: 'Place + に住んでいます (ni sunde imasu) is the standard way to state where your home or residence is.',
      replyJapanese: `${placeJa}にお住まいなんですね！とても魅力的な街だと聞いています。`,
      replyKana: `${placeJa}におすまいなんですね！とてもみりょくてきなまちだときいています。`,
      replyRomaji: `${rawPlace} ni o-sumai nan desu ne! Totemo miryokuteki na machi da to kiite imasu.`,
      replyEnglish: `So you live in ${rawPlace}! I hear it is such a wonderful place to live.`,
      suggestedReplies: ['Have you ever visited?', 'It is a lively city', 'I love living there'],
    };
  }

  // 15. Pattern Matching: Restaurant & Dining Inquiries
  if (/(?:check please|bill please|the check|the bill|can i have the check|can we have the check)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'お会計をお願いします。',
      kana: 'おかいけいをおねがいします。',
      romaji: 'O-kaikei o onegai shimasu.',
      english: 'The check, please. / Could we have the bill?',
      rubySegments: [
        { text: 'お', isKanji: false },
        { text: '会計', reading: 'かいけい', isKanji: true },
        { text: 'をお', isKanji: false },
        { text: '願', reading: 'ねが', isKanji: true },
        { text: 'いします。', isKanji: false },
      ],
      breakdown: [
        { surface: 'お会計', reading: 'おかいけい', romaji: 'o-kaikei', pos: 'noun', meaning: 'bill / check (polite)', jlpt: 'N5' },
        { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'object marker', jlpt: 'N5' },
        { surface: 'お願いします', reading: 'おねがいします', romaji: 'onegai shimasu', pos: 'phrase', meaning: 'please / I request', jlpt: 'N5' },
      ],
      grammarNote: 'お会計をお願いします (O-kaikei o onegai shimasu) is the polite, standard way to ask for the bill at restaurants and cafés in Japan.',
      replyJapanese: '「ごちそうさまでした、お会計をお願いします」と伝えるととてもスマートですよ！レジに向かいましょう。',
      replyKana: '「ごちそうさまでした、おかいけいをおねがいします」とつたえるととてもすまーとですよ！れじにむかいましょう。',
      replyRomaji: '"Gochisōsama deshita, o-kaikei o onegai shimasu" to tsutaeru to totemo sumāto desu yo! Reji ni mukaimashō.',
      replyEnglish: 'Saying "Gochisōsama deshita, o-kaikei o onegai shimasu" is very natural and polite! Let\'s head to the register.',
      suggestedReplies: ['Can I pay by credit card?', 'Receipt, please', 'Thank you for the delicious meal!'],
    };
  }

  if (/(?:credit card|pay by card|by credit card|card payment)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'クレジットカードで払えますか？',
      kana: 'くれじっとかーどではらえますか？',
      romaji: 'Kurejitto kādo de haraemasu ka?',
      english: 'Can I pay by credit card?',
      rubySegments: [
        { text: 'クレジットカードで', isKanji: false },
        { text: '払', reading: 'はら', isKanji: true },
        { text: 'えますか？', isKanji: false },
      ],
      breakdown: [
        { surface: 'クレジットカード', reading: 'くれじっとかーど', romaji: 'kurejitto kaado', pos: 'noun', meaning: 'credit card', jlpt: 'N5' },
        { surface: 'で', reading: 'で', romaji: 'de', pos: 'particle', meaning: 'by means of', jlpt: 'N5' },
        { surface: '払えますか', reading: 'はらえますか', romaji: 'haraemasu ka', pos: 'verb', meaning: 'can I pay? (potential form)', jlpt: 'N4' },
      ],
      grammarNote: '払う (harau, to pay) conjugates to potential form 払えます (haraemasu, can pay). で indicates the method of payment.',
      replyJapanese: '「はい、VISAもMastercardも使えますよ」と店員さんが端末を案内してくれますよ！',
      replyKana: '「はい、びざもますたーかーどもつかえますよ」とてんいんさんがたんまつをあんないしてくれますよ！',
      replyRomaji: '"Hai, VISA mo Mastercard mo tsukaemasu yo" to ten\'in-san ga tammatsu o annai shite kuremasu yo!',
      replyEnglish: 'Staff will reply: "Yes, both Visa and Mastercard are accepted," and guide you to the card reader.',
      suggestedReplies: ['Touch to pay, please', 'Here is my card', 'Receipt, please'],
    };
  }

  if (/(?:receipt please|can i have a receipt|give me a receipt)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'レシートをお願いします。',
      kana: 'れしーとをおねがいします。',
      romaji: 'Reshīto o onegai shimasu.',
      english: 'Receipt, please.',
      rubySegments: [
        { text: 'レシートをお', isKanji: false },
        { text: '願', reading: 'ねが', isKanji: true },
        { text: 'いします。', isKanji: false },
      ],
      breakdown: [
        { surface: 'レシート', reading: 'れしーと', romaji: 'reshiito', pos: 'noun', meaning: 'receipt', jlpt: 'N5' },
        { surface: 'をお願いします', reading: 'をおねがいします', romaji: 'o onegai shimasu', pos: 'phrase', meaning: 'please give me', jlpt: 'N5' },
      ],
      grammarNote: 'レシート (reshīto) is used for standard store receipts. Formal business tax receipts are called 領収書 (ryōshūsho).',
      replyJapanese: 'お会計の後に「レシートをお願いします」と言えば笑顔で手渡してくれますよ！',
      replyKana: 'おかいけいのあとに「れしーとをおねがいします」といえばえがおでてわたしてくれますよ！',
      replyRomaji: 'O-kaikei no ato ni "Reshīto o onegai shimasu" to ieba egao de tewatashite kuremasu yo!',
      replyEnglish: 'Say "Reshīto o onegai shimasu" at checkout and the cashier will hand it over with a smile!',
      suggestedReplies: ['Thank you very much', 'Have a good day', 'See you later!'],
    };
  }

  if (/(?:see the menu|menu please|can i see a menu|english menu)/i.test(lower)) {
    const isEnglish = /english/i.test(lower);
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: isEnglish ? '英語のメニューはありますか？' : 'メニューを見せていただけますか？',
      kana: isEnglish ? 'えいごのめにゅーはありますか？' : 'めにゅーをみせていただけますか？',
      romaji: isEnglish ? 'Eigo no menyū wa arimasu ka?' : 'Menyū o misete itadakemasu ka?',
      english: isEnglish ? 'Do you have an English menu?' : 'Could you please show me the menu?',
      rubySegments: [
        { text: isEnglish ? '英語' : 'メニューを', reading: isEnglish ? 'えいご' : undefined, isKanji: isEnglish },
        { text: isEnglish ? 'のメニューはありますか？' : '見', reading: isEnglish ? undefined : 'み', isKanji: !isEnglish },
        { text: isEnglish ? '' : 'せていただけますか？', isKanji: false },
      ],
      breakdown: [
        { surface: isEnglish ? '英語' : 'メニュー', reading: isEnglish ? 'えいご' : 'めにゅー', romaji: isEnglish ? 'eigo' : 'menyuu', pos: 'noun', meaning: isEnglish ? 'English' : 'menu', jlpt: 'N5' },
        { surface: isEnglish ? 'ありますか' : '見せていただけますか', reading: isEnglish ? 'ありますか' : 'みせていただけますか', romaji: isEnglish ? 'arimasu ka' : 'misete itadakemasu ka', pos: 'verb', meaning: isEnglish ? 'is there?' : 'could I see?', jlpt: 'N5' },
      ],
      grammarNote: '〜を見せていただけますか (o misete itadakemasu ka) is an ultra-polite request meaning "Could you please show me...".',
      replyJapanese: '「はい、どうぞ！こちらがメニューです」と店員さんが持ってきてくれますよ。',
      replyKana: '「はい、どうぞ！こちらがめにゅーです」とてんいんさんがもってきてくれますよ。',
      replyRomaji: '"Hai, dōzo! Kochira ga menyū desu" to ten\'in-san ga motte kite kuremasu yo.',
      replyEnglish: 'Staff will smile and say: "Hai, dōzo! (Here you are!) Here is the menu."',
      suggestedReplies: ['What is your recommendation?', 'I will order water first', 'One ramen, please'],
    };
  }

  if (/(?:recommend|recommendation|what do you recommend)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'おすすめは何ですか？',
      kana: 'おすすめはなんですか？',
      romaji: 'Osusume wa nan desu ka?',
      english: 'What do you recommend?',
      rubySegments: [
        { text: 'おすすめは', isKanji: false },
        { text: '何', reading: 'なん', isKanji: true },
        { text: 'ですか？', isKanji: false },
      ],
      breakdown: [
        { surface: 'おすすめ', reading: 'おすすめ', romaji: 'osusume', pos: 'noun', meaning: 'recommendation', jlpt: 'N5' },
        { surface: 'は', reading: 'は', romaji: 'wa', pos: 'particle', meaning: 'topic marker', jlpt: 'N5' },
        { surface: '何', reading: 'なん', romaji: 'nan', pos: 'interrogative', meaning: 'what', jlpt: 'N5' },
        { surface: 'ですか', reading: 'ですか', romaji: 'desu ka', pos: 'phrase', meaning: 'is it?', jlpt: 'N5' },
      ],
      grammarNote: 'おすすめ (osusume) means recommendation. In restaurants, staff love when customers ask "Osusume wa nan desu ka?".',
      replyJapanese: '本場の握り寿司や、出来立ての温かい豚骨ラーメンが一番のおすすめですよ！何が食べたい気分ですか？',
      replyKana: 'ほんばのにぎりずしや、できたてのあたたかいとんこつらーめんがいちばんのおすすめですよ！なにがたべたいきぶんですか？',
      replyRomaji: 'Homba no nigirizushi ya, dekitate no atatakai tonkotsu rāmen ga ichiban no osusume desu yo! Nani ga tabetai kibun desu ka?',
      replyEnglish: 'Freshly pressed nigiri sushi and steaming hot tonkotsu ramen are my top recommendations! What are you craving?',
      suggestedReplies: ['I will have the sushi, please', 'Ramen sounds amazing', 'Is it spicy?'],
    };
  }

  // 16. Pattern Matching: Transportation & Transit (Taxi, Bus, Stations, Exits)
  if (/(?:find a taxi|catch a taxi|where.*taxi|taxi stand|take a taxi)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'タクシー乗り場はどこですか？',
      kana: 'たくしーのりばはどこですか？',
      romaji: 'Takushī-noriba wa doko desu ka?',
      english: 'Where is the taxi stand?',
      rubySegments: [
        { text: 'タクシー', isKanji: false },
        { text: '乗', reading: 'の', isKanji: true },
        { text: 'り', isKanji: false },
        { text: '場', reading: 'ば', isKanji: true },
        { text: 'はどこですか？', isKanji: false },
      ],
      breakdown: [
        { surface: 'タクシー乗り場', reading: 'たくしーのりば', romaji: 'takushii noriba', pos: 'noun', meaning: 'taxi stand', jlpt: 'N5' },
        { surface: 'はどこですか', reading: 'はどこですか', romaji: 'wa doko desu ka', pos: 'phrase', meaning: 'where is...?', jlpt: 'N5' },
      ],
      grammarNote: '乗り場 (noriba) means boarding area or stand. Combine it with バス (bus) or タクシー (taxi)!',
      replyJapanese: '駅の改札を出てすぐのロータリーにタクシー乗り場がありますよ！運転手さんに行き先を伝えてみましょう。',
      replyKana: 'えきのかいさつをでてすぐのろーたりーにたくしーのりばがありますよ！うんてんしゅさんにいきさきをつたえてみましょう。',
      replyRomaji: 'Eki no kaisatsu o dete sugu no rōtarī ni takushī-noriba ga arimasu yo! Untenshu-san ni ikisaki o tsutaete mimashō.',
      replyEnglish: 'There is a taxi stand right outside the station ticket gates! Just tell the driver your destination.',
      suggestedReplies: ['To the hotel, please', 'To Tokyo Station, please', 'How much does it cost?'],
    };
  }

  if (/(?:bus stop|where.*bus)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: 'バス停はどこですか？',
      kana: 'ばすていはどこですか？',
      romaji: 'Basu-tei wa doko desu ka?',
      english: 'Where is the bus stop?',
      rubySegments: [
        { text: 'バス', isKanji: false },
        { text: '停', reading: 'てい', isKanji: true },
        { text: 'はどこですか？', isKanji: false },
      ],
      breakdown: [
        { surface: 'バス停', reading: 'ばすてい', romaji: 'basutei', pos: 'noun', meaning: 'bus stop', jlpt: 'N5' },
        { surface: 'はどこですか', reading: 'はどこですか', romaji: 'wa doko desu ka', pos: 'phrase', meaning: 'where is...?', jlpt: 'N5' },
      ],
      grammarNote: 'バス停 (basutei) is short for バス停留所 (bus teiryūjo). You can pay with your Suica or Pasmo IC card!',
      replyJapanese: 'あちらの横断歩道を渡った先にバス停がありますよ。何番のバスに乗りますか？',
      replyKana: 'あちらのおうだんほどうをわたったさきにばすていがありますよ。なんばんのばすにのりますか？',
      replyRomaji: 'Achira no ōdanhodō o watatta saki ni basu-tei ga arimasu yo. Namban no basu ni norimasu ka?',
      replyEnglish: 'The bus stop is just across that pedestrian crossing. Which bus number are you taking?',
      suggestedReplies: ['To the airport, please', 'Bus number 5', 'Can I use an IC card?'],
    };
  }

  if (/(?:where.*exit|which way.*exit)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '出口はどこですか？',
      kana: 'でぐちはどこですか？',
      romaji: 'Deguchi wa doko desu ka?',
      english: 'Where is the exit?',
      rubySegments: [
        { text: '出口', reading: 'でぐち', isKanji: true },
        { text: 'はどこですか？', isKanji: false },
      ],
      breakdown: [
        { surface: '出口', reading: 'でぐち', romaji: 'deguchi', pos: 'noun', meaning: 'exit', jlpt: 'N5' },
        { surface: 'はどこですか', reading: 'はどこですか', romaji: 'wa doko desu ka', pos: 'phrase', meaning: 'where is...?', jlpt: 'N5' },
      ],
      grammarNote: '出口 (deguchi) combines 出 (exit/out) + 口 (opening/mouth). Entrance is 入口 (iriguchi).',
      replyJapanese: '黄色い案内板に「出口 (EXIT)」と書かれていますよ。エスカレーターを上がってみましょう！',
      replyKana: 'きいろいあんないばんに「でぐち」とかかれていますよ。えすかれーたーをあがってみましょう！',
      replyRomaji: 'Kiiroi annaiban ni "Deguchi" to kakarete imasu yo. Esukarētā o agatte mimashō!',
      replyEnglish: 'Follow the yellow signs marked "出口 (EXIT)". Let\'s take the escalator up!',
      suggestedReplies: ['North exit, please', 'Where is the elevator?', 'Thank you very much'],
    };
  }

  // 17. Pattern Matching: Photography & Wi-Fi
  if (/(?:take a photo|take a picture|take my picture|take our picture)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '写真を撮っていただけますか？',
      kana: 'しゃしんをとっていただけますか？',
      romaji: 'Shashin o totte itadakemasu ka?',
      english: 'Could you please take a photo for me?',
      rubySegments: [
        { text: '写真', reading: 'しゃしん', isKanji: true },
        { text: 'を', isKanji: false },
        { text: '撮', reading: 'と', isKanji: true },
        { text: 'っていただけますか？', isKanji: false },
      ],
      breakdown: [
        { surface: '写真', reading: 'しゃしん', romaji: 'shashin', pos: 'noun', meaning: 'photograph', jlpt: 'N5' },
        { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'object marker', jlpt: 'N5' },
        { surface: '撮る', reading: 'とる', romaji: 'toru', pos: 'verb', meaning: 'to take (a photo)', jlpt: 'N5' },
        { surface: 'いただけますか', reading: 'いただけますか', romaji: 'itadakemasu ka', pos: 'phrase', meaning: 'could you please', jlpt: 'N4' },
      ],
      grammarNote: '写真 (shashin) + を撮る (o toru) = to take a photo. When someone agrees, say はい、チーズ (Hai, chiizu)!',
      replyJapanese: '「はい、喜んで！はい、チーズ！」と笑顔で撮ってくれますよ。素敵な記念写真になりそうですね！',
      replyKana: '「はい、よろこんで！はい、ちーず！」とえがおでとってくれますよ。すてきなきねんしゃしんになりそうですね！',
      replyRomaji: '"Hai, yorokonde! Hai, chīzu!" to egao de totte kuremasu yo. Suteki na kinen shashin ni narisō desu ne!',
      replyEnglish: 'People will gladly reply: "Yes, with pleasure! Say cheese!" It will make a wonderful keepsake memory.',
      suggestedReplies: ['One more picture, please', 'Thank you very much!', 'With Mt. Fuji in the background'],
    };
  }

  if (/(?:wifi|wi-fi|free wifi|internet)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '無料Wi-Fiはありますか？',
      kana: 'むりょうわいふぁいはありますか？',
      romaji: 'Muryō waifai wa arimasu ka?',
      english: 'Is there free Wi-Fi here?',
      rubySegments: [
        { text: '無料', reading: 'むりょう', isKanji: true },
        { text: 'Wi-Fiはありますか？', isKanji: false },
      ],
      breakdown: [
        { surface: '無料', reading: 'むりょう', romaji: 'muryou', pos: 'noun', meaning: 'free of charge', jlpt: 'N5' },
        { surface: 'Wi-Fi', reading: 'わいふぁい', romaji: 'waifai', pos: 'noun', meaning: 'Wi-Fi', jlpt: 'N5' },
        { surface: 'ありますか', reading: 'ありますか', romaji: 'arimasu ka', pos: 'verb', meaning: 'is there? (existence)', jlpt: 'N5' },
      ],
      grammarNote: '無料 (muryō) means free/complimentary. To ask for the password, say: パスワードは何ですか？ (Pasuwādo wa nan desu ka?).',
      replyJapanese: '「はい、レシートの下にパスワードが書いてありますよ」と教えてもらえますよ！',
      replyKana: '「はい、れしーとのしたにぱすわーどがかいてありますよ」とおしえてもらえますよ！',
      replyRomaji: '"Hai, reshīto no shita ni pasuwādo ga kaite arimasu yo" to oshiete moraemasu yo!',
      replyEnglish: 'They will tell you: "Yes, the password is printed at the bottom of your receipt!"',
      suggestedReplies: ['What is the password?', 'Thank you very much', 'Is it fast?'],
    };
  }

  // 18. Pattern Matching: Borrowing & Everyday Requests ("Can I borrow a pen?")
  const borrowMatch = lower.match(/(?:can i borrow|could i borrow|lend me)\s+(?:a\s+|an\s+|some\s+)?(.+)/i);
  if (borrowMatch) {
    const rawObj = borrowMatch[1].replace(/,?\s*please\b/gi, '').replace(/[?!.]/g, '').trim();
    const objEntry = LEXICON_ENTRIES[rawObj.toLowerCase()] || LEXICON_ENTRIES[rawObj.toLowerCase().replace(/s$/, '')];
    const objJa = objEntry?.kanji.replace(/[!。？?]/g, '') || englishToKatakana(rawObj);
    const objKana = objEntry?.kana.replace(/[!。？?]/g, '') || objJa;
    const objRomaji = objEntry?.romaji.replace(/[!。？?]/g, '') || rawObj;
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${objJa}をお借りできますか？`,
      kana: `${objKana}をおかりできますか？`,
      romaji: `${objRomaji} o o-kari dekimasu ka?`,
      english: `Could I please borrow ${rawObj}?`,
      rubySegments: [
        { text: objJa, isKanji: /[\u4e00-\u9faf]/.test(objJa) },
        { text: 'をお', isKanji: false },
        { text: '借', reading: 'か', isKanji: true },
        { text: 'りできますか？', isKanji: false },
      ],
      breakdown: [
        { surface: objJa, reading: objKana, romaji: objRomaji.toLowerCase(), pos: 'noun', meaning: rawObj, jlpt: 'N5' },
        { surface: 'をお借りできますか', reading: 'をおかりできますか', romaji: 'o okari dekimasu ka', pos: 'phrase', meaning: 'could I borrow (polite humble)', jlpt: 'N4' },
      ],
      grammarNote: 'お借りする (o-kari suru) is the respectful polite form of 借りる (kariru, to borrow). Adding できますか makes it very polite.',
      replyJapanese: '「どうぞ、使ってください！」と快く貸してくれますよ。使い終わったら「ありがとうございました」とお礼を伝えましょう！',
      replyKana: '「どうぞ、つかってください！」とこころよくかしてくれますよ。つかいおわったら「ありがとうございました」とおれいをつたえましょう！',
      replyRomaji: '"Dōzo, tsukatte kudasai!" to kokoroyoku kashite kuremasu yo. Tsukai-owattara "Arigatō gozaimashita" to orei o tsutaemashō!',
      replyEnglish: 'They will gladly reply: "Please go ahead and use it!" When done, remember to say "Arigatō gozaimashita"!',
      suggestedReplies: ['Thank you so much', 'I will return it right away', 'Very helpful!'],
    };
  }

  // 19. Pattern Matching: Social, Greetings & Together
  if (/(?:good morning teacher|good morning sensei)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '先生、おはようございます！',
      kana: 'せんせい、おはようございます！',
      romaji: 'Sensei, ohayō gozaimasu!',
      english: 'Good morning, Sensei!',
      rubySegments: [
        { text: '先生', reading: 'せんせい', isKanji: true },
        { text: '、おはようございます！', isKanji: false },
      ],
      breakdown: [
        { surface: '先生', reading: 'せんせい', romaji: 'sensei', pos: 'noun', meaning: 'teacher / instructor', jlpt: 'N5' },
        { surface: 'おはようございます', reading: 'おはようございます', romaji: 'ohayou gozaimasu', pos: 'greeting', meaning: 'good morning (polite)', jlpt: 'N5' },
      ],
      grammarNote: 'In Japan, students address their instructors by title: 先生 (Sensei). Adding it before the greeting sounds very polite and affectionate!',
      replyJapanese: 'おはようございます！今日も元気いっぱいに楽しく日本語を練習しましょうね！',
      replyKana: 'おはようございます！きょうもげんきいっぱいにつたのしくにほんごをれんしゅうしましょうね！',
      replyRomaji: 'Ohayō gozaimasu! Kyō mo genki ippai ni tanoshiku nihongo o renshū shimashō ne!',
      replyEnglish: 'Good morning! Let\'s have a fun, energetic Japanese conversation today as well!',
      suggestedReplies: ['Let\'s start the lesson!', 'I am ready to learn', 'Teach me useful phrases today'],
    };
  }

  if (/(?:how was your day|how is your day)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '今日はどんな一日でしたか？',
      kana: 'きょうはどんないちにちでしたか？',
      romaji: 'Kyō wa donna ichinichi deshita ka?',
      english: 'How was your day today?',
      rubySegments: [
        { text: '今日', reading: 'きょう', isKanji: true },
        { text: 'はどんな', isKanji: false },
        { text: '一日', reading: 'いちにち', isKanji: true },
        { text: 'でしたか？', isKanji: false },
      ],
      breakdown: [
        { surface: '今日', reading: 'きょう', romaji: 'kyou', pos: 'noun', meaning: 'today', jlpt: 'N5' },
        { surface: 'どんな', reading: 'どんな', romaji: 'donna', pos: 'interrogative', meaning: 'what kind of', jlpt: 'N5' },
        { surface: '一日', reading: 'いちにち', romaji: 'ichinichi', pos: 'noun', meaning: 'day / whole day', jlpt: 'N5' },
        { surface: 'でしたか', reading: 'でしたか', romaji: 'deshita ka', pos: 'copula', meaning: 'was it? (past polite)', jlpt: 'N5' },
      ],
      grammarNote: 'どんな一日でしたか？ is a wonderful question to ask friends, colleagues, or your teacher at the end of the day.',
      replyJapanese: '今日もあなたと一緒に日本語のレッスンができて、とても充実した楽しい一日ですよ！あなたの一日はいかがでしたか？',
      replyKana: 'きょうもあなたといっしょににほんごのれっすんができて、とてもじゅうじつしたたのしいいちにちですよ！あなたはいかがでしたか？',
      replyRomaji: 'Kyō mo anata to issho ni nihongo no ressun ga dekite, totemo jūjitsu shita tanoshii ichinichi desu yo! Anata wa ikaga deshita ka?',
      replyEnglish: 'Practicing Japanese with you made it such a joyful and rewarding day! How did your own day go?',
      suggestedReplies: ['It was very productive', 'A little tiring, but good', 'I had a relaxing day'],
    };
  }

  if (/(?:let's study together|study together)/i.test(lower)) {
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: '一緒に勉強しましょう！',
      kana: 'いっしょにべんきょうしましょう！',
      romaji: 'Issho ni benkyō shimashō!',
      english: 'Let\'s study together!',
      rubySegments: [
        { text: '一緒', reading: 'いっしょ', isKanji: true },
        { text: 'に', isKanji: false },
        { text: '勉強', reading: 'べんきょう', isKanji: true },
        { text: 'しましょう！', isKanji: false },
      ],
      breakdown: [
        { surface: '一緒に', reading: 'いっしょに', romaji: 'issho ni', pos: 'adverb', meaning: 'together', jlpt: 'N5' },
        { surface: '勉強しましょう', reading: 'べんきょうしましょう', romaji: 'benkyou shimashou', pos: 'verb', meaning: "let's study (invitational)", jlpt: 'N5' },
      ],
      grammarNote: '〜ましょう (mashō) turns any polite verb into a friendly invitation: "Let\'s do [verb]!".',
      replyJapanese: 'はい、大賛成です！一緒に楽しく勉強すれば、会話もどんどん上達しますよ！',
      replyKana: 'はい、だいさんせいです！いっしょにたのしくべんきょうすれば、かいわもどんどんじょうたつしますよ！',
      replyRomaji: 'Hai, daisansei desu! Issho ni tanoshiku benkyō sureba, kaiwa mo dondon jōtatsu shimasu yo!',
      replyEnglish: 'Yes, absolutely! Studying together makes speaking skills improve rapidly and pleasantly!',
      suggestedReplies: ['Teach me more travel phrases', 'Let\'s practice ordering food', 'Can we practice kanji?'],
    };
  }

  // 20. Pattern Matching: Past Actions ("I went to [place]", "I ate [food]", "I saw / watched [thing]")
  const wentMatch = lower.match(/(?:i went to|we went to)\s+(?:the\s+)?(.+)/i);
  if (wentMatch) {
    const rawDest = wentMatch[1].replace(/[?!.]/g, '').trim();
    const destEntry = LEXICON_ENTRIES[rawDest.toLowerCase()];
    const destJa = destEntry?.kanji.replace(/[!。？?]/g, '') || englishToKatakana(rawDest);
    const destKana = destEntry?.kana.replace(/[!。？?]/g, '') || destJa;
    const destRomaji = destEntry?.romaji.replace(/[!。？?]/g, '') || rawDest;
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${destJa}へ行きました。`,
      kana: `${destKana}へいきました。`,
      romaji: `${destRomaji} e ikimashita.`,
      english: `I went to ${rawDest}.`,
      rubySegments: [
        { text: destJa, isKanji: /[\u4e00-\u9faf]/.test(destJa) },
        { text: 'へ', isKanji: false },
        { text: '行', reading: 'い', isKanji: true },
        { text: 'きました。', isKanji: false },
      ],
      breakdown: [
        { surface: destJa, reading: destKana, romaji: destRomaji.toLowerCase(), pos: 'proper noun', meaning: rawDest, jlpt: 'N5' },
        { surface: 'へ', reading: 'え', romaji: 'e', pos: 'particle', meaning: 'direction marker', jlpt: 'N5' },
        { surface: '行きました', reading: 'いきました', romaji: 'ikimashita', pos: 'verb', meaning: 'went (past polite)', jlpt: 'N5' },
      ],
      grammarNote: '行く (iku, to go) becomes 行きました (ikimashita, went) in the polite past tense.',
      replyJapanese: `${destJa}に行かれたんですね！とても素敵な場所だと伺っています。何が一番楽しかったですか？`,
      replyKana: `${destKana}にいかれたんですね！とてもすてきなばしょだとうかがっています。なにがいちばんたのしかったですか？`,
      replyRomaji: `${destRomaji} ni ikaretan desu ne! Totemo suteki na basho da to ukagatte imasu. Nani ga ichiban tanoshikatta desu ka?`,
      replyEnglish: `You went to ${rawDest}! I hear it is such a wonderful place. What did you enjoy most there?`,
      suggestedReplies: ['The delicious local food', 'The beautiful scenery', 'I want to visit again'],
    };
  }

  const ateMatch = lower.match(/(?:i ate|we ate|i had)\s+(?:some\s+|a\s+|an\s+)?(.+)/i);
  if (ateMatch) {
    const rawFood = ateMatch[1].replace(/[?!.]/g, '').trim();
    const foodEntry = LEXICON_ENTRIES[rawFood.toLowerCase()];
    const foodJa = foodEntry?.kanji.replace(/[!。？?]/g, '') || englishToKatakana(rawFood);
    const foodKana = foodEntry?.kana.replace(/[!。？?]/g, '') || foodJa;
    const foodRomaji = foodEntry?.romaji.replace(/[!。？?]/g, '') || rawFood;
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${foodJa}を食べました。`,
      kana: `${foodKana}をたべました。`,
      romaji: `${foodRomaji} o tabemashita.`,
      english: `I ate ${rawFood}.`,
      rubySegments: [
        { text: foodJa, isKanji: /[\u4e00-\u9faf]/.test(foodJa) },
        { text: 'を', isKanji: false },
        { text: '食', reading: 'た', isKanji: true },
        { text: 'べました。', isKanji: false },
      ],
      breakdown: [
        { surface: foodJa, reading: foodKana, romaji: foodRomaji.toLowerCase(), pos: 'noun', meaning: rawFood, jlpt: 'N5' },
        { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'object marker', jlpt: 'N5' },
        { surface: '食べました', reading: 'たべました', romaji: 'tabemashita', pos: 'verb', meaning: 'ate (past polite)', jlpt: 'N5' },
      ],
      grammarNote: '食べる (taberu, to eat) becomes 食べました (tabemashita, ate). を marks the food consumed.',
      replyJapanese: `${foodJa}、とても美味しそうですね！お腹いっぱい満足できましたか？`,
      replyKana: `${foodKana}、とてもおいしそうですね！おなかいっぱいまんぞくできましたか？`,
      replyRomaji: `${foodRomaji}, totemo oishisō desu ne! Onaka ippai manzoku dekimashita ka?`,
      replyEnglish: `${rawFood} sounds so delicious! Were you full and satisfied?`,
      suggestedReplies: ['Yes, very delicious!', 'I was completely full', 'I want to eat it again'],
    };
  }

  // 21. Pattern Matching: Existence & Availability ("Do you have [item]?", "Is there [item]?")
  const haveMatch = lower.match(/(?:do you have|is there|are there)\s+(?:a\s+|an\s+|any\s+|some\s+)?(.+)/i);
  if (haveMatch) {
    const rawItem = haveMatch[1].replace(/,?\s*please\b/gi, '').replace(/[?!.]/g, '').trim();
    const itemEntry = LEXICON_ENTRIES[rawItem.toLowerCase()] || LEXICON_ENTRIES[rawItem.toLowerCase().replace(/s$/, '')];
    const itemJa = itemEntry?.kanji.replace(/[!。？?]/g, '') || englishToKatakana(rawItem);
    const itemKana = itemEntry?.kana.replace(/[!。？?]/g, '') || itemJa;
    const itemRomaji = itemEntry?.romaji.replace(/[!。？?]/g, '') || rawItem;
    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${itemJa}はありますか？`,
      kana: `${itemKana}はありますか？`,
      romaji: `${itemRomaji} wa arimasu ka?`,
      english: `Do you have ${rawItem}?`,
      rubySegments: [
        { text: itemJa, isKanji: /[\u4e00-\u9faf]/.test(itemJa) },
        { text: 'はありますか？', isKanji: false },
      ],
      breakdown: [
        { surface: itemJa, reading: itemKana, romaji: itemRomaji.toLowerCase(), pos: 'noun', meaning: rawItem, jlpt: 'N5' },
        { surface: 'はありますか', reading: 'はありますか', romaji: 'wa arimasu ka', pos: 'phrase', meaning: 'do you have? / is there?', jlpt: 'N5' },
      ],
      grammarNote: 'ある (aru) expresses existence for inanimate objects. Combine with は to ask "Do you have [item]?": 〜はありますか？',
      replyJapanese: `「はい、ございますよ！どうぞご覧ください」と店員さんが親切に案内してくれますよ。`,
      replyKana: `「はい、ございますよ！どうぞごらんください」とてんいんさんがしんせつにあんないしてくれますよ。`,
      replyRomaji: '"Hai, gozaimasu yo! Dōzo goran kudasai" to ten\'in-san ga shinsetsu ni annai shite kuremasu yo.',
      replyEnglish: 'Staff will politely reply: "Yes, we have it! Please feel free to take a look."',
      suggestedReplies: ['How much is this?', 'Can I take one?', 'Thank you very much'],
    };
  }

  // 21b. Pattern Matching: Inquiries & Explanations ("Tell me about [topic]", "Can you tell me about [topic]", "Please explain [topic]")
  const tellMatch = lower.match(/(?:tell me about|can you tell me about|could you tell me about|please tell me about|please explain|what is|tell me more about)\s+(.+)/i);
  if (tellMatch) {
    const rawTopic = tellMatch[1].replace(/,?\s*please\b/gi, '').replace(/[?!.]/g, '').trim();
    const topicLower = rawTopic.toLowerCase();
    let topicJa = '';
    let topicKana = '';
    let topicRomaji = '';
    const topicEntry = LEXICON_ENTRIES[topicLower] || LEXICON_ENTRIES[topicLower.replace(/s$/, '')];

    if (topicLower.includes('japanese culture') || topicLower === 'japan culture') {
      topicJa = '日本の文化'; topicKana = 'にほんのぶんか'; topicRomaji = 'Nihon no bunka';
    } else if (topicLower === 'culture') {
      topicJa = '文化'; topicKana = 'ぶんか'; topicRomaji = 'Bunka';
    } else if (topicLower.includes('anime')) {
      topicJa = 'アニメ'; topicKana = 'あにめ'; topicRomaji = 'Anime';
    } else if (topicLower.includes('history')) {
      topicJa = '歴史'; topicKana = 'れきし'; topicRomaji = 'Rekishi';
    } else if (topicLower.includes('tea ceremony') || topicLower === 'sado') {
      topicJa = '茶道'; topicKana = 'さどう'; topicRomaji = 'Sadō';
    } else if (topicLower.includes('bullet train') || topicLower.includes('shinkansen')) {
      topicJa = '新幹線'; topicKana = 'しんかんせん'; topicRomaji = 'Shinkansen';
    } else if (topicLower.includes('japanese food') || topicLower.includes('traditional food')) {
      topicJa = '和食（日本食）'; topicKana = 'わしょく（にほんしょく）'; topicRomaji = 'Washoku (nihon-shoku)';
    } else if (topicEntry) {
      topicJa = topicEntry.kanji.replace(/[!。？?]/g, '');
      topicKana = topicEntry.kana.replace(/[!。？?]/g, '');
      topicRomaji = topicEntry.romaji.replace(/[!。？?]/g, '');
    } else {
      topicJa = englishToKatakana(rawTopic);
      topicKana = topicJa;
      topicRomaji = rawTopic;
    }

    return {
      role: 'sensei',
      englishInput: trimmed,
      japanese: `${topicJa}について教えてください。`,
      kana: `${topicKana}についておしえてください。`,
      romaji: `${topicRomaji} ni tsuite oshiete kudasai.`,
      english: `Please tell me about ${rawTopic}.`,
      rubySegments: [
        ...(topicEntry?.ruby || [{ text: topicJa, isKanji: /[\u4e00-\u9faf]/.test(topicJa) }]),
        { text: 'について', isKanji: false },
        { text: '教', reading: 'おし', isKanji: true },
        { text: 'えてください。', isKanji: false },
      ],
      breakdown: [
        { surface: topicJa, reading: topicKana, romaji: topicRomaji.toLowerCase(), pos: 'noun', meaning: rawTopic, jlpt: 'N5' },
        { surface: 'について', reading: 'について', romaji: 'ni tsuite', pos: 'particle', meaning: 'about / regarding', jlpt: 'N4' },
        { surface: '教えてください', reading: 'おしえてください', romaji: 'oshiete kudasai', pos: 'verb', meaning: 'please teach / tell me', jlpt: 'N5' },
      ],
      grammarNote: '〜について (ni tsuite) means "about" or "regarding". 教えてください (oshiete kudasai) politely asks "please teach / tell me". Together, it creates the essential phrase: [Topic]について教えてください。',
      replyJapanese: `「${topicJa}」についてですね！とても興味深い素晴らしいテーマです。日本のどんな特徴や魅力を知りたいですか？`,
      replyKana: `「${topicKana}」についてですね！とてもきょうみぶかいすばらしいてーまです。にほんのどんなとくちょうやりょくをしりたいですか？`,
      replyRomaji: `"${topicRomaji}" ni tsuite desu ne! Totemo kyōmibukai subarashii tēma desu. Nihon no donna tokuchō ya miryoku o shiritai desu ka?`,
      replyEnglish: `About ${rawTopic}! What a fascinating and wonderful topic. What aspects of it would you like to explore first?`,
      suggestedReplies: [
        `Tell me about Japanese history`,
        `How do you say culture in Japanese?`,
        `Let's practice another sentence!`,
      ],
    };
  }

  // 22. Universal Semantic Sentence Synthesizer for Any General Expression
  const STOP_WORDS = new Set([
    'the', 'a', 'an', 'this', 'that', 'these', 'those', 'it', 'is', 'are', 'was', 'were',
    'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'about', 'as', 'into',
    'very', 'my', 'your', 'his', 'her', 'their', 'our', 'and', 'or', 'so', 'but',
    'me', 'you', 'him', 'them', 'us', 'can', 'could', 'will', 'would', 'shall', 'should',
    'please', 'just', 'really', 'do', 'does', 'did', 'have', 'has', 'had', 'be', 'been',
    'i', 'im', "i'm", 'am',
    'tell', 'tells', 'told', 'say', 'says', 'said', 'talk', 'talks', 'talking',
    'know', 'want', 'wants', 'like', 'likes'
  ]);

  const substantiveWords = words.filter(w => {
    const cleanW = w.toLowerCase().replace(/[?!.,'"]/g, '').trim();
    return cleanW.length > 0 && !STOP_WORDS.has(cleanW);
  });

  const rawTopic = substantiveWords[0] || words[0] || 'conversation';
  const cleanTopic = rawTopic.toLowerCase().replace(/[?!.,'"]/g, '').trim() || 'this topic';
  const entry = LEXICON_ENTRIES[cleanTopic] || LEXICON_ENTRIES[cleanTopic.replace(/s$/, '')];
  const topicJa = entry ? entry.kanji.replace(/[!。？?]/g, '') : englishToKatakana(cleanTopic);
  const topicKana = entry ? entry.kana.replace(/[!。？?]/g, '') : topicJa;
  const topicRomaji = entry ? entry.romaji.replace(/[!。？?]/g, '') : cleanTopic;

  const isQuestion = /\?$/.test(trimmed) || /^(what|where|who|when|why|how|can|is|are|do|does|could|would|should)/i.test(trimmed);

  // Construct natural, meaningful Japanese representation tailored to question vs statement
  const translatedJa = isQuestion
    ? `「${topicJa}」について教えていただけますか？`
    : `「${topicJa}」について話しましょう！`;
  const translatedKana = isQuestion
    ? `「${topicKana}」についておしえていただけますか？`
    : `「${topicKana}」についてはなしましょう！`;
  const translatedRomaji = isQuestion
    ? `"${topicRomaji}" ni tsuite oshiete itadakemasu ka?`
    : `"${topicRomaji}" ni tsuite hanashimashō!`;
  const translatedEnglish = isQuestion
    ? `Could you tell me about "${cleanTopic}"?`
    : `Let's talk about "${cleanTopic}"!`;

  // Meaningful teacher conversational response
  let senseiReplyJa = `「${topicJa}」についてですね！とても良い表現です。具体的にどんなことを聞いてみたいですか？`;
  let senseiReplyKana = `「${topicKana}」についてですね！とてもよいひょうげんです。ぐたいてきにどんなことをきいてみたいですか？`;
  let senseiReplyRomaji = `"${topicRomaji}" ni tsuite desu ne! Totemo yoi hyōgen desu. Gutaiteki ni donna koto o kiite mitai desu ka?`;
  let senseiReplyEn = `About "${cleanTopic}"! That is a wonderful phrase. What would you like to explore next?`;

  if (/travel|trip|japan|visit|go|fly|tokyo|kyoto|osaka/i.test(lower)) {
    senseiReplyJa = '日本の観光や旅行のお話ですね！いつか訪れてみたい街や観光地はありますか？';
    senseiReplyKana = 'にほんのかんこうやりょこうのおはなしですね！いつかおとずれてみたいまちやかんこうちはありますか？';
    senseiReplyRomaji = 'Nihon no kankō ya ryokō no ohanashi desu ne! Itsuka otozurete mitai machi ya kankōchi wa arimasu ka?';
    senseiReplyEn = 'A lovely travel topic! Which cities or sights in Japan would you love to visit most?';
  } else if (/food|eat|dinner|lunch|breakfast|snack|cook|drink/i.test(lower)) {
    senseiReplyJa = '美味しそうな食べ物のお話ですね！日本食で一番食べてみたい料理は何ですか？';
    senseiReplyKana = 'おいしそうなたべもののおはなしですね！にほんしょくでいちばんたべてみたいりょうりはなんですか？';
    senseiReplyRomaji = 'Oishisō na tabemono no ohanashi desu ne! Nihon-shoku de ichiban tabete mitai ryōri wa nan desu ka?';
    senseiReplyEn = 'A delicious food topic! What Japanese dish are you most excited to taste?';
  }

  return {
    role: 'sensei',
    englishInput: trimmed,
    japanese: translatedJa,
    kana: translatedKana,
    romaji: translatedRomaji,
    english: translatedEnglish,
    rubySegments: [
      { text: `「${topicJa}」について`, isKanji: /[\u4e00-\u9faf]/.test(topicJa) },
      { text: isQuestion ? '教' : '話', reading: isQuestion ? 'おし' : 'はな', isKanji: true },
      { text: isQuestion ? 'えていただけますか？' : 'しましょう！', isKanji: false },
    ],
    breakdown: [
      { surface: topicJa, reading: topicKana, romaji: topicRomaji.toLowerCase(), pos: 'topic', meaning: cleanTopic, jlpt: 'N5' },
      { surface: 'について', reading: 'について', romaji: 'ni tsuite', pos: 'particle', meaning: 'about / regarding', jlpt: 'N4' },
      { surface: isQuestion ? '教えていただけますか' : '話しましょう', reading: isQuestion ? 'おしえていただけますか' : 'はなしましょう', romaji: isQuestion ? 'oshiete itadakemasu ka' : 'hanashimashou', pos: 'verb', meaning: isQuestion ? 'could you please teach me' : "let's talk", jlpt: 'N5' },
    ],
    grammarNote: isQuestion
      ? '〜について教えていただけますか？ (ni tsuite oshiete itadakemasu ka?) is a polite and versatile way to ask anyone to explain or tell you about a subject.'
      : '〜について話しましょう！ (ni tsuite hanashimashō!) is a friendly invitation meaning "Let\'s talk about [topic]!".',
    replyJapanese: senseiReplyJa,
    replyKana: senseiReplyKana,
    replyRomaji: senseiReplyRomaji,
    replyEnglish: senseiReplyEn,
    suggestedReplies: [
      `Tell me more about ${cleanTopic}`,
      'How do I say this in casual speech?',
      'Let\'s practice another sentence!',
    ],
  };
}
