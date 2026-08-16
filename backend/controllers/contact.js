import { Contact } from "../models/contact.js";

//gets all contacts 
export const  getAllContact= async(req,resp)=>{
    const id =req.params.id;
    const userContact =await Contact.findById(id);
    if(!userContact)
        return resp.status(404).json({
    message:"no contact find",userContact});
     resp.json({message:"contact fetched",userContact});

 }
 //get specific contacts
 export const getContactById= async(req,resp)=>{
    const id =req.params.id;
    const userContact =await Contact.findById(id);
    if(!userContact)
        return resp.status(404).json({
    message:"no contact find",userContact});
     resp.json({message:"contact fetched",userContact});

 }
 // add new contacts 
 export const addContact=async(req,resp)=>{
    const {name ,email,phone,type}=req.body;

    if(name==""|| email==""||phone==""|| type=="")
        return resp.status(404).json({
        message:"All fields are required"

    })
    const SaveContact =await Contact.create({name ,email,phone,type});
    
     resp.json({message:"contact saved successfully",SaveContact});
       
    
    }
    //update contacts 
    export const updateContact=async(req,resp)=>{
    const id =req.params.id;
    const {name ,email,phone,type}=req.body;
    const updateContact =await Contact.findByIdAndUpdate(id,{
        name,
        email,
        phone,type,
          }, {new:true}
        );
    if(!updateContact)
        return resp.status(404).json({
    message:"no contact find",updateContact});
     resp.json({message:"  contact updated successfully",updateContact});

 }

 //delete contact

 export const deleteContact=async(req,resp)=>{
    const id =req.params.id;
    const deleteContact =await Contact.findById(id);
    if(!deleteContact)
        return resp.status(404).json({
    message:" contact  not exists",deleteContact});
     resp.json({message:"contact deleted",deleteContact});

 }


