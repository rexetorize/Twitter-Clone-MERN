const User = require('../models/userModel')
const userDtos = require('../dtos/userDtos')
const crypto = require('crypto')

class SignInController{

    getOTP(req, res){

        const email = req.body.email
        console.log(email)
        if(!email){
            return res.status(200).json({
                message: 'Email is required'
            })
        }
        //send an OTP via email

        //generate a random number
        const otp = crypto.randomInt(1000, 9999)
        res.status(200).json({  email : email, OTP : otp })

    }

}

module.exports = new SignInController

// async generateOtp(){

//     return crypto.randomInt(1000, 9999);

//  }

//  async sendOtpByPhone(phoneNumber, OTP){

//      return await twilio.messages.create({
//          to: phoneNumber,
//          from: process.env.MY_TWILIO_NUM,
//          body: `Your Galactic Dojo OTP is ${OTP}`,
//      })

//  }

//  sendOtpByEmail(){}

//  validateOtp(recievedHASH, oldHASH){

//      if(recievedHASH === oldHASH){
//          return true;
//      }

//      else return false;

//  }
