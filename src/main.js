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



let counter = new Date().getTime();

function loadData() {
  let wor = firebase.database().ref('words/')
  wor.on("child_added", function( data ) {
    let wordVal = data.val()
    $('table').find('tbody').prepend( `
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


v.log( $('#word').val() )

$('#save').click( function(){
  let word = $('#word').val().toLowerCase();
  let trans = $('#trans').val().toLowerCase();
  let comment = $('#comment').val().toLowerCase();
  createLine( word, trans, comment )
  form.reset()
  $("#.words tr").remove();
  loadData() 
});



function deleteWord (id) {
  let word = firebase.database().ref('words/' + id);
  word.remove()
  $(".words tr").remove();
};



// Delete
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



$('.search').keyup( function() {
  let search = this.value;
  $('tbody tr').each( function(){
    if( $(this).text().toLowerCase().indexOf(search.toLowerCase()) !== -1 ) {
      $(this).show()
    } else { $(this).hide() }
  })
} )


// save enabled
$('#word').keyup( function() {
  if( $(this).val().length ) {
    $('#save').prop('disabled', false)
  } else {
    $('#save').prop('disabled', true)
  }
})










//document.getElementsByClassName("cbalink")[0].remove()





}

