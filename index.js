console.log('hello');

//utility functions
//1. utility function to get div element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML= string;
    return div.firstElementChild;
}



// initialize no of parameters
let addedParamCount = 0;


//hide the parameters box initially
let parametersbox = document.getElementById('parametersbox');
parametersbox.style.display = 'none';

//if user clicks on params box,hide json box
let paramsradio = document.getElementById('paramsradio');
paramsradio.addEventListener('click', () => {
    //hiding json box
    let requestJsonBox = document.getElementById('requestJsonBox');
    requestJsonBox.style.display = 'none';
    //showing params box
    parametersbox.style.display = 'block';

})

//if user clicks on json box,hide params box
let jsonradio = document.getElementById('jsonradio');
jsonradio.addEventListener('click', () => {
    //showing json box
    let requestJsonBox = document.getElementById('requestJsonBox');
    requestJsonBox.style.display = 'block';
    //hiding params box
    parametersbox.style.display = 'none';


})

//if user clicks on + button add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = ` <div class="row">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                <div class="col">
                    <input type="text" class="form-control" id="parameterkey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="parametervalue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                </div>
                
                <button class="deleteParam btn-inline btn btn-primary my-2" type="submit">Delete</button>
                </div>`;
    ///convert the element string to DOM node
    let paramElement = getElementFromString(string);
    // console.log(paramElement);
    //adding the div element to the html container with id params
    params.appendChild(paramElement);

    //add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e)=>{
            e.target.parentElement.remove();
        })
    }
    //addedparamscount is initially zero so for every new parameter added it will increase by 1 and will finally give us the value of the total no of parameters
    addedParamCount++;

})

// if user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
    document.getElementById('responsePrism').innerHTML =  "Please Wait.. Fetching Response";


    //fetch all the values user has entered
    let url= document.getElementById("url").value;
     
    let requestType = document.querySelector("input[name='requestType']:checked").value;
   
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    
    
    
    //if user has used custom params option instead of json,collect all the parameters in an object
    if(contentType== 'params'){
        data={};
        //addedparamcount contains the total no of parameters user has entered
        for(i=0; i<addedParamCount + 1; i++){
            //this if condition is to check if the parameter exists or not for eg if we first add 3 parameters 1,2,3, and we delete 2 then 2 will no longer be having any key or value
            if(document.getElementById('parameterkey' + (i+1)) !=undefined){
            let key = document.getElementById('parameterkey' + (i+1)).value;
            let value = document.getElementById('parametervalue' + (i+1)).value;
            data[key] = value;
            }
            
        }
        //to convert our data which is now an object to a string
        data = JSON.stringify(data);
    }

    else{
        data = document.getElementById('requestJsonText').value;
    }


    
    //log all values in the console for debugging
    console.log("url is: " , url);
    console.log("requesttype is: " , requestType);
    console.log("contenttype is: " , contentType);
    console.log("data is: " , data);



    //IF THE REQUEST TYPE IS GET, INVOKE A FETCH API TO CREATE A GET REQUEST
    if(requestType == 'GET'){
        fetch(url,{
            method: 'GET',
        })
        .then(response=> response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();


        });
    }

    // post request
    else if (requestType =='POST') {
       
            fetch(url,{
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
            })
            .then(response=> response.text())
            .then((text)=>{
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                //function to highlight our response data
                Prism.highlightAll();
                
            });
        
    
    }
    //put request
    else if (requestType =='PUT') {
       
        fetch(url,{
            method: 'PUT',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        .then(response=> response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            //function to highlight our response data
            Prism.highlightAll();
            
        });
    

}



})