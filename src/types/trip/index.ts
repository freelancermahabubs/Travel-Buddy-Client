export interface ITrip {
  id: string;
  destination: string;
  photos: [];
  travelDates: Date;
  requests: [];
  userId: string;
  travelType: "ADVENTURE" | "LEISURE" | "BUSINESS";
  description: string | undefined;
  createdAt: string;
  updatedAt: string;
 
}
