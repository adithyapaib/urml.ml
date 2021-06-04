let submit = document.getElementById("submit");
let ipbox = document.getElementById('url');
let url;
document.title = window.location.hostname + " shorten URL's with ease!"

submit.addEventListener('click',getURL);


function is_url(str)
{
  regexp =  /^(?:(?:https?|http|www):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          submit.value='Wait...'
          ipbox.value='Processing ...'
          getShortID(str)
        }
          else
          {
            ipbox.value=''
            alert("Invalid URL");
            
          }
} 

 function  getURL(e)
{
    url = ipbox.value;
    is_url(url);  
}
 async function getShortID(url)
{
    url = await encodeURI(url)
    
    let target = `http://${window.location.host}/p/${url}`;
     console.log(target)
 let response = await fetch(target)
  .then(response => response.json())
  console.log(response)
  ipbox.value = await `http://${window.location.host}/${response}`;
   var r = await `https://${window.location.host}/${response}`;
  submit.value="copy";
  ipbox.select();
  document.execCommand("copy");
  window.getSelection().empty();
  document.getElementById("submit").value="Copied !"
  document.getElementById("submit").style.background="#3ACF3C";
  document.getElementById("ta").innerHTML +=r +'\r\n';
  
}





