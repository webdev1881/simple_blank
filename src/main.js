window.onload = function(){
let v = console;
let d = document;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDWqLtA7dFy9YYn57Y1JFz0AHix0EmuL6U",
    authDomain: "engl-6f51f.firebaseapp.com",
    databaseURL: "https://engl-6f51f.firebaseio.com",
    projectId: "engl-6f51f",
    storageBucket: "engl-6f51f.appspot.com",
    messagingSenderId: "913939204845"
  };
  firebase.initializeApp(config);

let counter = 0;
function loadData() {
  let wor = firebase.database().ref('words/')
  wor.on("child_added", function( data ) {
    let wordVal = data.val()
    //v.log(wordVal)
    counter++
    $('table').find('tbody').append( `
      <tr>
        <td>${wordVal.word}</td>
        <td>${wordVal.translate}</td>
        <td>${wordVal.comment} 
          <div class="del" id="${wordVal.id}" >Delete</div>
        </td>
      </tr>
      ` );
  } ) 
}
loadData()


$('#save').click( function(){
  let word = $('#word').val();
  let trans = $('#trans').val();
  let comment = $('#comment').val()
  createLine( word, trans, comment )
  form.reset()
  $("#tbl tr").remove();
  loadData() 
} )

function deleteWord (id) {
  let word = firebase.database().ref('words/' + id);
  word.remove()
  $("#tbl tr").remove();
}


$('body').on('click', '.del', function(){
  let id = $(this).attr("id")
  deleteWord (id);
  loadData() 
});


function createLine( word, trans, comment ) {
  counter += 1; 
  let line = {
    id: counter,
    word: word,
    translate: trans,
    comment: comment
  }
  let db = firebase.database().ref('words/' + counter);
  db.set(line);
}

















//document.getElementsByClassName("cbalink")[0].remove()
}

