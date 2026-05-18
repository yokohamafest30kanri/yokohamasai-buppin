export type Item = {
  id: string;
  name: string;
  maxQty: number;
  price: number;
  description: string;
  size: string;
  note: string;
  imageUrl?: string;
};

export const internalItems: Item[] = [
  {
    id: "1pa",
    name: "一面パーテーション",
    maxQty: 5,
    price: 0,
    description: "展示や仕切りで使用できます。",
    size: "横幅：100cm\n高さ：150cmまたは160cmまたは180cm",
    note: "屋内でのみ使用可能です。",
    imageUrl: "/items/1pa.jpg",
  },
  {
    id: "2pa",
    name: "二面パーテーション",
    maxQty: 13,
    price: 0,
    description: "展示や仕切りで使用できます。",
    size: "横幅：210cm\n高さ：150cm",
    note:"屋内でのみ使用可能です。",
    imageUrl: "/items/2pa.jpg",
  },
  {
    id: "3pa",
    name: "三面パーテーション",
    maxQty: 1,
    price: 0,
    description: "展示や仕切りで使用できます。",
    size: "横幅：300cm\n奥行：3cm\n高さ：170cm",
    note:"屋内でのみ使用可能です。",
  },
  {
    id: "tpa",
    name: "テープパーテーション",
    maxQty: 20,
    price: 0,
    description: "仕切りや列整理で使用できます。",
    size: "長さ200cm",
    note:"特になし。",
  },
  {
    id: "a3fsw",
    name: "A3立て看板(白)",
    maxQty: 11,
    price: 0,
    description: "通行人への周知等で使用できます。",
    size: "高さ：115cm",
    note: "特になし",
    imageUrl: "/items/a3fsw.jpg",
  },
  {
    id: "a3fsb",
    name: "A3立て看板(黒)",
    maxQty: 10,
    price: 0,
    description: "通行人への周知等で使用できます。",
    size: "高さ：110cmまたは121cm",
    note: "特になし",
    imageUrl: "/items/a3fsb.jpg",
  },
  {
    id: "a1ssb",
    name: "A1サインスタンド(両面)",
    maxQty: 10,
    price: 0,
    description: "ポスターの展示等で使用できます。",
    size: "横幅：80cm\n奥行：30cm\n高さ：100cm",
    note: "特になし",
  },
  {
    id: "a1sso",
    name: "A1サインスタンド(片面)",
    maxQty: 10,
    price: 0,
    description: "ポスターの展示等で使用できます。",
    size: "横幅：80cm\n奥行：30cm\n高さ：100cm",
    note: "特になし",
  },

];

export const externalItems: Item[] = [
  {
    id: "teppan",
    name: "LP鉄板焼",
    maxQty: 2,
    price: 5940,
    description: "鉄板系の調理で使用できます。",
    size: "横幅：60cm\n奥行：55cm\n高さ：18cm",
    note: "ガスはついておりません。ガスも登録してください。",
    imageUrl: "/items/teppan.jpg",
  },
  {
    id: "takoyaki",
    name: "LPタコ焼機",
    maxQty: 2,
    price: 5940,
    description: "たこ焼き等の調理で使用できます。",
    size: "高さ：51cm\n奥行：26cm\n高さ：18cm",
    note: "ガスはついておりません。ガスも登録してください。千枚通し・粉つきがついています。",
    imageUrl: "/items/takoyaki.jpg",
  },
  {
    id: "crepe",
    name: "LPクレープ焼機",
    maxQty: 2,
    price: 5940,
    description: "クレープ等の調理で使用できます。",
    size: "横幅：55cm\n奥行：45cm\n高さ：23cm",
    note: "ガスはついておりません。ガスも登録してください。クレープ用トンボ・スパチュラがついています。",
    imageUrl: "/items/crepe.jpg",
  },
  {
    id: "obanyaki",
    name: "LP大判焼き機",
    maxQty: 2,
    price: 9900,
    description: "大判焼き等の調理で使用できます。",
    size: "横幅：68cm\n奥行：57cm\n高さ：28cm",
    note: "ガスはついておりません。ガスも登録してください。あんさし・ヘラ・生地落としがついています。",
    imageUrl: "/items/obanyaki.jpg",
  },
  {
    id: "yakitori",
    name: "LP焼鳥機",
    maxQty: 2,
    price: 4950,
    description: "焼き鳥等の調理で使用できます。",
    size: "横幅：60cm\n奥行：14cm\n高さ：15cm",
    note: "ガスはついておりません。ガスも登録してください。",
    imageUrl: "/items/yakitori.jpg",
  },
];

  //↓これをコピペ
  /*{
    id: "",
    name: "",
    maxQty: 0,
    price: 0,
    description: "",
    size: "横幅：cm\n奥行：cm\n高さ：cm",
    note: "",
  },*/

  //imageUrl: "/items/.jpg",

//git add lib/items.ts public/items/.jpg
//git commit -m "add item list"
//git push