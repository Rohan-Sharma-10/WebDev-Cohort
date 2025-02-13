// Pick
// Imagine you have a User model with several properties, but for a user profile display, you only need a subset of these properties.

// interface User {
//     name: string;
//     age: number;
//     email: string; 
//     password: string;
// }

// type UserProfile = Pick<User, "name" | "age" > 

// function display(user: UserProfile) {
//     console.log(`Name: ${user.name}, Age: ${user.age}`);
// }

// display({name: "Rohan Sharma", age: 21});

// ReadOnly
// When you have a configuration object that should not be altered after initialization, making it Readonly ensures its properties cannot be changed.
interface Profile {
    /*readonly*/ name: string;
    /*readonly*/ age: number;
}

const profile: Readonly<Profile> = {
    name: "Rohan",
    age: 21
}

// Record { let’s you give a cleaner type to objects.} 
// interface User {
//     id: string;
//     name: string;
// }

// type Users = {[key: string]: User};
// type Users = Record<string, User>;

// const user: Users = {
//     "abc123": {id: "1", name: "Logan"},
//     "def456": {id: "2", name: "John"}
// }

// Map 
interface User {
    name: string;
    age: number;
    email: string;
}

const users = new Map<string, User>()
users.set("asd12", {name: "John", age: 21, email: "efvw"});
users.set("qwe23", {name: "Toby", age: 33, email: "svsds"});

// console.log(users.get("qwe23"));

// Exclude 
// In a function that can accept several types of inputs but you want to exclude specific types from being passed to it.
type Events = "click" | "scroll" | "mousemove";
type ExcludeEvent = Exclude<Events, "scroll">; // "click" | "mousemove"

const handleEvent = (event: ExcludeEvent) => {
    console.log(`Handling Event ${event}`);
}
handleEvent('click');

// Type inference in zod
import { z } from 'zod';
import express from "express"; // npm install express @types/express

const app = express();

// Define the schema for profile update
const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});

type FinalUserSchema = z.infer<typeof userProfileSchema>;

app.put("/user", (req, res) => {
  const { success } = userProfileSchema.safeParse(req.body);
  const updateBody: FinalUserSchema = req.body; // how to assign a type to updateBody?

  if (!success) {
    res.status(411).json({});
    return
  }
  // update database here
  res.json({
    message: "User updated"
  })
});

app.listen(3000);