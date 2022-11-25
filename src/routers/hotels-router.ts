import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getHotelsRoomsById } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", getHotelsRoomsById);

export { hotelsRouter };
