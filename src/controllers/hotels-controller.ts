import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const result = await hotelService.getHotels(userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getHotelsRoomsById(req: AuthenticatedRequest, res: Response) {
  const hotelId = parseFloat(req.params.hotelId);

  if (isNaN(hotelId) || hotelId <= 0) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  
  try {
    const result = await hotelService.getHotelRooms(hotelId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
