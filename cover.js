window.onload=function(){
    let search=document.getElementById("search");
    let result=document.getElementById("result");
    let search_term=document.getElementById("search_val");
    let search_all=document.getElementById("all_definitions");
    search.addEventListener("click",function(){
        let request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 200){
                result.innerHTML = "<h2>Result</h2>"+request.responseText;
            }
        };
        let url = "request.php?q="+search_term.value;
        request.open("GET",url,true);
        request.send();
    });
    search_all.addEventListener("click",function(){
        let request_all = new XMLHttpRequest();
        request_all.onreadystatechange = function(){
            if(request_all.readyState === 4 && request_all.status === 200){
                let list="<ol>";
                let xml_document = request_all.responseXML;
                let words = xml_document.getElementsByTagName("definition");
                for(let i = 0; i<words.length; i++){
                    list+="<li><h3>"+words[i].getAttribute("name")+"</h3><p>"+words[i].childNodes[0].nodeValue+"</p><p> - "+words[i].getAttributeNode("author").value+"</p></li>";
                }
                list+="</ol>";
                result.innerHTML = "<h3>Result</h3>"+list;
            }
        };
        request_all.open("GET","request.php?q=&all=true",true);
        request_all.send();
    });
};
