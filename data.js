// ============== FOODGRAM DATA ==============

const USERS = [
  {
    id: 1, name: "You (Demo User)", username: "demo_chef",
    email: "demo@foodgram.com", password: "password123",
    avatar: "👨‍🍳", bio: "Food enthusiast & home cook. Love experimenting with flavors!",
    followers: 1243, following: [2, 3, 4, 5],
    totalLikes: 8920, joinDate: "2024-03-15",
    showReposts: true
  },
  {
    id: 2, name: "Chef Marco", username: "chef_marco",
    email: "marco@foodgram.com", password: "marco123",
    avatar: "👨‍🍳", bio: "Professional Italian chef with 15 years of experience. Michelin-starred restaurant owner.",
    followers: 54200, following: [1, 3],
    totalLikes: 312400, joinDate: "2023-01-10",
    showReposts: true
  },
  {
    id: 3, name: "Sarah's Kitchen", username: "sarahs_kitchen",
    email: "sarah@foodgram.com", password: "sarah123",
    avatar: "👩‍🍳", bio: "Easy healthy meals for busy people. Meal prep queen 👑",
    followers: 28700, following: [1, 2, 5],
    totalLikes: 187300, joinDate: "2023-06-22",
    showReposts: true
  },
  {
    id: 4, name: "FitMeals Alex", username: "fitmeal_alex",
    email: "alex@foodgram.com", password: "alex123",
    avatar: "💪", bio: "Certified nutritionist. High-protein, low-carb recipes for athletes.",
    followers: 41500, following: [1, 2, 3, 6],
    totalLikes: 245600, joinDate: "2023-04-05",
    showReposts: true
  },
  {
    id: 5, name: "Bake with Emma", username: "bake_emma",
    email: "emma@foodgram.com", password: "emma123",
    avatar: "🧁", bio: "Pastry chef & cake artist. Sweetness is my superpower 🎂",
    followers: 36800, following: [1, 3],
    totalLikes: 198700, joinDate: "2023-08-14",
    showReposts: true
  },
  {
    id: 6, name: "Vegan Victor", username: "vegan_victor",
    email: "victor@foodgram.com", password: "victor123",
    avatar: "🌱", bio: "100% plant-based recipes. Proving vegan food can be incredible.",
    followers: 22100, following: [3, 4],
    totalLikes: 134200, joinDate: "2023-11-01",
    showReposts: true
  },
  {
    id: 7, name: "Spice Master Raj", username: "spice_raj",
    email: "raj@foodgram.com", password: "raj123",
    avatar: "🌶️", bio: "Bringing authentic Indian & Asian flavors to your kitchen.",
    followers: 19400, following: [2, 4, 6],
    totalLikes: 98700, joinDate: "2024-01-20",
    showReposts: false
  }
];

const ALL_INGREDIENTS = [
  "Chicken Breast", "Salmon", "Shrimp", "Beef", "Tofu", "Eggs",
  "Rice", "Pasta", "Quinoa", "Bread", "Oats", "Flour",
  "Tomatoes", "Onion", "Garlic", "Bell Pepper", "Spinach", "Broccoli",
  "Avocado", "Lemon", "Lime", "Banana", "Blueberries", "Strawberries",
  "Olive Oil", "Butter", "Coconut Oil", "Soy Sauce", "Honey", "Maple Syrup",
  "Milk", "Greek Yogurt", "Cheese", "Cream Cheese", "Coconut Milk",
  "Almonds", "Walnuts", "Peanut Butter", "Chia Seeds", "Protein Powder",
  "Basil", "Oregano", "Cumin", "Turmeric", "Paprika", "Cinnamon",
  "Salt", "Black Pepper", "Chili Flakes", "Ginger"
];

const RECIPE_TYPES = ["Sport", "Diet", "Muscle Gain", "Keto", "Vegan", "Comfort Food", "Quick Meal", "Dessert"];
const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];

