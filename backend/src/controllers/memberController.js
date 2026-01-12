import mongoose from "mongoose"
import Member from "../models/MemberModel.js"

export const getAllMembers = async (_, res) => { // we don' use "req", use _ as convention
    //.find comes from the mongoose.model object
    try {
        const members = await Member.find().sort({createdAt: -1}) //-1 will sort in desc
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
        const member = await Member.findById(req.params.id)
        //Verifies existence
        if (!member) {
            return res.status(404)
        }
        res.status(200).json(member)
    } catch (error) {
        console.error("Error in getMemberById controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const createMember = async (req, res) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const active = req.body.active;
        const role = req.body.role;

        const member = new Member({firstName, lastName, active, role})
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
        const {firstName, lastName, active, role} = req.body
        //update all specified fields
        const updatedMember = await Member.findByIdAndUpdate(req.params.id,
            {firstName, lastName, active, role},
            {new: true, }
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
        const deletedMember = await Member.findByIdAndDelete(id, {new: false})
        if (!deletedMember) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json({deletedMember})
    } catch (error) {
        console.error("Error in deleteMember controller", error)
        res.status(500).json({message: "Internal Server Error"})
    }
}
