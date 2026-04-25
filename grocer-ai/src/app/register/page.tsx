"use client"
import React, { useState } from 'react'
import Welcome from '@/component/Welcome'
import RegisterForm from '@/component/RegisterForm'
const Register = () => {
  const [step,setStep]=useState(1) 
  return (
    <div>
      {/* here nextStep is a props and inside we send setStep */}
       {step==1 ? <Welcome nextStep={setStep} /> : <RegisterForm/>}
    </div>
  )
}

export default Register 