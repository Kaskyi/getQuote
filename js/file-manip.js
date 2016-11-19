let dataText = '';
var rootH = document.getElementById('res_header');
var source_text = document.getElementById('source_text');
var prop = document.getElementById('my_id');
var file_list = document.getElementById('file_list');
var table_lable = document.getElementById('table_lable');
var mainRow = document.getElementById('mainRow');
  window.onload = function(){
   // prop.value =  localStorage.getItem("my_id");
    jQ();
    document.getElementById('table_row').style.display = 'none';
    document.getElementById('container_row').style.display = 'none';
    document.getElementById('files').addEventListener('change', function(){handleFileSelect(event,(err,data) => {
        document.getElementById('container_row').style.display = 'block';findQ = findQ.bind(null,data);})}, false);
    document.getElementById('find_button').addEventListener('click', function(){findQ();});

    file_list.style.display = 'none';
    table_lable.style.color = "#ffffff";
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        console.log('File support.');
    } else {
    alert('The File APIs are not fully supported in this browser.');
    }
  }

  //Wraper for closure
  function  customOnLoad(file,callback){
    return function(e){
      if (e.target.result != undefined)
        callback(null,e.target.result)
      else
        callback(err,null);
    }
  }

  //Custom handleWrap
  function handleFileSelect(event,callback){
    var file = event.target.files[0];
    // files is a FileList of File objects.
    var output = [];
    var reader = new FileReader();
    //Wraper with callback
    reader.onload = customOnLoad(file,(err,data) => {
      if (err == null){
      document.getElementById('source_text').innerHTML = data.substring(0,5500) + '........';
      output.push('<li><strong>', escape(file.name), '</strong> (', file.type || 'n/a', ') - ',
                  file.size, ' bytes, last modified: ',
                  file.lastModifiedDate.toLocaleDateString(), '</li>');
      file_list.innerHTML = '<ul>' + output.join('') + '</ul>';

      if (file.type != '')
        file_list.className = "alert alert-success";
      else
        file_list.className = "alert alert-warning";

      file_list.style.display = 'block';
      table_lable.style.color = "#ffffff";
      callback(err,reader);
      }
    });
      // Read in the image file as a data URL.
    reader.readAsText(file,'windows-1251');
  }

  function findQ(reader)
  {
      document.getElementById('table_row').style.display = 'block';
      document.getElementById('container_row').style.display = 'none';
      var fileName = file_list.innerHTML.substring(8,file_list.innerHTML.indexOf(' '));
      //Set Style
      file_list.style.display = 'block';
      table_lable.style.color = "#000000";
      rootH.innerHTML = '';
      source_text.innerHTML = '';

      var count = 1;
      var position = 0;
      var temp = -1;
      if (reader == undefined){
          file_list.innerHTML = "<h3>Pleaaaaze SELECT some File</h3>";
          file_list.className = "alert alert-warning";
      }
      else
      dataText = reader.result;
      while (true){
        temp = dataText.indexOf(prop.value,position);
        count++;
        if (temp == -1 || prop.value == '' || count > 100 )
           break;
        rootH.innerHTML += dropWrap(dataText,temp,fileName,count);
        position = temp+1;
      }
     if (prop.value == '' ||  rootH.innerHTML==''){
        document.getElementById('container_row').style.display = 'block';
        document.getElementById('table_row').style.display = 'none';
        source_text.innerHTML ='<h2 class=\'text-center\'>'+'<kbd>' + 'Sorry, we not find something ' + '</kbd>' + '</h2>';
     }

  }
  function dropWrap(data,pos,name,number){
     return htmlData = '<tr data-toggle="collapse" href="#collapse' + number + '"><td>' + pos + '</td>'
     +'<td>' + data.substring(pos-10,pos+50) + '</td>' +
     '<td>' + name + '</td></tr>' + '<tr><td colspan="3">' +
     '<div id="collapse' + number +'" class="panel-collapse collapse"> <div class="panel-body"' +
     'id = "res_body">'+ data.substring(pos,pos+400) +'</div> </div> ' + '</td></tr>';
  }

  // On Click change with animation margin-top
  function jQ() {
    mainRow.onclick = function() {
    console.log("jQ");
    mainRow.id = 'mainRowClick';
};
  }