const RECIPES = [
  {
    id: 1, authorId: 2, title: "Classic Carbonara",
    shortDesc: "Authentic Roman pasta with crispy guanciale and pecorino.",
    description: `A true Roman classic that relies on just a few quality ingredients. The secret is in the technique — no cream needed!\n\n**Step 1:** Bring a large pot of salted water to boil. Cook 400g spaghetti until al dente.\n\n**Step 2:** While pasta cooks, cut 200g guanciale into small strips. Cook in a dry pan over medium heat until crispy and golden, about 5-7 minutes.\n\n**Step 3:** In a bowl, whisk together 4 egg yolks, 1 whole egg, 100g grated Pecorino Romano, and plenty of freshly cracked black pepper.\n\n**Step 4:** When pasta is ready, reserve 1 cup of pasta water. Drain pasta and add to the pan with guanciale (heat OFF).\n\n**Step 5:** Quickly pour the egg mixture over hot pasta, tossing vigorously. Add pasta water a little at a time until you get a silky, creamy sauce.\n\n**Step 6:** Serve immediately with extra Pecorino and black pepper on top.`,
    ingredients: ["Pasta", "Eggs", "Cheese", "Black Pepper", "Olive Oil"],
    difficulty: "Medium", duration: 30, type: "Comfort Food",
    isPaid: false, price: 0,
    likes: 4521, reposts: 312,
    photos: ["🍝"], gradient: "linear-gradient(135deg, #F5D585 0%, #D4A843 100%)",
    comments: [
      { id: 1, userId: 1, text: "Made this last night — absolutely divine! The technique tips really helped.", likes: 24, replies: [
        { id: 11, userId: 2, text: "Glad you enjoyed it! Remember, fresh eggs make all the difference.", likes: 8 }
      ]},
      { id: 2, userId: 3, text: "Can I substitute with turkey bacon?", likes: 5, replies: [
        { id: 12, userId: 2, text: "You can, but pancetta would be closer to the original flavor!", likes: 12 }
      ]},
      { id: 3, userId: 5, text: "The best carbonara recipe I've found online. Period.", likes: 31, replies: [] }
    ]
  },
  {
    id: 2, authorId: 3, title: "Meal Prep Buddha Bowl",
    shortDesc: "Colorful, nutrient-packed bowl perfect for weekly meal prep.",
    description: `This bowl is a powerhouse of nutrition and flavor. Perfect for preparing 5 portions on Sunday!\n\n**Step 1:** Cook 2 cups quinoa according to package directions. Let cool.\n\n**Step 2:** Roast 2 sweet potatoes (cubed) and 2 cups broccoli florets at 200°C for 25 minutes with olive oil, salt, and paprika.\n\n**Step 3:** Prepare dressing: whisk together 3 tbsp tahini, juice of 2 lemons, 1 clove minced garlic, 2 tbsp water, salt to taste.\n\n**Step 4:** Slice 2 avocados, shred 2 cups red cabbage, and prepare 1 cup edamame.\n\n**Step 5:** Assemble bowls: quinoa base, arrange roasted veggies, avocado, cabbage, edamame, and drizzle with tahini dressing.\n\n**Step 6:** Store in airtight containers. Keeps fresh for 4-5 days in the fridge!`,
    ingredients: ["Quinoa", "Broccoli", "Avocado", "Lemon", "Olive Oil", "Garlic", "Salt", "Paprika"],
    difficulty: "Easy", duration: 45, type: "Diet",
    isPaid: false, price: 0,
    likes: 3892, reposts: 567,
    photos: ["🥗"], gradient: "linear-gradient(135deg, #7CB342 0%, #558B2F 100%)",
    comments: [
      { id: 4, userId: 4, text: "Great macros on this one! I add grilled chicken for extra protein.", likes: 18, replies: [] },
      { id: 5, userId: 1, text: "My go-to meal prep recipe now. Thank you Sarah!", likes: 9, replies: [] }
    ]
  },
  {
    id: 3, authorId: 4, title: "High-Protein Chicken Stir-Fry",
    shortDesc: "Quick 20-min stir-fry packed with 45g protein per serving.",
    description: `Perfect post-workout meal that's ready in 20 minutes flat.\n\n**Step 1:** Slice 500g chicken breast into thin strips. Season with soy sauce, garlic powder, and a pinch of ginger.\n\n**Step 2:** Heat coconut oil in a wok over high heat until smoking.\n\n**Step 3:** Stir-fry chicken for 4-5 minutes until golden. Remove and set aside.\n\n**Step 4:** In the same wok, add sliced bell peppers, broccoli florets, and snap peas. Stir-fry for 3 minutes.\n\n**Step 5:** Return chicken to wok. Add sauce: 3 tbsp soy sauce, 1 tbsp honey, 1 tsp sesame oil, 1 tbsp cornstarch mixed with water.\n\n**Step 6:** Toss everything together until sauce thickens. Serve over rice or eat as-is for low-carb option.`,
    ingredients: ["Chicken Breast", "Bell Pepper", "Broccoli", "Soy Sauce", "Coconut Oil", "Honey", "Garlic", "Ginger", "Rice"],
    difficulty: "Easy", duration: 20, type: "Sport",
    isPaid: false, price: 0,
    likes: 5673, reposts: 890,
    photos: ["🍗"], gradient: "linear-gradient(135deg, #FF8A65 0%, #D84315 100%)",
    comments: [
      { id: 6, userId: 1, text: "45g protein and it tastes this good? Sign me up!", likes: 42, replies: [] },
      { id: 7, userId: 6, text: "Any tofu alternative for this?", likes: 7, replies: [
        { id: 13, userId: 4, text: "Absolutely! Use extra-firm tofu, press it well, and cube it. Same cooking method works great.", likes: 15 }
      ]}
    ]
  },
  {
    id: 4, authorId: 5, title: "Chocolate Lava Cake",
    shortDesc: "Rich, molten chocolate cake with a gooey center. Pure indulgence.",
    description: `The ultimate dessert showstopper. Easier than you think!\n\n**Step 1:** Preheat oven to 220°C. Butter and flour 4 ramekins generously.\n\n**Step 2:** Melt 200g dark chocolate with 100g butter in a double boiler. Stir until smooth.\n\n**Step 3:** In a separate bowl, whisk 2 whole eggs and 2 egg yolks with 80g sugar until pale and thick.\n\n**Step 4:** Fold the chocolate mixture into the egg mixture. Sift in 30g flour and fold gently.\n\n**Step 5:** Divide batter among ramekins. (Pro tip: these can be refrigerated for up to 24 hours before baking!)\n\n**Step 6:** Bake for exactly 12 minutes. The edges should be firm but the center jiggly.\n\n**Step 7:** Let rest 1 minute, then invert onto plates. Serve with vanilla ice cream or whipped cream.`,
    ingredients: ["Eggs", "Butter", "Flour", "Honey", "Milk", "Cinnamon"],
    difficulty: "Hard", duration: 35, type: "Dessert",
    isPaid: true, price: 2.99,
    likes: 8234, reposts: 1205,
    photos: ["🍫"], gradient: "linear-gradient(135deg, #5D4037 0%, #3E2723 100%)",
    comments: [
      { id: 8, userId: 3, text: "Worth every penny. Made these for a dinner party and everyone was blown away!", likes: 56, replies: [] }
    ]
  },
  {
    id: 5, authorId: 6, title: "Creamy Vegan Mushroom Risotto",
    shortDesc: "Luxuriously creamy risotto — 100% plant-based, 100% delicious.",
    description: `Proof that vegan food can be just as rich and satisfying.\n\n**Step 1:** Heat vegetable broth (1L) in a saucepan and keep warm on low heat.\n\n**Step 2:** Sauté 300g mixed mushrooms in olive oil until golden. Season with thyme, set aside.\n\n**Step 3:** In a large pan, sauté diced onion and 3 cloves garlic in olive oil until soft.\n\n**Step 4:** Add 300g arborio rice, stir for 1 minute. Add 1/2 cup white wine, stir until absorbed.\n\n**Step 5:** Add warm broth one ladle at a time, stirring continuously. Wait until each addition is absorbed before adding more. This takes about 18-20 minutes.\n\n**Step 6:** Stir in 3 tbsp nutritional yeast, sautéed mushrooms, and a splash of coconut cream.\n\n**Step 7:** Season with salt, pepper, and a squeeze of lemon. Garnish with fresh parsley and truffle oil if desired.`,
    ingredients: ["Rice", "Onion", "Garlic", "Olive Oil", "Lemon", "Coconut Milk", "Black Pepper", "Salt"],
    difficulty: "Medium", duration: 40, type: "Vegan",
    isPaid: false, price: 0,
    likes: 2987, reposts: 234,
    photos: ["🍄"], gradient: "linear-gradient(135deg, #A1887F 0%, #6D4C41 100%)",
    comments: [
      { id: 9, userId: 1, text: "I'm not even vegan and this is now my favorite risotto recipe.", likes: 33, replies: [] },
      { id: 10, userId: 3, text: "The nutritional yeast really does the trick for that cheesy flavor!", likes: 12, replies: [] }
    ]
  },
  {
    id: 6, authorId: 7, title: "Butter Chicken (Murgh Makhani)",
    shortDesc: "Authentic Indian butter chicken with a rich, creamy tomato sauce.",
    description: `Restaurant-quality butter chicken at home!\n\n**Step 1:** Marinate 600g chicken thighs in yogurt, turmeric, cumin, garam masala, and chili powder for at least 2 hours.\n\n**Step 2:** Grill or pan-fry marinated chicken until charred. Set aside.\n\n**Step 3:** In a large pan, melt 50g butter. Add 1 cinnamon stick, 4 cardamom pods, and 1 bay leaf. Fry for 30 seconds.\n\n**Step 4:** Add puréed tomatoes (400g can), 1 tbsp sugar, salt, and chili powder. Simmer for 15 minutes.\n\n**Step 5:** Add 200ml heavy cream, 1 tbsp dried fenugreek leaves (kasuri methi), and the grilled chicken.\n\n**Step 6:** Simmer for 10 more minutes. Finish with a knob of butter and a splash of cream.\n\n**Step 7:** Serve with basmati rice or warm naan bread.`,
    ingredients: ["Chicken Breast", "Tomatoes", "Butter", "Greek Yogurt", "Garlic", "Ginger", "Cumin", "Turmeric"],
    difficulty: "Medium", duration: 60, type: "Comfort Food",
    isPaid: false, price: 0,
    likes: 6712, reposts: 923,
    photos: ["🍛"], gradient: "linear-gradient(135deg, #FF7043 0%, #BF360C 100%)",
    comments: [
      { id: 14, userId: 4, text: "Incredible depth of flavor. The marination step is key!", likes: 27, replies: [] },
      { id: 15, userId: 1, text: "Made this for the family — everyone wanted seconds!", likes: 19, replies: [] }
    ]
  },
  {
    id: 7, authorId: 4, title: "Protein Overnight Oats",
    shortDesc: "No-cook breakfast with 35g protein. 5 min prep the night before.",
    description: `The ultimate gym bro breakfast — zero effort in the morning!\n\n**Step 1:** In a mason jar, combine 80g rolled oats, 1 scoop (30g) protein powder (vanilla or chocolate), and 1 tbsp chia seeds.\n\n**Step 2:** Add 200ml milk of choice and 100g Greek yogurt. Stir well.\n\n**Step 3:** Add 1 tbsp peanut butter and 1 tsp honey. Mix again.\n\n**Step 4:** Seal the jar and refrigerate overnight (at least 6 hours).\n\n**Step 5:** In the morning, top with sliced banana, blueberries, and a sprinkle of granola.\n\n**Pro tip:** Make 5 jars on Sunday for the entire work week!`,
    ingredients: ["Oats", "Protein Powder", "Chia Seeds", "Milk", "Greek Yogurt", "Peanut Butter", "Honey", "Banana", "Blueberries"],
    difficulty: "Easy", duration: 5, type: "Sport",
    isPaid: false, price: 0,
    likes: 9231, reposts: 1543,
    photos: ["🥣"], gradient: "linear-gradient(135deg, #FFE082 0%, #FFC107 100%)",
    comments: [
      { id: 16, userId: 3, text: "This changed my mornings! So easy and filling.", likes: 45, replies: [] },
      { id: 17, userId: 1, text: "Do you have a chocolate version?", likes: 8, replies: [
        { id: 18, userId: 4, text: "Just use chocolate protein powder and add 1 tbsp cocoa powder. Game changer!", likes: 22 }
      ]}
    ]
  },
  {
    id: 8, authorId: 3, title: "15-Min Shrimp Tacos",
    shortDesc: "Crispy seasoned shrimp with mango salsa in warm tortillas.",
    description: `The fastest impressive dinner you'll ever make!\n\n**Step 1:** Season 400g shrimp with paprika, cumin, garlic powder, salt, and a squeeze of lime.\n\n**Step 2:** Make mango salsa: dice 1 mango, 1/4 red onion, 1 jalapeño, handful of cilantro. Mix with lime juice and salt.\n\n**Step 3:** Heat olive oil in a pan over high heat. Cook shrimp 2 minutes per side until pink and curled.\n\n**Step 4:** Warm corn tortillas in a dry pan or directly over gas flame.\n\n**Step 5:** Assemble: tortilla → shrimp → mango salsa → sliced avocado → drizzle of sour cream → fresh cilantro.\n\n**Step 6:** Serve with lime wedges and extra hot sauce on the side!`,
    ingredients: ["Shrimp", "Avocado", "Lime", "Onion", "Garlic", "Paprika", "Cumin", "Olive Oil"],
    difficulty: "Easy", duration: 15, type: "Quick Meal",
    isPaid: false, price: 0,
    likes: 4102, reposts: 678,
    photos: ["🌮"], gradient: "linear-gradient(135deg, #66BB6A 0%, #2E7D32 100%)",
    comments: [
      { id: 19, userId: 5, text: "The mango salsa makes this SO good. Restaurant quality!", likes: 29, replies: [] }
    ]
  },
  {
    id: 9, authorId: 5, title: "Sourdough Bread Masterclass",
    shortDesc: "Complete guide to making perfect sourdough from scratch.",
    description: `A comprehensive 3-day journey to the perfect loaf.\n\n**Day 1 — Levain:**\nMix 50g starter, 50g whole wheat flour, 50g water. Cover and rest 8-12 hours at room temp.\n\n**Day 2 — Dough:**\n**Step 1:** Mix 400g bread flour, 100g whole wheat, 375g water. Rest 1 hour (autolyse).\n**Step 2:** Add levain and 10g salt. Stretch and fold every 30 min for 2 hours.\n**Step 3:** Bulk ferment 4-6 hours until doubled and jiggly.\n**Step 4:** Shape into a boule, place in floured banneton.\n**Step 5:** Cold retard in fridge 12-18 hours.\n\n**Day 3 — Bake:**\n**Step 6:** Preheat Dutch oven at 250°C for 45 minutes.\n**Step 7:** Score dough, bake covered 20 min, uncovered 25 min at 230°C.\n**Step 8:** Cool completely on wire rack before slicing (hardest step!).`,
    ingredients: ["Flour", "Salt"],
    difficulty: "Hard", duration: 120, type: "Comfort Food",
    isPaid: true, price: 4.99,
    likes: 6543, reposts: 432,
    photos: ["🍞"], gradient: "linear-gradient(135deg, #D7CCC8 0%, #8D6E63 100%)",
    comments: [
      { id: 20, userId: 2, text: "Finally a sourdough recipe that actually works. The cold retard step is crucial!", likes: 67, replies: [] }
    ]
  },
  {
    id: 10, authorId: 7, title: "Thai Green Curry",
    shortDesc: "Fragrant coconut curry with homemade green paste.",
    description: `Make your own paste for an unbeatable authentic flavor!\n\n**Green Paste:**\nBlend: 4 green chilies, 2 stalks lemongrass, 3 cloves garlic, thumb of galangal, 4 kaffir lime leaves, bunch of cilantro, 1 tsp cumin, 1 tsp coriander, 1 tbsp fish sauce, 1 tsp shrimp paste.\n\n**Step 1:** Heat coconut oil in a wok. Fry 3 tbsp of green paste for 2 minutes until fragrant.\n\n**Step 2:** Add 400ml coconut milk, stir well. Bring to a gentle simmer.\n\n**Step 3:** Add 400g sliced chicken (or tofu), bamboo shoots, Thai eggplant, and green beans.\n\n**Step 4:** Simmer 15 minutes until chicken is cooked through.\n\n**Step 5:** Season with fish sauce, palm sugar, and lime juice to balance salt-sweet-sour.\n\n**Step 6:** Finish with Thai basil leaves and sliced red chili. Serve over jasmine rice.`,
    ingredients: ["Chicken Breast", "Coconut Milk", "Lime", "Garlic", "Ginger", "Chili Flakes", "Basil"],
    difficulty: "Medium", duration: 45, type: "Comfort Food",
    isPaid: false, price: 0,
    likes: 3456, reposts: 298,
    photos: ["🍜"], gradient: "linear-gradient(135deg, #81C784 0%, #388E3C 100%)",
    comments: [
      { id: 21, userId: 3, text: "The homemade paste makes ALL the difference. Never going back to store-bought!", likes: 38, replies: [] }
    ]
  },
  {
    id: 11, authorId: 4, title: "Keto Fat Bombs",
    shortDesc: "Chocolate peanut butter fat bombs — only 2g net carbs each!",
    description: `Perfect keto snack to keep your macros on point.\n\n**Step 1:** Melt 100g coconut oil in a saucepan over low heat.\n\n**Step 2:** Add 100g peanut butter and 30g cocoa powder. Stir until smooth.\n\n**Step 3:** Add 2 tbsp maple syrup (or sugar-free sweetener for strict keto) and a pinch of salt.\n\n**Step 4:** Pour mixture into silicone molds. Top each with a sprinkle of sea salt and crushed almonds.\n\n**Step 5:** Freeze for at least 2 hours until solid.\n\n**Step 6:** Store in the freezer. Pop one out whenever you need a quick energy boost!\n\nMakes 12 fat bombs. Per bomb: 145 cal, 14g fat, 2g net carbs, 3g protein.`,
    ingredients: ["Coconut Oil", "Peanut Butter", "Almonds", "Maple Syrup", "Salt"],
    difficulty: "Easy", duration: 15, type: "Keto",
    isPaid: false, price: 0,
    likes: 7654, reposts: 1102,
    photos: ["🍫"], gradient: "linear-gradient(135deg, #8D6E63 0%, #4E342E 100%)",
    comments: [
      { id: 22, userId: 6, text: "Made a vegan version with almond butter. Works perfectly!", likes: 14, replies: [] }
    ]
  },
  {
    id: 12, authorId: 2, title: "Perfect Risotto Technique",
    shortDesc: "Master the art of Italian risotto with this premium guide.",
    description: `Learn the professional techniques that make restaurant risotto extraordinary.\n\n**The Foundation:**\n**Step 1:** Always use Carnaroli rice (superior to Arborio for creaminess). Toast 320g in butter for 2 minutes.\n\n**Step 2:** Deglaze with 150ml dry white wine. Stir until fully absorbed.\n\n**The Method:**\n**Step 3:** Add warm stock ONE ladle at a time. Each addition should be absorbed before adding the next. Never rush this. Total time: 17-19 minutes.\n\n**Step 4:** Keep the risotto at a gentle simmer, not a boil. Stir frequently but not constantly.\n\n**The Mantecatura (most important step!):**\n**Step 5:** Remove from heat. Add 50g cold butter (cut into cubes) and 80g finely grated Parmigiano-Reggiano.\n\n**Step 6:** Beat vigorously with a wooden spoon for 30 seconds. This creates the signature wave (all'onda) consistency.\n\n**Step 7:** Rest 2 minutes. The risotto should flow like lava when plated — not thick like porridge.`,
    ingredients: ["Rice", "Butter", "Cheese", "Onion", "Olive Oil", "Salt", "Black Pepper"],
    difficulty: "Hard", duration: 50, type: "Comfort Food",
    isPaid: true, price: 3.49,
    likes: 5120, reposts: 389,
    photos: ["🍚"], gradient: "linear-gradient(135deg, #FFF9C4 0%, #F9A825 100%)",
    comments: [
      { id: 23, userId: 5, text: "The mantecatura explanation alone is worth the price. Game changer!", likes: 41, replies: [] }
    ]
  },
  {
    id: 13, authorId: 6, title: "Rainbow Smoothie Bowl",
    shortDesc: "Instagram-worthy açaí bowl bursting with color and nutrition.",
    description: `The most beautiful breakfast you'll ever make!\n\n**Base Layer:**\n**Step 1:** Blend 200g frozen açaí (or mixed berries), 1 frozen banana, 100ml coconut milk, and 1 tbsp honey until thick and smooth. It should be thicker than a smoothie!\n\n**Toppings (the art part!):**\n**Step 2:** Pour base into a bowl. Smooth the top with the back of a spoon.\n\n**Step 3:** Arrange in rows: sliced strawberries, kiwi, mango, blueberries, and banana.\n\n**Step 4:** Add texture: granola, coconut flakes, chia seeds, and hemp hearts.\n\n**Step 5:** Drizzle with honey and a dollop of peanut butter.\n\n**Pro tip:** Keep all toppings in the freezer for 5 min before plating — they'll hold their shape better for photos!`,
    ingredients: ["Banana", "Blueberries", "Strawberries", "Coconut Milk", "Honey", "Chia Seeds", "Peanut Butter"],
    difficulty: "Easy", duration: 10, type: "Diet",
    isPaid: false, price: 0,
    likes: 4321, reposts: 876,
    photos: ["🥣"], gradient: "linear-gradient(135deg, #CE93D8 0%, #7B1FA2 100%)",
    comments: [
      { id: 24, userId: 3, text: "This is almost too pretty to eat! Almost... 😄", likes: 52, replies: [] }
    ]
  }
];

