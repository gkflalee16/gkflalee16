var contents = JSON.parse(localStorage.getItem("contents4"));
var num=getParameterByName('no');
  getContents();
  function getContents() {

    if (!contents) {
      contents = [];
    }
    
    var content = contents[getParameterByName('no')-1];
    document.getElementById('writer').innerText = content.writer;
    document.getElementById('category').innerText = content.category;
    document.getElementById('title').innerText = content.title;
    document.getElementById('review').innerText = content.review;
    document.getElementById('write_date').innerText = content.write_date;
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
        location.href = 'modify.html?no='+getParameterByName('no');
        
      } else {
        return;
      }
    }
  function getParameterByName(name) { 
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); 
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search); 
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }


  var contentsList = JSON.parse(localStorage.getItem("comments4"));
  
drawRows(contentsList['cono'+num]);
function warnEmpty() {
    alert("Enter a Input!!");
  }
  function dateTostring(date) {
    const dateString =date.toISOString();
    const dateToString = dateString.substring(0, 10) + " " + dateString.substring(11, 19);
    return dateToString;
  }
  function submitComment() {
    const newcommentEL = document.getElementById("new-comment");
    const newcomment = newcommentEL.value.trim();
   var commentjson= localStorage.getItem('comments4');
   var comment;
   if (!commentjson) {
     comment={};
   } else {
      comment=JSON.parse(commentjson)
   }

   var list = comment['cono'+num];
   if(!list){
     list=[];
   }

   list.push({
    message : newcomment,
    write_date : new Date()
   })
   comment['cono'+num] = list;

   localStorage.setItem('comments4', JSON.stringify(comment));
   drawRows(list);
}


  function drawRows(list) {
    var templates = '';
    var body = document.getElementById('comments4-rows');
 
    for (var i=list.length-1; 0<=i; i--) {
      var comment  = list[i];
      templates += '<tr>';
      templates += '<td>'+comment.message+'</td>';
      templates += '<td style="text-align:center">'+toStringByFormatting(new Date(comment.write_date))+'</td>';
      templates += '<td style="text-align:center"> <button onclick="removeComments('+i+')">삭제</button></td>';
     
      templates += '</tr>';
    }
 
    body.innerHTML = templates;
  }

  function toStringByFormatting(source, delimiter = '-') {
    const year = source.getFullYear(); 
    const month = leftPad(source.getMonth() + 1); 
    const day = leftPad(source.getDate());
    return [year, month, day].join(delimiter);
  }

   
 function leftPad(value) {
  if (value >= 10) { return value; } return `0${value}`; 
  }

 
  function removeComments(i) {
    if (!confirm('삭제하시겠습니까?')){
      return;
    }
    
   var commentjson= localStorage.getItem('comments4'); // 로컬스토리지에서 모든 코멘트를 가져온다.
   var comment = comment=JSON.parse(commentjson); // 모든 코멘트를 자바스크립트 객체로 변환한다.
   var list = comment['cono'+num];  // 모든코멘트 중에 현재 컨텐츠 번호에 해당하는 코멘트를 가져온다.
   list.splice(i, 1); // 코멘트 리스트에서 해당 코멘트 삭제
   comment['cono'+num] = list;  // 삭제한 리스트를 다시 바인딩

   localStorage.setItem('comments4', JSON.stringify(comment));  //바인딩된 코멘트를 LOCALSTORAGE에 저장
    location.href = 'view.html?no='+num;
  }