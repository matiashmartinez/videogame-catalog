const GameplayEmbed = ({ videoId }) => {
  if (!videoId) return null;
  return (
    <div className="gameplay-container mt-2">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1`}
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GameplayEmbed;
