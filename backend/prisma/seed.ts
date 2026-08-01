import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Sofa",
    slug: "sofa",
    imageUrl:
      "https://images.unsplash.com/photo-1578500396437-400b7d3d1831?w=1080",
  },
  {
    name: "Bàn ghế",
    slug: "ban-ghe",
    imageUrl:
      "https://images.unsplash.com/photo-1611633332753-d1e2f695aa3c?w=1080",
  },
  {
    name: "Tủ – Kệ",
    slug: "tu-ke",
    imageUrl:
      "https://images.unsplash.com/photo-1762280237740-5a9292e527ab?w=1080",
  },
  {
    name: "Phòng ngủ",
    slug: "phong-ngu",
    imageUrl:
      "https://images.unsplash.com/photo-1668089677938-b52086753f77?w=1080",
  },
  {
    name: "Đồ trang trí",
    slug: "do-trang-tri",
    imageUrl:
      "https://images.unsplash.com/photo-1627229483132-ecb9184f9d07?w=1080",
  },
  {
    name: "Bàn làm việc",
    slug: "ban-lam-viec",
    imageUrl:
      "https://images.unsplash.com/photo-1621743018966-29194999d736?w=1080",
  },
];

const products = [
  {
    name: "Sofa Scandinavian 3 Chỗ",
    slug: "sofa-scandinavian-3-cho",
    priceFrom: 15500000,
    categorySlug: "sofa",
    popular: true,
    imageUrl:
      "https://images.unsplash.com/photo-1578500396437-400b7d3d1831?w=1080",
    description: "Sofa tối giản phong cách Scandinavian, đệm êm, khung gỗ chắc chắn.",
  },
  {
    name: "Bộ Bàn Ăn Gỗ Sồi",
    slug: "bo-ban-an-go-soi",
    priceFrom: 22800000,
    categorySlug: "ban-ghe",
    popular: true,
    imageUrl:
      "https://images.unsplash.com/photo-1611633332753-d1e2f695aa3c?w=1080",
    description: "Bộ bàn ăn gỗ sồi tự nhiên, phù hợp không gian gia đình.",
  },
  {
    name: "Tủ Kệ Trang Trí Hiện Đại",
    slug: "tu-ke-trang-tri-hien-dai",
    priceFrom: 12900000,
    categorySlug: "tu-ke",
    popular: true,
    imageUrl:
      "https://images.unsplash.com/photo-1762280237740-5a9292e527ab?w=1080",
    description: "Tủ kệ đa năng, thiết kế hiện đại cho phòng khách.",
  },
  {
    name: "Giường Ngủ Cao Cấp",
    slug: "giuong-ngu-cao-cap",
    priceFrom: 18500000,
    categorySlug: "phong-ngu",
    popular: true,
    imageUrl:
      "https://images.unsplash.com/photo-1668089677938-b52086753f77?w=1080",
    description: "Giường ngủ cao cấp, đầu giường bọc nệm sang trọng.",
  },
  {
    name: "Bàn Làm Việc Minimal",
    slug: "ban-lam-viec-minimal",
    priceFrom: 8900000,
    categorySlug: "ban-lam-viec",
    popular: true,
    imageUrl:
      "https://images.unsplash.com/photo-1621743018966-29194999d736?w=1080",
    description: "Bàn làm việc tối giản, tiết kiệm không gian.",
  },
  {
    name: "Kệ Trang Trí Đa Năng",
    slug: "ke-trang-tri-da-nang",
    priceFrom: 6500000,
    categorySlug: "do-trang-tri",
    popular: true,
    imageUrl:
      "https://images.unsplash.com/photo-1627229483132-ecb9184f9d07?w=1080",
    description: "Kệ trang trí linh hoạt cho nhiều không gian.",
  },
  {
    name: "Bộ Sofa Phòng Khách",
    slug: "bo-sofa-phong-khach",
    priceFrom: 28900000,
    categorySlug: "sofa",
    popular: true,
    imageUrl:
      "https://images.unsplash.com/photo-1687180498602-5a1046defaa4?w=1080",
    description: "Bộ sofa phòng khách cao cấp, êm ái và bền bỉ.",
  },
  {
    name: "Tủ Đầu Giường Cao Cấp",
    slug: "tu-dau-giuong-cao-cap",
    priceFrom: 5200000,
    categorySlug: "phong-ngu",
    popular: true,
    imageUrl:
      "https://images.unsplash.com/photo-1653204095671-3ed81a4bc561?w=1080",
    description: "Tủ đầu giường gỗ cao cấp, ngăn kéo êm.",
  },
];

async function main() {
  await prisma.quoteRequest.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }

  for (const product of products) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: product.categorySlug },
    });

    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        priceFrom: product.priceFrom,
        imageUrl: product.imageUrl,
        popular: product.popular,
        categoryId: category.id,
      },
    });
  }

  console.log(`Seeded ${categories.length} categories and ${products.length} products`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
