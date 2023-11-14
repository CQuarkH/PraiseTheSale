import { faker } from '@faker-js/faker';
import { amber } from '@mui/material/colors';

export const productList = [
    {
      id: 1,
      name: "Wireless Headphones",
      markedAsSold: false,
      owner: "Lucy Gray",
      description: "High-quality over-ear wireless headphones with noise-cancellation feature. Provides an immersive audio experience.",
      price: 99.99,
      category: "electronics",
      condition: "new",
      creationTime: "15/09/2023 | 10:50",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VUlxY7ZQGAfeICIal02cZAHaHa%26pid%3DApi&f=1&ipt=e038c03edd2c1b0d4dec3c54a5915600e1be105ec757d89fc288e296610fddb9&ipo=images"
    },
    
    {
      id: 2,
      name: "Vintage Leather Backpack",
      markedAsSold: false,
      owner: "Liam Johnson",
      description: "Stylish and durable leather backpack with multiple compartments. Perfect for both casual and formal occasions.",
      price: 79.50,
      category: "fashion",
      condition: "used",
      creationTime: "17/09/2023 | 14:30",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.explicit.bing.net%2Fth%3Fid%3DOIP.fU7tQUlkoa9GvyBRARn17gHaHa%26pid%3DApi&f=1&ipt=80f6c2bacbadecdce3171420b5398e473e3d42fd03d3eb528bd9b5823343a4c2&ipo=images"
    },
    {
      id: 3,
      name: "Organic Green Tea",
      markedAsSold: true,
      owner: "Sophia Turner",
      description: "Refreshing and aromatic green tea made from the finest organic tea leaves. Rich in antioxidants.",
      price: 15.00,
      category: "food",
      condition: "new",
      creationTime: "16/09/2023 | 09:15",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.lGF8Q9jQwO7iSB7fAbE5pAHaEc%26pid%3DApi&f=1&ipt=3fbe465ce105c1571f3cc5627790ffefab12a5be2e4818c71d6661c94f00282c&ipo=images"
    },
    {
      id: 4,
      name: "Digital Camera",
      owner : "Mike Green",
      description: "Compact digital camera with 20MP, 4K video recording, and optical zoom.",
      price: 250.00,
      category: "electronics",
      condition: "new",
      creationTime: "05/02/2023 | 12:45",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.FMwWdTulrv36Wf022uD-NQHaHa%26pid%3DApi&f=1&ipt=12f74ee0738373f2ad80db9fe1f1b172a633a12c5dd16cf799ad09f2327bb169&ipo=images"
    },
    {
      id: 5,
      name: "Running Shoes",
      owner: "Mike Green",
      description: "Comfortable and breathable running shoes. Ideal for both professional athletes and casual runners.",
      price: 65.00,
      category: "fashion",
      condition: "new",
      creationTime: "23/05/2023 | 15:20",
      image: "https://n1.sdlcdn.com/imgs/g/s/v/Boltt-Xfit-Running-Shoes-Black-SDL789843251-6-4230e.jpg"
    },
    {
      id: 6,
      name: "Wooden Desk",
      owner: "Sophia Turner",
      description: "Elegant wooden desk with a smooth finish. Comes with three drawers for storage.",
      price: 120.00,
      category: "furniture",
      condition: "used",
      creationTime: "11/08/2023 | 16:55",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.design-mkt.com%2F1535412%2Flarge-vintage-wooden-desk-with-drawers-oak-1950s.jpg&f=1&nofb=1&ipt=364269f47a476ba73f6cd7f5ecb969cfe4eb757a1211ad59bd3a254a7cbb910c&ipo=images"
    },
    {
      id: 7,
      name: "Bluetooth Speaker",
      owner: "Lucy Gray",
      description: "Portable Bluetooth speaker with deep bass and 10-hour battery life.",
      price: 45.00,
      category: "electronics",
      condition: "new",
      creationTime: "03/01/2023 | 11:10",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bhphotovideo.com%2Fimages%2Fimages2500x2500%2Faudioengine_a5_bt_blk_a5_plus_bluetooth_speaker_1392605.jpg&f=1&nofb=1&ipt=715ca3587a12974d65542684865f511090b87c3cf08fc155f51eb141d2f092c0&ipo=images"
    },
    {
      id: 8,
      name: "Yoga Mat",
      owner : "Sophia Turner",
      description: "Non-slip yoga mat made of eco-friendly material. Perfect for all types of yoga and pilates.",
      price: 30.00,
      category: "sports",
      condition: "new",
      creationTime: "27/04/2023 | 13:35",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.F9BM4dBmQ1iftDTjlEWHeAHaHa%26pid%3DApi&f=1&ipt=db40f8720f5e311e7761de1b32d21e6a937d21089765e21bf8daf2c9fe4a3648&ipo=images"
    },
    {
      id: 9,
      name: "Classic Watch",
      owner : "Lucy Gray",
      description: "Elegant classic watch with a leather strap and quartz movement.",
      price: 150.00,
      category: "fashion",
      condition: "new",
      creationTime: "09/07/2023 | 14:00",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.4keQk6WJgh332CFFva2G6wHaKD%26pid%3DApi&f=1&ipt=73f763862a54af956915412f0eeb663af6b71c02268afa147126bdb713f6b925&ipo=images"
    },
    {
      id: 10,
      name: "Acoustic Guitar",
      owner: "Liam Johnson",
      description: "Full-sized acoustic guitar with a rich sound and comfortable playability.",
      price: 200.00,
      category: "music",
      condition: "used",
      creationTime: "20/03/2023 | 10:25",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.L4FFGSNRduoS8O9xeAwZEwHaLx%26pid%3DApi&f=1&ipt=a20d1d78ae2c8d2ed167f087153897c59027d11072893698bcc66252d83babfc&ipo=images"
    },
    {
      id: 12,
      name: "Bluetooth Speaker",
      owner: "Liam Johnson",
      description: "Compact and portable Bluetooth speaker with clear and loud sound, suitable for indoor and outdoor use.",
      price: 49.99,
      category: "electronics",
      condition: "new",
      creationTime: "16/09/2023 | 11:30",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.t6hretj5Co0vnUlEkawKQQHaEK%26pid%3DApi&f=1&ipt=58894296a76e64b7d599a7eadb7866ae7ff41778b842bc490be37486306b9435&ipo=images"
    },
    {
      id: 13,
      name: "Smart Watch",
      owner: "Liam Johnson",
      description: "Advanced smart watch with fitness tracking, heart rate monitor, and various other features.",
      price: 129.99,
      category: "electronics",
      condition: "new",
      creationTime: "17/09/2023 | 12:10",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.8QZkDen2rYdEeA6R6YpsagHaHa%26pid%3DApi&f=1&ipt=eb00deaf73bbe979a50dabb0f3be8614af66752598878e6189e44a15063faa03&ipo=images"
    },
    {
      id: 14,
      name: "Handmade Bracelet",
      owner: 'Lucy Gray',
      description: "Beautifully crafted bracelet with natural stones and beads.",
      price: 29.99,
      category: "fashion",
      condition: "new",
      creationTime: '17/09/2023 | 12:10',
      image: "https://images.pexels.com/photos/8100366/pexels-photo-8100366.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      id: 15,
      name: "Camping Tent",
      owner: 'Mike Green',
      description: "Durable and waterproof 4-person tent. Easy to set up and pack.",
      price: 149.99,
      category: "sports",
      condition: "new",
      creationTime: '17/09/2023 | 12:10',
      image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      id: 16,
      owner: 'Sophia Turner',
      name: "Pride and Prejudice",
      description: "Jane Austen's timeless classic. A tale of love, society, and misunderstandings.",
      price: 14.99,
      category: "books",
      condition: "new",
      creationTime: '17/09/2023 | 12:10',
      image: "https://images.pexels.com/photos/1666320/pexels-photo-1666320.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      id: 17,
      owner: 'Liam Johnson',
      name: "Abstract Canvas Painting",
      description: "A mesmerizing blend of colors that captures the essence of modern art. Perfect for living rooms and office spaces.",
      price: 199.99,
      category: "furniture",
      condition: "new",
      creationTime: '17/09/2023 | 12:10',
      image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    
];

export const ownersList = productList.map(product => {
  const ownerName = product.owner;
  return {
    name: ownerName,
    rating: faker.number.float({min: 0, max: 5, precision: 0.1}).toFixed(1),
    description: faker.person.jobDescriptor(),
    profileImage: faker.image.avatar(),
    contactEmail: `${ownerName.split(' ').join('.').toLowerCase()}@example.com`,
    contactPhone: '123-456-7890'
  };
});

const getProductsByCategory = (category) => {
    return productList.filter(product => product.category === category);
};

export const categories = [
  {
    name: "Music",
    productList: getProductsByCategory('music'),
    productLength: getProductsByCategory('music').length,
    profileImage: 'https://images.pexels.com/photos/1762578/pexels-photo-1762578.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description : 'Rhythms and melodies that resonate with the soul.'
  },
  {
    name : "Fashion",
    productList: getProductsByCategory('fashion'),
    productLength: getProductsByCategory('fashion').length,
    profileImage: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description : 'Trendsetting styles for every occasion.'
  },
  {
    name : "Sports",
    productList: getProductsByCategory('sports'),
    productLength: getProductsByCategory('sports').length,
    profileImage: 'https://media.istockphoto.com/id/465383082/photo/female-swimmer-at-the-swimming-pool.jpg?b=1&s=612x612&w=0&k=20&c=I4TM5zIDe-19EWq6OlzwZ1eqr8_tlEQ86SC-0eomEhU=',
    description : 'Gear and apparel for peak performance.'
  },
  {
    name : "Electronics",
    productList: getProductsByCategory('electronics'),
    productLength: getProductsByCategory('electronics').length,
    profileImage: 'https://images.pexels.com/photos/343457/pexels-photo-343457.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description : 'Innovative gadgets for the modern world.'
  },
  {
    name : "Furniture",
    productList: getProductsByCategory('furniture'),
    productLength: getProductsByCategory('furniture').length,
    profileImage: 'https://images.pexels.com/photos/6580227/pexels-photo-6580227.jpeg?auto=compress&cs=tinysrgb&h=566.525&fit=crop&w=633.175&dpr=1',
    description : 'Crafted pieces to elevate every space.'
  },
  {
    name : "Food",
    productList: getProductsByCategory('food'),
    productLength: getProductsByCategory('food').length,
    profileImage: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description : 'Delicious and nourishing essentials for every palate.'
  },
  {
    name : "Books",
    productList: getProductsByCategory('books'),
    productLength: getProductsByCategory('books').length,
    profileImage: 'https://images.pexels.com/photos/4132936/pexels-photo-4132936.png?auto=compress&cs=tinysrgb&w=1600',
    description : 'Diverse and enlightening literature for every reader, exploring a myriad of genres, themes, and worlds.'
  }  
];

export const categoriesValues = [
  { value: 'ELECTRONICS', label: 'Electronics'},
  { value: 'MUSIC', label: 'Music'},
  { value: 'FASHION', label: 'Fashion'},
  { value: 'SPORTS', label: 'Sports'},
  { value: 'FURNITURE', label: 'Furniture'},
  { value: 'FOOD', label: 'Food'},
  { value: 'BOOKS', label: 'Books'}
]

export const conditionValues = [
  { value: 'NEW', label: 'New'},
  { value: 'USED', label: 'Used'}
]
  