

npm install mongoose bcrypt axios 

const User=mongoose.model("User",userSchema);
here it is use in place of this because to avoid duplication means that when the model is create then it go to in mongoose list and here in nextjs a hot coding is done that in  every change the so that result the possibility that the model may be created multiple time so here first ( mongoose.models.User ) by this we check is there model is present or not if not present then  it created
const User = mongoose.models.User || mongoose.model("User", userSchema);

---> In global.d.ts we decleare the mongoose obj in global
here we use Auth.js for authentication
we use framer-motion for providing animation
we use icon for lucide-react
--> next-aut.d.ts we solve the problem which come when we return role so we add extra fild in official auth.js User model or database 