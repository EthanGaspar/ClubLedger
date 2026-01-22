import mongoose from "mongoose"

//1 - Create a Schema
//2 - model based off of that schema

const memberSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        role: {
            type: String,
            required: true
        },
    },
    {timestamps: true} //createdAt, updatedAt
);

//Create a Model ("Member") based on MemberModel Schema
const Member = mongoose.model("Member", memberSchema);

export default Member
