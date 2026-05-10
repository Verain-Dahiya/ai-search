function doSearch(){

  let q =
  document.getElementById("searchInput").value;

  if(q.trim() !== ""){

    window.open(
      "https://www.google.com/search?q="
      + encodeURIComponent(q),
      "_blank"
    );

  }
}

function imageSearch(){

  let q =
  document.getElementById("searchInput").value;

  if(q.trim() !== ""){

    window.open(
      "https://www.google.com/search?tbm=isch&q="
      + encodeURIComponent(q),
      "_blank"
    );

  }
}

function toggleDark(){

  document.body.classList.toggle("dark");

}

function login(){

  let user =
  prompt("Enter Username");

  if(user){

    localStorage.setItem("username", user);

    alert("Welcome " + user);

  }
}

function voiceSearch(){

  try{

    const SpeechRecognition =
    window.SpeechRecognition
    || window.webkitSpeechRecognition;

    const recognition =
    new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult =
    function(event){

      document.getElementById(
      "searchInput").value =
      event.results[0][0].transcript;

    };

  }catch(e){

    alert(
    "Voice search not supported in your browser");

  }
}

async function openAI(){

  let q =
  document.getElementById("searchInput").value;

  let chat =
  document.getElementById("chatBox");

  if(q.trim() === ""){

    chat.innerHTML =
    "Type something first";

    return;
  }

  chat.innerHTML = "Thinking...";

  const API_KEY =
 AIzaSyBdrO_3W_2W5YFvNrKMrsFGlIT7CjdYO_g "PASTE_YOUR_REAL_API_KEY";

  try{

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
      + API_KEY,
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          contents:[{

            parts:[{
              text:q
            }]

          }]

        })

      }
    );

    const data =
    await response.json();

    console.log(data);

    if(data.candidates){

      let reply =
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

    }else{

      chat.innerHTML =
      "Invalid API response";

    }

  }catch(error){

    console.log(error);

    chat.innerHTML =
    "API Error or Internet Issue";

  }
}
