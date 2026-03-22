// ============================================================
// FOODGRAM — Fake Data Store
// ============================================================

const FOOD_IMAGES = {
  pasta: [
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop'
  ],
  salad: [
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop'
  ],
  smoothie: [
    'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&h=400&fit=crop'
  ],
  chicken: [
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&h=400&fit=crop'
  ],
  steak: [
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop'
  ],
  sushi: [
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&h=400&fit=crop'
  ],
  cake: [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop'
  ],
  soup: [
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1603105037880-880cd4f0647d?w=600&h=400&fit=crop'
  ],
  breakfast: [
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&h=400&fit=crop'
  ],
  pizza: [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop'
  ],
  tacos: [
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=400&fit=crop'
  ],
  bowl: [
    'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1511690743698-d9d18f7e20f1?w=600&h=400&fit=crop'
  ]
};

const ALBUM_COVERS = {
  diet: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
  muscle: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=600&h=400&fit=crop',
  fatburn: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop',
  weekly: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=400&fit=crop'
};

const AVATAR_COLORS = [
  ['#FF6B6B','#EE5A24'],
  ['#48DBFB','#0ABDE3'],
  ['#FECA57','#FF9F43'],
  ['#FF9FF3','#F368E0'],
  ['#54A0FF','#2E86DE'],
  ['#5F27CD','#341F97'],
  ['#01a3a4','#00b894'],
  ['#e17055','#d63031']
];

const ALL_INGREDIENTS = [
  'Chicken Breast','Rice','Pasta','Tomato','Onion','Garlic','Olive Oil','Egg',
  'Milk','Butter','Flour','Sugar','Salt','Pepper','Lemon','Avocado',
  'Spinach','Broccoli','Salmon','Shrimp','Beef','Tofu','Quinoa','Sweet Potato',
  'Bell Pepper','Mushroom','Cheese','Yogurt','Oats','Banana','Blueberry',
  'Almond','Honey','Ginger','Soy Sauce','Lime','Cilantro','Coconut Milk',
  'Chickpeas','Black Beans','Corn','Jalapeño','Tortilla','Bread','Cucumber',
  'Carrot','Celery','Peanut Butter','Protein Powder','Cottage Cheese'
];

// === USERS ===
const DB_USERS = [
  {
    id: 'u1', name: 'Chef Marco', email: 'marco@food.com', password: 'pass123',
    bio: 'Italian cuisine enthusiast 🍝 Professional chef with 10 years experience.',
    avatarColors: AVATAR_COLORS[0], followers: ['u3','u4','u5'], following: ['u2','u3'],
    interests: ['diet','sport','muscle'],
    showReposts: true
  },
  {
    id: 'u2', name: 'FitKitchen Amy', email: 'amy@food.com', password: 'pass123',
    bio: 'Fitness & nutrition coach. Healthy meals that actually taste good! 💪',
    avatarColors: AVATAR_COLORS[1], followers: ['u1','u4','u5','u6'], following: ['u1','u3'],
    interests: ['sport','fatburn'],
    showReposts: true
  },
  {
    id: 'u3', name: 'BakeMaster', email: 'baker@food.com', password: 'pass123',
    bio: 'Pastry chef & cake artist. Sweetness is my love language 🎂',
    avatarColors: AVATAR_COLORS[2], followers: ['u1','u2'], following: ['u1','u2','u4'],
    interests: ['comfort','quick'],
    showReposts: false
  },
  {
    id: 'u4', name: 'QuickBites Tom', email: 'tom@food.com', password: 'pass123',
    bio: 'College student sharing easy 15-min recipes 🔥 No fancy equipment needed.',
    avatarColors: AVATAR_COLORS[3], followers: ['u2','u3','u5'], following: ['u1','u2'],
    interests: ['quick','budget'],
    showReposts: true
  },
  {
    id: 'u5', name: 'VeganVibes', email: 'vegan@food.com', password: 'pass123',
    bio: 'Plant-based recipes for everyone 🌿 Making vegan food exciting!',
    avatarColors: AVATAR_COLORS[4], followers: ['u1','u2','u4'], following: ['u2','u6'],
    interests: ['diet','vegan'],
    showReposts: true
  },
  {
    id: 'u6', name: 'SushiSensei', email: 'sushi@food.com', password: 'pass123',
    bio: 'Japanese cuisine master 🍣 Traditional meets modern.',
    avatarColors: AVATAR_COLORS[5], followers: ['u5'], following: ['u1','u2','u5'],
    interests: ['sport','traditional'],
    showReposts: true
  }
];

