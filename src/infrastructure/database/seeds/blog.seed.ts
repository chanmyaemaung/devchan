import { Blog } from '@domain/blogs/entities/blog.entity';
import { DataSource } from 'typeorm';

export const seedBlogs = async (dataSource: DataSource): Promise<void> => {
  const blogRepository = dataSource.getRepository(Blog);

  const blogs = [
    {
      title: {
        en: 'Getting Started with NestJS',
        my: 'NestJS နှင့် စတင်လေ့လာခြင်း',
      },
      content: {
        en: `NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
        
This blog post will guide you through:
- Setting up your first NestJS project
- Understanding modules and controllers
- Implementing dependency injection
- Working with databases using TypeORM`,
        my: `NestJS သည် server-side applications များတည်ဆောက်ရန်အတွက် အသုံးပြုသော Node.js framework တစ်ခုဖြစ်ပါသည်။

ဤဘလော့ဂ်တွင် အောက်ပါအကြောင်းအရာများကို လေ့လာနိုင်ပါသည်:
- ပထမဆုံး NestJS project တည်ဆောက်ခြင်း
- Modules နှင့် Controllers များအကြောင်း နားလည်ခြင်း
- Dependency Injection အသုံးပြုပုံ
- TypeORM ဖြင့် Database များနှင့် ချိတ်ဆက်အသုံးပြုခြင်း`,
        images: [
          {
            url: 'https://example.com/images/nestjs-architecture.jpg',
            caption: 'NestJS Architecture Overview',
            altText:
              'Diagram showing NestJS architecture with modules, controllers, and providers',
          },
          {
            url: 'https://example.com/images/dependency-injection.jpg',
            caption: 'Dependency Injection in NestJS',
            altText: 'Example of dependency injection implementation in NestJS',
          },
        ],
      },
      excerpt: {
        en: 'Learn how to build scalable applications with NestJS, a powerful Node.js framework.',
        my: 'NestJS framework ကို အသုံးပြု၍ scalable applications များ တည်ဆောက်နည်း လေ့လာကြမယ်။',
      },
      slug: 'getting-started-with-nestjs',
      tags: '{nestjs,typescript,backend,programming}',
      featuredImage: 'https://example.com/images/nestjs-featured.jpg',
      isPublished: true,
      publishedAt: new Date(),
      seoMetadata: {
        title: {
          en: 'Getting Started with NestJS - Complete Guide',
          my: 'NestJS နှင့် စတင်လေ့လာခြင်း - အပြည့်အစုံ လမ်းညွှန်',
        },
        description: {
          en: 'Learn how to build scalable Node.js applications using NestJS framework with TypeScript.',
          my: 'NestJS framework နှင့် TypeScript ကို အသုံးပြု၍ scalable Node.js applications များ တည်ဆောက်နည်း လေ့လာရအောင်။',
        },
        keywords: [
          'nestjs',
          'typescript',
          'node.js',
          'backend development',
          'programming tutorial',
        ],
      },
    },
    {
      title: {
        en: 'Understanding TypeORM with PostgreSQL',
        my: 'TypeORM နှင့် PostgreSQL အကြောင်း လေ့လာခြင်း',
      },
      content: {
        en: `TypeORM is one of the most popular Object Relational Mappers (ORM) in the Node.js ecosystem.
        
In this post, we'll cover:
- Basic TypeORM setup with PostgreSQL
- Creating entities and relationships
- Writing complex queries
- Implementing migrations
- Best practices and tips`,
        my: `TypeORM သည် Node.js ecosystem တွင် အသုံးအများဆုံး Object Relational Mapper (ORM) တစ်ခု ဖြစ်ပါသည်။

ဤဘလော့ဂ်တွင် အောက်ပါအကြောင်းအရာများကို လေ့လာမည်:
- TypeORM နှင့် PostgreSQL setup ပြုလုပ်ခြင်း
- Entities နှင့် Relationships များ တည်ဆောက်ခြင်း
- Complex queries များ ရေးသားခြင်း
- Migrations များ အကောင်အထည်ဖော်ခြင်း
- အကောင်းဆုံး နည်းလမ်းများနှင့် အကြံပြုချက်များ`,
        images: [
          {
            url: 'https://example.com/images/typeorm-entity-diagram.jpg',
            caption: 'TypeORM Entity Relationship Diagram',
            altText:
              'Database schema diagram showing entity relationships in TypeORM',
          },
          {
            url: 'https://example.com/images/typeorm-query-builder.jpg',
            caption: 'TypeORM Query Builder Example',
            altText: 'Code example showing TypeORM query builder usage',
          },
        ],
      },
      excerpt: {
        en: 'Deep dive into TypeORM and PostgreSQL integration in Node.js applications.',
        my: 'Node.js applications များတွင် TypeORM နှင့် PostgreSQL ပေါင်းစပ်အသုံးပြုပုံကို အသေးစိတ် လေ့လာကြမယ်။',
      },
      slug: 'understanding-typeorm-with-postgresql',
      tags: '{typeorm,postgresql,database,backend}',
      featuredImage: 'https://example.com/images/typeorm-featured.jpg',
      isPublished: true,
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      seoMetadata: {
        title: {
          en: 'TypeORM with PostgreSQL - Complete Guide',
          my: 'TypeORM နှင့် PostgreSQL - အပြည့်အစုံ လမ်းညွှန်',
        },
        description: {
          en: 'Learn how to use TypeORM with PostgreSQL in your Node.js applications effectively.',
          my: 'Node.js applications များတွင် TypeORM နှင့် PostgreSQL ကို ထိရောက်စွာ အသုံးပြုနည်း လေ့လာရအောင်။',
        },
        keywords: ['typeorm', 'postgresql', 'database', 'orm', 'node.js'],
      },
    },
  ];

  // Insert new blogs
  for (const blog of blogs) {
    await blogRepository.save(blog);
  }

  console.log('✅ Blog seeds completed');
};
