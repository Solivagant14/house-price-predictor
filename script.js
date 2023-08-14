const localityAbbreviations = {
    Blmngtn: "Bloomington Heights",
    Blueste: "Bluestem",
    BrDale: "Briardale",
    BrkSide: "Brookside",
    ClearCr: "Clear Creek",
    CollgCr: "College Creek",
    Crawfor: "Crawford",
    Edwards: "Edwards",
    Gilbert: "Gilbert",
    IDOTRR: "Iowa DOT and Rail Road",
    MeadowV: "Meadow Village",
    Mitchel: "Mitchell",
    Names: "North Ames",
    NoRidge: "Northridge",
    NPkVill: "Northpark Villa",
    NridgHt: "Northridge Heights",
    NWAmes: "Northwest Ames",
    OldTown: "Old Town",
    SWISU: "South & West of Iowa State University",
    Sawyer: "Sawyer",
    SawyerW: "Sawyer West",
    Somerst: "Somerset",
    StoneBr: "Stone Brook",
    Timber: "Timberland",
    Veenker: "Veenker"
  };
  
  // Creating a new dictionary with exchanged keys and values
  const reversedLocalityAbbreviations = {};
  for (const key in localityAbbreviations) {
    const value = localityAbbreviations[key];
    reversedLocalityAbbreviations[value] = key;
  }

async function postData(url = "", data = {}) {
// Default options are marked with *
const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
});
return response.json(); // parses JSON response into native JavaScript objects
}

document.getElementById("calculate-btn").addEventListener("click",async function() {

  let totalPrice=0
  const floors = parseFloat(document.getElementById("floors").value);
  const quality = parseFloat(document.getElementById("quality").value);
  const livingArea = parseFloat(document.getElementById("living-area").value);
  const garageArea = parseFloat(document.getElementById("garage-area").value);
  const localitySelect = document.getElementById("locality");
  const locality = localitySelect.options[localitySelect.selectedIndex].value;

await  postData("https://house-predict.up.railway.app/predict", {
    "HouseStyle": floors,
    "OverallQual": quality,
    "GrLivArea": livingArea,
    "GarageArea": garageArea,
    "Neighbourhood": reversedLocalityAbbreviations[`${locality}`]
  }).then((data) => {
    totalPrice=Number(data.price)
  });
  const basePricePerSqFt = 150; // Adjust this as needed
  const qualityFactor = quality / 10;
//   const totalPrice = basePricePerSqFt * (livingArea + garageArea) * floors * qualityFactor;
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `Estimated House Price in ${locality}: $${totalPrice.toFixed(2)}`;
});