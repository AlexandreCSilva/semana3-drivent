import { unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw unauthorizedError();
  }
  
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true) {
    throw unauthorizedError();
  } 

  return await hotelRepository.findHotels();
}

async function getHotelRooms(hotelId: number, userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw unauthorizedError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true) {
    throw unauthorizedError();
  } 

  return await hotelRepository.findRoomsByHotelId(hotelId);
}

const hotelService = {
  getHotels,
  getHotelRooms,
};

export default hotelService;
