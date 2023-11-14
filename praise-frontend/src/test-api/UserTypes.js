import { productList } from "../test-api/products/Product";
const productsBySeller  = (owner) => productList.filter(product => product.owner === owner);

const buyer = {
    id: 1,
    userType: 'buyer',
    name: 'John Doe',
    email: 'johndoe@domain.com',
    description: "Software engineer by day, tech enthusiast by night. I have a penchant for sci-fi books and a newfound love for chess. Always on the lookout for the best deals and unique items on the platform. If you've got product recommendations, send them my way! 🛍️🚀",
    profileImage: 'https://images.pexels.com/photos/5378700/pexels-photo-5378700.jpeg?auto=compress&cs=tinysrgb&w=1600',
    creationTime: '01/01/2025 | 10:50',
}

const seller = {
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
}
 
const admin = {
    id : 3,
    name : 'Alice Becker',
    email : 'alicebecker@domain.com',
    description : "Passionate about ensuring a seamless user experience for all. Based in Seattle, I love photography and graphic design. When I'm not managing user issues, I'm exploring nature or diving into a new art project. Reach out if you have any app-related concerns or suggestions. 🖥️🌟",
    profileImage : 'https://images.pexels.com/photos/6976943/pexels-photo-6976943.jpeg?auto=compress&cs=tinysrgb&w=1600',
    creationTime : '01/03/2025 | 21:10',

}


export const USER_TYPES = {
    BUYER: buyer,
    SELLER: seller,
    ADMIN: admin
}