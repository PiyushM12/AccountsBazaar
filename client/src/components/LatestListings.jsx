import React from "react";
import Title from "./Title";
import { useSelector } from "react-redux";
import ListingCard from "./ListingCard";
const LatestListings = () => {
  const { listings } = useSelector((state) => state.listing);
 return (
  <div className="mt-20 mb-8">
    <Title
      title="Latest Listings"
      description="Discover the hottest social profiles available right now."
    />

    <div className="flex flex-col gap-6 px-6">
      {listings.slice(0, 4).map((listing, index) => (
        <div key={index} className="mx-auto w-full max-w-5xl">
          <ListingCard listing={listing} />
        </div>
      ))}
    </div>
  </div>
);
};

export default LatestListings;
