import logo_tripadvisor from "@/assets/images/logo-tripadvisor.svg";
import RatingStars from "../Rating/RatingStars";

export default function TripAdvisorBanner() {
  return (
    <div className="component trip-advisor-banner">
      <img src={logo_tripadvisor.src} alt="TripAdvisor" />
      <hr />
      <RatingStars type="tripadvisor-stars" sumValues={21000} countReviews={4433} />


    </div>
  );
}