// === RECIPES ===
const DB_RECIPES = [
  {
    id: 'r1', authorId: 'u1', title: 'Creamy Garlic Pasta',
    shortDesc: 'Rich and creamy pasta with roasted garlic and parmesan.',
    fullDesc: `1. Cook pasta in salted boiling water until al dente (about 8-10 minutes).\n2. While pasta cooks, mince 6 cloves of garlic and sauté in olive oil over medium heat until golden.\n3. Add heavy cream and bring to a gentle simmer.\n4. Toss in freshly grated parmesan cheese and stir until melted and smooth.\n5. Drain pasta and add to the sauce. Toss to coat evenly.\n6. Season with salt, pepper, and a pinch of nutmeg.\n7. Serve immediately with extra parmesan and fresh basil on top.`,
    difficulty: 'easy', duration: 25, type: 'comfort',
    ingredients: ['Pasta','Garlic','Olive Oil','Cheese','Milk','Salt','Pepper','Butter'],
    photos: FOOD_IMAGES.pasta,
    hasVideo: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isPaid: false, price: 0,
    likes: ['u2','u3','u4','u5'], reposts: ['u2','u4'], comments: [
      { id: 'c1', authorId: 'u2', text: 'Made this last night — absolutely divine! 😍', likes: ['u1','u3'], replies: [
        { id: 'c1r1', authorId: 'u1', text: 'So glad you liked it Amy!', likes: ['u2'] }
      ]},
      { id: 'c2', authorId: 'u4', text: 'Super easy and quick. Perfect for students!', likes: ['u1'], replies: [] }
    ],
    createdAt: '2025-12-15'
  },
  {
    id: 'r2', authorId: 'u2', title: 'Protein Power Bowl',
    shortDesc: 'High-protein bowl with grilled chicken, quinoa and veggies.',
    fullDesc: `1. Cook quinoa according to package directions (about 15 min).\n2. Season chicken breast with paprika, garlic powder, salt and pepper.\n3. Grill chicken for 6-7 minutes per side until cooked through.\n4. Steam broccoli florets for 3-4 minutes.\n5. Slice avocado and prepare toppings.\n6. Assemble bowl: quinoa base, sliced chicken, broccoli, avocado, cherry tomatoes.\n7. Drizzle with lemon-tahini dressing.\n8. Top with sesame seeds and microgreens.`,
    difficulty: 'medium', duration: 35, type: 'sport',
    ingredients: ['Chicken Breast','Quinoa','Broccoli','Avocado','Tomato','Lemon','Salt','Pepper','Olive Oil'],
    photos: FOOD_IMAGES.bowl,
    hasVideo: false, videoUrl: '',
    isPaid: false, price: 0,
    likes: ['u1','u3','u5','u6'], reposts: ['u1','u5'], comments: [
      { id: 'c3', authorId: 'u5', text: 'Swapped chicken for tofu and it was amazing!', likes: ['u2','u4'], replies: [
        { id: 'c3r1', authorId: 'u2', text: 'Love that variation! Tofu is great here.', likes: ['u5'] }
      ]}
    ],
    createdAt: '2025-12-20'
  },
  {
    id: 'r3', authorId: 'u2', title: 'Fat-Burning Green Smoothie',
    shortDesc: 'Metabolism-boosting smoothie with spinach, ginger and lemon.',
    fullDesc: `1. Add 2 cups of fresh spinach to blender.\n2. Add 1 banana (frozen works best for creaminess).\n3. Add 1 tablespoon of freshly grated ginger.\n4. Squeeze in juice of 1 lemon.\n5. Add 1 cup of coconut milk.\n6. Add 1 scoop of protein powder (optional).\n7. Blend on high for 60 seconds until smooth.\n8. Pour and enjoy immediately for best nutrition.`,
    difficulty: 'easy', duration: 5, type: 'fatburn',
    ingredients: ['Spinach','Banana','Ginger','Lemon','Coconut Milk','Protein Powder'],
    photos: FOOD_IMAGES.smoothie,
    hasVideo: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isPaid: false, price: 0,
    likes: ['u1','u4','u6'], reposts: ['u4'], comments: [
      { id: 'c4', authorId: 'u4', text: 'Drink this every morning now. Game changer!', likes: ['u2'], replies: [] }
    ],
    createdAt: '2026-01-02'
  },
  {
    id: 'r4', authorId: 'u3', title: 'Triple Chocolate Layer Cake',
    shortDesc: 'Decadent three-layer chocolate cake with ganache frosting.',
    fullDesc: `1. Preheat oven to 350°F (175°C). Grease three 9-inch cake pans.\n2. Mix flour, sugar, cocoa powder, baking soda, and salt.\n3. Add eggs, milk, oil, and vanilla. Beat for 2 minutes.\n4. Stir in boiling water (batter will be thin — that's okay).\n5. Divide batter among pans and bake 30-35 minutes.\n6. For ganache: heat cream, pour over chopped chocolate, stir until smooth.\n7. Let cakes cool completely before frosting.\n8. Layer cakes with ganache between each layer and on top.\n9. Decorate with chocolate shavings and berries.`,
    difficulty: 'hard', duration: 90, type: 'comfort',
    ingredients: ['Flour','Sugar','Egg','Milk','Butter','Honey'],
    photos: FOOD_IMAGES.cake,
    hasVideo: false, videoUrl: '',
    isPaid: true, price: 4.99,
    likes: ['u1','u2','u4','u5','u6'], reposts: ['u1','u2','u5'], comments: [
      { id: 'c5', authorId: 'u1', text: 'Worth every penny! The ganache recipe alone is gold.', likes: ['u3','u2','u4'], replies: [
        { id: 'c5r1', authorId: 'u3', text: 'Thank you Marco! Means a lot coming from you 🙏', likes: ['u1'] }
      ]},
      { id: 'c6', authorId: 'u5', text: 'Made a vegan version and it turned out incredible!', likes: ['u3'], replies: [] }
    ],
    createdAt: '2026-01-10'
  },
  {
    id: 'r5', authorId: 'u4', title: '5-Minute Egg Wrap',
    shortDesc: 'Quick breakfast wrap — scrambled eggs, cheese, and veggies.',
    fullDesc: `1. Crack 2 eggs into a bowl, add salt and pepper, whisk.\n2. Heat a non-stick pan over medium heat with a bit of butter.\n3. Pour eggs and scramble gently for 2 minutes.\n4. Warm a tortilla in the microwave for 15 seconds.\n5. Add scrambled eggs, shredded cheese, diced tomato, and spinach.\n6. Roll it up tight and slice in half.\n7. Optional: add hot sauce or avocado slices.`,
    difficulty: 'easy', duration: 5, type: 'quick',
    ingredients: ['Egg','Tortilla','Cheese','Tomato','Spinach','Butter','Salt','Pepper'],
    photos: FOOD_IMAGES.breakfast,
    hasVideo: false, videoUrl: '',
    isPaid: false, price: 0,
    likes: ['u1','u2','u3'], reposts: ['u2'], comments: [
      { id: 'c7', authorId: 'u2', text: 'Perfect quick breakfast! Added some turkey for extra protein.', likes: ['u4'], replies: [] }
    ],
    createdAt: '2026-01-15'
  },
  {
    id: 'r6', authorId: 'u6', title: 'Classic Salmon Sushi Rolls',
    shortDesc: 'Traditional maki rolls with fresh salmon and avocado.',
    fullDesc: `1. Cook sushi rice and season with rice vinegar, sugar, and salt.\n2. Place a nori sheet on a bamboo rolling mat.\n3. Spread a thin layer of rice over the nori, leaving 1 inch at the top.\n4. Lay thin slices of fresh salmon and avocado across the center.\n5. Add a thin line of cream cheese if desired.\n6. Roll tightly using the bamboo mat, sealing with water on the bare nori edge.\n7. Slice into 8 pieces with a wet, sharp knife.\n8. Serve with soy sauce, wasabi, and pickled ginger.`,
    difficulty: 'hard', duration: 60, type: 'traditional',
    ingredients: ['Salmon','Rice','Avocado','Soy Sauce','Ginger','Cucumber'],
    photos: FOOD_IMAGES.sushi,
    hasVideo: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isPaid: true, price: 6.99,
    likes: ['u1','u2','u3','u4','u5'], reposts: ['u1','u3','u4'], comments: [
      { id: 'c8', authorId: 'u1', text: 'The technique tips here are incredible. Best sushi tutorial!', likes: ['u6','u2'], replies: [
        { id: 'c8r1', authorId: 'u6', text: 'Glad it helped! Practice makes perfect with sushi 🍣', likes: ['u1'] }
      ]}
    ],
    createdAt: '2026-01-18'
  },
  {
    id: 'r7', authorId: 'u1', title: 'Margherita Pizza from Scratch',
    shortDesc: 'Authentic Neapolitan-style pizza with fresh mozzarella and basil.',
    fullDesc: `1. Make dough: mix flour, yeast, salt, water, and olive oil. Knead 10 minutes.\n2. Let dough rise for 1 hour in a warm place.\n3. Preheat oven to maximum temperature (500°F/260°C) with a pizza stone.\n4. Stretch dough into a 12-inch round on a floured surface.\n5. Spread a thin layer of crushed San Marzano tomatoes.\n6. Tear fresh mozzarella and distribute evenly.\n7. Drizzle with olive oil and add fresh basil leaves.\n8. Slide onto pizza stone and bake 8-10 minutes until bubbly and charred.`,
    difficulty: 'medium', duration: 45, type: 'comfort',
    ingredients: ['Flour','Tomato','Cheese','Olive Oil','Salt','Garlic'],
    photos: FOOD_IMAGES.pizza,
    hasVideo: false, videoUrl: '',
    isPaid: false, price: 0,
    likes: ['u2','u3','u4','u6'], reposts: ['u3','u6'], comments: [
      { id: 'c9', authorId: 'u4', text: 'Finally a pizza recipe that actually works in a home oven!', likes: ['u1','u2'], replies: [] }
    ],
    createdAt: '2026-02-01'
  },
  {
    id: 'r8', authorId: 'u2', title: 'Lean Chicken Stir Fry',
    shortDesc: 'Quick high-protein stir fry with chicken and mixed vegetables.',
    fullDesc: `1. Slice chicken breast into thin strips.\n2. Marinate with soy sauce, ginger, and garlic for 10 minutes.\n3. Heat a wok or large pan with a tablespoon of oil over high heat.\n4. Stir fry chicken strips for 4-5 minutes until golden.\n5. Remove chicken and add sliced bell peppers, broccoli, and mushrooms.\n6. Stir fry vegetables for 3-4 minutes until crisp-tender.\n7. Return chicken to the wok, add sauce (soy sauce, honey, lime juice).\n8. Serve over brown rice or cauliflower rice.`,
    difficulty: 'easy', duration: 20, type: 'sport',
    ingredients: ['Chicken Breast','Bell Pepper','Broccoli','Mushroom','Soy Sauce','Ginger','Garlic','Rice','Lime','Honey'],
    photos: FOOD_IMAGES.chicken,
    hasVideo: false, videoUrl: '',
    isPaid: false, price: 0,
    likes: ['u1','u4','u5','u6'], reposts: ['u4'], comments: [],
    createdAt: '2026-02-05'
  },
  {
    id: 'r9', authorId: 'u5', title: 'Vegan Buddha Bowl',
    shortDesc: 'Colorful plant-based bowl loaded with nutrients and flavor.',
    fullDesc: `1. Cook quinoa and set aside.\n2. Roast sweet potato cubes at 400°F for 25 minutes.\n3. Prepare tahini dressing: tahini, lemon juice, garlic, water, salt.\n4. Slice avocado and prepare raw veggies (cucumber, carrot, cabbage).\n5. Cook chickpeas in a pan with cumin and paprika until crispy.\n6. Assemble bowls: quinoa, sweet potato, chickpeas, avocado, veggies.\n7. Drizzle with tahini dressing and top with sesame seeds.`,
    difficulty: 'easy', duration: 30, type: 'diet',
    ingredients: ['Quinoa','Sweet Potato','Avocado','Chickpeas','Cucumber','Carrot','Lemon','Garlic'],
    photos: FOOD_IMAGES.salad,
    hasVideo: false, videoUrl: '',
    isPaid: false, price: 0,
    likes: ['u2','u3','u4'], reposts: ['u2'], comments: [
      { id: 'c10', authorId: 'u2', text: 'This is my go-to meal prep recipe now!', likes: ['u5'], replies: [] }
    ],
    createdAt: '2026-02-10'
  },
  {
    id: 'r10', authorId: 'u4', title: 'Spicy Street Tacos',
    shortDesc: 'Authentic Mexican-style tacos with homemade salsa verde.',
    fullDesc: `1. Season beef with chili powder, cumin, garlic powder, salt, and pepper.\n2. Cook beef in a hot skillet for 8-10 minutes until browned.\n3. Make salsa verde: blend tomatillos, jalapeño, cilantro, lime, and salt.\n4. Warm corn tortillas on a dry skillet.\n5. Dice onion and chop fresh cilantro for topping.\n6. Assemble tacos: tortilla, beef, onion, cilantro, salsa verde.\n7. Squeeze fresh lime on top and enjoy!`,
    difficulty: 'medium', duration: 30, type: 'comfort',
    ingredients: ['Beef','Tortilla','Onion','Cilantro','Lime','Jalapeño','Garlic','Salt','Pepper'],
    photos: FOOD_IMAGES.tacos,
    hasVideo: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isPaid: false, price: 0,
    likes: ['u1','u2','u3','u5','u6'], reposts: ['u1','u6'], comments: [
      { id: 'c11', authorId: 'u6', text: 'The salsa verde recipe alone is worth saving!', likes: ['u4','u1'], replies: [] }
    ],
    createdAt: '2026-02-15'
  },
  {
    id: 'r11', authorId: 'u1', title: 'Wagyu Beef Medallions',
    shortDesc: 'Premium wagyu beef with red wine reduction. A luxurious dining experience.',
    fullDesc: `1. Take wagyu medallions out of the fridge 30 minutes before cooking.\n2. Season generously with flaky sea salt and cracked black pepper.\n3. Heat a cast iron skillet until smoking hot.\n4. Sear medallions 3 minutes per side for medium-rare.\n5. Rest for 5 minutes on a warm plate.\n6. For the sauce: deglaze pan with red wine, add shallots, reduce by half.\n7. Finish sauce with cold butter for silky texture.\n8. Plate with roasted vegetables and drizzle sauce.`,
    difficulty: 'hard', duration: 45, type: 'muscle',
    ingredients: ['Beef','Butter','Onion','Salt','Pepper','Olive Oil'],
    photos: FOOD_IMAGES.steak,
    hasVideo: false, videoUrl: '',
    isPaid: true, price: 9.99,
    likes: ['u2','u3','u4','u5','u6'], reposts: ['u2','u3','u4','u5','u6'], comments: [
      { id: 'c12', authorId: 'u2', text: 'The sauce technique here is restaurant-quality!', likes: ['u1','u3','u4'], replies: [
        { id: 'c12r1', authorId: 'u1', text: 'Thanks Amy! The key is really cold butter at the end.', likes: ['u2','u4'] }
      ]}
    ],
    createdAt: '2026-02-18'
  },
  {
    id: 'r12', authorId: 'u3', title: 'Overnight Oats Parfait',
    shortDesc: 'No-cook breakfast perfection. Prep the night before, grab and go!',
    fullDesc: `1. In a jar, combine 1/2 cup oats with 1/2 cup milk.\n2. Add 1/4 cup yogurt and 1 tablespoon honey.\n3. Stir in 1 tablespoon chia seeds.\n4. Refrigerate overnight (at least 6 hours).\n5. In the morning, layer with fresh blueberries and sliced banana.\n6. Top with a drizzle of peanut butter and granola.\n7. Can be stored in the fridge for up to 3 days.`,
    difficulty: 'easy', duration: 10, type: 'diet',
    ingredients: ['Oats','Milk','Yogurt','Honey','Banana','Blueberry','Peanut Butter'],
    photos: FOOD_IMAGES.breakfast,
    hasVideo: false, videoUrl: '',
    isPaid: false, price: 0,
    likes: ['u1','u4','u5'], reposts: ['u4','u5'], comments: [],
    createdAt: '2026-03-01'
  },
  {
    id: 'r13', authorId: 'u2', title: 'Tom Kha Gai Soup',
    shortDesc: 'Thai coconut chicken soup with galangal and lemongrass.',
    fullDesc: `1. Slice chicken breast thinly.\n2. In a pot, bring coconut milk to a gentle simmer.\n3. Add sliced ginger (or galangal), lemongrass, and lime leaves.\n4. Add chicken and mushrooms, cook for 10 minutes.\n5. Season with fish sauce and lime juice.\n6. Add cherry tomatoes and cilantro.\n7. Serve hot with steamed jasmine rice.`,
    difficulty: 'medium', duration: 30, type: 'comfort',
    ingredients: ['Chicken Breast','Coconut Milk','Mushroom','Ginger','Lime','Cilantro','Tomato'],
    photos: FOOD_IMAGES.soup,
    hasVideo: false, videoUrl: '',
    isPaid: true, price: 3.99,
    likes: ['u1','u3','u6'], reposts: ['u6'], comments: [
      { id: 'c13', authorId: 'u6', text: 'Authentic flavors! Reminds me of my trip to Thailand.', likes: ['u2'], replies: [] }
    ],
    createdAt: '2026-03-05'
  }
];

