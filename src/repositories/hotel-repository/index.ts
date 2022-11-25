import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany({});
}

async function findHotelById(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId
    }
  });
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId: hotelId
    },
    include: {
      Hotel: true
    }
  });
}

const hotelRepository = {
  findHotels,
  findHotelById,
  findRoomsByHotelId,
};

export default hotelRepository;
