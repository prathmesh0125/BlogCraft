import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from "@bidve1/blogcraft-common";
// import { bcryptjs }from "bcryptjs";
import bcrypt from "bcryptjs";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success, data } = signupInput.safeParse(body);
  if (!success) {
      c.status(411);
      return c.json({
          message: "Inputs not correct"
      });
  }

  const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(body.password, 10);

      // Create user with hashed password
      const user = await prisma.user.create({
          data: {
              email: body.email,
              password: hashedPassword,
              name: body.name,
              aboutuser:body.aboutuser
          }
      });

      // Generate JWT token
      const jwt = await sign({
          id: user.id
      }, c.env.JWT_SECRET);

      // Respond with JWT token
      return c.text(jwt);
  } catch (e) {
      console.error('Error creating user:', e);
      c.status(411);
      return c.text('Invalid');
  } finally {
      await prisma.$disconnect(); // Disconnect Prisma client after operation
  }
});
  
  
userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
      c.status(411);
      return c.json({
          message: "Inputs not correct"
      });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Find user by email
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      }
    });

    // If user not found, return error
    if (!user) {
      c.status(403);
      return c.json({
        message: "Incorrect credentials"
      });
    }

    // Compare hashed password with provided password
    const passwordMatch = await bcrypt.compare(body.password, user.password);

    // If passwords don't match, return error
    if (!passwordMatch) {
      c.status(403);
      return c.json({
        message: "Incorrect credentials"
      });
    }

    // Generate JWT token
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET);

    // Respond with JWT token
    return c.text(jwt);
  } catch (e) {
    console.error('Signin error:', e);
    c.status(411);
    return c.text('Invalid');
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after operation
  }
});
  userRouter.post("/signout", async (c) => {
    try {
      // Extract the token from the Authorization header
      const authorizationHeader = c.req.header("Authorization");
  
      // Check if Authorization header exists
      if (!authorizationHeader) {
        // @ts-ignore
        return c.status(400).json({ message: "Authorization header missing" });
      }
  
      // Return a successful response without further processing
      return c.json({ message: "Signout successful" });
    } catch (error) {
      console.error("Signout error:", error);
      // @ts-ignore
      return c.status(500).json({ message: "Internal server error" });
    }
  });

  userRouter.get('/profile', async (c) => {
    try {
      // @ts-ignore
      const userId = c.get("userId");
  
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      // Find user by ID
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          posts: true, // Include posts associated with the user
        },
      });
  
      if (!user) {
        c.status(404);
        return c.json({ message: 'User not found' });
      }
  
      return c.json({ user });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      c.status(500);
      return c.json({ message: 'Internal server error' });
    } 
  });
  