// === ALBUMS ===
const DB_ALBUMS = [
  {
    id: 'a1', authorId: 'u2', title: '7-Day Fat Burn Meal Plan',
    description: 'A complete week of calorie-deficit meals designed to maximize fat loss while keeping you satisfied and energized. Each recipe is macro-balanced and gym-approved.',
    difficulty: 'easy', type: 'comfort',
    coverPhoto: ALBUM_COVERS.fatburn,
    recipeIds: ['r2','r3','r8','r9'],
    isPaid: false, price: 0,
    likes: ['u1','u4','u5','u6'], reposts: ['u1','u4'], comments: [
      { id: 'ac1', authorId: 'u4', text: 'Following this plan, lost 3lbs in the first week!', likes: ['u2','u5'], replies: [
        { id: 'ac1r1', authorId: 'u2', text: 'Awesome progress Tom! Keep it up 💪', likes: ['u4'] }
      ]}
    ],
    createdAt: '2026-02-20'
  },
  {
    id: 'a2', authorId: 'u2', title: 'Muscle Building Weekly Menu',
    description: 'High-protein recipes for serious gains. Hit your macros with these tasty, gym-bro approved meals. 180g+ protein per day!',
    difficulty: 'medium', type: 'diet',
    coverPhoto: ALBUM_COVERS.muscle,
    recipeIds: ['r2','r8','r5'],
    isPaid: true, price: 12.99,
    likes: ['u1','u4','u6'], reposts: ['u4'], comments: [
      { id: 'ac2', authorId: 'u1', text: 'Great value for the amount of content!', likes: ['u2'], replies: [] }
    ],
    createdAt: '2026-02-25'
  },
  {
    id: 'a3', authorId: 'u1', title: 'Italian Classics Collection',
    description: 'My favorite traditional Italian recipes passed down through generations. From pasta to pizza, experience the real taste of Italy.',
    difficulty: 'hard', type: 'muscle',
    coverPhoto: ALBUM_COVERS.weekly,
    recipeIds: ['r1','r7','r11'],
    isPaid: false, price: 0,
    likes: ['u2','u3','u4','u5'], reposts: ['u2','u3'], comments: [
      { id: 'ac3', authorId: 'u3', text: 'Every single recipe in here is a masterpiece!', likes: ['u1','u2'], replies: [] }
    ],
    createdAt: '2026-03-01'
  },
  {
    id: 'a4', authorId: 'u5', title: 'Plant-Based Starter Kit',
    description: 'New to veganism? Start here! Easy, affordable, and delicious recipes that will make the transition seamless.',
    difficulty: 'hard', type: 'diet',
    coverPhoto: ALBUM_COVERS.diet,
    recipeIds: ['r9','r3'],
    isPaid: false, price: 0,
    likes: ['u2','u4'], reposts: ['u2'], comments: [],
    createdAt: '2026-03-10'
  }
];

