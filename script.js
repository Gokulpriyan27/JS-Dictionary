const getDetails = async () => {
  let searchText = document.getElementById("input-field").value;

  if (searchText) {
    document.querySelector(".spinners").style.display = "flex";
    let x = searchText.trimStart();
    let finalSearch = x.trimEnd();
    await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${finalSearch}`
    )
      .then((response) => {
        if (response) {
          document.querySelector(".spinners").style.display = "none";
          return response.json();
        }
      })
      .then((data) => {
        if (data.title === "No Definitions Found") {
          document.querySelector(".display-field").style.display = "none";
          document.getElementById("message").style.display = "block";
        } else {
          document.querySelector(".display-field").style.display = "block";
          document.getElementById("message").style.display = "none";
          let datafetched = data;

          document.querySelector(".found").innerHTML = `
         
              <div class="word">
                  <span class="title">Word - </span>
                  <span>${data[0].word}</span>
              </div>
  
              <div class="phonetic">
                  <span class="title">phonetic - </span>
                  <span>${data[0].phonetic}</span>
             </div>
  
            <div class="origin">
            
            </div>
  
            <div class="meanings">
            
            
                <div class="synonyms">
                  
                </div>
            
                <div class="antonyms">
            
                </div>
            
                <div class="partofspeech">
              
                </div>
            
                <div class="definition">
                    <div class="sub-definition">
                    
                    </div>
                    <div class="example">
                    
                    </div>
            
                </div>
            </div>
          
          `;

          let meaning = datafetched[0].meanings;

          if (datafetched[0].origin) {
            document.querySelector(".origin").innerHTML = `
              <span class="title">Origin - </span>
              <span>${datafetched[0].origin}</span>
              
              `;
          }

          for (let i = 0; i < 1; i++) {
            document.querySelector(".partofspeech").innerHTML += `
              <span class="title title${i}">Part of speech - </span>
              <span>${meaning[i].partOfSpeech}</span>
              `;
            for (let j = 0; j < 1; j++) {
              document.querySelector(
                ".sub-definition"
              ).innerHTML += `  <span class="title title${i}">Definition - </span>
                  <span>${meaning[i].definitions[j].definition}</span>
                  `;

              if (meaning[i].definitions[j].example) {
                document.querySelector(".example").innerHTML += `
                  
                      <span class="title">Example - </span>
                      <span>${meaning[i].definitions[j].example}</span>
                      `;
              }
            }
          }

          if (datafetched[0].meanings[0].synonyms.length > 0) {
            let synonyms = "";
            for (
              let k = 0;
              k < datafetched[0].meanings[0].synonyms.length;
              k++
            ) {
              if ((k = datafetched[0].meanings[0].synonyms.length - 1)) {
                synonyms = synonyms + datafetched[0].meanings[0].synonyms;
              } else {
                synonyms = synonyms + datafetched[0].meanings[0].synonyms + ",";
              }
            }
            document.querySelector(".synonyms").innerHTML = `
              <span class="title">Synonyms - </span>
              <span>${synonyms}</span>
              
              `;
          }

          if (datafetched[0].meanings[0].antonyms.length > 0) {
            let antonyms = "";
            for (
              let k = 0;
              k < datafetched[0].meanings[0].antonyms.length;
              k++
            ) {
              if (
                (k = datafetched[0].meanings[0].antonyms.length - 1) ||
                (k = 0)
              ) {
                antonyms = antonyms + datafetched[0].meanings[0].antonyms;
              } else {
                antonyms = antonyms + datafetched[0].meanings[0].antonyms + ",";
              }
            }
            document.querySelector(".antonyms").innerHTML = `
              <span class="title">Antonyms - </span>
              <span>${antonyms}</span>
              
              `;
          }
        }

        //////////////
      });
  } else {
    alert("Search word cannot be empty");
  }
};
