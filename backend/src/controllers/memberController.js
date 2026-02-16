import mongoose from "mongoose"
import Member from "../models/MemberModel.js"
import { MAX_ROLE_LENGTH, MAX_NAME_LENGTH } from "../constants.js"

export const getAllMembers = async (req, res) => {
    //.find comes from the mongoose.model object
    try {
        const user_id = req.user._id;
        //"find(user_id)" specifices to fetch all members for specific user
        const members = await Member.find({user_id}).sort({createdAt: -1}) //-1 will sort in desc
        res.status(200).json(members)
    } catch (error) {
        res.status (500).json({message:"Internal server error"})
        console.error("Error in getAllMembers controller", error);
    }
}

export const getMemberById = async (req, res) => {
    //Checks format of id
    const id = req.params.id
    if (!mongoose.isValidObjectId(id)){
        return res.status(404).json({message: "Member not found"})
    }
    try {
        const user_id = req.user._id;
        const member = await Member.findOne({ _id: id, user_id })
        //Checks that id exists and belongs to user
        if (!member) {
            return res.status(404).json({message: "Member not found"})
        }
        res.status(200).json(member)
    } catch (error) {
        console.error("Error in getMemberById controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const createMember = async (req, res) => {
    try {
        const firstName = req.body.firstName?.trim();
        const lastName = req.body.lastName?.trim();
        const active = req.body.active;
        const role = req.body.role?.trim() ?? "";
        const user_id = req.user._id;

        if (!firstName || !lastName) {
            return res.status(400).json({message: "First name and last name are required"})
        }
        if (firstName.length > MAX_NAME_LENGTH || lastName.length > MAX_NAME_LENGTH) {
            return res.status(400).json({message: `Names must be ${MAX_NAME_LENGTH} characters or less`})
        }
        if (role.length > MAX_ROLE_LENGTH) {
            return res.status(400).json({message: `Role must be ${MAX_ROLE_LENGTH} characters or less`})
        }
        if (typeof active !== "boolean") {
            return res.status(400).json({message: "Active status must be true or false"})
        }

        const member = new Member({firstName, lastName, active, role, user_id})
        const newMember = await member.save()
        res.status(201).json(newMember)

    } catch (error) {
        console.error("Error in createMember controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const updateMember = async (req, res) => {
    const id = req.params.id
    //Checks format of id
    if (!mongoose.isValidObjectId(id)){
        return res.status(404).json({message: "Member not found"})
    }

    try {
        const user_id = req.user._id;
        let {firstName, lastName, active, role} = req.body

        firstName = firstName?.trim();
        lastName = lastName?.trim();
        role = role?.trim() ?? "";

        if (!firstName || !lastName) {
            return res.status(400).json({message: "First name and last name are required"})
        }
        if (firstName.length > MAX_NAME_LENGTH || lastName.length > MAX_NAME_LENGTH) {
            return res.status(400).json({message: `Names must be ${MAX_NAME_LENGTH} characters or less`})
        }
        if (role.length > MAX_ROLE_LENGTH) {
            return res.status(400).json({message: `Role must be ${MAX_ROLE_LENGTH} characters or less`})
        }
        if (typeof active !== "boolean") {
            return res.status(400).json({message: "Active status must be true or false"})
        }

        //update all specified fields
        const updatedMember = await Member.findOneAndUpdate(
            { _id: id, user_id },
            {firstName, lastName, active, role},
            {new: true}
        )
        //Checks existence of id
        if (!updatedMember){
            return res.status(404).json({message: "Member not found"})
        }
        res.status(200).json({updatedMember})
    } catch (error) {
        console.error("Error in updateMember controller", error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteMember = async (req, res) => {
    const id = req.params.id
    if (!mongoose.isValidObjectId(id)){
    return res.status(404).json({message: "Member not found"})
    }

    try {
        const user_id = req.user._id;
        const deletedMember = await Member.findOneAndDelete({ _id: id, user_id })
        if (!deletedMember) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json({deletedMember})
    } catch (error) {
        console.error("Error in deleteMember controller", error)
        res.status(500).json({message: "Internal Server Error"})
    }
}
