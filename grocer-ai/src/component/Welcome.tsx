"use client"
import { ArrowRight, Bike, ShoppingBasket } from "lucide-react"
import { motion } from "motion/react" 
function Welcome() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-10'>
        <motion.div
        initial={{
            opacity:0,
            y:-10
        }}
        animate={{
            opacity:1,
            y:0
        }}
        transition={{
            duration:0.8
        }}
        className="flex items-center gap-3"
        > 
        <ShoppingBasket  className="w-15 h-15 text-green-600"/>
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">FreshCart</h1>
        </motion.div>
        <motion.p
         initial={{
            opacity:0,
            y:10
        }}
        animate={{
            opacity:1,
            y:0
        }}
        transition={{
            duration:0.6,
            delay:0.3
        }}
       className="mt-4 text-gray-700 text-lg md:text-xl max-w-lg"
       > Your one-stop destination for fresh groceries, organic produce, and daily essentials delivered right to your doorstep.
        </motion.p>

       <motion.div
    initial={{
        opacity: 0,
         y: -10,
        scale: 0.8  
     }}
    animate={{
       opacity: 1,
        y: 0,
        scale: 1  
      }}
     transition={{
       duration: 0.8
        }}
   className="flex items-center gap-10 mb-10"
>
  <ShoppingBasket className="w-24 h-24 md:w-32 md:h-32 text-green-600 drop-shadow-md" />
  <Bike className="w-24 h-24 md:w-32 md:h-32 text-orange-600 drop-shadow-md"/>
  </motion.div>

  <motion.button
     initial={{
        opacity: 0,
         y: 10, 
     }}
    animate={{
       opacity: 1,
        y: 0,
     
      }}
     transition={{
       duration: 0.6 ,
       delay:0.6
    }}
        className="inline-flex items-center gap-2 bg-green-700  hover:bg-amber-600 text-white 
        font-semibold py-3 px-8 rounded-2xl shadow-md transition-all duration-100"
      >Next
      <ArrowRight />
  </motion.button>
    </div>
  )
}

export default Welcome