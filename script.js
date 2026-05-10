function doSearch(){
  let q=document.getElementById("searchInput").value;

  window.location.href=
  "https://www.google.com/search?q="+encodeURIComponent(q);
}

function imageSearch(){
  let q=document.getElementById("searchInput").value;

  window.location.href=
  "https://www.google.com/images?q="+encodeURIComponent(q);
}

function toggleDark(){
  document.body.classList.toggle("dark");
}

function login(){
  let user=prompt("Enter Username");

  if(user){
    alert("Welcome "+user);
    localStorage.setItem("user",user);
  }
}

function voiceSearch(){

  let speech=
  new webkitSpeechRecognition();

  speech.lang="en-US";

  speech.onresult=function(event){

    document.getElementById("searchInput").value=
    event.results[0][0].transcript;
  };

  speech.start();
}
}
async function openAI() {

  let q =
  document.getElementById("searchInput").value;

  let chat =
  document.getElementById("chatBox");

  if(q.trim() === ""){
    chat.innerHTML = "Type something";
    return;
  }

  chat.innerHTML = "Thinking...";

  const API_KEY = "AIzaSyBdrO_3W_2W5YFvNrKMrsFGlIT7CjdYO_g";

  try {

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          contents: [{
            parts: [{
              text: q
            }]
          }]
        })
      }
    );

    const data = await response.json();

    let reply =
    data.candidates[0].content.parts[0].text;

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

  } catch(error) {

    chat.innerHTML =
    "<span style='color:red'>API Error</span>";

    console.log(error);

  }
}
