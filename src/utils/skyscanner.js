import axios from "axios";

const getCityId = async (city) => {
  const response = await axios({
    method: "get",
    url:
      "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/",
    params: {
      query: city,
    },
    headers: {
      "x-rapidapi-key": "12ace0bfd9msh34dee4306bb93d3p1da922jsn4c10b1bd8ee4",
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      useQueryString: true,
    },
  });
  //Places[0] is the city. Places[1] is the first, usually major airport
  return response.data.Places[0].PlaceId;
};

const getRouteData = async (
  originLocation,
  destinationLocation,
  departureDate,
  arrivalDate
) => {
  const response = await axios({
    method: "get",
    url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${originLocation}/${destinationLocation}/${departureDate}`,

    headers: {
      "x-rapidapi-key": "12ace0bfd9msh34dee4306bb93d3p1da922jsn4c10b1bd8ee4",
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      useQueryString: true,
    },
    params: { inboundpartialdate: arrivalDate },
  });
  return response;
};

const getFlightDetails = (places, quoteDetails, carriers) => {
  //Gets outgoing route details
  const outboundOriginPlace = places.find(
    (place) => quoteDetails.OutboundLeg.OriginId === place.PlaceId
  ).Name;
  const outboundDestinationPlace = places.find(
    (place) => quoteDetails.OutboundLeg.DestinationId === place.PlaceId
  ).Name;
  const outboundCarrierId = quoteDetails.OutboundLeg.CarrierIds[0];
  const outboundCarrierName = carriers.find(
    (carrier) => outboundCarrierId === carrier.CarrierId
  ).Name;
  const outboundDepartureDate = quoteDetails.OutboundLeg.DepartureDate;

  const outboundDetails = {
    originPlace: outboundOriginPlace,
    destinationPlace: outboundDestinationPlace,
    carrierName: outboundCarrierName,
    departureDate: outboundDepartureDate,
  };

  //Gets inbound route details
  if (quoteDetails.InboundLeg) {
    const inboundOriginPlace = places.find(
      (place) => quoteDetails.InboundLeg.OriginId === place.PlaceId
    ).Name;
    const inboundDestinationPlace = places.find(
      (place) => quoteDetails.InboundLeg.DestinationId === place.PlaceId
    ).Name;
    const inboundCarrierId = quoteDetails.InboundLeg.CarrierIds[0];
    const inboundCarrierName = carriers.find(
      (carrier) => inboundCarrierId === carrier.CarrierId
    ).Name;
    const inboundDepartureDate = quoteDetails.InboundLeg.DepartureDate;

    const inboundDetails = {
      originPlace: inboundOriginPlace,
      destinationPlace: inboundDestinationPlace,
      carrierName: inboundCarrierName,
      departureDate: inboundDepartureDate,
    };
    return { outboundDetails, inboundDetails };
  } else {
    return { outboundDetails };
  }
  //Returns both detail objects
};

const getCityName = async (query) => {
  const response = await axios({
    method: "get",
    url:
      "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/",
    params: {
      query,
    },
    headers: {
      "x-rapidapi-key": "12ace0bfd9msh34dee4306bb93d3p1da922jsn4c10b1bd8ee4",
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      useQueryString: true,
    },
  });
  const names = response.data.Places.map((place) => place.PlaceName);
  return names;
};

export { getCityId, getRouteData, getFlightDetails, getCityName };
