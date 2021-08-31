function save() {
    if (!confirm('저장하시겠습니까?')) {
      return;
    }
    var contents;
      try {
        contents = JSON.parse(localStorage.getItem("contents4"));
      } catch (e) {
        contents = null;
      }

    if (!contents) {
      contents = [];
    }
    var writer = document.getElementById('writer').value;
    var category = document.getElementById('category').value;
    var title = document.getElementById('title').value;
    var review = document.getElementById('review').value;
    contents[getParameterByName('no')-1]={no:contents.length
      , writer:writer
      ,category:category
      , title:title
      , review:review
      , write_date:new Date()};
    localStorage.setItem("contents4", JSON.stringify(contents));
    alert('저장되었습니다.');
    location.href = 'list.html';
  }

  var contents = JSON.parse(localStorage.getItem("contents4"));
  getContents();
  function getContents() {

    if (!contents) {
      contents = [];
    }
    
    var content = contents[getParameterByName('no')-1];
    document.getElementById('writer').value = content.writer;
    document.getElementById('title').value = content.title;
    document.getElementById('review').value = content.review;
  }

  function removeContent() {
    if (confirm('삭제하시겠습니까?')){
        location.href = 'list.html';
      } else {
        return;
      }
    console.log(contents);
    contents.splice(getParameterByName('no')-1, getParameterByName('no'));
    localStorage.setItem("contents4", JSON.stringify(contents));
  }
    function modify() {
      if (confirm('수정하시겠습니까?')){
        location.href = 'write.html?no='+getParameterByName('no');
        
      } else {
        return;
      }
    }
    function getParameterByName(name) { 
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); 
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search); 
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }