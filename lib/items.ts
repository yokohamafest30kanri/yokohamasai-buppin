export type Item = {
  id: string;
  name: string;
  maxQty: number;
  price: number;
  description: string;
  size: string;
  note: string;
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
];