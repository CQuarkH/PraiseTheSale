import { productList } from "../products/Product";

const productsBySeller  = (owner) => productList.filter(product => product.owner === owner);


export const sellers = [
    {
        id: 4,
        userType: 'seller',
        name: 'Lucy Gray',
        email: 'lucygray@domain.com',
        description: "Passionate about handmade crafts and unique jewelry. Each piece in my collection is crafted with love and care. If you're looking for something special, you're in the right place! 💍🎨",
        profileImage: 'https://images.pexels.com/photos/4420634/pexels-photo-4420634.jpeg?auto=compress&cs=tinysrgb&w=1600',
        creationTime: '04/02/2025 | 14:05',
        contactPhone: '124-567-8901',
        contactEmail: 'lucygray@domain.com',
        rating: 4.7,
        productList: productsBySeller('Lucy Gray'),
        productLength: productsBySeller('Lucy Gray').length
      },
      {
        id: 5,
        userType: 'seller',
        name: 'Mike Green',
        email: 'mikegreen@domain.com',
        description: "Outdoor enthusiast and camping gear specialist. From tents to hiking boots, I've got you covered. Explore the great outdoors with the best gear! 🏕️🥾",
        profileImage: 'https://images.pexels.com/photos/6626882/pexels-photo-6626882.jpeg?auto=compress&cs=tinysrgb&w=1600',
        creationTime: '05/02/2025 | 15:30',
        contactPhone: '125-678-9012',
        contactEmail: 'mikegreen@domain.com',
        rating: 4.8,
        productList: productsBySeller('Mike Green'),
        productLength: productsBySeller('Mike Green').length
      },
      {
        id: 6,
        userType: 'seller',
        name: 'Sophia Turner',
        email: 'sophiaturner@domain.com',
        description: "Bookworm and literature lover. Offering a curated collection of classic novels and contemporary masterpieces. Dive into a new adventure with every page! 📚❤️",
        profileImage: 'https://images.pexels.com/photos/7013617/pexels-photo-7013617.jpeg?auto=compress&cs=tinysrgb&w=1600',
        creationTime: '06/02/2025 | 16:45',
        contactPhone: '126-789-0123',
        contactEmail: 'sophiaturner@domain.com',
        rating: 4.9,
        productList: productsBySeller('Sophia Turner'),
        productLength: productsBySeller('Sophia Turner').length
      },
      {
        id: 7,
        userType: 'seller',
        name: 'Liam Johnson',
        email: 'liamjohnson@domain.com',
        description: "Passionate about modern art and unique home decor. My collection features a range of contemporary sculptures, paintings, and decorative items that can transform any space. If you're looking to add a touch of elegance and creativity to your home, you've come to the right place! 🎨🖼️",
        profileImage: 'https://images.pexels.com/photos/6551763/pexels-photo-6551763.jpeg?auto=compress&cs=tinysrgb&w=1600',
        creationTime: '07/02/2025 | 17:30',
        contactPhone: '127-890-1234',
        contactEmail: 'liamjohnson@domain.com',
        rating: 4.6,
        productList: productsBySeller('Liam Johnson'),
        productLength: productsBySeller('Liam Johnson').length
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

export const logs = [
  
    {
      id: 1,
      userID: 1,
      logType: "REQUEST_SELLER_DATA",
      dateTime: "2021-01-01 10:00:00",
      description: "Requested seller data"
    },
    {
      id: 2,
      userID: 4,
      logType: "PRODUCT_ADDED",
      dateTime: "2021-01-02 15:30:00",
      description: "Added new product"
    },
    {
      id: 3,
      userID: 5,
      logType: "PRODUCT_DELETED",
      dateTime: "2021-01-03 09:45:00",
      description: "Product deleted by user"
    },
    {
      id: 4,
      userID: 2,
      logType: "CHANGE_PASSWORD",
      dateTime: "2021-01-04 12:20:00",
      description: "Changed password"
    },
    {
      id: 5,
      userID: 4,
      logType: "PRODUCT_DELETED",
      dateTime: "2021-01-05 17:10:00",
      description: "Product deleted by user"
    },
    {
      id: 6,
      userID: 2,
      logType: "REQUEST_SELLER_DATA",
      dateTime: "2021-01-06 14:50:00",
      description: "Requested seller data"
    },
    {
      id: 7,
      userID: 7,
      logType: "PRODUCT_ADDED",
      dateTime: "2021-01-07 11:30:00",
      description: "Added new product"
    },
    {
      id: 8,
      userID: 6,
      logType: "PRODUCT_ADDDED",
      dateTime: "2021-01-08 08:15:00",
      description: "Added new product"
    },
    {
      id: 9,
      userID: 3,
      logType: "CHANGE_PASSWORD",
      dateTime: "2021-01-09 13:40:00",
      description: "Changed password"
    },
    {
      id: 10,
      userID: 6,
      logType: "PRODUCT_DELETED",
      dateTime: "2021-01-10 16:25:00",
      description: "Product deleted by user"
    },
    {
      id: 11,
      userID: 4,
      logType: "CHANGE_PASSWORD",
      dateTime: "2021-01-02 15:30:00",
      description: "Changed password"
    },
    {
      id: 12,
      userID: 4,
      logType: "PRODUCT_ADDED",
      dateTime: "2021-01-02 15:30:00",
      description: "Added new product"
    },
    {
      id: 13,
      userID: 4,
      logType: "PRODUCT_ADDED",
      dateTime: "2021-01-02 15:30:00",
      description: "Added new product"
    },
    {
      id: 14,
      userID: 4,
      logType: "PRODUCT_DELETED",
      dateTime: "2021-01-02 15:30:00",
      description: "Added new product"
    },
  
  
]