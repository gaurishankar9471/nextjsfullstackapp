import {connect} from  "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import {NextRequest, NextResponse} from 'next/server'
import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connect()

export async function POST(request: NextRequest){
    try {
        //extract data from token 
        const userId = await getDataFromToken(request)
        // console.log("USer ID"+userId)
       const user = await User.findOne({_id: userId}).select("-password")
       //check user

    //    console.log("USER FOUND WITH ID")

       return NextResponse.json({
        message:"User found ",
        data: user
       })

        

    }
        
    catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
          
}