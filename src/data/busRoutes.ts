// src/data/busRoutes.ts

export interface BusRoute {
  id: string;
  routeName: string;
  travelDate: string;
  pickupTime: string;
  dropOffTime: string;
  startingPoint: string;
  destination: string;
  price: number;
  seatsAvailable: number;
  busType: string;
}

export const busRoutes: BusRoute[] = [
  {
    id: '1',
    routeName: 'Express Morning Route',
    travelDate: '2024-03-25',
    pickupTime: '07:00 AM',
    dropOffTime: '11:30 AM',
    startingPoint: 'Harare',
    destination: 'Bulawayo',
    price: 45,
    seatsAvailable: 32,
    busType: 'Express Luxury'
  },
  {
    id: '2',
    routeName: 'Afternoon Comfort',
    travelDate: '2024-03-25',
    pickupTime: '02:00 PM',
    dropOffTime: '06:30 PM',
    startingPoint: 'Mutare',
    destination: 'Masvingo',
    price: 55,
    seatsAvailable: 28,
    busType: 'Premium Coach'
  },
  {
    id: '3',
    routeName: 'Night Liner',
    travelDate: '2024-03-25',
    pickupTime: '10:00 PM',
    dropOffTime: '06:00 AM',
    startingPoint: 'Victoria Falls',
    destination: 'Gweru',
    price: 35,
    seatsAvailable: 45,
    busType: 'Sleeper Bus'
  },
  {
    id: '4',
    routeName: 'City Hopper',
    travelDate: '2024-03-25',
    pickupTime: '09:30 AM',
    dropOffTime: '12:30 PM',
    startingPoint: 'Mutare',
    destination: 'Harare',
    price: 25,
    seatsAvailable: 15,
    busType: 'Standard Coach'
  },
  {
    id: '5',
    routeName: 'Business Express',
    travelDate: '2024-03-25',
    pickupTime: '08:00 AM',
    dropOffTime: '11:00 AM',
    startingPoint: 'Bulawayo',
    destination: 'Victoria Falls',
    price: 40,
    seatsAvailable: 38,
    busType: 'Business Class'
  }
];