// === DIFFICULTY & TYPE LABELS ===
const DIFFICULTY_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
const TYPE_LABELS = {
  sport: 'Sport / Fitness',
  diet: 'Diet',
  muscle: 'Muscle Gain',
  fatburn: 'Fat Burn',
  comfort: 'Comfort Food',
  quick: 'Quick & Easy',
  traditional: 'Traditional',
  vegan: 'Vegan',
  budget: 'Budget Friendly'
};

// === DATA LAYER (with localStorage persistence) ===
class DataStore {
  constructor() {
    this.users = JSON.parse(JSON.stringify(DB_USERS));
    this.recipes = JSON.parse(JSON.stringify(DB_RECIPES));
    this.albums = JSON.parse(JSON.stringify(DB_ALBUMS));
    this.currentUser = null;
    this.purchased = []; // { type: 'recipe'|'album', id: string }
    this.load();
  }

  save() {
    const state = {
      users: this.users,
      recipes: this.recipes,
      albums: this.albums,
      currentUserId: this.currentUser ? this.currentUser.id : null,
      purchased: this.purchased
    };
    localStorage.setItem('foodgram_data', JSON.stringify(state));
  }

  load() {
    const saved = localStorage.getItem('foodgram_data');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        this.users = state.users || this.users;
        this.recipes = state.recipes || this.recipes;
        this.albums = state.albums || this.albums;
        this.purchased = state.purchased || [];
        if (state.currentUserId) {
          this.currentUser = this.users.find(u => u.id === state.currentUserId) || null;
        }
      } catch(e) { console.error('Failed to load state', e); }
    }
  }

  reset() {
    localStorage.removeItem('foodgram_data');
    this.users = JSON.parse(JSON.stringify(DB_USERS));
    this.recipes = JSON.parse(JSON.stringify(DB_RECIPES));
    this.albums = JSON.parse(JSON.stringify(DB_ALBUMS));
    this.currentUser = null;
    this.purchased = [];
  }

  // Auth
  login(email, password) {
    const u = this.users.find(u => u.email === email && u.password === password);
    if (u) { this.currentUser = u; this.save(); }
    return u;
  }

  register(name, email, password) {
    if (this.users.find(u => u.email === email)) return null;
    const u = {
      id: 'u' + Date.now(),
      name, email, password,
      bio: 'New to Foodgram! 🍽️',
      avatarColors: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      followers: [], following: [],
      interests: [],
      showReposts: true
    };
    this.users.push(u);
    this.currentUser = u;
    this.save();
    return u;
  }

  logout() { this.currentUser = null; this.save(); }

  // Users
  getUser(id) { return this.users.find(u => u.id === id); }

  toggleFollow(targetId) {
    if (!this.currentUser || targetId === this.currentUser.id) return;
    const target = this.getUser(targetId);
    if (!target) return;
    const idx = this.currentUser.following.indexOf(targetId);
    if (idx > -1) {
      this.currentUser.following.splice(idx, 1);
      target.followers = target.followers.filter(f => f !== this.currentUser.id);
    } else {
      this.currentUser.following.push(targetId);
      target.followers.push(this.currentUser.id);
    }
    this.save();
  }

  isFollowing(targetId) {
    return this.currentUser && this.currentUser.following.includes(targetId);
  }

  updateProfile(updates) {
    if (!this.currentUser) return;
    Object.assign(this.currentUser, updates);
    this.save();
  }

  // Recipes
  getRecipe(id) { return this.recipes.find(r => r.id === id); }

  getUserRecipes(userId) { return this.recipes.filter(r => r.authorId === userId); }

  toggleLikeRecipe(recipeId) {
    if (!this.currentUser) return;
    const r = this.getRecipe(recipeId);
    if (!r) return;
    const idx = r.likes.indexOf(this.currentUser.id);
    if (idx > -1) r.likes.splice(idx, 1);
    else r.likes.push(this.currentUser.id);
    this.save();
  }

  isLikedRecipe(recipeId) {
    if (!this.currentUser) return false;
    const r = this.getRecipe(recipeId);
    return r && r.likes.includes(this.currentUser.id);
  }

  toggleRepostRecipe(recipeId) {
    if (!this.currentUser) return;
    const r = this.getRecipe(recipeId);
    if (!r) return;
    const idx = r.reposts.indexOf(this.currentUser.id);
    if (idx > -1) r.reposts.splice(idx, 1);
    else r.reposts.push(this.currentUser.id);
    this.save();
  }

  isRepostedRecipe(recipeId) {
    if (!this.currentUser) return false;
    const r = this.getRecipe(recipeId);
    return r && r.reposts.includes(this.currentUser.id);
  }

  addCommentRecipe(recipeId, text) {
    if (!this.currentUser) return;
    const r = this.getRecipe(recipeId);
    if (!r) return;
    r.comments.push({
      id: 'c' + Date.now(), authorId: this.currentUser.id,
      text, likes: [], replies: []
    });
    this.save();
  }

  addReplyRecipe(recipeId, commentId, text) {
    if (!this.currentUser) return;
    const r = this.getRecipe(recipeId);
    if (!r) return;
    const comment = r.comments.find(c => c.id === commentId);
    if (!comment) return;
    comment.replies.push({
      id: 'cr' + Date.now(), authorId: this.currentUser.id,
      text, likes: []
    });
    this.save();
  }

  toggleLikeComment(recipeId, commentId, replyId) {
    if (!this.currentUser) return;
    const r = this.getRecipe(recipeId);
    if (!r) return;
    let target;
    const comment = r.comments.find(c => c.id === commentId);
    if (!comment) return;
    target = replyId ? comment.replies.find(r => r.id === replyId) : comment;
    if (!target) return;
    const idx = target.likes.indexOf(this.currentUser.id);
    if (idx > -1) target.likes.splice(idx, 1);
    else target.likes.push(this.currentUser.id);
    this.save();
  }

  createRecipe(data) {
    if (!this.currentUser) return null;
    const recipe = {
      id: 'r' + Date.now(),
      authorId: this.currentUser.id,
      title: data.title,
      shortDesc: data.shortDesc,
      fullDesc: data.fullDesc,
      difficulty: data.difficulty,
      duration: parseInt(data.duration),
      type: data.type,
      ingredients: data.ingredients,
      photos: data.photos || [],
      hasVideo: !!data.videoUrl,
      videoUrl: data.videoUrl || '',
      isPaid: data.isPaid || false,
      price: parseFloat(data.price) || 0,
      likes: [], reposts: [], comments: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.recipes.push(recipe);
    this.save();
    return recipe;
  }

  updateRecipe(id, data) {
    const r = this.getRecipe(id);
    if (!r || !this.currentUser || r.authorId !== this.currentUser.id) return null;
    Object.assign(r, data);
    this.save();
    return r;
  }

  deleteRecipe(id) {
    const idx = this.recipes.findIndex(r => r.id === id);
    if (idx > -1 && this.currentUser && this.recipes[idx].authorId === this.currentUser.id) {
      this.recipes.splice(idx, 1);
      this.albums.forEach(a => { a.recipeIds = a.recipeIds.filter(rid => rid !== id); });
      this.save();
    }
  }

  // Albums
  getAlbum(id) { return this.albums.find(a => a.id === id); }

  getUserAlbums(userId) { return this.albums.filter(a => a.authorId === userId); }

  toggleLikeAlbum(albumId) {
    if (!this.currentUser) return;
    const a = this.getAlbum(albumId);
    if (!a) return;
    const idx = a.likes.indexOf(this.currentUser.id);
    if (idx > -1) a.likes.splice(idx, 1);
    else a.likes.push(this.currentUser.id);
    this.save();
  }

  isLikedAlbum(albumId) {
    if (!this.currentUser) return false;
    const a = this.getAlbum(albumId);
    return a && a.likes.includes(this.currentUser.id);
  }

  toggleRepostAlbum(albumId) {
    if (!this.currentUser) return;
    const a = this.getAlbum(albumId);
    if (!a) return;
    const idx = a.reposts.indexOf(this.currentUser.id);
    if (idx > -1) a.reposts.splice(idx, 1);
    else a.reposts.push(this.currentUser.id);
    this.save();
  }

  isRepostedAlbum(albumId) {
    if (!this.currentUser) return false;
    const a = this.getAlbum(albumId);
    return a && a.reposts.includes(this.currentUser.id);
  }

  addCommentAlbum(albumId, text) {
    if (!this.currentUser) return;
    const a = this.getAlbum(albumId);
    if (!a) return;
    a.comments.push({
      id: 'ac' + Date.now(), authorId: this.currentUser.id,
      text, likes: [], replies: []
    });
    this.save();
  }

  addReplyAlbum(albumId, commentId, text) {
    if (!this.currentUser) return;
    const a = this.getAlbum(albumId);
    if (!a) return;
    const comment = a.comments.find(c => c.id === commentId);
    if (!comment) return;
    comment.replies.push({
      id: 'acr' + Date.now(), authorId: this.currentUser.id,
      text, likes: []
    });
    this.save();
  }

  toggleLikeAlbumComment(albumId, commentId, replyId) {
    if (!this.currentUser) return;
    const a = this.getAlbum(albumId);
    if (!a) return;
    const comment = a.comments.find(c => c.id === commentId);
    if (!comment) return;
    const target = replyId ? comment.replies.find(r => r.id === replyId) : comment;
    if (!target) return;
    const idx = target.likes.indexOf(this.currentUser.id);
    if (idx > -1) target.likes.splice(idx, 1);
    else target.likes.push(this.currentUser.id);
    this.save();
  }

  createAlbum(data) {
    if (!this.currentUser) return null;
    const album = {
      id: 'a' + Date.now(),
      authorId: this.currentUser.id,
      title: data.title,
      description: data.description,
      coverPhoto: data.coverPhoto || ALBUM_COVERS.weekly,
      recipeIds: data.recipeIds || [],
      isPaid: data.isPaid || false,
      price: parseFloat(data.price) || 0,
      likes: [], reposts: [], comments: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.albums.push(album);
    this.save();
    return album;
  }

  updateAlbum(id, data) {
    const a = this.getAlbum(id);
    if (!a || !this.currentUser || a.authorId !== this.currentUser.id) return null;
    Object.assign(a, data);
    this.save();
    return a;
  }

  deleteAlbum(id) {
    const idx = this.albums.findIndex(a => a.id === id);
    if (idx > -1 && this.currentUser && this.albums[idx].authorId === this.currentUser.id) {
      this.albums.splice(idx, 1);
      this.save();
    }
  }

  // Purchase
  purchase(type, id) {
    if (!this.purchased.find(p => p.type === type && p.id === id)) {
      this.purchased.push({ type, id });
      this.save();
    }
  }

  isPurchased(type, id) {
    return this.purchased.some(p => p.type === type && p.id === id);
  }

  getPurchased() { return this.purchased; }

  // Queries
  getLikedRecipes() {
    if (!this.currentUser) return [];
    return this.recipes.filter(r => r.likes.includes(this.currentUser.id));
  }

  getLikedAlbums() {
    if (!this.currentUser) return [];
    return this.albums.filter(a => a.likes.includes(this.currentUser.id));
  }

  getRepostedRecipes() {
    if (!this.currentUser) return [];
    return this.recipes.filter(r => r.reposts.includes(this.currentUser.id));
  }

  getRepostedAlbums() {
    if (!this.currentUser) return [];
    return this.albums.filter(a => a.reposts.includes(this.currentUser.id));
  }

  getUserRepostedRecipes(userId) {
    return this.recipes.filter(r => r.reposts.includes(userId));
  }

  getUserRepostedAlbums(userId) {
    return this.albums.filter(a => a.reposts.includes(userId));
  }

  getTotalLikes(userId) {
    let total = 0;
    this.recipes.filter(r => r.authorId === userId).forEach(r => total += r.likes.length);
    this.albums.filter(a => a.authorId === userId).forEach(a => total += a.likes.length);
    return total;
  }

  getFeedRecipes() {
    if (!this.currentUser) return this.recipes;
    const following = this.currentUser.following;
    const interests = this.currentUser.interests || [];
    return this.recipes.slice().sort((a, b) => {
      let scoreA = 0, scoreB = 0;
      if (following.includes(a.authorId)) scoreA += 10;
      if (following.includes(b.authorId)) scoreB += 10;
      if (interests.includes(a.type)) scoreA += 5;
      if (interests.includes(b.type)) scoreB += 5;
      scoreA += a.likes.length;
      scoreB += b.likes.length;
      return scoreB - scoreA;
    });
  }

  getFeedAlbums() {
    if (!this.currentUser) return this.albums;
    const following = this.currentUser.following;
    return this.albums.slice().sort((a, b) => {
      let scoreA = 0, scoreB = 0;
      if (following.includes(a.authorId)) scoreA += 10;
      if (following.includes(b.authorId)) scoreB += 10;
      scoreA += a.likes.length;
      scoreB += b.likes.length;
      return scoreB - scoreA;
    });
  }

  searchRecipes(query, filters = {}) {
    let results = this.recipes.slice();

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(r =>
        r.title.toLowerCase().includes(q) || r.shortDesc.toLowerCase().includes(q)
      );
    }

    if (filters.difficulty) results = results.filter(r => r.difficulty === filters.difficulty);
    if (filters.type) results = results.filter(r => r.type === filters.type);
    if (filters.minDuration !== undefined) results = results.filter(r => r.duration >= filters.minDuration);
    if (filters.maxDuration !== undefined) results = results.filter(r => r.duration <= filters.maxDuration);
    if (filters.paidFilter === 'free') results = results.filter(r => !r.isPaid);
    if (filters.paidFilter === 'paid') results = results.filter(r => r.isPaid);

    if (filters.ingredients && filters.ingredients.length > 0) {
      if (filters.ingredientMode === 'strict') {
        results = results.filter(r =>
          r.ingredients.every(ing => filters.ingredients.includes(ing))
        );
      } else {
        results = results.filter(r =>
          filters.ingredients.some(ing => r.ingredients.includes(ing))
        );
      }
    }

    return results;
  }

  searchAlbums(query, filters = {}) {
    console.log(filters);
    let results = this.albums.slice();
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(a =>
        a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      );
    }
    if (filters.difficulty) results = results.filter(a => a.difficulty === filters.difficulty);
    if (filters.type) results = results.filter(a => a.type === filters.type);
    if (filters.paidFilter === 'free') results = results.filter(a => !a.isPaid);
    if (filters.paidFilter === 'paid') results = results.filter(a => a.isPaid);
    results = [];
    return results;
  }

  searchUsers(query) {
    if (!query) return this.users;
    const q = query.toLowerCase();
    return this.users.filter(u => u.name.toLowerCase().includes(q));
  }
}

const store = new DataStore();
