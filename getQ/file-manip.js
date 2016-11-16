let dataText = '';
var root = document.getElementById('res');
var source_text = document.getElementById('source_text');
var prop = document.getElementById('my_id');
var file_list = document.getElementById('file_list');
var table_lable = document.getElementById('table_lable');

  window.onload = function(){
    prop.value =  localStorage.getItem("my_id");

    document.getElementById('files').addEventListener('change', function(){handleFileSelect(event,(err,data) => {findQ = findQ.bind(null,data);})}, false);
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
      document.getElementById('source_text').innerHTML = data.substring(0,data.length/10) + '........';
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
     var fileName = file_list.innerHTML.substring(0,file_list.innerHTML.indexOf(' '));
      //Set Style
      file_list.style.display = 'block'; 
      table_lable.style.color = "#000000";
      root.innerHTML = '';
      source_text.innerHTML = '';
      
      
      var position = 0;
      var temp = -1;
      dataText = reader.result;
      while (true){
        temp = dataText.indexOf(prop.value,position);  
        if (temp == -1 || prop.value == '' )
           break; 
        root.innerHTML+='<tr><td>' + temp +'</td><td>' + dataText.substring(temp,temp+5)  +'</td><td>' + fileName + '</td></tr>';
        position = temp+1;
      }
     if (prop.value == '' ||  root.innerHTML==''){
        source_text.innerHTML = 'Empty result';
     }
  }
  