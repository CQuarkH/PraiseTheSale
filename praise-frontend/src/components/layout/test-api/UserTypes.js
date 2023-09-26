const buyer = {
    id : 1,
    name : 'John Doe',
    email : 'johndoe@domain.com',
    description : "Software engineer by day, tech enthusiast by night. I have a penchant for sci-fi books and a newfound love for chess. Always on the lookout for the best deals and unique items on the platform. If you've got product recommendations, send them my way! 🛍️🚀",
    profileImage : 'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1600',
    creationTime : '01/01/2025 | 10:50',
    
}

const seller = {
    id : 2,
    name : 'John Smith',
    rating: '4.5',
    products: 8,
    email : 'johnsmith@domain.com',
    contactEmail: 'contactjohnsmith@domain.com',
    contactPhone: '+123456789',
    description : "Specializing in fitness equipment and nutritional supplements. Certified personal trainer and nutritionist. I'm here to help you achieve your health and fitness goals. If you're looking for quality products or just some dietary advice, don't hesitate to reach out! 🏋️‍♂️💪",
    profileImage : 'https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=1600',
    creationTime : '01/02/2025 | 11:22',

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