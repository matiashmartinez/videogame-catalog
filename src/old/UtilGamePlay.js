export const handleGameplayButtonClick = (videoId, event) => {
    const container = event.target.parentElement.querySelector(
      ".gameplay-container"
    );
    const iframe = container.querySelector("iframe");
    const hideButton = event.target.nextElementSibling;

    container.style.display = "block";
    event.target.style.display = "none";
    hideButton.style.display = "inline-block";
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&modestbranding=1`;
  };

  export const handleHideButtonClick = (event) => {
    const container = event.target.parentElement.querySelector(
      ".gameplay-container"
    );
    const showButton = event.target.previousElementSibling;
    const iframe = container.querySelector("iframe");

    container.style.display = "none";
    event.target.style.display = "none";
    showButton.style.display = "inline-block";
    iframe.src = "";
  };