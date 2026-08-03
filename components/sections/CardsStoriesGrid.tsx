import CardStory from "./CardStory";

export default function CardsStoriesGrid() {

  const cards = [
    1,2,3,4,5,6
  ];

  return (
    <div className="component cards-stories-grid">
      {cards.map((card, index) => (
        <CardStory key={`card-story-${index}`} />
      ))}
    </div>
  );
}