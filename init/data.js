const mongoose= require("mongoose");
const Listing= require("../models/listing.js");

const listings = [
    {
        title: "Goa Beach Resort",
        description: "Experience the serene beaches of Goa with luxurious amenities.",
        image: {url:"https://images.unsplash.com/photo-1587922546307-776227941871?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdvYXxlbnwwfHwwfHx8MA%3D%3D",
            filename:"sample_file.png"},
        price: 5000,
        location: "North Goa",
        country: "India",
        owner: '6804caef951e0e54edaf41c3'
    },
    {
        title: "Jaipur Heritage Stay",
        description: "Stay in a royal palace turned heritage hotel in the heart of Jaipur.",
        image: {url:"https://images.unsplash.com/photo-1557690756-62754e561982?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amFpcHVyfGVufDB8fDB8fHww",
            filename:"sample_file.png"},
        price: 7000,
        location: "Jaipur",
        country: "India",
        owner: '6804caef951e0e54edaf41c3'
    },
    {
        title: "Kerala Backwater Cottage",
        description: "Stay on a traditional Kerala houseboat amidst the backwaters.",
        image: {url:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhfGVufDB8fDB8fHww",
            filename:"sample_file.png"},
        price: 8000,
        location: "Alleppey",
        country: "India",
        owner: '6804caef951e0e54edaf41c3'
    },
    {
        title: "Rajasthan Desert Camp",
        description: "Enjoy the charm of the Thar Desert with a luxurious camping experience.",
        image: {url:"https://images.unsplash.com/photo-1607922276202-5007ffe552ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHJhamFzdGhhbnxlbnwwfHwwfHx8MA%3D%3D",
            filename:"sample_file.png"},
        price: 4500,
        location: "Jaisalmer",
        country: "India",
        owner: '6804caef951e0e54edaf41c3'
    },
    {
        title: "Shimla Hilltop Hotel",
        description: "Nestled amidst the hills, enjoy stunning views of Shimla.",
        image: {url:"https://images.unsplash.com/photo-1657894736581-ccc35d62d9e2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            filename:"sample_file.png"},
        price: 5500,
        location: "Shimla",
        country: "India",
        owner: '6804caef951e0e54edaf41c3'
    },
    {
        title: "Kashmir Houseboat",
        description: "A luxurious houseboat stay on Dal Lake with a view of the mountains.",
        image: {url:"https://images.unsplash.com/photo-1715457573748-8e8a70b2c1be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
            filename:"sample_file.png"},
        price: 12000,
        location: "Srinagar",
        country: "India",
        owner: '6804caef951e0e54edaf41c3'
    },
    {
        title: "Mysore Palace Stay",
        description: "Live like royalty in the grand Mysore Palace.",
        image: {url:"https://images.unsplash.com/photo-1600112356915-089abb8fc71a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TXlzb3JlfGVufDB8fDB8fHww",
            filename:"sample_file.png"},
        price: 10000,
        location: "Mysore",
        country: "India",
        owner: '6804caef951e0e54edaf41c3'
    },
    {
        title: "Darjeeling Tea Estate Stay",
        description: "Stay in a picturesque tea estate with views of the Kanchenjunga.",
        image: {url:"https://images.unsplash.com/photo-1549817997-f6958ecf47b9?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            filename:"sample_file.png"},
        price: 9000,
        location: "Darjeeling",
        country: "India",
        owner: '6804caef951e0e54edaf41c3'
    },
    {
        title: "Andaman Beachfront Resort",
        description: "Experience the tropical beauty of Andaman with beachfront luxury.",
        image: {url:"https://images.unsplash.com/photo-1586053226626-febc8817962f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            filename:"sample_file.png"},
        price: 15000,
        location: "Port Blair",
        country: "India",
        owner: '6804caef951e0e54edaf41c3'
    },
    {
        title: "Ooty Tea Garden Retreat",
        description: "Stay amidst the lush green tea gardens of Ooty for a relaxing retreat.",
        image: {url:"https://images.unsplash.com/photo-1638886540342-240980f60d25?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            filename:"sample_file.png"},
        price: 6000,
        location: "Ooty",
        country: "India",
        owner: '6804caef951e0e54edaf41c3'
    },
    {
        title: "Agra Heritage Stay",
        description: "Stay near the iconic Taj Mahal and experience Mughal grandeur.",
        image: {url:"https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            filename:"sample_file.png"},
        price: 7000,
        location: "Agra",
        country: "India",
        owner: '6804caef951e0e54edaf41c3'
    },
    {
        title: "Leh Ladakh Adventure Lodge",
        description: "Stay in an adventure lodge in the mesmerizing land of Ladakh.",
        image: {url:"https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            filename:"sample_file.png"},
        price: 10000,
        location: "Leh",
        country: "India",
        owner: '6804caef951e0e54edaf41c3'
    },
    // {
    //     title: "Munnar Hilltop Retreat",
    //     description: "Relax amidst the hills of Munnar, known for its tea plantations.",
    //     image: {url:"https://images.unsplash.com/photo-1564647580-94c2d900d888?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         filename:"sample_file.png"},
    //     price: 8500,
    //     location: "Munnar",
    //     country: "India",
    //     owner: '6804caef951e0e54edaf41c3'
    // },
    // {
    //     title: "Rishikesh Yoga Retreat",
    //     description: "Stay at a peaceful yoga retreat by the holy Ganges.",
    //     image: {url:"https://images.unsplash.com/photo-1542330308-dfdcf5101b2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         filename:"sample_file.png"},
    //     price: 5500,
    //     location: "Rishikesh",
    //     country: "India",
    //     owner: '6804caef951e0e54edaf41c3'
    // },
    // {
    //     title: "Udaipur Lakeside Palace",
    //     description: "A stunning lakeside palace stay in the Venice of the East.",
    //     image: {url:"https://images.unsplash.com/photo-1517754984850-7f395315a39e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         filename:"sample_file.png"},
    //     price: 11000,
    //     location: "Udaipur",
    //     country: "India",
    //     owner: '6804caef951e0e54edaf41c3'
    // },
    // {
    //     title: "Tawang Monastery Stay",
    //     description: "Stay near the famous Tawang Monastery in the beautiful Arunachal Pradesh.",
    //     image: {url:"https://images.unsplash.com/photo-1544817354-50c3433be3d4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         filename:"sample_file.png"},
    //     price: 6000,
    //     location: "Tawang",
    //     country: "India",
    //     owner: '6804caef951e0e54edaf41c3'
    // },
    // {
    //     title: "Coorg Coffee Plantation Stay",
    //     description: "Stay amidst Coorg's famous coffee plantations for a refreshing experience.",
    //     image: {url:"https://images.unsplash.com/photo-1556753013-cff26f49863d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         filename:"sample_file.png"},
    //     price: 7500,
    //     location: "Coorg",
    //     country: "India",
    //     owner: '6804caef951e0e54edaf41c3'
    // },
    // {
    //     title: "Hampi Ancient Stay",
    //     description: "A stay at an ancient temple town with UNESCO heritage sites.",
    //     image: {url:"https://images.unsplash.com/photo-1566583958-fb0d5c3bc9a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         filename:"sample_file.png"},
    //     price: 6000,
    //     location: "Hampi",
    //     country: "India",
    //     owner: '6804caef951e0e54edaf41c3'
    // },
    // {
    //     title: "Alleppey Beach Resort",
    //     description: "A tranquil beach resort experience in Kerala's backwaters.",
    //     image: {url:"https://images.unsplash.com/photo-1523385142995-6f69ec37fbb6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         filename:"sample_file.png"},
    //     price: 9500,
    //     location: "Alleppey",
    //     country: "India",
    //     owner: '6804caef951e0e54edaf41c3'
    // },
    // {
    //     title: "Pondicherry Beach Villa",
    //     description: "Stay at a private beach villa with a view of the Bay of Bengal.",
    //     image: {url:"https://images.unsplash.com/photo-1600224026927-6e8e7477fc0d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         filename:"sample_file.png"},
    //     price: 13000,
    //     location: "Pondicherry",
    //     country: "India",
    //     owner: '6804caef951e0e54edaf41c3'
    // },
    // {
    //     title: "Sikkim Himalayan Lodge",
    //     description: "A cozy lodge offering stunning views of the Himalayas.",
    //     image: {url:"https://images.unsplash.com/photo-1593364561052-9f4973b457ff?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         filename:"sample_file.png"},
    //     price: 7000,
    //     location: "Sikkim",
    //     country: "India",
    //     owner: '6804caef951e0e54edaf41c3'
    // },
    // {
    //     title: "Ranthambore Wildlife Resort",
    //     description: "Stay in a resort surrounded by the rich flora and fauna of Ranthambore.",
    //     image: {url:"https://images.unsplash.com/photo-1567013130-f1b39c0d984f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         filename:"sample_file.png"},
    //     price: 8500,
    //     location: "Ranthambore",
    //     country: "India",
    //     owner: '6804caef951e0e54edaf41c3'
    // },
    // {
    //     title: "Tiruvannamalai Spiritual Stay",
    //     description: "A peaceful stay for those looking to meditate and connect spiritually.",
    //     image: {url:"https://images.unsplash.com/photo-1610085017429-130fefc5008c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         filename:"sample_file.png"},
    //     price: 6000,
    //     location: "Tiruvannamalai",
    //     country: "India",
    //     owner: '6804caef951e0e54edaf41c3'
    // },
    // {
    //     title: "Manali Adventure Camp",
    //     description: "Stay in a thrilling adventure camp in the heart of Manali.",
    //     image: {url:"https://images.unsplash.com/photo-1606112219680-e4f32bcbe9f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         filename:"sample_file.png"},
    //     price: 4500,
    //     location: "Manali",
    //     country: "India",
    //     owner: '6804caef951e0e54edaf41c3'
    // }
    
];

  
mongoose.connect("mongodb://localhost:27017/wanderlust")
  .then(() => {
    console.log("MongoDB connected");
    return Listing.deleteMany({});
  })
  .then(() => {
    return Listing.insertMany(listings);
  })
  .then(() => {
    console.log("Data inserted successfully");
  })
  .catch((err) => {
    console.error("Error:", err);
  });
