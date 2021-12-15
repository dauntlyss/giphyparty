console.log("Let's get this party started!");
const key =  "nnMZCgAeTJzpfJcRcnTKuhWQvqXmmpzo";
const $gifArea = $("#gif-area");

const $searchInput = $("#search");

function addGif(results) {
  let numResults = results.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: results.data[randomIdx].images.original.url,
      class: "w-100"
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

/* handle form submission: clear search box & make ajax call */

$("form").on("submit", async function(evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val();
  $searchInput.val("");

  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: key
    }
  });
  addGif(response.data);
});

/* Remove gifs */

$("#remove").on("click", function() {
  $gifArea.empty();
});