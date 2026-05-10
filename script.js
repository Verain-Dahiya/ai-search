function doSearch() {

  const input =
  document.getElementById("searchInput");

  const q = input.value.trim();

  if(q === "") {
    alert("Enter something");
    return;
  }

  const url =
  "https://www.google.com/search?q=" +
  encodeURIComponent(q);

  window.location.href = url;
}

function imageSearch() {

  const q =
  document.getElementById("searchInput")
  .value.trim();

  if(q === "") {
    alert("Enter something");
    return;
  }

  window.location.href =
  "https://www.google.com/search?tbm=isch&q=" +
  encodeURIComponent(q);
}

function toggleDark() {

  document.body.classList.toggle("dark");
}

function login() {

  let user = prompt("Username");

  if(user) {

    localStorage.setItem("user", user);

    alert("Welcome " + user);
  }
}

function voiceSearch() {

  try {

    const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

    const recognition =
    new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult =
    function(event) {

      document.getElementById(
      "searchInput").value =
      event.results[0][0].transcript;
    };

  } catch(e) {

    alert(
    "Voice search unsupported");
  }
}

async function openAI() {

  const q =
  document.getElementById(
  "searchInput").value.trim();

  const chat =
  document.getElementById(
  "chatBox");

  if(q === "") {

    chat.innerHTML =
    "Type something";

    return;
  }

  chat.innerHTML =
  "Thinking...";

  const API_KEY =
  "AIzaSyBdrO_3W_2W5YFvNrKMrsFGlIT7CjdYO_g";

  try {

    const response =
    await fetch(

    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="

    + API_KEY,

    {

      method:"POST",

      headers:{
        "Content-Type":
        "application/json"
      },

      body:JSON.stringify({

        contents:[{

          parts:[{
            text:q
          }]

        }]

      })

    });

    const data =
    await response.json();

    console.log(data);

    if(data.candidates){

      const reply =
      data.candidates[0]
      .content.parts[0].text;

      chat.innerHTML =
      `
      <div style="
      background:#222;
      color:white;
      padding:20px;
      border-radius:20px;
      margin-top:20px;
      text-align:left;
      ">
      ${reply}
      </div>
      `;

    } else {

      chat.innerHTML =
      "API Error";
    }

  } catch(err) {

    console.log(err);

    chat.innerHTML =
    "Connection Error";
  }
}
