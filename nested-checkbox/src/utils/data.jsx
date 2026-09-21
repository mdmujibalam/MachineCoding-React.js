export const CheckboxesData = [
  {
    id: 1,
    label: "Fruits",
    children: [
      {
        id: 2,
        label: "Citrus",
        children: [
          { id: 3, label: "Orange" },
          { id: 4, label: "Lemon" },
        ],
      },
      {
        id: 5,
        label: "Berries",
        children: [
          { id: 6, label: "Strawberry" },
          { id: 7, label: "Blueberry", children: [{ id: 8, label: "Apple" }] },
        ],
      },
    ],
  },
  {
    id: 9,
    label: "Vegetables",
    children: [
      { id: 10, label: "Carrot" },
      { id: 11, label: "Broccoli" },
    ],
  },
];