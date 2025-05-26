const mongoose= require("mongoose");
const Review= require("./review.js")
const Category= require("./categories.js")
const User= require("./user.js")


const Schema= mongoose.Schema;

const listSchema= new Schema({
    title:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },
    image:{
        url:{
            type:String,
        },
        filename:{
            type:String,
        }
    },
    price:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },

    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    }],

}, { timestamps: true });

listSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
})

const Listing =mongoose.model("Listings", listSchema);
module.exports=Listing;
