import type { Category, Dish } from "@/lib/types";

export const categories: Category[] = [
  { id: "desayunos", name: "Desayunos", icon: "☀" },
  { id: "entradas", name: "Entradas", icon: "🥂" },
  { id: "brunch", name: "Brunch", icon: "🍋" },
  { id: "almuerzo", name: "Almuerzo & Cena", icon: "🍽" },
  { id: "pescados", name: "Pescados", icon: "🌊" },
  { id: "carnes", name: "Carnes & Principales", icon: "🔥" },
  { id: "postres", name: "Postres", icon: "🍰" },
  { id: "cafe", name: "Café", icon: "☕" },
  { id: "bebidas", name: "Bebidas", icon: "🍸" },
];

export const menu: Record<string, Dish[]> = {
  desayunos: [
    { id: "dom-p", name: "Dominican", description: "Huevos fritos estilo dominicano con queso, plátano maduro, aguacate y pan francés recién horneado.", price: 390, image: "/images/uploads/brunch_4.jpg", tags: ["premium"], category: "desayunos" },
    { id: "am-p", name: "American", description: "Huevos al gusto con tocino ahumado, arepa de maíz y salsa casera.", price: 360, image: "/images/uploads/coffee_1.jpg", category: "desayunos" },
    { id: "avocado", name: "Tostada de Aguacate", description: "Pan integral rústico con aguacate machacado, semillas de sésamo y huevo pochado.", price: 320, image: "/images/uploads/dish_1.jpg", tags: ["vegetariano"], category: "desayunos" },
  ],
  entradas: [
    { id: "tuna-tartare", name: "Tartar de Atún", description: "Atún fresco con aceite de oliva, cítricos, semillas de sésamo y crujiente de yuca.", price: 490, image: "/images/uploads/seafood_2.jpg", tags: ["premium"], category: "entradas" },
    { id: "wonton", name: "Wonton Tacos", description: "Tacos crujientes de wonton con col morada, zanahoria rallada y salsa de soja.", price: 420, image: "/images/uploads/dish_4.jpg", category: "entradas" },
    { id: "burrata", name: "Burrata", description: "Burrata artesanal con tomate heirloom, albahaca fresca y reducción balsámica.", price: 450, image: "/images/uploads/dish_4.jpg", tags: ["vegetariano"], category: "entradas" },
    { id: "eggplant-rolls", name: "Envoltinis de Berenjena", description: "Berenjena asada enrollada con queso de cabra, hierbas y salsa de tomate.", price: 380, image: "/images/uploads/dish_1.jpg", tags: ["vegetariano"], category: "entradas" },
    { id: "dumplings", name: "Dumplings de Cerdo", description: "Dumplings al vapor con relleno de cerdo y chalota, acompañados de salsa de soja.", price: 410, image: "/images/uploads/dish_4.jpg", category: "entradas" },
    { id: "ceviche", name: "Ceviche Peruano", description: "Ceviche de corvina con limón, ají limo, cebolla morada y maíz cancha.", price: 460, image: "/images/uploads/seafood_2.jpg", tags: ["picante"], category: "entradas" },
  ],
  brunch: [
    { id: "pancakes", name: "Pancakes", description: "Tres panqueques esponjosos con sirope de arce, frutas del bosque y crema batida.", price: 390, image: "/images/uploads/brunch_1.jpg", category: "brunch" },
    { id: "waffles", name: "Waffles", description: "Waffle crujiente con helado de vainilla y salsa de frutos rojos.", price: 390, image: "/images/uploads/brunch_2.jpg", category: "brunch" },
    { id: "french-toast", name: "French Toast", description: "Pan brioche empanizado, huevecado y dorado, con frutas caramelizadas.", price: 370, image: "/images/uploads/brunch_3.jpg", category: "brunch" },
    { id: "granola", name: "Granola Casera", description: "Granola crujiente con yogur natural, frutas frescas y miel de abeja.", price: 300, image: "/images/uploads/dish_food_10.jpg", tags: ["vegetariano"], category: "brunch" },
  ],
  almuerzo: [
    { id: "tacos-birria", name: "Tacos de Birria", description: "Tacos de birria de res con salsa de chocolate y queso fundido.", price: 450, image: "/images/uploads/dish_3.jpg", tags: ["picante"], category: "almuerzo" },
    { id: "croquetas", name: "Croquetas de Lacón", description: "Croquetas crujientes de lacón con reducción de vino tinto.", price: 390, image: "/images/uploads/dish_3.jpg", category: "almuerzo" },
    { id: "pulpo", name: "Pulpo al Grill", description: "Pulpo a la parrilla con pimentón ahumado, patata hervida y alioli.", price: 520, image: "/images/uploads/seafood_1.jpg", tags: ["premium"], category: "almuerzo" },
    { id: "ensalada", name: "Ensalada César", description: "Lechugas frescas, croutons de ajo, parmesano y aderezo césar casero.", price: 380, image: "/images/uploads/dish_1.jpg", tags: ["vegetariano"], category: "almuerzo" },
  ],
  pescados: [
    { id: "lubina", name: "Lubina", description: "Lubina enterada a la sal, con limón y hierbas frescas.", price: 650, image: "/images/uploads/seafood_1.jpg", tags: ["premium", "sin gluten"], category: "pescados" },
    { id: "salmon", name: "Salmón", description: "Salmón ahumado con puré de patata, espárragos y salsa de alcaparras.", price: 620, image: "/images/uploads/dish_food_5.jpg", tags: ["premium"], category: "pescados" },
  ],
  carnes: [
    { id: "wagyu", name: "Wagyu", description: "Filete de Wagyu a la parrilla con puré de patata y salsa de vino tinto.", price: 980, image: "/images/uploads/dish_3.jpg", tags: ["premium"], category: "carnes" },
    { id: "bisteck", name: "Bisteck de Res", description: "Bisteck de res con chimichurri y papas rústicas.", price: 750, image: "/images/uploads/dish_3.jpg", category: "carnes" },
  ],
  postres: [
    { id: "cheesecake", name: "Cheesecake de Frutos Rojos", description: "Cheesecake cremoso con coulis de frutos rojos y merengue tostado.", price: 320, image: "/images/uploads/dessert_3.jpg", category: "postres" },
    { id: "tiramisu", name: "Tiramisú", description: "Tiramisú clásico con café espresso y cacao en polvo.", price: 300, image: "/images/uploads/dessert_2.jpg", tags: ["vegetariano"], category: "postres" },
    { id: "fundido", name: "Fundido de Quesos", description: "Tabla de quesos fundidos con pan de ajo y frutos secos.", price: 360, image: "/images/uploads/dessert_3.jpg", tags: ["vegetariano"], category: "postres" },
  ],
  cafe: [
    { id: "espresso", name: "Espresso", description: "Café espresso recién molido de tueste oscuro.", price: 120, image: "/images/uploads/coffee_1.jpg", category: "cafe" },
    { id: "cortado", name: "Cortado", description: "Espresso con un toque de leche para equilibrar.", price: 140, image: "/images/uploads/coffee_2.jpg", category: "cafe" },
    { id: "latte", name: "Café Latte", description: "Espresso con leche vaporizada y espuma ligera.", price: 160, image: "/images/uploads/coffee_2.jpg", tags: ["vegetariano"], category: "cafe" },
  ],
  bebidas: [
    { id: "mojito", name: "Mojito Clásico", description: "Ron blanco, menta fresca, lima y soda.", price: 280, image: "/images/uploads/cocktail_1.jpg", category: "bebidas" },
    { id: "old-fashioned", name: "Old Fashioned", description: "Whisky, azúcar morena, amargos y cáscara de naranja.", price: 320, image: "/images/uploads/cocktail_2.jpg", tags: ["premium"], category: "bebidas" },
    { id: "limonada", name: "Limonada de Hierbabuena", description: "Limonada casera con hierbabuena fresca.", price: 180, image: "/images/uploads/dish_food_11.jpg", category: "bebidas" },
    { id: "vino", name: "Vino de la Casa", description: "Vino tinto o blanco de productor local.", price: 220, image: "/images/uploads/cocktail_2.jpg", tags: ["premium"], category: "bebidas" },
  ],
};

export const featuredDishes: Dish[] = [
  menu.entradas.find((d) => d.id === "tuna-tartare")!,
  menu.pescados.find((d) => d.id === "lubina")!,
  menu.carnes.find((d) => d.id === "wagyu")!,
];
