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

export const items: Item[] = [
  {
    id: "1pa",
    name: "一面パーテーション",
    maxQty: 3,
    price: 0,
    description: "展示や仕切りで使用できます。",
    size: "横幅：100cm\n高さ：170cm\n奥行：3cm",
    note: "屋内でのみ使用可能です。",
  },
  {
    id: "2pa",
    name: "二面パーテーション",
    maxQty: 13,
    price: 0,
    description: "展示や仕切りで使用できます。",
    size: "横幅：200cm\n高さ：170cm\n奥行：3cm",
    note:"屋内でのみ使用可能です。",
  },
  {
    id: "3pa",
    name: "三面パーテーション",
    maxQty: 1,
    price: 0,
    description: "展示や仕切りで使用できます。",
    size: "横幅：300cm\n高さ：170cm\n奥行：3cm",
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
    size: "横幅：50cm\n高さ：120cm\n奥行：30cm",
    note: "特になし",
  },
  {
    id: "a3fsb",
    name: "A3立て看板(黒)",
    maxQty: 10,
    price: 0,
    description: "通行人への周知等で使用できます。",
    size: "横幅：50cm\n高さ：120cm\n奥行：30cm",
    note: "特になし",
  },
  {
    id: "a1ssb",
    name: "A1サインスタンド(両面)",
    maxQty: 10,
    price: 0,
    description: "ポスターの展示等で使用できます。",
    size: "横幅：80cm\n高さ：100cm\n奥行：30cm",
    note: "特になし",
  },
  {
    id: "a1sso",
    name: "A1サインスタンド(片面)",
    maxQty: 10,
    price: 0,
    description: "ポスターの展示等で使用できます。",
    size: "横幅：80cm\n高さ：100cm\n奥行：30cm",
    note: "特になし",
  },

];

  //↓これをコピペ
  /*{
    id: "",
    name: "",
    maxQty: ,
    price: ,
    description: "",
    size: "",
    note: "",
  },*/

//git add lib/items.ts
//git commit -m "add item list"
//git push