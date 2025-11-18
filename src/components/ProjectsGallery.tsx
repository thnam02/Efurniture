import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Căn hộ Vinhomes",
    location: "Quận 9, TP.HCM",
    image:
      "https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2MzM4MTU0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Phòng ngủ Master",
    location: "Thủ Đức, TP.HCM",
    image:
      "https://images.unsplash.com/photo-1653204095671-3ed81a4bc561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc2MzM4ODkxMHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "Phòng bếp hiện đại",
    location: "Quận 2, TP.HCM",
    image:
      "https://images.unsplash.com/photo-1592839656073-833413ae8874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZGluaW5nfGVufDF8fHx8MTc2MzM5OTg4OHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    name: "Phòng làm việc",
    location: "Quận 1, TP.HCM",
    image:
      "https://images.unsplash.com/photo-1472157510410-64a053cbc39f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaG9tZSUyMG9mZmljZXxlbnwxfHx8fDE3NjM0NjkzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    name: "Nội thất Scandinavian",
    location: "Bình Thạnh, TP.HCM",
    image:
      "https://images.unsplash.com/photo-1724582586413-6b69e1c94a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjM0NTU0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    name: "Xưởng sản xuất",
    location: "Bình Dương",
    image:
      "https://images.unsplash.com/photo-1760939858984-5dc76f0ea34a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBmdXJuaXR1cmUlMjBjcmFmdHNtYW58ZW58MXx8fHwxNzYzNDY5MzYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function ProjectsGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Dự Án Đã Hoàn Thành</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hàng trăm dự án đã được hoàn thiện với chất lượng cao và sự hài lòng
            của khách hàng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]"
            >
              <ImageWithFallback
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white mb-1">{project.name}</h3>
                <p className="text-white/80">{project.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto group">
            Xem tất cả dự án
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
