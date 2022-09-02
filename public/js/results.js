const parentElement = document.querySelector(".row-cols-3");

const handleClick = async (event) => {
  if (event.target.matches("button")) {
    const bookId = event.target.id.split("-")[1];

    const title = document.querySelector(`#title-${bookId}`).textContent;
    const description = document.querySelector(`#desc-${bookId}`).textContent;
    const image = document
      .querySelector(`#image-${bookId}`)
      .getAttribute("src");

    const response = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        image,
      }),
    });

    if (response.ok) {
      alert("YOU DID IT!");
    } else {
      alert("Failed to logout");
    }
  }
};

parentElement.addEventListener("click", handleClick);
