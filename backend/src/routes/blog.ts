import { createblog, udateblog } from "@bidve1/blogcraft-common";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createblog.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }

  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = udateblog.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
          aboutuser: true,
        },
      },
      createdAt: true,
      likes: true,
      dislikes: true,
      imageUrl: true,
    },
  });

  const shuffledBlogs = shuffleArray(blogs);

  return c.json({
    blogs: shuffledBlogs,
  });
});
blogRouter.get("/getposts", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    // Fetch top 5 posts with more than 50 likes
    const topPosts = await prisma.post.findMany({
      where: {
        likes: {
          gt: 1, // Only fetch posts with more than 50 likes
        },
      },
      orderBy: {
        likes: "desc", // Order by likes in descending order
      },
      take: 5, // Fetch the top 5 posts
      select: {
        id: true,
        title: true,
        content: true,
        createdAt:true
        // likes: true,
      },
    });

    // Respond with the top posts
    c.status(200);
    return c.json(topPosts);
  } catch (error) {
    console.error("Error fetching top posts:", error);
    // Respond with error
    c.json({ error: "An error occurred while fetching top posts" });
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }
});
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
            aboutuser: true,
          },
        },
        createdAt: true,
        likes: true,
        dislikes: true,
      },
    });

    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411); // 4
    return c.json({
      message: "Error while fetching blog post",
    });
  }
});
blogRouter.delete("/:id", async (c) => {
  const blogId = c.req.param("id"); // Extract the blog post ID from the request parameters

  if (!blogId) {
    c.status(400);
    return c.json({
      message: "Blog ID is required",
    });
  }

  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const existingBlog = await prisma.post.findUnique({
      where: { id: blogId },
    });

    if (!existingBlog) {
      c.status(404);
      return c.json({
        message: "Blog post not found",
      });
    }

    if (existingBlog.authorId !== authorId) {
      c.status(403);
      return c.json({
        message: "You do not have permission to delete this blog post",
      });
    }

    await prisma.post.delete({
      where: { id: blogId },
    });

    return c.json({
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({
      message: "An error occurred while deleting the blog post",
    });
  } finally {
    await prisma.$disconnect();
  }
});
