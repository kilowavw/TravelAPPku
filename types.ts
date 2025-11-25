export interface TravelPreferences {
  destination: string;
  duration: string;
  budget: string;
  interests: string;
}

export interface Activity {
  time: string;
  activity: string;
  location: string;
  description: string;
  imageKeyword: string;
}

export interface DailyPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

export interface ItineraryResponse {
  tripTitle: string;
  summary: string;
  itinerary: DailyPlan[];
}

export interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}