const ALBUMS = [
  {
    id: 1, authorId: 4, title: "7-Day Muscle Gain Meal Plan",
    description: "Complete week of high-protein meals designed for muscle building. Over 150g protein daily with detailed macros for each meal.",
    recipeIds: [3, 7, 11],
    isPaid: true, price: 9.99,
    likes: 3421, reposts: 567,
    gradient: "linear-gradient(135deg, #EF5350 0%, #B71C1C 100%)",
    icon: "💪",
    comments: [
      { id: 25, userId: 1, text: "Following this plan for 3 weeks now. Already seeing results!", likes: 34, replies: [] },
      { id: 26, userId: 3, text: "Great variety! Not boring at all compared to other meal plans.", likes: 18, replies: [] }
    ]
  },
  {
    id: 2, authorId: 3, title: "Healthy Week: Clean Eating Reset",
    description: "A full week of clean, wholesome meals to reset your diet. Balanced macros, whole ingredients, and maximum nutrition.",
    recipeIds: [2, 8, 13],
    isPaid: false, price: 0,
    likes: 5678, reposts: 934,
    gradient: "linear-gradient(135deg, #66BB6A 0%, #2E7D32 100%)",
    icon: "🥬",
    comments: [
      { id: 27, userId: 4, text: "Shared this with all my clients. Perfect starting point!", likes: 56, replies: [] }
    ]
  },
  {
    id: 3, authorId: 6, title: "30-Day Vegan Challenge",
    description: "One month of delicious plant-based recipes that will make you forget about meat. Includes breakfast, lunch, dinner, and snacks.",
    recipeIds: [5, 13],
    isPaid: true, price: 14.99,
    likes: 2345, reposts: 321,
    gradient: "linear-gradient(135deg, #AED581 0%, #689F38 100%)",
    icon: "🌱",
    comments: [
      { id: 28, userId: 7, text: "As a fellow vegan creator, this is top-notch content. Highly recommend!", likes: 29, replies: [] }
    ]
  },
  {
    id: 4, authorId: 2, title: "Italian Classics Collection",
    description: "The essential Italian recipes every home cook should master. From pasta to risotto to desserts — la dolce vita on your plate.",
    recipeIds: [1, 12],
    isPaid: false, price: 0,
    likes: 7890, reposts: 1234,
    gradient: "linear-gradient(135deg, #FF8A65 0%, #D84315 100%)",
    icon: "🇮🇹",
    comments: [
      { id: 29, userId: 5, text: "Marco's recipes never disappoint. This collection is a masterpiece!", likes: 73, replies: [] }
    ]
  }
];

// App State (mutable)
let appState = {
  currentUser: null,
  likedRecipes: [3, 7],
  likedAlbums: [2],
  repostedRecipes: [7],
  repostedAlbums: [],
  purchasedRecipes: [],
  purchasedAlbums: [],
  userCreatedRecipes: [],
  userCreatedAlbums: []
};

function saveState() {
  try { localStorage.setItem('foodgram_state', JSON.stringify(appState)); } catch(e) {}
}

function loadState() {
  try {
    const s = localStorage.getItem('foodgram_state');
    if (s) appState = { ...appState, ...JSON.parse(s) };
  } catch(e) {}
}
