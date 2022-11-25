import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    
  if (!ticket) {
    throw notFoundError();
  } else if (ticket.status === "RESERVED" || !ticket.TicketType.includesHotel) {
    throw unauthorizedError();
  } 
    
  return await hotelRepository.findHotels();
}

const hotelService = {
  getHotels,
};

export default hotelService;
