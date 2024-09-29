const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const users = [
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234561'),
    name: {
      first: "Uri",
      middle: "the",
      last: "User",
    },
    phone: "050-1234567",
    email: "user@gmail.com",
    password: bcrypt.hashSync('User123!', 10),
    image: {
      url: "/images/profile/user.svg",
      alt: "User Profile",
    },
    address: {
      state: "Israel",
      country: "Israel",
      city: "Haifa",
      street: "Lotus",
      houseNumber: 15,
      zip: 111111,
    },
    isAdmin: false,
    isBusiness: false,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234562'),
    name: {
      first: "Benny",
      middle: "the",
      last: "Business",
    },
    phone: "052-1234567",
    email: "biz@gmail.com",
    password: bcrypt.hashSync('Biz123!', 8),
    image: {
      url: "/images/profile/business.svg",
      alt: "Business Profile",
    },
    address: {
      state: "Israel",
      country: "Israel",
      city: "Tel Aviv",
      street: "Sderot Begin",
      houseNumber: 62,
      zip: 222222,
    },
    isAdmin: false,
    isBusiness: true,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234563'),
    name: {
      first: "Arik",
      middle: "the",
      last: "Admin",
    },
    phone: "054-1234567",
    email: "admin@gmail.com",
    password: bcrypt.hashSync('Admin123!', 8),
    image: {
      url: "/images/profile/admin.svg",
      alt: "Admin Profile",
    },
    address: {
      state: "Israel",
      country: "Israel",
      city: "Jerusalem",
      street: "King George",
      houseNumber: 120,
      zip: 333333,
    },
    isAdmin: true,
    isBusiness: false,
  },
]

const cards = [
  {
    title: "Booking",
    subtitle: "Good friends, worthwhile tripsbooking",
    description: "Make a trip with friends for a bigger than life experience",
    phone: "03-3741783",
    email: "Booking@gmail.com",
    web: "http://www.Booking.com",
    image: {
      url: "https://cdn.pixabay.com/photo/2024/09/06/13/11/beach-9027513_1280.jpg",
      alt: "Booking",
    },
    address: {
      state: "Center",
      country: "Netherlands",
      city: "Amsterdam",
      street: "Oosterdokskade",
      houseNumber: 163,
      zip: 100000,
    },
    bizNumber: 1000000,
    user_id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234563'),
    likes: [
      new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234562'),
    ]
  },
  {
    title: "Airbnb",
    subtitle: "Offer the house on Airbnb",
    description: "is a website that mediates between renters of vacation rental units or short-term residential units and owners of such units.",
    phone: "03-9399977",
    email: "Airbnb@gmail.com",
    web: "http://www.Airbnb.com",
    image: {
      url: "https://www.investplusaccounting.com.au/wp-content/uploads/2024/04/Renting-out-on-Air-BnB-980x655.jpg",
      alt: "Airbnb",
    },
    address: {
      state: "West",
      country: "USA",
      city: "San Francisco, California",
      street: "Branan Street",
      houseNumber: 888,
      zip: 200000,
    },
    bizNumber: 1000001,
    user_id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234563'),
    likes: [],
  },
  {
    title: "Iscar",
    subtitle: "Cutting Tool",
    description: "Development and marketing of cutting tools for the metal industry",
    phone: "053-6658152",
    email: "nadavb@gmail.com",
    web: "http://www.iscar.com",
    image: {
      url: "https://www.iscar.com/Catalogs/publication-2021/CNC_Technology_RequiresFig1.jpg",
      alt: "Iscar",
    },
    address: {
      state: "North",
      country: "Israel",
      city: "Tefen",
      street: "Tafen Industrial Zone",
      houseNumber: 11,
      zip: 300000,
    },
    bizNumber: 1000002,
    user_id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234562'),
    likes: [],
  },
  {
    title: "Strauss",
    subtitle: "food company",
    description: "An international food and beverage company, working to nourish and nurture a better tomorrow",
    phone: "03-6752499",
    email: "Strauss@gmail.com",
    web: "http://www.Strauss.com",
    image: {
      url: "https://www.strauss-group.co.il/wp-content/blogs.dir/1/files/COFEE-703.jpg",
      alt: "Strauss",
    },
    address: {
      state: "Center",
      country: "Israel",
      city: "Petah Tikva",
      street: "Hasivim",
      houseNumber: 49,
      zip: 400000,
    },
    bizNumber: 1000003,
    user_id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234561'),
    likes: [
      new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234561'),
      new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234562')
    ],
  }
];

module.exports = { users, cards };