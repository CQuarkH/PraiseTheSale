export const sellers = [
    {
        id: 4,
        userType: 'seller',
        name: 'Lucy Gray',
        email: 'lucygray@domain.com',
        description: "Passionate about handmade crafts and unique jewelry. Each piece in my collection is crafted with love and care. If you're looking for something special, you're in the right place! 💍🎨",
        profileImage: 'https://images.pexels.com/photos/4420634/pexels-photo-4420634.jpeg?auto=compress&cs=tinysrgb&w=1600',
        creationTime: '04/02/2025 | 14:05',
        contactNumber: '124-567-8901',
        contactEmail: 'lucygray@domain.com',
        rating: 4.7,
        productList: [
          {
            id: 5,
            name: "Handmade Bracelet",
            description: "Beautifully crafted bracelet with natural stones and beads.",
            price: 29.99,
            category: "jewelry",
            condition: "new",
            image: "https://www.pexels.com/photo/silver-and-gold-beaded-bracelet-1906655/"
          },
          
        ]
      },
      {
        id: 5,
        userType: 'seller',
        name: 'Mike Green',
        email: 'mikegreen@domain.com',
        description: "Outdoor enthusiast and camping gear specialist. From tents to hiking boots, I've got you covered. Explore the great outdoors with the best gear! 🏕️🥾",
        profileImage: 'https://images.pexels.com/photos/6626882/pexels-photo-6626882.jpeg?auto=compress&cs=tinysrgb&w=1600',
        creationTime: '05/02/2025 | 15:30',
        contactNumber: '125-678-9012',
        contactEmail: 'mikegreen@domain.com',
        rating: 4.8,
        productList: [
          {
            id: 6,
            name: "Camping Tent",
            description: "Durable and waterproof 4-person tent. Easy to set up and pack.",
            price: 149.99,
            category: "outdoors",
            condition: "new",
            image: "https://www.pexels.com/photo/camping-tent-in-forest-6714/"
          },
          
        ]
      },
      {
        id: 6,
        userType: 'seller',
        name: 'Sophia Turner',
        email: 'sophiaturner@domain.com',
        description: "Bookworm and literature lover. Offering a curated collection of classic novels and contemporary masterpieces. Dive into a new adventure with every page! 📚❤️",
        profileImage: 'https://images.pexels.com/photos/7013617/pexels-photo-7013617.jpeg?auto=compress&cs=tinysrgb&w=1600',
        creationTime: '06/02/2025 | 16:45',
        contactNumber: '126-789-0123',
        contactEmail: 'sophiaturner@domain.com',
        rating: 4.9,
        productList: [
          {
            id: 7,
            name: "Pride and Prejudice",
            description: "Jane Austen's timeless classic. A tale of love, society, and misunderstandings.",
            price: 14.99,
            category: "books",
            condition: "new",
            image: "https://www.pexels.com/photo/book-novel-literature-turn-page-5949/"
          },
          
        ]
      },
      {
        id: 7,
        userType: 'seller',
        name: 'Liam Johnson',
        email: 'liamjohnson@domain.com',
        description: "Passionate about modern art and unique home decor. My collection features a range of contemporary sculptures, paintings, and decorative items that can transform any space. If you're looking to add a touch of elegance and creativity to your home, you've come to the right place! 🎨🖼️",
        profileImage: 'https://images.pexels.com/photos/6551763/pexels-photo-6551763.jpeg?auto=compress&cs=tinysrgb&w=1600',
        creationTime: '07/02/2025 | 17:30',
        contactNumber: '127-890-1234',
        contactEmail: 'liamjohnson@domain.com',
        rating: 4.6,
        productList: [
          {
            id: 8,
            name: "Abstract Canvas Painting",
            description: "A mesmerizing blend of colors that captures the essence of modern art. Perfect for living rooms and office spaces.",
            price: 199.99,
            category: "art",
            condition: "new",
            image: "https://www.pexels.com/photo/abstract-art-blur-bright-373543/"
          },
          
        ]
      }
];

export const buyers = [
  {
    id: 1,
    userType: 'buyer',
    name: 'John Doe',
    email: 'johndoe@domain.com',
    description: "Software engineer by day, tech enthusiast by night. I have a penchant for sci-fi books and a newfound love for chess. Always on the lookout for the best deals and unique items on the platform. If you've got product recommendations, send them my way! 🛍️🚀",
    profileImage: 'https://images.pexels.com/photos/5378700/pexels-photo-5378700.jpeg?auto=compress&cs=tinysrgb&w=1600',
    creationTime: '01/01/2025 | 10:50',
  },
  {
    id: 2,
    userType: 'buyer',
    name: 'Jane Smith',
    email: 'janesmith@domain.com',
    description: "Fashion enthusiast and travel blogger. Always searching for the latest trends and unique accessories. Love to connect with fellow fashionistas! 💄👠",
    profileImage: 'https://images.pexels.com/photos/5393594/pexels-photo-5393594.jpeg?auto=compress&cs=tinysrgb&w=1600',
    creationTime: '02/01/2025 | 09:30',
  },
  {
    id: 3,
    userType: 'buyer',
    name: 'Robert Brown',
    email: 'robertbrown@domain.com',
    description: "Gamer and tech geek. Always on the hunt for the latest gadgets and gaming gear. If you're a fellow gamer, let's connect and play! 🎮🕹️",
    profileImage: 'https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=1600',
    creationTime: '03/01/2025 | 12:15',
  }
];


export const users = [...sellers, ...buyers];