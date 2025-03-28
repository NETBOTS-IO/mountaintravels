export type GalleryImage = {
    id: string
    title: string
    description?: string
    src: string
    category: string
    featured?: boolean
  }
  
  export type GalleryCategory = {
    id: string
    title: string
    description?: string
  }
  
  export const galleryCategories: GalleryCategory[] = [
    {
      id: "mountains",
      title: "Majestic Mountains",
      description: "Breathtaking views of Pakistan's towering peaks and mountain ranges",
    },
    {
      id: "valleys",
      title: "Scenic Valleys",
      description: "Lush green valleys nestled between magnificent mountains",
    },
    {
      id: "culture",
      title: "Cultural Heritage",
      description: "Rich cultural traditions and historical sites of Pakistan",
    },
    {
      id: "wildlife",
      title: "Wildlife & Nature",
      description: "Diverse flora and fauna of Pakistan's natural landscapes",
    },
    {
      id: "adventures",
      title: "Adventure Activities",
      description: "Thrilling adventures and outdoor activities",
    },
  ]
  
  export const galleryImages: GalleryImage[] = [
    // Mountains Category
    {
      id: "k2-1",
      title: "K2 - The Savage Mountain",
      description:
        "The world's second-highest mountain, also known as the Savage Mountain due to its difficulty of ascent",
      src: "/placeholder.svg?height=800&width=1200",
      category: "mountains",
      featured: true,
    },
    {
      id: "nanga-parbat-1",
      title: "Nanga Parbat",
      description: "The ninth highest mountain in the world, known as the 'Killer Mountain'",
      src: "/placeholder.svg?height=800&width=1200",
      category: "mountains",
      featured: true,
    },
    {
      id: "rakaposhi-1",
      title: "Rakaposhi Peak",
      description: "The 27th highest mountain in the world, known for its beauty and prominence",
      src: "/placeholder.svg?height=800&width=1200",
      category: "mountains",
    },
    {
      id: "broad-peak-1",
      title: "Broad Peak",
      description: "The 12th highest mountain in the world, part of the Gasherbrum massif",
      src: "/placeholder.svg?height=800&width=1200",
      category: "mountains",
    },
    {
      id: "gasherbrum-1",
      title: "Gasherbrum I",
      description: "The 11th highest mountain in the world, located in the Karakoram range",
      src: "/placeholder.svg?height=800&width=1200",
      category: "mountains",
    },
  
    // Valleys Category
    {
      id: "hunza-valley-1",
      title: "Hunza Valley",
      description:
        "A mountainous valley in the Gilgit-Baltistan region, known for its beauty and longevity of its inhabitants",
      src: "/placeholder.svg?height=800&width=1200",
      category: "valleys",
      featured: true,
    },
    {
      id: "swat-valley-1",
      title: "Swat Valley",
      description: "Known as the 'Switzerland of Pakistan' for its snow-capped mountains and green meadows",
      src: "/placeholder.svg?height=800&width=1200",
      category: "valleys",
      featured: true,
    },
    {
      id: "kaghan-valley-1",
      title: "Kaghan Valley",
      description: "A valley in the north-east of Mansehra District famous for its scenic beauty",
      src: "/placeholder.svg?height=800&width=1200",
      category: "valleys",
    },
    {
      id: "kalash-valley-1",
      title: "Kalash Valley",
      description: "Home to the Kalash people, known for their unique culture and traditions",
      src: "/placeholder.svg?height=800&width=1200",
      category: "valleys",
    },
    {
      id: "neelum-valley-1",
      title: "Neelum Valley",
      description: "A 144 km long bow-shaped valley in Azad Kashmir, known for its scenic beauty",
      src: "/placeholder.svg?height=800&width=1200",
      category: "valleys",
    },
  
    // Culture Category
    {
      id: "kalash-festival-1",
      title: "Kalash Festival",
      description: "Colorful traditional festival of the Kalash people",
      src: "/placeholder.svg?height=800&width=1200",
      category: "culture",
      featured: true,
    },
    {
      id: "baltit-fort-1",
      title: "Baltit Fort",
      description: "An ancient fort in the Hunza valley, built in the 8th century CE",
      src: "/placeholder.svg?height=800&width=1200",
      category: "culture",
    },
    {
      id: "traditional-dance-1",
      title: "Traditional Dance",
      description: "Cultural dance performance from Northern Pakistan",
      src: "/placeholder.svg?height=800&width=1200",
      category: "culture",
    },
    {
      id: "shandur-polo-1",
      title: "Shandur Polo Festival",
      description: "The world's highest polo ground where the traditional game is played",
      src: "/placeholder.svg?height=800&width=1200",
      category: "culture",
      featured: true,
    },
    {
      id: "traditional-crafts-1",
      title: "Traditional Crafts",
      description: "Handmade crafts and textiles from the northern regions",
      src: "/placeholder.svg?height=800&width=1200",
      category: "culture",
    },
  
    // Wildlife Category
    {
      id: "snow-leopard-1",
      title: "Snow Leopard",
      description: "The elusive snow leopard in its natural habitat",
      src: "/placeholder.svg?height=800&width=1200",
      category: "wildlife",
      featured: true,
    },
    {
      id: "markhor-1",
      title: "Markhor",
      description: "Pakistan's national animal, known for its impressive spiral horns",
      src: "/placeholder.svg?height=800&width=1200",
      category: "wildlife",
      featured: true,
    },
    {
      id: "himalayan-brown-bear-1",
      title: "Himalayan Brown Bear",
      description: "A subspecies of the brown bear found in the northern mountains",
      src: "/placeholder.svg?height=800&width=1200",
      category: "wildlife",
    },
    {
      id: "himalayan-ibex-1",
      title: "Himalayan Ibex",
      description: "A wild goat species found in the high mountains",
      src: "/placeholder.svg?height=800&width=1200",
      category: "wildlife",
    },
    {
      id: "deosai-flowers-1",
      title: "Deosai Wildflowers",
      description: "Colorful wildflowers blooming in the Deosai National Park",
      src: "/placeholder.svg?height=800&width=1200",
      category: "wildlife",
    },
  
    // Adventures Category
    {
      id: "trekking-1",
      title: "Trekking to K2 Base Camp",
      description: "Adventurers on the challenging trek to K2 Base Camp",
      src: "/placeholder.svg?height=800&width=1200",
      category: "adventures",
      featured: true,
    },
    {
      id: "mountaineering-1",
      title: "Mountaineering",
      description: "Climbers ascending a snow-covered peak",
      src: "/placeholder.svg?height=800&width=1200",
      category: "adventures",
    },
    {
      id: "camping-1",
      title: "Camping under the Stars",
      description: "Camping in the wilderness with a view of the night sky",
      src: "/placeholder.svg?height=800&width=1200",
      category: "adventures",
      featured: true,
    },
    {
      id: "river-rafting-1",
      title: "River Rafting",
      description: "White water rafting in the rushing rivers of northern Pakistan",
      src: "/placeholder.svg?height=800&width=1200",
      category: "adventures",
    },
    {
      id: "paragliding-1",
      title: "Paragliding",
      description: "Paragliding over the beautiful valleys of Pakistan",
      src: "/placeholder.svg?height=800&width=1200",
      category: "adventures",
    },
  ]
  
  