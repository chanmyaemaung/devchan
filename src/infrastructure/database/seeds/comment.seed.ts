import { Comment } from '@domain/blogs/entities/comment.entity';
import { DataSource } from 'typeorm';

export const seedComments = async (dataSource: DataSource): Promise<void> => {
  const commentRepository = dataSource.getRepository(Comment);

  // Get the first blog and user for seeding comments
  const blog = await dataSource.query('SELECT id FROM blogs LIMIT 1');
  const users = await dataSource.query('SELECT id FROM users LIMIT 2');

  if (!blog.length || !users.length) {
    console.log('⚠️ No blogs or users found for comment seeds');
    return;
  }

  const blogId = blog[0].id;
  const [adminUser, regularUser] = users;

  const comments = [
    {
      content: 'This is a great article! Very informative and well-written.',
      blogId,
      userId: adminUser.id,
      isEdited: false,
    },
    {
      content:
        'Thanks for sharing this knowledge. Looking forward to more posts!',
      blogId,
      userId: regularUser.id,
      isEdited: false,
    },
    {
      content:
        'I have a question about the implementation details. Could you elaborate more?',
      blogId,
      userId: regularUser.id,
      isEdited: false,
    },
    {
      content:
        'Great explanation! I especially liked the part about best practices.',
      blogId,
      userId: adminUser.id,
      isEdited: true,
    },
  ];

  // Insert new comments
  for (const comment of comments) {
    await commentRepository.save(comment);
  }

  console.log('✅ Comment seeds completed');
};
